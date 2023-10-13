const keypad = document.getElementById("keypad");

const numbers = document.querySelectorAll("[data-number]");
for (const number of numbers) {
	number.addEventListener("click", (e) => {
		console.log(number.innerText);
	});
}
