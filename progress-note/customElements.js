class XCustom extends HTMLElement {
	constructor() {
		super();
	}

	showAll() {}
	hideEmpty() {}
}

class XDropdown extends XCustom {
	constructor() {
		super();
	}

	connectedCallback() {
		let name = this.getAttribute('name');
		let items = this.getAttribute('items').split(',');

		this.innerHTML = this.makeHTML(name, items);
	}

	makeHTML(name, items) {
		let html = `<input type="text" name="${name}" list="${name}">`
		html += `<datalist id="${name}">`

		items.forEach(item => {
			html += `<option>${item}</option>`;
		})

		html += '</datalist>';
		return html;
	}

	isEmpty() {
		let inputElement = this.querySelector('input');
		return inputElement.value === '';
	}

}

customElements.define('x-dropdown', XDropdown);

class XCheckboxList extends XCustom {
	constructor() {
		super();
	}

	connectedCallback() {
		let items = this.getAttribute('items').split(',');

		this.innerHTML = this.makeHTML(items);
	}

	makeHTML(items) {
		let html = ''
		
		items.forEach(item => {
			html += `<input type="checkbox" name="${item}">`
			html += `<label for="${item}">${item}</label><br>`;
		})

		if (this.getAttribute('withOther')) {
			html += `<input type="checkbox" name="Other">`
			html += `<input type="text" placeholder="Other"><br>`;
		}

		return html;
	}

	isEmpty() {
		let checkedItems = this.querySelectorAll('input[type="checkbox"]:checked');

		if (checkedItems.length) {
			return false;
		}

		return true;
	}

	hideEmpty() {
		let hiddenHTML = '';
		let stateHTML = '';

		let checkboxes = this.querySelectorAll('input[type="checkbox"]');

		[...checkboxes].forEach(checkbox => {

			if (checkbox.checked) {
				var checkedItem = checkbox.outerHTML.replace('>', ' checked>');
				
				hiddenHTML += checkedItem;
				hiddenHTML += checkbox.nextElementSibling.outerHTML;
				hiddenHTML += '<br>'
			}

			stateHTML += checkbox.checked ? checkedItem : checkbox.outerHTML;
			stateHTML += checkbox.nextElementSibling.outerHTML;
			stateHTML += '<br>'

		})

		this.state = stateHTML;
		this.innerHTML = hiddenHTML;
	}

	showAll() {
		if (this.state) {
			this.innerHTML = this.state;
		}
	}

}

customElements.define('x-checkbox-list', XCheckboxList);

class XRadioTable extends XCustom {
	constructor() {
		super();
	}

	connectedCallback() {
		let rows = this.getAttribute('rows').split(',');
		let columns = this.getAttribute('columns').split(',');

		this.innerHTML = this.makeHTML(rows, columns);
	}

	makeHTML(rows, columns) {
		let html = '<table>'

		let editableRows = this.getAttribute('editableRows');
		
		// Column headers
		html += '<tr><td>&nbsp;</td>';

		columns.forEach(column => {
			html += `<th scope="col">${column}</th>`;
		})

		html += '</tr>';

		// Rows
		rows.forEach(row => {
			if (editableRows) {
				html += `<tr><th scope="row"><input type="text" placeholder="${row}"></th>`;
				
			} else {
				html += `<tr><th scope="row">${row}</th>`;
			}
			
			
			html += `<td><input type="radio" name="${row}"></td>`.repeat(columns.length);
			html += '</tr>';
		})


		html += '</table>';
		return html;
	}

	isEmpty() {
		let checkedItems = this.querySelectorAll('input[type="radio"]:checked');

		if (checkedItems.length) {
			return false;
		}

		return true;
	}

	hideEmpty() {
		// We only care about hiding rows for editable rows that aren't filled in
		if (this.getAttribute('editableRows')) {
			let rows = this.querySelectorAll('tr');
			rows.forEach(row => {
				let input = row.querySelector('input');

				if (input && input.value == '') {
					row.classList.add('hidden');
				}
			});
		}
	}

	showAll() {
		this.querySelectorAll('tr.hidden').forEach(hiddenRow => hiddenRow.classList.remove('hidden'));
	}

}

customElements.define('x-radio-table', XRadioTable);
