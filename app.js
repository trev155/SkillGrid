const express = require('express');
const fs = require("fs");

const app = express();

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// save file path
app.use(express.static(__dirname + "/grid_data"));

// routes
app.post("/grid", function(req, res) {
	const filePath = __dirname + "/grid_data/testfile.txt";
	const body = "test body";

	fs.appendFile(filePath, body, function() {
		res.send("succesful file save");
	});
});

module.exports = app;
