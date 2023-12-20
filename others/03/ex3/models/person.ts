export class Person {
	name: string;
	age: number;
	occupation: string;
	private_salary: number;
	constructor(name: string, age: number, occupation: string) {
		this.name = name;
		this.age = age;
		this.occupation = occupation;
		this.private_salary = 0;
	}
	public introduce(): string {
		return `Hello, my name is ${this.name} and I am a ${this.occupation}. I earn $${this.private_salary} per month.`;
	}
	public incrementAge(): void {
		this.age++;
	}
	public setSalary(salary: number): void {
		this.private_salary = salary;
	}
	public getSalary(): number {
		return this.private_salary;
	}
}
