// Global variables
const codeForm = document.querySelector('#code-form');
const formList = document.querySelector('#form-list');
const generateCodeButton = document.querySelector('#generate-btn');
const addRowButton = document.querySelector('#add-row-btn');
const clearRowButton = document.querySelector('#clear-row-btn');
const codeGenerated = document.querySelector('#code-generated');
const copyCodeButton = document.querySelector('#copy-code-btn');
const clearCodeButton = document.querySelector('#clear-code-btn');

// Starts <li.list-item> in 1 instead of 0
let listItemCount = 1;

// Generate code function
const generateCode = () => {

	// Clear any previous code
	clearGeneratedCode();

	// Default styles for each category
	const styleProduct = 'width: 100%; margin-bottom: 10px';
	const styleProductLast = 'width:100%';
	const styleBannerFirst = 'width:100%; margin-bottom: 10px';
	const styleBannerDefault = 'width:100%; margin: 20px 0 10px';

	// Check how many <li.list-item> were created before generate the code
	const listItems = document.querySelectorAll('.list-item');

	// Loop and generate the code for each <li.list-item>
	for(let i = 1; i <= listItems.length; i++ ) {
		const category = document.querySelector('#category-' + i);
		const categoryValue = category[category.selectedIndex].value;
		const image = document.querySelector('#image-' + i).value;
		const link = document.querySelector('#link-' + i).value;

		// Check the category selected and generate the code accordingly
		switch (categoryValue) {
			case 'product-last':
				codeGenerated.innerText += `<a href="${link}" target="_blank"><img style="${styleProductLast}" src="${image}"/></a>`;
				break;
			case 'banner-first':
				codeGenerated.innerText += `<img style="${styleBannerFirst}" src="${image}"/>`;
				break;
			case 'banner':
				codeGenerated.innerText += `<img style="${styleBannerDefault}" src="${image}"/>`;
				break;
			default:
				codeGenerated.innerText += `<a href="${link}" target="_blank"><img style="${styleProduct}" src="${image}"/></a>`;
				break;
		};
	};
};

// Add a new row with inputs to the list
const addFormRow = () => {

	// Content that will be created inside of each row
	const listItemContent = '\
		<div class="col">\
			<div class="input-group input-group-sm">\
				<label class="input-group-text">Categoria</label>\
				<select id="category-' + listItemCount + '" class="form-select">\
					<option value="product" selected>Produto</option>\
					<option value="product-last">Produto (último da lista)</option>\
					<option value="banner-first">Banner (primeiro da lista)</option>\
					<option value="banner">Banner</option>\
				</select>\
			</div>\
		</div>\
		<div class="col">\
			<div class="input-group input-group-sm">\
				<label class="input-group-text" for="image-' + listItemCount + '">Imagem</label>\
				<input id="image-' + listItemCount + '" class="form-control" name="image-' + listItemCount + '" type="text" placeholder="Exemplo: https://dnadigital360.com.br/imagem.jpg">\
			</div>\
		</div>\
		<div class="col">\
			<div class="input-group input-group-sm">\
				<label class="input-group-text" for="link-' + listItemCount + '">Link</label>\
				<input id="link-' + listItemCount + '" class="form-control" name="link-' + listItemCount + '" type="text" placeholder="Exemplo: https://dnadigital360.com.br">\
			</div>\
		</div>';
	
	const formListItem = document.createElement('li');
	formListItem.setAttribute('class', 'list-item row g-2 mb-4');
	formListItem.innerHTML = listItemContent;
	formList.appendChild(formListItem);
	listItemCount++;
};

// Runs addFormRow() once to create the first row before the user clicks the button
addFormRow();

// Reset the rows of inputs and add one row
const clearFormRow = () => {
	formList.innerHTML = '';
	listItemCount = 1;
	addFormRow();
};

// Prevent the default behavior of the submit event (page refresh)
codeForm.addEventListener("submit", function(event) {
	event.preventDefault();
});

 // Copy generated code to clipboard
const copyGeneratedCode = () => {

	// Check if the code has been generated
	codeGenerated.innerText ? window.alert('Código copiado!') : window.alert('Não há código para copiar. Por favor, gere o código primeiro.');
	
	const textArea = document.createElement('textarea');
	textArea.value = codeGenerated.textContent;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand('copy');
	textArea.remove();

};

// Clear generated code
const clearGeneratedCode = () => {
	codeGenerated.innerText = '';
};

// Event listeners
addRowButton.addEventListener('click', addFormRow);
clearRowButton.addEventListener('click', clearFormRow);
generateCodeButton.addEventListener('click', generateCode);
copyCodeButton.addEventListener('click', copyGeneratedCode);
clearCodeButton.addEventListener('click', clearGeneratedCode);