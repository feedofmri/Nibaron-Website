# app/make_dummy_nc.py
import numpy as np
import xarray as xr
from pathlib import Path

STORE = Path("./_store")
STORE.mkdir(exist_ok=True, parents=True)

# ---- Time: use SIMPLE INTEGER HOURS (0..23) ----
time_hours = np.arange(24, dtype=np.int32)  # 0..23 hours since the epoch below

# ---- Spatial grid ----
lons = np.linspace(88.0, 93.5, 20)
lats = np.linspace(20.5, 26.5, 20)

T = len(time_hours)
Y = len(lats)
X = len(lons)

# ---- Fake data ----
rng = np.random.default_rng(42)
rain = np.abs(rng.normal(0, 2.0, size=(T, Y, X)))                  # mm/h
lightning = rng.random((T, Y, X))                                   # 0..1
hail = np.clip(lightning - 0.4, 0, 1) * 0.7                         # 0..1
wind20 = rng.random((T, Y, X))                                      # 0..1
tempK = 298.15 + rng.normal(0, 2.0, size=(T, Y, X))                 # Kelvin

ds = xr.Dataset(
    data_vars=dict(
        Total_precipitation_surface_43_Hour_Accumulation=(["time","lat","lon"], rain),
        Probability_of_lightning_surface=(["time","lat","lon"], lightning),
        Probability_of_hail_threat_surface=(["time","lat","lon"], hail),
        Probability_of_max_10m_wind_speed_gt_20kt_surface=(["time","lat","lon"], wind20),
        Mean_air_temperature_surface=(["time","lat","lon"], tempK),
    ),
    coords=dict(
        time=("time", time_hours),
        lon=("lon", lons),
        lat=("lat", lats),
    ),
    attrs=dict(title="Dummy HIWAT test file"),
)

# CF attrs for time (no datetime objects, just integers)
ds["time"].attrs["units"] = "hours since 2025-10-03 00:00:00"
ds["time"].attrs["calendar"] = "gregorian"

out = STORE / "hkhEnsemble_202510030000_hourly_latlon.nc"
# netCDF4 backend; no special encoding needed now
ds.to_netcdf(out, engine="netcdf4", format="NETCDF4")

print(f"Wrote {out}")
print("Variables:", list(ds.data_vars))
print("Coords:", list(ds.coords))
