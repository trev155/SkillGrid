# Note: run this script from the directory it is located in!
# For ease of use, have the app running in one console. Make edits to the source psv files,
# then run this script in another terminal. The app will automatically refresh the grid.

import csv
import json

DATA_DIR = "source_data"
OUT_DIR = "../public/data"
UNIT_NAME_PATH = "../public/data/all_units.txt";

def getNames():
	names = []
	with open(UNIT_NAME_PATH, "r") as csvFile:
		csvReader = csv.DictReader(csvFile, delimiter=',')
		for row in csvReader:
			names.append(row.get("filename"))
	return names

def loadData():
	names = getNames()
	for name in names:
		print("-- Processing: " + name)
		dataPath = DATA_DIR + "/" + name + ".psv"
		outPath = OUT_DIR + "/" + name + ".json"

		data = []
		with open(dataPath, "r") as csvFile:
			csvReader = csv.DictReader(csvFile, delimiter='|')
			for row in csvReader:
				data.append(row)

		with open(outPath, "w", encoding="utf-8") as outfile:
			json.dump(data, outfile, indent=4)

		print("-- Done Processing: " + outPath)
				
if __name__ == "__main__":
	print("Loading data...")
	loadData()
	print("Done!")