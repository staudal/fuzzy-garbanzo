// PersonList.tsx
import React, { useEffect, useState } from "react";
import { Person } from "../models/person";

const PersonList: React.FC = () => {
	const [people, setPeople] = useState<Person[]>([]);
	const [newPerson, setNewPerson] = useState<Person>({ id: 0, name: "", age: 0, occupation: "" });
	const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
	const [updatedPerson, setUpdatedPerson] = useState<Person>({ id: 0, name: "", age: 0, occupation: "" });

	useEffect(() => {
		fetch("http://localhost:3001/people")
			.then((response) => response.json())
			.then((data) => setPeople(data));
	}, []);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewPerson({ ...newPerson, [event.target.name]: event.target.value });
	};

	const handleUpdateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedPerson({ ...updatedPerson, [event.target.name]: event.target.value });
	};

	const getLatestId = async () => {
		const response = await fetch("http://localhost:3001/people");
		const data = await response.json();
		const sortedPeople = data.sort((a: Person, b: Person) => b.id - a.id);
		return sortedPeople[0].id;
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (newPerson.name && newPerson.age && newPerson.occupation) {
			const latestId = await getLatestId();
			const newPersonWithId = { ...newPerson, id: latestId + 1 };
			fetch("http://localhost:3001/people", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newPersonWithId),
			})
				.then((response) => response.json())
				.then((data) => setPeople((prevPeople) => [...prevPeople, data]));
			setNewPerson({ id: 0, name: "", age: 0, occupation: "" });
		}
	};

	const handleUpdate = (event: React.FormEvent) => {
		event.preventDefault();
		if (updatedPerson.name && updatedPerson.age && updatedPerson.occupation && selectedPerson) {
			fetch(`http://localhost:3001/people/${selectedPerson.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedPerson),
			})
				.then((response) => response.json())
				.then((data) => {
					const updatedPeople = people.map((person) => (person.id === data.id ? data : person));
					setPeople(updatedPeople);
					setSelectedPerson(null);
					setUpdatedPerson({ id: 0, name: "", age: 0, occupation: "" });
				});
		}
	};

	const removePerson = () => {
		const personToRemove = people[people.length - 1];
		if (personToRemove) {
			fetch(`http://localhost:3001/people/${personToRemove.id}`, {
				method: "DELETE",
			}).then(() => {
				const newPeople = [...people];
				newPeople.pop();
				setPeople(newPeople);
			});
		}
	};

	const sortPeople = () => {
		const sortedPeople = [...people].sort((a, b) => a.age - b.age);
		sortedPeople.forEach((person, index) => {
			fetch(`http://localhost:3001/people/${person.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...person, id: index + 1 }),
			});
		});
		setPeople(sortedPeople);
	};

	return (
		<div>
			{people.map((person, index) => (
				<div key={index}>
					<h2>{person.name}</h2>
					<p>Age: {person.age}</p>
					<p>Occupation: {person.occupation}</p>
					<button onClick={() => setSelectedPerson(person)}>Update</button>
				</div>
			))}
			<form onSubmit={handleSubmit}>
				<input type="text" name="name" value={newPerson.name} onChange={handleInputChange} placeholder="Name" required />
				<input type="number" name="age" value={newPerson.age} onChange={handleInputChange} placeholder="Age" required />
				<input type="text" name="occupation" value={newPerson.occupation} onChange={handleInputChange} placeholder="Occupation" required />
				<button type="submit">Add Person</button>
			</form>
			{selectedPerson && (
				<form onSubmit={handleUpdate}>
					<h2>Update {selectedPerson.name}</h2>
					<input type="text" name="name" value={updatedPerson.name} onChange={handleUpdateInputChange} placeholder="Name" required />
					<input type="number" name="age" value={updatedPerson.age} onChange={handleUpdateInputChange} placeholder="Age" required />
					<input type="text" name="occupation" value={updatedPerson.occupation} onChange={handleUpdateInputChange} placeholder="Occupation" required />
					<button type="submit">Update Person</button>
				</form>
			)}
			<button onClick={removePerson}>Remove Last Person</button>
			<button onClick={sortPeople}>Sort by Age</button>
		</div>
	);
};

export default PersonList;
