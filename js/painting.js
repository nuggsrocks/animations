const getMousePosition = (canvas, event) => {
	let rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
};

let canvas3 = document.querySelector('#canvas-3'), ctx3 = canvas3.getContext('2d'), painting = false, lineWidth = 1, 
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

let paintOptionsDiv = document.querySelector('#paint-options');

colors.forEach(color => {
	let btn = document.createElement('button');
	btn.innerHTML = color;
	paintOptionsDiv.appendChild(btn);
	btn.addEventListener('click', () => {
		currentColor = color;
	}, false);
});

let inputField = document.querySelector('#input-line-width');
inputField.addEventListener('change', (event) => lineWidth = event.target.value, false);

canvas3.addEventListener('mousemove', handleMouseMove, false);
canvas3.addEventListener('mousedown', clicked, false);
canvas3.addEventListener('mouseup', released, false);