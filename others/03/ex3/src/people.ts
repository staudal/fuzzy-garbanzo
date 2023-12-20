import { Person } from "../models/Person";

export async function getPeople(): Promise<Person[]> {
	const response = await fetch("../assets/people.json");
	const peopleData = await response.json();
	const people = peopleData.map((person: any) => {
		const personObj = new Person(person.name, person.age, person.occupation);
		personObj.setSalary(person.salary);
		return personObj;
	});
	return people;
}
