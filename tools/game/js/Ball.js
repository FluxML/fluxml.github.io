function Ball(pos, speed, {color="#00f", radius=10}={}){
	this.pos = pos;
	this.speed = speed;
	this.radius = radius;
	this.color = color;	
}

Ball.prototype.draw = function (canvas) {
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
	ctx.fill();
}

Ball.prototype.move = function () {
	this.pos.add(this.speed);
}

Ball.prototype.detectCollision = function (width, height) { // with top, left & right walls
	var collisions = [];
	if(this.pos.x - this.radius < 0 || this.pos.x + this.radius > width)collisions.push([-1, 1]);
	if(this.pos.y - this.radius < 0)collisions.push([1, -1]);

	return collisions;
}

Ball.prototype.rebound = function ([mx, my]) {
	this.speed.x *= mx;
	this.speed.y *= my;
}