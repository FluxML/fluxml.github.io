function Paddle(pos, {color="#f00", width=50, height=10, total_width, total_height}={}){
	this.pos = pos;
	this.dir = 0;

	this.total_width = total_width;
	this.total_height = total_height;
	this.width = width;
	this.height = height;
	this.color= color;
}

Paddle.prototype.draw = function (canvas) {
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = this.color;
	ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
}

Paddle.prototype.move = function () {
	this.pos.add(new Vector(this.dir*10, 0));
	if(this.pos.x < 0)this.pos.x = 0;
	else if(this.pos.x + this.width > this.total_width) this.pos.x = this.total_width - this.width;
}

Paddle.prototype.detectCollision = function(ball){
	if(ball.pos.x + ball.radius >= this.pos.x && ball.pos.y + ball.radius >= this.pos.y && ball.pos.x - ball.radius <= this.pos.x + this.width && ball.pos.y <= this.pos.y + this.height){
		return this
	}
	return null
}

Paddle.prototype.setDirection = function (d) {this.dir = d;}

Paddle.prototype.rebound = function (ball) {
	var diff = this.pos.x + width/2 - ball.pos.x;
	var DX = Math.floor((diff/width)*5 + 0.5);
	if (DX == 0) DX = 1;
	ball.rebound([DX, -1]);
	
}
