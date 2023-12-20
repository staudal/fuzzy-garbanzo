class Person {
	name: string;
	age: number;
	gender: string;
	constructor(name: string, age: number, gender: string) {
		this.name = name;
		this.age = age;
		this.gender = gender;
	}
}

// Create a populator function to populate an array of 10 Person objects.
// Each person will have a random name, age and gender
function populatePersons(): Person[] {
	let persons: Person[] = [];
	let names = ["John", "Jane", "Bob", "Alice", "Tom", "Emily", "Robert", "Emma", "James", "Olivia"];

	for (let i = 0; i < 10; i++) {
		let age = Math.floor(Math.random() * 100); // Random age between 0 and 99
		let person = new Person(names[i], age, i % 2 === 0 ? "Male" : "Female");
		persons.push(person);
	}

	return persons;
}

function mapPersonsToTable(persons: Person[]): string {
	let tableHeader = `<table><thead><tr><th>Name</th><th>Age</th><th>Gender</th></tr></thead><tbody>`;
	let tableBody = "";

	for (let person of persons) {
		tableBody += `<tr><td>${person.name}</td><td>${person.age}</td><td>${person.gender}</td></tr>`;
	}

	let tableFooter = `</tbody></table>`;
	return tableHeader + tableBody + tableFooter;
}

let persons = populatePersons();
let table = mapPersonsToTable(persons);
document.getElementById("root")!.innerHTML = table;

// Button to sort array by age
let button = document.createElement("button");
button.textContent = "Sort by Age";
document.body.appendChild(button);
let isAscending = true;
button.textContent = "Sort by Age (Ascending)";

button.addEventListener("click", () => {
	if (isAscending) {
		persons.sort((a, b) => a.age - b.age);
		isAscending = false;
		button.textContent = "Sort by Age (Descending)";
	} else {
		persons.sort((a, b) => b.age - a.age);
		isAscending = true;
		button.textContent = "Sort by Age (Ascending)";
	}
	let sortedTable = mapPersonsToTable(persons);
	document.getElementById("root")!.innerHTML = sortedTable;
});
