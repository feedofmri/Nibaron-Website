from __future__ import annotations
import re
import json
from pathlib import Path
from datetime import datetime, timedelta, timezone

import numpy as np
import pandas as pd
import xarray as xr
import rioxarray as rxr
import geopandas as gpd
import requests

from .config import (
    EARTHDATA_USER, EARTHDATA_PASS, STORE,
    VAR_RAIN, VAR_LIGHTNING, VAR_HAIL, VAR_WIND20KT, VAR_MEAN_TEMP
)

STORE.mkdir(parents=True, exist_ok=True)

# --- 1) find & download the latest HIWAT file -------------------------------
# NOTE: Replace BASE_URL with the real GHRC directory for HIWAT ensemble hourly files.
# If you already know a fixed pattern, you can list files by date; otherwise
# keep a small index you maintain daily.
BASE_URL = "https://ghrc.nsstc.nasa.gov/pub/fieldCampaigns/hiwat"  # placeholder root

def _guess_latest_run(today: datetime) -> datetime:
    # HIWAT runs daily ~13:00 UTC (from your note). We'll try today, else yesterday.
    for d in [today, today - timedelta(days=1)]:
        candidate = datetime(d.year, d.month, d.day, 0, 0, tzinfo=timezone.utc)
        return candidate
    return today

def _remote_path_for(dt: datetime) -> str:
    # Example file name; change if your directory naming differs on GHRC
    # hkhEnsemble_YYYYMMDD0000_hourly_latlon.nc
    stamp = dt.strftime("%Y%m%d0000")
    year  = dt.strftime("%Y")
    fname = f"hkhEnsemble_{stamp}_hourly_latlon.nc"
    # Many GHRC collections are under /<year>/; adjust if needed:
    return f"{BASE_URL}/{year}/{fname}"

def _local_file_for(dt: datetime) -> Path:
    return STORE / f"hkhEnsemble_{dt.strftime('%Y%m%d0000')}_hourly_latlon.nc"

def ensure_latest_file() -> Path:
    # Prefer *any* local file in STORE so we skip downloads while testing
    candidates = sorted(STORE.glob("*.nc"))
    if candidates:
        return candidates[-1]

    # Fallback: explicit filename created by make_dummy_nc.py
    local = STORE / "hkhEnsemble_202510030000_hourly_latlon.nc"
    if local.exists():
        return local

    raise RuntimeError(f"No NetCDF found in {STORE}. Create one with app/make_dummy_nc.py.")


# --- 2) Load districts & build a spatial index --------------------------------
DISTRICTS = None  # loaded on first use

def load_districts(path: Path = Path("data/districts.geojson")) -> gpd.GeoDataFrame:
    global DISTRICTS
    if DISTRICTS is not None:
        return DISTRICTS
    gdf = gpd.read_file(path).to_crs("EPSG:4326")
    # Expect a name column; normalize
    name_col = next((c for c in gdf.columns if c.lower() in ("name", "district", "zilla", "adm2_en")), None)
    if not name_col:
        raise ValueError("districts.geojson must have a name column (name/district/zilla/adm2_en)")
    gdf["district_name"] = gdf[name_col].astype(str).str.strip()
    DISTRICTS = gdf[["district_name", "geometry"]].copy()
    return DISTRICTS

# --- 3) Open NetCDF and attach CRS -------------------------------------------
def open_hiwat(path: Path) -> xr.Dataset:
    ds = xr.open_dataset(path)

    lon_name = next((n for n in ds.coords if n.lower() in ("lon","longitude","x")), None)
    lat_name = next((n for n in ds.coords if n.lower() in ("lat","latitude","y")), None)
    if not lon_name or not lat_name:
        lon_name = next((n for n in ds.dims if n.lower() in ("lon","longitude","x")), None)
        lat_name = next((n for n in ds.dims if n.lower() in ("lat","latitude","y")), None)
    if not lon_name or not lat_name:
        raise ValueError("Could not find lon/lat coords in dataset")

    ds = ds.rename({lon_name: "x", lat_name: "y"})
    for v in ds.data_vars:
        ds[v] = ds[v].rio.write_crs("EPSG:4326", inplace=True)
    return ds


# --- 4) Aggregate per district -------------------------------------------------
def _clip_mean(da: xr.DataArray, geom) -> float:
    try:
        clip = da.rio.clip([geom], crs="EPSG:4326", drop=False)
        return float(clip.mean().values)
    except Exception:
        # Fallback: simple mask by bbox (rough)
        return float(da.mean().values)

def summarize_district(ds: xr.Dataset, district_name: str) -> dict:
    gdf = load_districts()
    row = gdf[gdf["district_name"].str.lower() == district_name.lower()]
    if row.empty:
        raise ValueError(f"District not found: {district_name}")
    geom = row.iloc[0].geometry.__geo_interface__

    # pull variables (adjust names via .env if different in your files)
    rain = ds[VAR_RAIN]                 # (time, y, x)
    temp = ds.get(VAR_MEAN_TEMP, None)  # may be None if not present
    p_lt = ds.get(VAR_LIGHTNING, None)
    p_hl = ds.get(VAR_HAIL, None)
    p_wd = ds.get(VAR_WIND20KT, None)

    # Day-1 summary over first 24 hours (you can also compute by hour)
    out = {"district": district_name, "generated_at": pd.Timestamp.now(tz="UTC").isoformat()}
    # Total rain (0-24h)
    out["total_rain_mm"] = _clip_mean(rain.isel(time=slice(0, 24)).sum(dim="time"), geom)

    def clip_max_prob(da):
        if da is None: return None
        # max probability over day-1
        return float(_clip_mean(da.isel(time=slice(0,24)).max(dim="time"), geom))

    out["max_prob_lightning_pct"] = None if p_lt is None else round(clip_max_prob(p_lt) * 100, 2) if p_lt.max()<=1.0 else round(clip_max_prob(p_lt),2)
    out["max_prob_hail_pct"]      = None if p_hl is None else round(clip_max_prob(p_hl) * 100, 2) if p_hl.max()<=1.0 else round(clip_max_prob(p_hl),2)
    out["max_prob_wind20kt_pct"]  = None if p_wd is None else round(clip_max_prob(p_wd) * 100, 2) if p_wd.max()<=1.0 else round(clip_max_prob(p_wd),2)
    out["mean_temp_c"]            = None if temp is None else round(_clip_mean(temp.isel(time=slice(0,24)).mean(dim="time"), geom) - 273.15, 2)  # if Kelvin

    # Hourly (0..23) basic series for charts
    hourly = []
    for t in range(min(24, rain.sizes.get("time",0))):
        ts = pd.to_datetime(str(rain.time.values[t]))
        hourly.append({
            "time": ts.isoformat(),
            "rain_mm": float(_clip_mean(rain.isel(time=t), geom)),
            "lightning_prob": None if p_lt is None else float(_clip_mean(p_lt.isel(time=t), geom)),
            "hail_prob": None if p_hl is None else float(_clip_mean(p_hl.isel(time=t), geom)),
            "wind20kt_prob": None if p_wd is None else float(_clip_mean(p_wd.isel(time=t), geom)),
            "temp_c": None if temp is None else float(_clip_mean(temp.isel(time=t), geom) - 273.15),
        })
    out["hourly"] = hourly
    print("Available variables:", list(ds.data_vars))
    return out


