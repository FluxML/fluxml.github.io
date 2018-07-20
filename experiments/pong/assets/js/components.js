/******************************************************
=======================================================
Components
=======================================================
******************************************************/

function PaddleCollection(positions, config){
	this.collection = positions.map(e=>new Paddle(e, config));

	this.move = ()=>{
		this.collection.forEach(p => p.move());
	}

	this.setDirection = (id, dir)=>{
		this.collection[id].setDirection(dir);
	}

	this.detectCollision = (ball)=>{
		for (var paddle of this.collection)
			if(paddle.detectCollision(ball))return paddle;
		
		return null;
	}

	this.draw = (canvas)=>{
		this.collection.forEach(paddle=>paddle.draw(canvas));
	}

	this.incScore = (id)=>{
		this.collection[id].score += 1;
	}
}


function PaddleController(paddle){
	
	this.next = (ball)=>{
		if(Math.sign(ball.pos.x - paddle.pos.x) == Math.sign(ball.speed.x))return;  // ball is moving away

		if(ball.pos.y >= paddle.pos.y && ball.pos.y <= paddle.pos.y + paddle.height)
			return paddle.setDirection(0)	
		
		var dir = Math.sign(ball.pos.y - paddle.height/2 - paddle.pos.y);
		paddle.setDirection(dir);
	}
}

function HyperBall(pos, speed, {color="#00f", width=1, height=2}={}){
	this.pos = pos;
	this.speed = speed;
	this.width = width;
	this.height = height;
	this.color = color;	
}

HyperBall.prototype = Object.create(Ball.prototype)

var hype = HyperBall.prototype;

hype.draw = function (canvas) {
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
}

hype.detectCollision = function(width, height) { // with top & bottom walls
	var collisions = [];
	if(this.pos.y <= 0 || this.pos.y + this.height > height)collisions.push([1, -1]);
	return collisions;
};


/*** overriding a few functions ***/ 

Paddle.prototype.move = function (){
	this.pos.add(new Vector(0, this.dir*this.speed));
	if(this.pos.y < 0)this.pos.y = 0;
	else if(this.pos.y + this.height > this.total_height) this.pos.y = this.total_height - this.height;
}

Paddle.prototype.detectCollision = function (ball) {
	if(ball.pos.x + ball.width >= this.pos.x && ball.pos.y + ball.height >= this.pos.y && ball.pos.x < this.pos.x + this.width && ball.pos.y < this.pos.y + this.height){
		return this
	}
	return null
}

Paddle.prototype.rebound = function (ball){
	var diff = this.pos.y + this.height/2 - ball.pos.y;
	ball.rebound([-1, 1]);
	ball.speed.x += Math.sign(ball.speed.x);
	ball.speed.y = ball.speed.x*diff/this.height;
}

Paddle.prototype.score = 0;

