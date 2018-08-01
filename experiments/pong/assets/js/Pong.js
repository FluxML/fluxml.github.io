/******************************************************
=======================================================
Pong Game
=======================================================
******************************************************/

function Pong(playground,{width=500, height=400, paddle_width=10, paddle_height=50, paddle_speed=10, ball_width=1, ball_height=2, paddle_margin=8}={}){
	var score = 0;

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
				new Vector(paddle_margin, Math.floor(height/2)),
				new Vector(width-paddle_width - paddle_margin, Math.floor(height/2))
			], {
			width:paddle_width,
			height:paddle_height,
			total_height: height,
			speed: paddle_speed,
			color: "#fff"
		}),
		ball: new HyperBall(new Vector(Math.floor(width/2), Math.floor(height/2)), new Vector(-5, -1), {width:ball_width, height: ball_height, color: "#fff"})
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

	this.step = ({id, dir})=>{
		components.ball.move();

		this.action(id, dir);
		this.movePaddles();

		this.collisionDetector();

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
		// console.log(id, dir)
		components.paddles.setDirection(id, dir);
	}

	this.reset = () => {
		components.ball.pos.x = Math.floor(width/2);
		components.ball.pos.y = Math.floor(height/2);
		var k = Math.sign(components.ball.speed.x);
		components.ball.speed.x = k*6;
		components.ball.speed.y = -1 * k;
	}

	this.render = this.draw;
	this.config = ()=>{
		var n = 80;
		var hidden = document.createElement('canvas');
		hidden.width = n;
		hidden.height = n;
		hidden.getContext('2d').drawImage(screen, 0, 0, hidden.width, hidden.height);
		var imgData = hidden.getContext('2d').getImageData(0, 0, hidden.width, hidden.height);
		var d = [];
		for(var i = 0; i< n*n; i++){
			d.push(imgData.data[i*4 + 3] == 255 ? 1 : 0);
		}

		// var f = d.slice()
		// var g = [];
		// while(f.length > 0){
		// 	g.push(f.splice(0, 80))
		// }
		// console.log(g.map(row => row.join(" ")).join("\n"))


		return {screen: d, ball: components.ball};
	};
}
