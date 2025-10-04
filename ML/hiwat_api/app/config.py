import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

EARTHDATA_USER = os.getenv("EARTHDATA_USER", "")
EARTHDATA_PASS = os.getenv("EARTHDATA_PASS", "")
STORE          = Path(os.getenv("HIWAT_STORE", "./_store")).resolve()

# variable names can be tweaked here
VAR_RAIN      = os.getenv("VAR_RAIN", "Total_precipitation_surface_43_Hour_Accumulation")
VAR_LIGHTNING = os.getenv("VAR_LIGHTNING", "Probability_of_lightning_surface")
VAR_HAIL      = os.getenv("VAR_HAIL", "Probability_of_hail_threat_surface")
VAR_WIND20KT  = os.getenv("VAR_WIND20KT", "Probability_of_max_10m_wind_speed_gt_20kt_surface")
VAR_MEAN_TEMP = os.getenv("VAR_MEAN_TEMP", "Mean_air_temperature_surface")
