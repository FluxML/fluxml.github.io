/******************************************************
=======================================================
Pong Game
=======================================================
******************************************************/

function Pong(playground,{width=500, height=400, paddle_width=10, paddle_height=50, paddle_speed=10, ball_width=1, ball_height=2, paddle_margin=8}={}){
	var score = 0;
	this.history = [];

	var screen = document.createElement('canvas');
	var background = document.createElement('canvas');

	var x = [background, screen]

	x.forEach(e =>{
		e.width = width;
		e.style.width = width + "px";
		e.height = height;
		e.style.height = height + "px";
		playground.appendChild(e)
	})

	var components = {
		paddles: new PaddleCollection(
			[
				new Vector(paddle_margin - 1, Math.floor(height/2) - 1, 0),
				new Vector(width-paddle_width - paddle_margin - 1, Math.floor(height/2) - 1, 1)
			], {
			width:paddle_width,
			height:paddle_height,
			total_height: height,
			speed: paddle_speed,
			color: "#fff"
		}),
		ball: new HyperBall(new Vector((Math.floor(width/2) - 1), (Math.floor(height/2) - 1)), new Vector(-5, -1), {width:ball_width, height: ball_height, color: "#fff"})
	}

	var paddleController = new PaddleController(components.paddles.collection[0]);
	this.components = components

	this.draw = ()=>{
		var ctx = background.getContext('2d');
		//background
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, background.width, background.height);

		ctx.strokeStyle = "#fff";
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.setLineDash([10, 15]);
		ctx.moveTo(width/2, 0);
		ctx.lineTo(width/2, height);
		ctx.stroke();

		screen.getContext('2d').clearRect(0, 0, screen.width, screen.height)
		for( var c in components){
			components[c].draw(screen);
		}

		ctx.fillStyle = "#fff";
		ctx.font = "48px sans-serif"
		ctx.textBaseline = "top";
		ctx.textAlign = "right";
		ctx.fillText(components.paddles.collection[0].score, width/2 - 20, 20);
		ctx.textAlign = "left";
		ctx.fillText(components.paddles.collection[1].score, width/2 + 20, 20);
	}


	this.play = ()=>{
		score += this.step();
		if(!this.done())
			requestAnimationFrame(this.play);
	}

	this.step_both = function(arr){
		components.ball.move();

		this.action(arr[0].id, arr[0].dir);
		this.action(arr[1].id, arr[1].dir);
		this.movePaddles();

		this.collisionDetector();
		// this.save(dir)

		if(components.ball.pos.x < 0) {
			components.paddles.incScore(1);
			return 1;
		}
		if(components.ball.pos.x > width){
			components.paddles.incScore(0);
			return -1;
		}
		return 0;
	}

	this.step = ({id, dir})=>{
		components.ball.move();

		this.action(id, dir);
		this.movePaddles();

		this.collisionDetector();
		this.save(dir)

		if(components.ball.pos.x < 0) {
			components.paddles.incScore(1);
			return 1;
		}
		if(components.ball.pos.x > width){
			components.paddles.incScore(0);
			return -1;
		}
		return 0;
	}

	this.save = function(dir){
		this.history.push([components.ball.pos.x, components.ball.pos.y,
			 components.paddles.collection[0].pos.y,
			 components.paddles.collection[1].pos.y, 
			 dir]);

		if(this.history.length == 4)debugger;
	}

	this.collisionDetector = function(){
		var ball = components.ball;

		var paddleHit = components.paddles.detectCollision(ball); // collision with paddle
		if(paddleHit){
			paddleHit.rebound(ball);
		}
		var wallHit = components.ball.detectCollision(width, height); // collision with walls
		wallHit.forEach(w=> ball.rebound(w));
	}

	this.done = function(){
		var cond = components.ball.pos.x < 0 || components.ball.pos.x > width;
		return cond;
	}

	this.movePaddles = () => components.paddles.move();

	this.action = (id, dir) => {
		components.paddles.setDirection(id, dir);
	}

	this.reset = () => {
		components.ball.pos.x = Math.floor(width/2) - 1;
		components.ball.pos.y = Math.floor(height/2) - 1;
		var k = -1 * Math.sign(components.ball.speed.x);
		components.ball.speed.x = k*5;
		components.ball.speed.y = -1 * k;

	}

	this.render = this.draw;
	this.config = ()=>{
		var arr = this.draw_arr(_2dArr(480, 480), 480, 480)
		var rarr = skip(arr, 6, 80, 80);
		return {screen: flatten(rarr, 80, 80), ball: components.ball};
	};

	this.draw_arr = function(arr, arr_h, arr_w){
		for(var i in components){
			arr = components[i].draw_arr(arr, arr_h, arr_w)
		}
		return arr
	}
}

function _2dArr(w, h, v=0){
	var arr = []
	for(var i = 0; i< w; i++){
		var row = []
		for(var j = 0; j< h; j++){
			row.push(v);
		}
		arr.push(row)
	}
	return arr;
}


function skip(arr, n, w, h){
	var r = _2dArr(w, h)
	var a = 0;
	var b = 0;
	for(var i =0; i< arr.length; i+=n){
		b = 0;
		for(var j =0; j< arr[i].length; j+=n){
			r[a][b] = arr[i][j];
			b++;
		}
		a++;
	}
	return r;
}


function flatten(arr){
	return arr.reduce((acc, e) => acc.concat(e), [])
}

function s_flatten(arr, w, h){

	var g = []
	for(var i = 0; i< h; i++){
		var d = []
		for(var j=0; j< w; j++){
			d.push(arr[j][i])
		}
		g.push(d)
	}
	return flatten(g)
}

function leftpad(arr, p, w, h){
	var c = _2dArr(w, h, v=0)
	for(var i = 0; i< w; i++){
		for(var j = 0; j< h - p; j++){
			c[i][j + p] = arr[i][j]
		}
	}
	return c;
}