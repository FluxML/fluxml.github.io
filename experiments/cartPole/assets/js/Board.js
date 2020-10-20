(function(obj){

	Object.assign(obj, {Board});

	// render board
	function Board(container, {
		cartColor="#333",
		poleColor="#fff"
	}={}){
		const template = (
			'<canvas id="playground" width="1000" height="200"></canvas>\
			<div class="overlay">\
				<div class="game-over hidden-screen"><p>Game Over</p></div>\
				<div class="stats">\
					<p class="score">Score: <span>0</span></p>\
					<p class="apm"></p>\
				</div>\
				<div class="keyboard"></div>\
			</div>'
		)
		container.innerHTML = template;

		this.container = container;
		this.cartColor = cartColor;
		this.poleColor = poleColor;
		this.keyboard = new Keyboard(container.querySelector('.keyboard'));
		this.canvas = container.querySelector('#playground');
		this.ctx = this.canvas.getContext('2d');
		this.overlay = container.querySelector('.overlay');
		this.score = this.overlay.querySelector('.score span');
		this.apm = this.overlay.querySelector('.apm');
		this.gameOverScreen = this.overlay.querySelector('.game-over');
	}


	Board.prototype.render = function({
			state,
			action,
			score,
			cart_height,
			cart_length,
			pole_length,
			pole_diameter,
			done,
			x_threshold,
			kicked,
			apm
		}){
			// console.log(kicked);
			({x, theta} = state);
			
			var scaleToPixelsX = this.canvas.width*0.5/(cart_length/2 + x_threshold);
			var scaleToPixelsY = this.canvas.height*0.5/(cart_height + pole_length);

			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			var cartX = (this.canvas.width/2 +  scaleToPixelsX*(x - cart_length/2));
			var cartY = this.canvas.height - scaleToPixelsY*cart_height;
			var rotateAngle = theta - Math.PI/2;

			// draw pole
			this.ctx.translate(cartX + scaleToPixelsX*cart_length/2, cartY + scaleToPixelsY*pole_diameter/2);
			this.ctx.fillStyle = this.poleColor;
			this.ctx.rotate(rotateAngle);
			this.ctx.scale(scaleToPixelsY, scaleToPixelsX); // needs to be (y, x) as this is rotated
			this.ctx.fillRect(-pole_diameter/2, -pole_diameter/2, pole_length, pole_diameter);
			this.ctx.scale(1/scaleToPixelsY, 1/scaleToPixelsX);
			this.ctx.rotate(-rotateAngle);
			this.ctx.translate(-(cartX + scaleToPixelsX*cart_length/2), -(cartY + scaleToPixelsY*pole_diameter/2));
			
			// draw cart
			this.ctx.fillStyle = this.cartColor;
			this.ctx.fillRect(cartX, cartY, scaleToPixelsX*cart_length, scaleToPixelsY*cart_height);

			var dir = (d) => d == 1? 'left': 'right';

			// highlight key
			if(action != 0){
				this.keyboard.highlight(dir(action));
			}
			if(kicked != 0){
				// console.log("draw")
				var img = new Image();
				img.src = "./assets/red__" + dir(kicked)+ "_arrow.png";
				var ctx = this.ctx;
				img.onload = function(){
					// this.ctx.drawImage(img, x, cartY - cart_height, cartY, cartY);
					// console.log()
					var v = kicked*2 - 3;
					var dy = cart_height*scaleToPixelsY;
					var ax = ctx.canvas.width/2 + scaleToPixelsX*(x - v*cart_length/2);
					var ay = ctx.canvas.height - dy;
					// console.log(v)
					if(v == 1){
						ax -= dy;
					}
					// console.log(dy, ax);
					ctx.drawImage(img, ax, ay, dy, dy);
				}
			}
			if(apm != -1){
				this.apm.innerText = "APM: " + apm;
			}else{
				this.apm.innerText = "";
			}

			// change score
			this.score.innerText = score;

			// game over screen
			if(done){
				this.gameOverScreen.className = this.gameOverScreen.className.replace("hidden-screen", "");
			}else{
				if(this.overlay.querySelector('.hidden-screen') == null){
					this.gameOverScreen.className += " hidden-screen";	
				}
			}
		}
})(window)