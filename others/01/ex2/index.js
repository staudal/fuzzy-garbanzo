// Write a function that can take a reference to a csv file and a callback function as arguments.
// The calback function dertemines what to do with the data from the csv file.
// Create a function that can produce an html table from the data in the csv file.
// Create a function that can produce a json object from the data in the csv file.
// Create a function that can produce a markdown table from the data in the csv file.

const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");

const csvFilePath = path.join(__dirname, "students.csv");

const csvToJson = (csvFilePath, callback) => {
	csv()
		.fromFile(csvFilePath)
		.then((jsonObj) => {
			callback(jsonObj);
		});
};

const csvToHtml = (csvFilePath, callback) => {
	csv()
		.fromFile(csvFilePath)
		.then((jsonObj) => {
			let html = "<table>";
			jsonObj.forEach((row) => {
				html += "<tr>";
				for (let key in row) {
					html += `<td>${row[key]}</td>`;
				}
				html += "</tr>";
			});
			html += "</table>";
			callback(html);
		});
};

const csvToMarkdown = (csvFilePath, callback) => {
	csv()
		.fromFile(csvFilePath)
		.then((jsonObj) => {
			let markdown = "|";
			for (let key in jsonObj[0]) {
				markdown += `${key}|`;
			}
			markdown += "\n|";
			for (let key in jsonObj[0]) {
				markdown += "---|";
			}
			markdown += "\n";
			jsonObj.forEach((row) => {
				for (let key in row) {
					markdown += `|${row[key]}`;
				}
				markdown += "|\n";
			});
			callback(markdown);
		});
};

csvToJson(csvFilePath, (jsonObj) => {
	console.log(jsonObj);
});

csvToHtml(csvFilePath, (html) => {
	console.log(html);
});

csvToMarkdown(csvFilePath, (markdown) => {
	console.log(markdown);
});
