const express = require('express');
const fs = require("fs");

const app = express();

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// save file path
app.use(express.static(__dirname + "/userdata"));

// routes
app.post("/grid", function(req, res) {
	const body = req.body;
	const gridData = body.gridData;
	const moveLevel = body.moveLevel;
	const unitSelection = body.unitSelection;
	const buildName = body.buildName;

	const filePath = __dirname + "/userdata/";
	const buildFilePath = filePath + unitSelection + "_" + moveLevel + "==" + buildName;

	fs.writeFile(buildFilePath, JSON.stringify(gridData), function(err) {
		if (err) {
			throw err;
		} else {
			console.log("Successful save: " + buildFilePath);
			res.send("Successful save: " + buildFilePath);
		}
	});
});

app.get("/grid/all", function(req, res) {
	const unit = req.query.unit;

	let grids = [];
	fs.readdir(__dirname + "/userdata", function(err, files) {
		files.forEach(filename => {
			if (filename.startsWith(unit)) {
				const buildName = filename.split("==")[1];
				grids.push(buildName);	
			}
		});
		res.send(grids);
	});
});

app.get("/grid", function(req, res) {
	const unit = req.query.unit;
	const buildName = req.query.build;

	fs.readdir(__dirname + "/userdata", function(err, files) {
		files.forEach(filename => {
			if (filename.startsWith(unit) && filename.endsWith(buildName)) {
				fs.readFile(__dirname + "/userdata/" + filename, "utf8", (err, data) => {
					if (err) {
						throw err;
					}
					res.send(data);
				});
			}
		});
	});
});

app.delete("/grid", function(req, res) {
	const unit = req.query.unit;
	const buildName = req.query.build;

	fs.readdir(__dirname + "/userdata", function(err, files) {
		files.forEach(filename => {
			if (filename.startsWith(unit) && filename.endsWith(buildName)) {
				fs.unlink(__dirname + "/userdata/" + filename, (err) => {
					if (err) {
						throw err;
					}
					res.send("Successful delete: " + filename);
				});
			}
		});
	});
});

module.exports = app;