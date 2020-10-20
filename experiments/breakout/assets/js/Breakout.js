/******************************************************
=======================================================
Breakout Game
=======================================================
******************************************************/
function Breakout(canvas,{width=500, height=400, brick_height=20, brick_width=50, paddle_width=50, paddle_height=10, ball_radius=5}={}){
	var score = 0;
	canvas.width = width;
	canvas.height = height;
	var components = {
		paddle: new Paddle(new Vector(Math.floor(width/2), canvas.height - paddle_height), {
			width:paddle_width,
			height:paddle_height,
			total_width: width
		}),
		bricks: new BrickCollection(6, {width, brick_width, height, brick_height, padding: 40, colors: ["#c84848", "#c66c3a", "#b47a30", "#a2a22a", "#48a048","#4248c8"]}),
		ball: new Ball(new Vector(Math.floor(width/2), Math.floor(height/2)), new Vector(-5, -5), {radius:ball_radius})
	}

	this.draw = ()=>{
		var ctx = canvas.getContext('2d');
		//background
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		for( var c in components){
			components[c].draw(canvas);
		}
		ctx.font = '18px arial';
		ctx.fillStyle = "#fff";
		ctx.textAlign = "right";
		ctx.textBaseline = "top"
		ctx.fillText('Score: '+ score, canvas.width - 10, 10);
	}


	this.play = ()=>{
		this.step();
		if(!this.done())
			requestAnimationFrame(this.play);
	}

	this.step = (dir)=>{
		components.ball.move();
		
		this.action(dir);
		this.movePaddle();
		
		var reward = this.collisionDetector();
		score += reward;
		this.draw();
		return reward;
	}

	this.collisionDetector = function(){
		var ball = components.ball;
		var brickHit = components.bricks.detectCollision(ball); // collision with bricks
		var reward = 0;
		if(brickHit){
			
			brickHit.deactivate();
			reward = 10;
			ball.rebound([1, -1]);
		}
		var paddleHit = components.paddle.detectCollision(ball); // collision with paddle
		if(paddleHit){
			ball.rebound([1, -1]);
		}
		var wallHit = components.ball.detectCollision(width, height); // collision with walls
		wallHit.forEach(w=> ball.rebound(w));
		return reward;
	}

	this.done = function(){
		return components.bricks.allHit() || components.ball.pos.y > height;
	}

	this.movePaddle = ()=> components.paddle.move();

	this.action = (dir)=>{
		components.paddle.setDirection(dir);
	}

	this.reset = function(){
		components.ball.pos = new Vector(Math.floor(width/2), Math.floor(height/2));
		components.ball.speed = new Vector(-5, -5); 
		components.bricks.activateAll();
		score = 0;
	}


	this.render = this.draw;
	this.config = ()=>{return null};
}