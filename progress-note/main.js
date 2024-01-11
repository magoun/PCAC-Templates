document.getElementById('dateRecorded').valueAsDate = new Date();

function autoResize() {
	this.style.height = 'auto';
	this.style.height = this.scrollHeight + 'px';
}

textareas = document.querySelectorAll("textarea");
textareas.forEach(textarea => textarea.addEventListener('input', autoResize, false));

window.addEventListener('beforeunload', function (e) {
	// Cancel the event
	e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
	// Chrome requires returnValue to be set
	e.returnValue = '';
});