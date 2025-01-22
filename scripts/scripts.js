const dropdown = document.querySelector('.dropdown');
const selected = document.querySelector('.dropdown-selected');
const options = document.querySelectorAll('.dropdown-options li');
const hiddenInput = document.getElementById('color-mode');
const form = document.getElementById('form-1');
const colorContainer = document.querySelectorAll('.choice-container');

selected.addEventListener('click', () => {
    dropdown.classList.toggle('active');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getFormData();
});

options.forEach(option => {
    option.addEventListener('click', (e) => {
        options.forEach(element => element.classList.remove('selected'));
        option.classList.add('selected');
        selected.innerHTML = `${option.textContent} <i class="fa-solid fa-angle-down" style="color: #9ca3af;"></i>`;
        dropdown.classList.remove('active');
        hiddenInput.value = e.target.dataset.value;
    });
});

document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

function getFormData(){
    const formData = new FormData(form);
    const colorHex = formData.get('color').replace(/^#/, '');
    const colorMode = formData.get('mode');
    handleColorFetch(colorHex, colorMode);
}

async function handleColorFetch(hex, mode) {
    const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}`);
    const colorData = await response.json();
    displayColor(colorData.colors);
}

function displayColor(colorArray){
    for(let i = 0; i < colorContainer.length; i++){
        const hexColor = colorArray[i].hex.value;
        colorContainer[i].children[0].style.backgroundColor = hexColor;
        colorContainer[i].children[1].textContent = hexColor;
    }
}

getFormData();