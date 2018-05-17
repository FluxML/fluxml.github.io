function Game(env, model){
	var state = "human";
	var gameOver = true;

	this.setState = function(newState){
		this.reset();
		this.play();
	}


	this.action = function(a){

		switch(state){
			case "human":
				env.action(1, a);
				break;
		}
		
		if(gameOver){
			this.setState(state);
			return;
		}

		
	}

	this.play = function(){
		if(env.done())return;

		switch(state){
			case "human":
				this.move();

				if(!env.done()){
					var play = this.play.bind(this);
					setTimeout(play, 20);
				}else{
					setTimeout(()=>{
						gameOver = true;
					}, 400)
				}
				break;
			case "computer":
				this.predict(env.state()).then((a)=>{
					action = a[0] > a[1]? -1 : 1;
					this.move(action);
					
					if(!env.done()){
						var play = this.play.bind(this);
						setTimeout(play, 20);
					}else{
						setTimeout(()=>{
							gameOver = true;
						}, 400)
					}
				})
				break;
			default:
				console.log("Invalid state", state);
		}
	}

	this.move = function(){
		env.step();
	}
	
	this.predict = function(state, callback=console.log){
		var input = tf.tensor(state);
		var output = model(input);
		return output.data()
	}

	this.reset = function(){
		env.reset();
		gameOver = false;
	}


}