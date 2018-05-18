/******************************************************
=======================================================
Pong Game
=======================================================
******************************************************/
function Pong(canvas,{width=500, height=400, paddle_width=10, paddle_height=50, ball_radius=5}={}){
	var score = 0;
	canvas.width = width;
	canvas.height = height;
	var components = {
		
		paddles: new PaddleCollection(
			[
				new Vector(0, Math.floor(height/2)),
				new Vector(width-paddle_width, Math.floor(height/2))
			], {
			width:paddle_width,
			height:paddle_height,
			total_height: height,
			color: "#fff"
		}),
		ball: new Ball(new Vector(Math.floor(width/2), Math.floor(height/2)), new Vector(5, 0), {radius:ball_radius, color: "#fff"})
	}

	var paddleController = new PaddleController(components.paddles.collection[0]);

	this.draw = ()=>{
		var ctx = canvas.getContext('2d');
		//background
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.strokeStyle = "#fff";
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.setLineDash([10, 15]);
		ctx.moveTo(width/2, 0);
		ctx.lineTo(width/2, height);
		ctx.stroke();

		for( var c in components){
			components[c].draw(canvas);
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

	this.step = (dir)=>{
		components.ball.move();
		
		this.action(1, dir);
		paddleController.next(components.ball);
		this.movePaddles();
		
		this.collisionDetector();
		this.draw();
		
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

	this.movePaddles = ()=> components.paddles.move();

	this.action = (id, dir)=>{
		console.log(id, dir)
		components.paddles.setDirection(id, dir);	
	}

	this.reset = () => {
		components.ball.pos.x = Math.floor(width/2);
		components.ball.pos.y = Math.floor(height/2);
		components.ball.speed.x = Math.sign(components.ball.speed.x)*5;
		components.ball.speed.y = 0;
	}

	this.render = this.draw;
	this.config = ()=>{return null};
}