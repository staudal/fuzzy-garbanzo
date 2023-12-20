import { Person } from "../models/Person";

export function renderPeopleList(container: HTMLElement, people: Person[]): void {
	people.forEach((person) => {
		const personDiv = document.createElement("div");
		personDiv.className = "person";

		const name = document.createElement("h2");
		name.className = "person__name";
		name.textContent = person.name;

		const occupation = document.createElement("p");
		occupation.className = "person__occupation";
		occupation.textContent = "Occupation: " + person.occupation;

		const age = document.createElement("p");
		age.className = "person__age";
		age.textContent = "Age: " + person.age.toString();

		const salary = document.createElement("p");
		salary.className = "person__salary";
		const formattedSalary = new Intl.NumberFormat("en-US", { style: "currency", currency: "DKK" }).format(person.private_salary);
		salary.textContent = "Salary: " + formattedSalary;

		personDiv.append(name, occupation, age, salary);
		container.append(personDiv);
	});
}
