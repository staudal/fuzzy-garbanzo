import { getPeople } from "./people";
import { renderPeopleList } from "./peopleList";
import { employees } from "../models/employee";
import { findEmployeesByRole, renderEmployeeTable, displayAverageSalary } from "../models/employee";

export async function renderApp() {
	const people = await getPeople();
	const container = document.getElementById("people");
	if (container) {
		renderPeopleList(container, people);
	}

	const employeesContainer = document.getElementById("employees");
	if (employeesContainer) {
		const title = document.createElement("h2");
		title.textContent = "Employees";
		employeesContainer.appendChild(title);
		displayAverageSalary(employeesContainer, employees);

		const tableContainer = document.createElement("div");
		employeesContainer.appendChild(tableContainer);
		renderEmployeeTable(tableContainer, employees);

		const roleInput = document.createElement("input");
		roleInput.type = "text";
		roleInput.id = "roleInput";
		roleInput.placeholder = "Enter role to filter";
		employeesContainer.appendChild(roleInput);

		const filterButton = document.createElement("button");
		filterButton.id = "filterButton";
		filterButton.textContent = "Filter";
		employeesContainer.appendChild(filterButton);

		filterButton.addEventListener("click", () => {
			const role = roleInput.value;
			const filteredEmployees = findEmployeesByRole(employees, role);
			tableContainer.innerHTML = ""; // Clear the table container
			displayAverageSalary(employeesContainer, filteredEmployees); // Re-calculate the average salary
			renderEmployeeTable(tableContainer, filteredEmployees); // Re-render the table
		});
	}
}
