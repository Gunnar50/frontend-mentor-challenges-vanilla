class Calculator {}

let currentNumber = "";
let previousNumber = "";
let operator = "";
let result = "";

// keypad reference
const keypad = document.getElementById("keypad");

// current number screen reference
const screenCurrent = document.querySelector("[data-current]");
const screenPrevious = document.querySelector("[data-previous]");
const screenResult = document.querySelector("[data-result]");
const themeSelector = document.querySelectorAll('input[name="theme"]');

for (const theme of themeSelector) {
	theme.addEventListener("change", (e) => {
		const themeIndex = e.target.closest("label").textContent.trim();
		switchTheme(themeIndex);
	});
}

// Function to switch theme
function switchTheme(themeIndex) {
	const themes = ["dark", "light", "funky"];
	console.log(themeIndex - 1);
	document.documentElement.setAttribute("data-theme", themes[themeIndex - 1]);
}

// delete function
const deleteButton = document.querySelector("[data-delete]");
deleteButton.addEventListener("click", () => {
	if (currentNumber.length > 0) {
		currentNumber = currentNumber.slice(0, currentNumber.length - 1);
	}
	if (currentNumber.length === 0 && previousNumber.length > 0) {
		currentNumber = previousNumber.slice(0, currentNumber.length - 2);
		previousNumber = "";
		operator = "";
	}
	updateScreen();
	if (currentNumber.length === 0) screenCurrent.innerHTML = "0";
});

// numbers event listeners
const numbers = document.querySelectorAll("[data-number]");
for (const number of numbers) {
	number.addEventListener("click", () => {
		currentNumber += number.innerText;
		updateScreen();
	});
}

const operations = document.querySelectorAll("[data-operation]");
for (const op of operations) {
	op.addEventListener("click", () => {
		if (previousNumber.length > 0 || currentNumber.length === 0) return;
		operator = op.innerText;
		previousNumber = currentNumber + " " + operator;
		currentNumber = "";
		updateScreen();
		screenCurrent.innerText = "0";
	});
}

// reset function
const resetButton = document.querySelector("[data-reset]");
resetButton.addEventListener("click", () => {
	currentNumber = "";
	previousNumber = "";
	operator = "";
	updateScreen();
	screenCurrent.innerText = "0";
});

// calculation function
const equalsButton = document.querySelector("[data-equals]");
equalsButton.addEventListener("click", () => {
	if (previousNumber.length === 0 || currentNumber.length === 0) return;
	const prev = parseFloat(previousNumber.slice(0, previousNumber.length - 2));
	const current = parseFloat(currentNumber);
	switch (operator) {
		case "+":
			result = prev + current;
			break;
		case "-":
			result = prev - current;
			break;
		case "/":
			result = prev / current;
			break;
		case "x":
			result = prev * current;
			break;
	}
	currentNumber = result.toString();
	previousNumber = "";
	updateScreen();
});

function updateScreen() {
	screenCurrent.innerText = currentNumber;
	screenPrevious.innerText = previousNumber;
}
