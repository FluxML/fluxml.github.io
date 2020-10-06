/******************************************************
=======================================================
Components
=======================================================
******************************************************/

function Brick(pos, active, {color="#0f0", width=50, height=10}={}){
	this.pos = pos;
	this.active = active;

	this.draw = (canvas)=>{
		var ctx = canvas.getContext('2d');
		if(this.active){
			ctx.fillStyle = color;
			ctx.fillRect(this.pos.x, this.pos.y, width, height);
			// ctx.strokeStyle="#fff";
			// ctx.strokeRect(this.pos.x, this.pos.y, width, height);
		}
	}

	this.detectCollision = (ball)=>{
		if(!this.active)return null

		if((ball.pos.x > this.pos.x && ball.pos.x < this.pos.x + width) 
		&& (ball.pos.y > this.pos.y && ball.pos.y < this.pos.y + height)){
			return this
		}

		return null
	}

	this.deactivate = ()=>{
		this.active = false;
	}

	this.activate = ()=>{
		this.active = true;	
	}
}

function BrickCollection(layers, {width, brick_width, height, brick_height, padding, colors}){
	var max_blocks = Math.floor(width/brick_width);
	
	this.contents =  (new Array(layers*max_blocks)).fill(0).map((_, i)=> {
		var color = colors[Math.floor(i/max_blocks)];
		var x = Math.floor((i% max_blocks)*brick_width);
		var y = Math.floor(i/max_blocks)*brick_height + padding;
		
		return new Brick( 
			new Vector(x, y),
			true, {width: brick_width, height: brick_height, color})
	});

	this.draw = (canvas)=> { this.contents.forEach(e=>e.draw(canvas)); };

	this.detectCollision = (ball)=>{
		if( ball.pos.y - ball.radius > layers*height + padding) return null;

		for (var brick of this.contents){
			if(brick.detectCollision(ball))
				return brick;
		}

		return null;
	}

	this.allHit = ()=>{
		for (var brick of this.contents){
			if(brick.active)return false;
		}
		return true;
	}

	this.activateAll = ()=>{
		this.contents.forEach(brick => brick.activate())
	}
}
