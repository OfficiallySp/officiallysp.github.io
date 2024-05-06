// script.js
const options = [];
const results = {};
const wheelCanvas = document.getElementById('wheel-canvas');
const ctx = wheelCanvas.getContext('2d');
const wheelRadius = 150;
wheelCanvas.width = 300;
wheelCanvas.height = 300;

function drawWheel() {
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    const anglePerSlice = 2 * Math.PI / options.length;
    for (let i = 0; i < options.length; i++) {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, wheelRadius, i * anglePerSlice, (i + 1) * anglePerSlice);
        ctx.fillStyle = `hsl(${i * 360 / options.length}, 100%, 50%)`;
        ctx.fill();
        ctx.stroke();
    }
}

function addOption() {
    const inputOption = document.getElementById('input-option');
    if (inputOption.value.trim() !== "") {
        options.push(inputOption.value.trim());
        drawWheel();
        inputOption.value = "";
    }
}

function spinWheelMultipleTimes() {
    const numSpins = parseInt(document.getElementById('num-spins').value) || 1;
    for (let i = 0; i < numSpins; i++) {
        const spinAngleStart = Math.random() * 360;
        const degrees = spinAngleStart + 90 * (Math.random() * 3000 + 2000) / 1000;
        const chosenOptionIndex = Math.floor((degrees % 360) / (360 / options.length));
        const chosenOption = options[chosenOptionIndex];
        results[chosenOption] = (results[chosenOption] || 0) + 1;
    }
    displayResults();
}

function displayResults() {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';
    Object.keys(results).forEach(option => {
        const count = results[option];
        resultElement.innerHTML += `<div>${option} ${count > 1 ? 'x' + count : ''}</div>`;
    });
}

drawWheel();
