const pixelBoard = document.getElementById('pixel-board');
const colors = document.getElementsByClassName('color');
const button = document.getElementById('button-random-color');
const colorPalette = document.getElementById('color-palette');
const clearButton = document.getElementById('clear-board');
const pixels = document.getElementsByClassName('pixel');
const input = document.getElementById('board-size');
const savedPixels = JSON.parse(localStorage.getItem('pixelBoard'));
const inputButton = document.getElementById('generate-board');
let number = 5;
if (localStorage.getItem('boardSize') !== null) {
  number = JSON.parse(localStorage.getItem('boardSize'));
} else {
  number = 5;
}

// cores da paleta\
function generateRandomColor() {
  const char = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += char[Math.floor(Math.random() * 16)];
  }
  return color;
}

for (let i = 0; i < colors.length; i += 1) {
  if (i === 0) {
    colors[i].style.backgroundColor = '#000';
  } else {
    const randomColor = generateRandomColor();
    const hex = `#${randomColor}`;
    colors[i].style.backgroundColor = hex;
  }
}

function storageColors() {
  const array = [];
  for (let i = 0; i < colors.length; i += 1) {
    array[i] = colors[i].style.backgroundColor;
  }
  localStorage.setItem('colorPalette', JSON.stringify(array));
}

function painting() {
  for (let i = 1; i < 4; i += 1) {
    colors[i].style.backgroundColor = generateRandomColor();
    storageColors();
  }
}

button.addEventListener('click', painting);
function recoverColors() {
  const savedColors = JSON.parse(localStorage.getItem('colorPalette'));
  for (let i = 0; i < 4; i += 1) {
    const color = document.getElementsByClassName('color')[i];
    color.style.backgroundColor = savedColors[i];
  }
}

function checkStorage() {
  if (localStorage.length === 0) {
    generateRandomColor();
    painting();
    storageColors();
  } else {
    recoverColors();
  }
}

function createBoard(num) {
  for (let i = 0; i < num * num; i += 1) {
    const div = document.createElement('div');
    div.style.backgroundColor = 'white';
    div.className = 'pixel';
    pixelBoard.appendChild(div);
  }
  pixelBoard.style = `grid-template-columns: repeat(${num}, 40px)`;
}

function pickColors() {
  const previousSelected = document.getElementsByClassName('selected')[0];
  const selected = window.event.target;
  if (selected.className === 'color') {
    previousSelected.className = 'color';
    selected.className = 'color selected';
  }
}
colorPalette.addEventListener('click', pickColors);

const keepPixels = [];
function storagePixels() {
  for (let i = 0; i < pixels.length; i += 1) {
    keepPixels[i] = pixels[i].style.backgroundColor;
    localStorage.setItem('pixelBoard', JSON.stringify(keepPixels));
  }
}

function paintPixel() {
  const pixel = window.event.target;
  const selectedColor = document.getElementsByClassName('selected')[0];
  if (pixel.className === 'pixel') {
    pixel.style.backgroundColor = selectedColor.style.backgroundColor;
    storagePixels();
  }
}
pixelBoard.addEventListener('click', paintPixel);

function recoverPixels() {
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = savedPixels[i];
  }
}

function checkPixels() {
  if (JSON.parse(localStorage.getItem('pixelBoard')) !== null) {
    recoverPixels();
  }
}

function clearBoard() {
  const num = pixelBoard.children.length;
  for (let i = 0; i < num; i += 1) {
    pixelBoard.removeChild(pixelBoard.children[0]);
  }
  createBoard(number);
  localStorage.removeItem('pixelBoard');
}
clearButton.addEventListener('click', clearBoard);

function inputBoard() {
  number = input.value;

  if (number === '') {
    window.alert('Board inválido!');
  } else if (number < 5) {
    number = 5;
    clearBoard();
  } else if (number > 50) {
    number = 50;
    clearBoard();
  } else {
    clearBoard();
  }
  localStorage.setItem('boardSize', number);
}
inputButton.addEventListener('click', inputBoard);

createBoard(number);
checkPixels();
checkStorage();
