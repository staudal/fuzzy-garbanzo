const { Navigator } = require("node-navigator");
const navigator = new Navigator();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function getLocation() {
	return new Promise(function (resolve, reject) {
		try {
			navigator.geolocation.getCurrentPosition(function (position) {
				resolve(position);
			});
		} catch (e) {
			reject(new Error(e));
		}
	});
}

function getWeather(coords, callback) {
	const apiKey = "YOUR KEY HERE";
	const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + coords.latitude + "&lon=" + coords.longitude + "&apiKey=" + apiKey;
	const req = new XMLHttpRequest();
	req.open("GET", url);
	req.onload = function () {
		if (req.status === 200) {
			callback(JSON.parse(req.responseText));
		} else {
			callback(new Error(req.statusText));
		}
	};
	req.send();
}

// turn the getWeather function into an async function
async function getWeather() {
	const apiKey = "YOUR KEY HERE";
	const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + coords.latitude + "&lon=" + coords.longitude + "&apiKey=" + apiKey;
	const req = new XMLHttpRequest();
	req.open("GET", url);
	req.onload = function () {
		if (req.status === 200) {
			callback(JSON.parse(req.responseText));
		} else {
			callback(new Error(req.statusText));
		}
	};
}
