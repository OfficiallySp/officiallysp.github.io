// script.js
const options = [];
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

function spinWheel() {
    const spinAngleStart = Math.random() * 360;
    let spinTime = 0;
    const spinTimeTotal = Math.random() * 3000 + 2000;

    function rotateWheel() {
        spinTime += 30;
        if(spinTime >= spinTimeTotal) {
            const degrees = spinAngleStart + 90 * spinTimeTotal / 1000;
            const chosenOptionIndex = Math.floor((degrees % 360) / (360 / options.length));
            document.getElementById('result').textContent = "Result: " + options[chosenOptionIndex];
            return;
        }
        const spinAngle = spinAngleStart + (spinTime / spinTimeTotal) * 360;
        ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(spinAngle * Math.PI / 180);
        ctx.translate(-150, -150);
        drawWheel();
        ctx.restore();
        requestAnimationFrame(rotateWheel);
    }

    rotateWheel();
}

drawWheel();
