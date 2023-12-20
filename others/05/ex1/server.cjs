require("dotenv").config();
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const log4js = require("log4js");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

log4js.configure({
	appenders: { server: { type: "file", filename: "server.log" } },
	categories: { default: { appenders: ["server"], level: "info" } },
});
const logger = log4js.getLogger("server");

const getPeople = () => {
	const data = fs.readFileSync("people.json");
	return JSON.parse(data);
};

const savePeople = (people) => {
	const data = JSON.stringify(people);
	fs.writeFileSync("people.json", data);
};

app.get("/people", (req, res) => {
	const people = getPeople();
	res.json(people);
	logger.info("GET /people was called");
});

app.get("/people/:id", (req, res) => {
	const people = getPeople();
	const person = people.find((p) => p.id === Number(req.params.id));
	if (person) {
		res.json(person);
		logger.info(`GET /people/${req.params.id} was called`);
	} else {
		res.status(404).send("Person not found");
		logger.warn("GET /people/:id was called with an invalid id");
	}
});

app.post("/people", (req, res) => {
	const people = getPeople();
	const newPerson = { id: people.length + 1, ...req.body };
	people.push(newPerson);
	savePeople(people);
	res.status(201).json(newPerson);
});

app.put("/people/:id", (req, res) => {
	const people = getPeople();
	const index = people.findIndex((p) => p.id === Number(req.params.id));
	if (index !== -1) {
		const updatedPerson = { id: Number(req.params.id), ...req.body };
		people[index] = updatedPerson;
		savePeople(people);
		res.json(updatedPerson);
	} else {
		res.status(404).send("Person not found");
	}
});

app.patch("/people/:id", (req, res) => {
	const people = getPeople();
	const index = people.findIndex((p) => p.id === Number(req.params.id));
	if (index !== -1) {
		people[index] = { ...people[index], ...req.body };
		savePeople(people);
		res.json(people[index]);
	} else {
		res.status(404).send("Person not found");
	}
});

app.delete("/people/:id", (req, res) => {
	const people = getPeople();
	const index = people.findIndex((p) => p.id === Number(req.params.id));
	if (index !== -1) {
		const deletedPerson = people.splice(index, 1);
		savePeople(people);
		res.json(deletedPerson);
	} else {
		res.status(404).send("Person not found");
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
