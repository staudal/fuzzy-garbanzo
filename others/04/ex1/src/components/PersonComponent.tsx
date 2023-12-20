// Person.tsx
import React from "react";

interface PersonProps {
	name: string;
	age: number;
	role: string;
}

const Person: React.FC<PersonProps> = ({ name, age, role }) => {
	return (
		<div>
			<h2>{name}</h2>
			<p>Age: {age}</p>
			<p>Role: {role}</p>
		</div>
	);
};

export default Person;
