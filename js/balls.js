

// bouncing balls

const getMousePosition = (canvas, event) => {
	let rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
};

let canvas4 = document.querySelector('#canvas-4'),
	ctx4 = canvas4.getContext('2d'),
	width = canvas4.width,
	height = canvas4.height,
	mousePos,
	balls,
	numberInput = document.querySelector('input#number-of-balls'),
	speedInput = document.querySelector('input#ball-speed'),
	speedOutput = document.querySelector('output.ball-speed');
	speedMultiplier = localStorage.ballSpeed || 1;

speedInput.value = speedOutput.value = speedMultiplier;

const COLORS = ['red', 'blue', 'green', 'orange', 'black', 'pink', 'purple'];


// player
let player = {
	x: 10,
	y: 10,
	size: 20,
	color: 'red'
};

const drawPlayer = (player) => {
	ctx4.save();

	ctx4.translate(player.x, player.y);

	ctx4.fillStyle = player.color;

	ctx4.fillRect(0, 0, player.size, player.size);

	ctx4.restore();
};

const movePlayer = () => {
	if (mousePos !== undefined) {
		player.x = mousePos.x - (player.size / 2);
		player.y = mousePos.y - (player.size / 2);
	}
};

const startPlayerMove = (event) => {
	mousePos = getMousePosition(canvas4, event);
};


// balls
class Ball {
	constructor(x, y, radius, color, speedX, speedY) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.speedX = speedX;
		this.speedY = speedY;
	}
}

const createBalls = (num) => {
	localStorage.numberOfBalls = num;
	numberInput.value = num;

	let ballsArray = [];
	for (let i = 0; i < num; i++) {
		let radius = (Math.random() * 35) + 5,
			x = (Math.random() * (width - radius)) + radius,
			y = (Math.random() * (height - radius)) + radius,
			speedX = (Math.random() * 10) - 5,
			speedY = (Math.random() * 10) - 5,
			color = COLORS[Math.floor(Math.random() * COLORS.length)];

		ballsArray.push(new Ball(x, y, radius, color, speedX, speedY));
	}
	return ballsArray;
};



balls = createBalls(localStorage.numberOfBalls || 12);



const handleNumberInput = (event) => {
	if (event.target.value > 250) {
		numberInput.value = 250;
		balls = createBalls(250);
	} else {
		balls = createBalls(event.target.value);
	}
};

numberInput.addEventListener('input', handleNumberInput, false);

const handleSpeedInput = (event) => {
	speedMultiplier = speedOutput.innerHTML = localStorage.ballSpeed = event.target.value;
};

speedInput.addEventListener('input', handleSpeedInput, false);

const moveBall = (ball) => {
	ball.x += ball.speedX * speedMultiplier;
	ball.y += ball.speedY * speedMultiplier;
}

const drawBall = (ball) => {
	ctx4.save();

	ctx4.translate(ball.x, ball.y);

	ctx4.fillStyle = ball.color;

	ctx4.beginPath();
	ctx4.arc(0, 0, ball.radius, 0, 2 * Math.PI);
	ctx4.fill();

	ctx4.restore();
};


// collision detection
const testWallCollision = (ball) => {
	// vertical walls
	if ((ball.x + ball.radius) > width) {
		ball.speedX = -ball.speedX;

		ball.x = width - ball.radius;
	} else if ((ball.x - ball.radius) < 0) {
		ball.speedX = -ball.speedX;

		ball.x = ball.radius;
	}

	// horizontal walls
	if ((ball.y + ball.radius) > height) {
		ball.speedY = -ball.speedY;

		ball.y = height - ball.radius;
	} else if ((ball.y - ball.radius) < 0) {
		ball.speedY = -ball.speedY;

		ball.y = ball.radius;
	}
};

const testBallRectCollision = (ball, rect) => {
	let testX = ball.x,
		testY = ball.y;

	if (testX < rect.x) testX = rect.x;
	if (testX > (rect.x + rect.size)) testX = rect.x + rect.size;
	if (testY < rect.y) testY = rect.y;
	if (testY > (rect.y + rect.size)) testY = rect.y + rect.size;

	return (((ball.x - testX) * (ball.x - testX) + (ball.y - testY) * (ball.y - testY)) < ball.radius * ball.radius);
};


// main animation
const mainLoop = () => {
	ctx4.clearRect(0, 0, width, height);

	let ballToRemove;

	balls.forEach((ball, index) => {
		drawBall(ball);
		moveBall(ball);
		testWallCollision(ball);
		if (testBallRectCollision(ball, player)) ballToRemove = index;
	});

	drawPlayer(player);
	movePlayer();

	if (ballToRemove !== undefined) balls.splice(ballToRemove, 1);

	requestAnimationFrame(mainLoop);
};

canvas4.addEventListener('mousemove', startPlayerMove, false);

mainLoop();

