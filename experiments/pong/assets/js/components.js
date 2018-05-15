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
		if(Math.sign(ball.pos.x - paddle.pos.x) == Math.sign(ball.speed.x))return;
		if(ball.pos.y >= paddle.pos.y && ball.pos.y <= paddle.pos.y + paddle.height)return;
		
		var dir = Math.sign(ball.pos.y - paddle.height/2 - paddle.pos.y);
		paddle.setDirection(dir);
	}
}

/*** overriding a few functions ***/ 
Ball.prototype.detectCollision = function(width, height) { // with top & bottom walls
		var collisions = [];
		if(this.pos.y - this.radius < 0 || this.pos.y + this.radius > height)collisions.push([1, -1]);

		return collisions;
};

Paddle.prototype.move = function (){
	this.pos.add(new Vector(0, this.dir*20));
	if(this.pos.y < 0)this.pos.y = 0;
	else if(this.pos.y + this.height > this.total_height) this.pos.y = this.total_height - this.height;
}

Paddle.prototype.detectCollision = function (ball) {
	if(ball.pos.x + ball.radius > this.pos.x && ball.pos.y + ball.radius > this.pos.y && ball.pos.x < this.pos.x + this.width && ball.pos.y - ball.radius < this.pos.y + this.height){
		return this
	}
	return null
}

Paddle.prototype.rebound = function (ball){
	var diff = this.pos.y + this.height/2 - ball.pos.y;
	var DY = Math.floor((diff/this.height)*5);
	// if (DY == 0) DY = Math.random()*0.5;
	ball.rebound([-1, 1]);
	ball.speed.x += Math.sign(ball.speed.x);
	ball.speed.y = DY;

}

Paddle.prototype.score = 0;