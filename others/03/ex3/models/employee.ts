type Role = "Developer" | "Manager" | "Designer" | "HR"; // this is a union type

type Employee = {
	name: string;
	age: number;
	role: Role;
	salary: number;
	department: string;
};

export const employees: Employee[] = [
	{ name: "John Doe", age: 30, role: "Developer", salary: 50000, department: "Engineering" },
	{ name: "Jane Smith", age: 35, role: "Manager", salary: 30000, department: "Sales" },
	{ name: "Bob Johnson", age: 40, role: "HR", salary: 60000, department: "Human Resources" },
	{ name: "Alice Williams", age: 25, role: "Designer", salary: 40000, department: "Design" },
	{ name: "Charlie Brown", age: 50, role: "Developer", salary: 70000, department: "Engineering" },
	{ name: "Emma Davis", age: 45, role: "Manager", salary: 80000, department: "Sales" },
];

export function getAverageSalary(employees: Employee[]): number {
	const totalSalary = employees.reduce((total, employee) => total + (employee.salary || 0), 0);
	return totalSalary / employees.length;
}

export function findEmployeesByRole(employees: Employee[], role: unknown): Employee[] {
	if (typeof role !== "string" || !["Developer", "Manager", "Designer", "HR"].includes(role)) {
		throw new Error("Invalid role");
	}

	return employees.filter((employee) => employee.role === role);
}

export function renderEmployeeTable(container: HTMLElement, employees: Employee[]) {
	const table = document.createElement("table");
	const thead = document.createElement("thead");
	const tbody = document.createElement("tbody");

	const headerRow = document.createElement("tr");
	["Name", "Age", "Role", "Salary", "Department"].forEach((text) => {
		const th = document.createElement("th");
		th.textContent = text;
		headerRow.appendChild(th);
	});
	thead.appendChild(headerRow);
	table.appendChild(thead);

	employees.forEach((employee) => {
		const row = document.createElement("tr");
		[employee.name, employee.age.toString(), employee.role, employee.salary.toString(), employee.department].forEach((text) => {
			const td = document.createElement("td");
			td.textContent = text;
			row.appendChild(td);
		});
		tbody.appendChild(row);
	});
	table.appendChild(tbody);

	container.appendChild(table);
}

export function displayAverageSalary(container: HTMLElement, employees: Employee[]) {
	const averageSalary = getAverageSalary(employees);
	const salaryElement = document.createElement("p");
	salaryElement.textContent = `Average Salary: ${averageSalary}`;
	container.appendChild(salaryElement);
}
