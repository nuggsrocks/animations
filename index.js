// dvd logo animation
let canvas1 = document.getElementById('canvas-1');
let ctx1 = canvas1.getContext('2d');

let xCoord = 0;
let xSpeed = 1.5;
let yCoord = 0;
let ySpeed = 2;

let rectWidth = 70;
let rectHeight = 70;

let imageObj = new Image();

imageObj.src = 'https://img.pngio.com/dvd-logo-transparent-png-pictures-free-icons-and-png-backgrounds-dvd-logo-white-459_331.png';

imageObj.onload = () => ctx1.drawImage(imageObj, xCoord, yCoord, rectWidth, rectHeight);

let id;


const drawRectangle = () => {
	ctx1.save();

	ctx1.drawImage(imageObj, xCoord, yCoord, rectWidth, rectHeight);

	if ((xCoord + rectWidth > canvas1.width) || xCoord <= 0) {
		xSpeed = -xSpeed;
	}

	if ((yCoord + rectHeight > canvas1.height) || yCoord <= 0) {
		ySpeed = -ySpeed;
	}

	ctx1.restore();
};


const animate = () => {
	ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

	xCoord += xSpeed;
	yCoord += ySpeed;

	drawRectangle();

	id = window.requestAnimationFrame(animate);
};

let started = false;

const startAnimation = () => {
	if (!started) id = requestAnimationFrame(animate);

	started = true;
};

const stopAnimation = () => {
	cancelAnimationFrame(id);
	started = false;
};


document.getElementById('start-btn').addEventListener('click', startAnimation, false);

document.getElementById('stop-btn').addEventListener('click', stopAnimation, false);





// mouse position
let canvas2 = document.getElementById('canvas-2');
let ctx2 = canvas2.getContext('2d');

let defaultMessage = 'Mouse Position: N/A';


const writeMessage = (message) => {
	ctx2.save();
	ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
	ctx2.font = '19px';
	ctx2.fillStyle = 'black';
	ctx2.fillText(message, 10, 25);
	ctx2.restore();
};

const getMousePosition = (canvas, event) => {
	let rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
};

canvas2.addEventListener('mousemove', event => {
	mousePosition = getMousePosition(canvas2, event);
	let message = 'Mouse Position: ' + mousePosition.x + ', ' + mousePosition.y;
	writeMessage(message);
}, false);

canvas2.addEventListener('mouseout', () => {
	writeMessage(defaultMessage);
}, false);

writeMessage(defaultMessage);






// painting 
let canvas3 = document.getElementById('canvas-3'), ctx3 = canvas3.getContext('2d'), painting = false, lineWidth = 1, 
	prevMousePosition, colors = ['red', 'blue', 'yellow', 'green', 'black', 'orange', 'purple'], currentColor = 'black';

const drawImmediateLine = (x1, y1, x2, y2) => {
	ctx3.beginPath();
	ctx3.strokeStyle = currentColor;
	ctx3.lineWidth = lineWidth;
	ctx3.moveTo(x1, y1);
	ctx3.lineTo(x2, y2);
	ctx3.stroke();
};

const handleMouseMove = (event) => {
	let mousePosition = getMousePosition(canvas3, event);

	if (painting) {
		drawImmediateLine(prevMousePosition.x, prevMousePosition.y, mousePosition.x, mousePosition.y);
		prevMousePosition = mousePosition;
	}
};

const clicked = (event) => {
	prevMousePosition = getMousePosition(canvas3, event);
	painting = true;
};

const released = (event) => {
	painting = false;
};

let paintOptionsDiv = document.getElementById('paint-options');

colors.forEach(color => {
	let btn = document.createElement('button');
	btn.innerHTML = color;
	paintOptionsDiv.appendChild(btn);
	btn.addEventListener('click', () => {
		currentColor = color;
	}, false);
});

let inputField = document.getElementById('input-line-width');
inputField.addEventListener('change', (event) => lineWidth = event.target.value, false);

canvas3.addEventListener('mousemove', handleMouseMove, false);
canvas3.addEventListener('mousedown', clicked, false);
canvas3.addEventListener('mouseup', released, false);
