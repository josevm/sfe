var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');

var circlesArray = [];

var wWidth = 0;
var wHeight = 0;
var baseRadius = 10;
var ballsNumber = 1000;

var colors = [
	'#324D5C',
	'#46B29D',
	'#F0CA4D',
	'#E37B40',
	'#F53855',
];

var mouse = {
	x: undefined,
	y: undefined
};

window.addEventListener('resize', updateCanva);
window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
}, false);

function updateCanva() {
	wWidth = window.innerWidth;
	wHeight = window.innerHeight;
	canvas.width = wWidth;
	canvas.height = wHeight;
	circleGenerator();
};

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.maxRadius = radius * 4;
	this.minRadius = radius;
	this.color = colors[Math.floor(Math.random() * colors.length)];


	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		c.strokeStyle = this.color;
		c.stroke();
		c.fillStyle = this.color;
		c.fill();
	};

	this.update = function() {
		this.x += this.dx;
		this.y += this.dy;

		if (this.x + this.radius > wWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > wHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		if (Math.abs(this.x - mouse.x) < 50 && Math.abs(this.y - mouse.y) < 50) {
			if (this.radius < this.maxRadius) {
				this.radius += 1;
			}
		} else {
			if (this.radius > this.minRadius) {
				this.radius -= 1;
			}
		}

		this.draw();
	};
};

function circleGenerator() {
	circlesArray = [];
	for (var i = 0; i < ballsNumber; i++) {
		var radius = Math.random() * baseRadius;
		var x = Math.random() * (wWidth - radius * 2) + radius;
		var y = Math.random() * (wHeight - radius * 2) + radius;
		var dx = Math.random() * -1.5;
		var dy = Math.random() * -1.5;
		circlesArray[i] = new Circle(x, y, dx, dy, radius);
	}
};

function animation() {
	requestAnimationFrame(animation);
	c.fillStyle = "#000000";
	c.fillRect(0, 0, wWidth, wHeight);
	for (var i = 0; i < circlesArray.length; i++) {
		circlesArray[i].update();
	}
};

updateCanva();
circleGenerator();
animation();