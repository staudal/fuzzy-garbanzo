import { renderApp } from "./app.ts";
import { employees, getAverageSalary, findEmployeesByRole } from "../models/employee";
import "../styles/main.css";

renderApp();

const averageSalary = getAverageSalary(employees);
console.log("Average Salary:", averageSalary);

const developers = findEmployeesByRole(employees, "Developer");
console.log("Developers:", developers);
