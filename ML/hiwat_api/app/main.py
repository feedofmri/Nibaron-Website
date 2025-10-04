from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import traceback

from .hiwat import ensure_latest_file, open_hiwat, summarize_district, load_districts

app = FastAPI(title="HIWAT Bangladesh API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

@app.get("/districts")
def districts():
    gdf = load_districts()
    return sorted(gdf["district_name"].unique().tolist())

@app.get("/calendar")
def calendar(district: str = Query(...)):
    try:
        nc = ensure_latest_file()
        ds = open_hiwat(Path(nc))
        return summarize_district(ds, district_name=district)
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"{type(e).__name__}: {e}")
