(function(obj){

	Object.assign(obj, {Board, draw});

	// render board
	function Board(container, model, {
		cartColor="#333",
		poleColor="#fff"
	}={}){
		const template = (
			'<canvas id="playground" width="1000" height="200"></canvas>\
			<div class="overlay">\
				<div class="game-over hidden-screen"><p>Game Over</p></div>\
				<div class="score">\
					<p>Score: <span>0</span></p>\
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
		this.gameOverScreen = this.overlay.querySelector('.game-over');
		this.lastState = null;

		var x= this;
		this.showVis = false;
		this.initVis = function(model){
			x.showVis = true;
			var c = document.querySelector(".vis");
			var speed = document.createElement('div');
			speed.className = "speed"
			c.appendChild(speed);
			x.vis = new Vis(c, model)
			x.x_gauge = new Gauge(speed, function(val){
				x.vis.x_vel = val;
				x.vis.draw_()
			}, 5);
			x.theta_gauge = new Gauge(speed, function(val){
				x.vis.theta_vel = val;
				x.vis.draw_();
			}, 5, "rad/s", "Angular velocity");
		}
		
	}


	Board.prototype.render = function({
			state,
			action,
			score,
			done
		}){
			var same = this.lastState && 
				Object.keys(this.lastState).reduce((acc,e) =>
					acc && state[e] == this.lastState[e]
				, true)
				
			if(same)return;
			var copy = (obj)=> JSON.parse(JSON.stringify({obj})).obj
			this.lastState = copy(state);
			draw(this.canvas, state, this.poleColor, this.cartColor);
			var {x, theta, xvel, thetavel} = state;

			if(this.showVis){
				this.x_gauge.setValue(xvel);
				this.theta_gauge.setValue(thetavel);
				var ii = this.vis.to_ii(x), i = this.vis.to_i(theta);
				this.vis.select(i, ii);
			}
			// highlight key
			if(action != 0){
				this.keyboard.highlight(action==1? 'left': 'right');
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

	function draw(canvas, state, poleColor, cartColor){
		var ctx = canvas.getContext('2d');
		({x, theta} = state);
			
		var scaleToPixelsX = canvas.width*0.5/(cart_length/2 + x_threshold);
		var scaleToPixelsY = canvas.height*0.5/(cart_height + pole_length);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var cartX = (canvas.width/2 +  scaleToPixelsX*(x - cart_length/2));
		var cartY = canvas.height - scaleToPixelsY*cart_height;
		var rotateAngle = theta - Math.PI/2;

		// draw pole
		ctx.translate(cartX + scaleToPixelsX*cart_length/2, cartY + scaleToPixelsY*pole_diameter/2);
		ctx.fillStyle = poleColor;
		ctx.rotate(rotateAngle);
		ctx.scale(scaleToPixelsY, scaleToPixelsX); // needs to be (y, x) as this is rotated
		ctx.fillRect(-pole_diameter/2, -pole_diameter/2, pole_length, pole_diameter);
		ctx.scale(1/scaleToPixelsY, 1/scaleToPixelsX);
		ctx.rotate(-rotateAngle);
		ctx.translate(-(cartX + scaleToPixelsX*cart_length/2), -(cartY + scaleToPixelsY*pole_diameter/2));
		
		// draw cart
		ctx.fillStyle = cartColor;
		ctx.fillRect(cartX, cartY, scaleToPixelsX*cart_length, scaleToPixelsY*cart_height);
	}


	function Vis(container, model){
		var x_max = 24, y_max = 24;
		var dx = 4, dy = 4;
		var bx = 2, by = 2;
		
		var m = (x) => tf.tidy(()=>model(x))
		var to_x = (i) => (i - x_max)/10;
		var to_theta = (i) => (i - y_max) * Math.PI /180;
		var join = (e) => e.reduce((acc, e)=> acc.concat(e), []);
		var to_opacity = (x) => Math.abs(x)*255;
		var colors = [[240, 50, 100], [65, 130, 42]]
		
		var cp = new CartPole();

		var w = 2*x_max + 1, h = 2*y_max + 1;
		var ww = (dx + bx), hh = (dy + by);
		var len = h*hh*w*ww*4;
		var scope = this;
		var atlas = (new Array(h).fill(0).map((_, i)=>{
			return new Array(w).fill(0).map((__, ii)=>{
				return [to_x(ii), 0, to_theta(i), 0]
			});
		}));
		var o = new Array(len).fill(255);

		this.x_vel = 0;
		this.theta_vel = 0;
		this.selected = null;
		this.selector = document.createElement('div');
		this.selector.className = "sele"
		this.res = null;
		container.appendChild(this.selector);
		
		var grid = document.createElement('canvas');
		grid.width = w*ww;
		grid.height = h*hh;
		grid.className = "explore grid";
		container.appendChild(grid);

		var screen = document.createElement('canvas');
		screen.width = 300;
		screen.height = 150;
		screen.className="explore screen";
		container.appendChild(screen);

		this.to_ii = (x) => x*10 + x_max;
		this.to_i = (t) => y_max + t*180/Math.PI;

		this.select = function(i, ii){
			if(this.selected && this.selected[0] == i && this.selected[1] == ii)
				return;
			this.selected = [i, ii];
			var p = grid.getBoundingClientRect();
			var q = container.getBoundingClientRect();
			var top = p.y - q.y;
			var left = p.x - q.x;
			this.selector.style.top = top + i*hh + "px";
			this.selector.style.left = left + ii*ww  + "px";
			this.selector.style.width= ww + "px";
			this.selector.style.height= hh + "px";
			draw(screen, {x:to_x(ii), theta: to_theta(i)}, "#f00", "#000");
		}

		grid.addEventListener('mousemove', function(event){
			var x = event.offsetX, y = event.offsetY;
			var i = Math.floor(y / hh), ii = Math.floor(x / ww);
			scope.select(i, ii);
		})

		this.draw_ = async function(){
			var x_vel= this.x_vel, theta_vel=this.theta_vel;
			for(var i = 0; i< h; i++){
				for(var ii = 0; ii< w; ii++){
					atlas[i][ii][1] = x_vel;
					atlas[i][ii][3] = theta_vel;
				}
			}
			var out = m(tf.tensor(join(atlas)));
			var res = await out.data();
			this.res = res;
			o.fill(255);
			
			for(var i = 0; i< h; i++){
				for(var j = 0; j< w; j++){
					var t = [res[i*2*w + 2*j], res[i*2*w + 2*j + 1]];
					var a = Math.abs(t[1])+Math.abs(t[0]);
					var b = t[1] > t[0] ? 1 : 0;
					var c = t[b]/a;
					var d = [...colors[b], to_opacity(c)]
					for(var ii = 0; ii< dx ; ii++){
						for(var jj =0; jj< dy; jj++){
							var g = (i*hh + Math.floor(by/2) + ii)*(w*ww*4) + (j*ww + Math.floor(bx/2) + jj)*4;
							o[g] = d[0];
							o[g + 1] = d[1];
							o[g + 2] = d[2];
							o[g + 3] = d[3];
						}
					}
				}
			}
			var a = new Uint8ClampedArray(o);
			var imgdata = new ImageData(a, ww*w, hh*h);	

			grid.getContext('2d').putImageData(imgdata, 0, 0);		
		}

		this.draw_();
	}

	function Gauge(container, onchange, max=1, units="m/s", name_="Linear velocity"){
		var gauge = document.createElement('div')
		gauge.className = "gauge";
		var scale = document.createElement('div');
		scale.className = "scale";
		var pointer = document.createElement('div');
		pointer.className = "pointer";
		var reading = document.createElement('div');
		reading.className = "reading";
		reading.innerText = "0.00" + units;
		var name = document.createElement('div');
		name.className = "name";
		name.innerText = name_;
		this.value = 0.0;
		this.onchange = onchange;
		var q = this;

		gauge.appendChild(scale);
		gauge.appendChild(pointer);
		gauge.appendChild(reading);
		gauge.appendChild(name);

		container.appendChild(gauge);

		scale.addEventListener('click', function(event){
			var {height, width} = this.getBoundingClientRect();
			var x = event.offsetX, y = event.offsetY;
			var w = width/2, h = height/2;
			if(h < y)return;
			var f = (x - w)/(h - y);
			var g = Math.floor(Math.atan(f)*180/Math.PI);
			var fraction = g/90;
			q.setValue(max*fraction);
		})

		this.setValue = function(value){
			if(value == undefined || (q.value == value))return;
			q.value = value;
			reading.innerText = Math.round(q.value*1000)/1000 + units;

			var fraction = value/max;
			if(fraction > 1)fraction = 1;
			else if (fraction < -1) fraction = -1
			var g = fraction*90;
			pointer.style.transform = "rotate(" + g +"deg)";
			q.onchange(q.value);
		}
	}
})(window)