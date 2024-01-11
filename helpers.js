function hideEmpty() {

	let divs = document.getElementsByClassName('inputContainer');
	let divArray = Array.from(divs);

	divArray.forEach(div => {
		let input = div.querySelector(':scope > input');
		let textarea = div.querySelector(':scope > textarea');

		if (input) {
			if (input.value === '') {
				div.classList.add('empty');
			}
		}
		else if(textarea) {
			if (textarea.value === '') {
				div.classList.add('empty');
			}
		}
		else {
			let custom = div.querySelector('.custom');

			if (custom.isEmpty()) {
				div.classList.add('empty');
			}
			else {
				custom.hideEmpty();
			}
		}

	});

	document.getElementById('hideButton').setAttribute('hidden', "");
	document.getElementById('showButton').removeAttribute('hidden');
}

function showAll() {

	let divs = document.getElementsByClassName('inputContainer empty');
	let divArray = Array.from(divs);

	divArray.forEach(div => div.classList.remove('empty'));

	let customElements = document.getElementsByClassName('custom');
	let customElementsArray = Array.from(customElements);

	customElementsArray.forEach(element => element.showAll());

	document.getElementById('hideButton').removeAttribute('hidden');
	document.getElementById('showButton').setAttribute('hidden', "");
}