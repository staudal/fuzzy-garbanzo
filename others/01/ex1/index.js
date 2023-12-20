function add(x, y) {
	return x + y;
}

function multiply(x, y) {
	return x * y;
}

function operateOnNumbers(operator, x, y) {
	return operator(x, y);
}

console.log(operateOnNumbers(add, 3, 4)); // 7
console.log(operateOnNumbers(multiply, 3, 4)); // 12

// Run the operateOnNumbers function with a different operator (use lambda here) to subtract the numbers.
console.log(operateOnNumbers((x, y) => x - y, 3, 4)); // -1

// Based on above code example write a function that takes two functions and an array of numbers, and returns an array with the result of applying each function to each number in the array. E.g. lift to the power of 2 and then divide by 10 or something like that.
function applyFunctions(functions, numbers) {
	return functions.map((f) => numbers.map((n) => f(n)));
}

console.log(applyFunctions([Math.sqrt, (x) => x * x], [1, 2, 3, 4, 5]));
