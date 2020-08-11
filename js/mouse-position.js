// mouse position
let canvas2 = document.querySelector('#canvas-2');
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