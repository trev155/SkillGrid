import csv
import json

dataPath = "data/sceptile.psv"
outPath = "output/sceptile.json"

def loadData():
	data = []
	with open(dataPath, "r") as csvFile:
		csvReader = csv.DictReader(csvFile, delimiter='|')
		for row in csvReader:
			data.append(row)

	with open(outPath, "w") as outfile:
		json.dump(data, outfile, indent=4)
			
if __name__ == "__main__":
	loadData()