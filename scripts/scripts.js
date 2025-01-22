const dropdownEl = document.querySelector('.dropdown');
const selectedEl = document.querySelector('.dropdown-selected');

const formEl = document.getElementById('form-1');
const colorContainer = document.querySelectorAll('.choice-container');

selectedEl.addEventListener('click', () => {
    dropdownEl.classList.toggle('active');
  });

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    getFormData();
});

function getFormData(){
    const formData = new FormData(formEl);
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