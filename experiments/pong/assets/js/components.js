/******************************************************
=======================================================
Components
=======================================================
******************************************************/

var inside = function (x, y, a, b, w, h){
	return !(x >= w + a || y >= h + b || x < a || y < b)
}

function draw_rect(arr, arr_h, arr_w, x, y, w, h){
	for(var dy=0; dy < h; dy++){
        for(var dx=0; dx < w; dx++){
            if(!inside(x + dx, y + dy, 0, 0, arr_w, arr_h)){
            	continue
            }
            arr[Math.floor(y + dy)][Math.floor(x + dx)] = 1;
        }
    }
    return arr
}



function PaddleCollection(positions, config){
	this.collection = positions.map((e, i)=>new Paddle(e, {...config, id:i}));

	this.move = ()=>{
		this.collection.forEach(p => p.move());
	}

	this.setDirection = (id, dir)=>{
		this.collection[id].setDirection(dir);
	}

	this.detectCollision = (ball)=>{
		for (var paddle of this.collection){
			
			if(paddle.detectCollision(ball))return paddle;
		}

		return null;
	}

	this.draw = (canvas)=>{
		this.collection.forEach(paddle=>paddle.draw(canvas));
	}

	this.incScore = (id)=>{
		this.collection[id].score += 1;
	}

	this.draw_arr = function(arr, arr_h, arr_w){
		var n = this.collection.length;
		for(var i = 0; i< n; i++){
			arr = this.collection[i].draw_arr(arr, arr_h, arr_w)
		}
		return arr
	}

	this.scoreReset = function(){
		this.collection.map(e => {
			e.score = 0
		})
	}
}


function PaddleController(paddle){

	this.next = (ball)=>{
		if(Math.sign(ball.pos.x - paddle.pos.x) == Math.sign(ball.speed.x))  // ball is moving away
		return 0

		if(ball.pos.y >= paddle.pos.y && ball.pos.y <= paddle.pos.y + paddle.height)
		return 0
			// return paddle.setDirection(0)

		var dir = Math.sign(ball.pos.y - paddle.height/2 - paddle.pos.y);
		return dir
		// paddle.setDirection(dir);
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

hype.draw_arr = function(arr, arr_h, arr_w){
	return draw_rect(arr, arr_h, arr_w, this.pos.x, this.pos.y, this.width, this.height)
}


/*** overriding a few functions ***/

Paddle.prototype.move = function (){
	this.pos.add(new Vector(0, this.dir*this.speed));
	if(this.pos.y < 0)this.pos.y = 0;
	else if(this.pos.y + this.height > this.total_height) this.pos.y = this.total_height - this.height;
}

Paddle.prototype.detectCollision = function (ball) {
	if((ball.pos.x + ball.width >= this.pos.x) && (ball.pos.y + ball.height >= this.pos.y) && (ball.pos.x <= this.pos.x + this.width) && ball.pos.y < this.pos.y + this.height){
		return this
	}
	return null
}

Paddle.prototype.rebound = function (ball){
	var diff = this.pos.y + this.height/2 - ball.pos.y - ball.height/2;
	ball.speed.x = Math.abs(ball.speed.x) + 1
	if(this.id == 1){
		ball.speed.x  *= -1;
	}
	ball.speed.y = -1 * ball.speed.x*diff/this.height;
}

Paddle.prototype.score = 0;

Paddle.prototype.draw_arr = function(arr, arr_h, arr_w){
	return draw_rect(arr, arr_h, arr_w, this .pos.x, this.pos.y, this.width, this.height)
}


