// Change the code in index.ts to insert an input field and a button to the html page. When the button is clicked, the text from the input field should be displayed inside some element of the html page.

const helloWorld = (name: string): string => {
	return `Hello from ${name}`;
};
document.getElementById("root")!.innerHTML = helloWorld("TypeScript");

const button = document.createElement("button");
button.innerHTML = "Click me";
document.body.appendChild(button);

const input = document.createElement("input");
document.body.appendChild(input);

button.addEventListener("click", () => {
	document.getElementById("root")!.innerHTML = helloWorld(input.value);
});
