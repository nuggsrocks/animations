// dvd logo animation
let canvas1 = document.querySelector('#canvas-1');
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


document.querySelector('#start-btn').addEventListener('click', startAnimation, false);

document.querySelector('#stop-btn').addEventListener('click', stopAnimation, false);


