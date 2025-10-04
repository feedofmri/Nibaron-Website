import geopandas as gpd

# Load the GADM level 2 file
gdf = gpd.read_file("gadm41_BGD_2.json")

# Keep only district name and geometry
districts = gdf[["NAME_2", "geometry"]].drop_duplicates()

# Rename column NAME_2 → name
districts = districts.rename(columns={"NAME_2": "name"})

# Check unique districts
print("Number of unique districts:", districts["name"].nunique())

# Save cleaned GeoJSON
districts.to_file("districts_64.geojson", driver="GeoJSON")
