# app/peek_nc.py
import xarray as xr
from pathlib import Path

p = Path("./_store/hkhEnsemble_202510030000_hourly_latlon.nc")  # must exist
assert p.exists(), f"Missing file: {p}"
ds = xr.open_dataset(p)
print(ds)
print("\nVariables:", list(ds.data_vars))
print("\nCoords:", list(ds.coords))
