function add(x, y) {
	return x + y;
}

function subtract(x, y) {
	return x - y;
}

function multiply(x, y) {
	return x * y;
}

function divide(x, y) {
	return x / y;
}

// Change the calculate function to use the async/await syntax instead of promises
async function calculate(x, y, operation) {
	try {
		const result = await operation(x, y);
		return result;
	} catch (error) {
		return error;
	}
}

// Call the calculate function with the appropriate parameters to test your code
calculate(1, 2, add).then((result) => console.log(result));
calculate(1, 2, subtract).then((result) => console.log(result));
calculate(1, 2, multiply).then((result) => console.log(result));
calculate(1, 2, divide).then((result) => console.log(result));
calculate(1, 0, divide).catch((error) => console.log(error));

// Now try to chain add, subtract, divide and multiply using the .then syntax to the new calculator functions that returns a promise. How is that possible?? Explain!!
calculate(1, 2, add)
	.then((result) => calculate(result, 2, subtract))
	.then((result) => calculate(result, 2, multiply))
	.then((result) => calculate(result, 2, divide))
	.then((result) => console.log(result));
