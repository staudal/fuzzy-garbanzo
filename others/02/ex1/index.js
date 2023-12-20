// Create a function called calculate that takes 3 parameters: x, y and a callback called operation
function calculate(x, y, operation) {
	return operation(x, y);
}

// Create another function called add that takes 2 parameters: x and y and returns the sum of x and y
function add(x, y) {
	return x + y;
}

// Call the calculate function with the appropriate parameters to test your code
console.log(calculate(1, 2, add));

// adding subtract function
function subtract(x, y) {
	return x - y;
}

// adding multiply function
function multiply(x, y) {
	return x * y;
}

// adding divide function
function divide(x, y) {
	return x / y;
}

// Call the function calculate with the appropriate parameters to test your code
console.log(calculate(1, 2, subtract));
console.log(calculate(1, 2, multiply));
console.log(calculate(1, 2, divide));

// The above calculator exercise was a good warm up, but we can do better. Let's create our own promise that will do the same thing as the calculate function from the previous exercise.
// Change the calculate function to return a promise instead of a value and call the appropriate resolve or reject function depending on the result of the operation function call. Make sure to reject the promise if the operation function throws an error like divide by zero!

function calculate(x, y, operation) {
	return new Promise((resolve, reject) => {
		try {
			resolve(operation(x, y));
		} catch (error) {
			reject(error);
		}
	});
}
