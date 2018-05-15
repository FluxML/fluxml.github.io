function Game(env, model){
	var state = "human";
	var gameOver = true;
	var newAction = 0;

	this.setState = function(newState){
		this.reset();
		state = newState;
		this.play();
	}


	this.action = function(a){
		if(gameOver){
			this.setState(state);
			return;
		}

		switch(state){
			case "human":
				newAction = a;
				break;
		}
	}

	this.play = function(){
		if(env.done())return;

		switch(state){
			case "human":
				this.move(newAction);

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
					action = a[0] > a[1]? 1 : 2;
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

	this.move = function(a){
		env.action(a);
		env.step();
	}
	this.predict = function(state, callback=console.log){
		var input = tf.tensor(state);
		var output = model(input);
		return output.data()
	}

	this.reset = function(){
		env.reset();
		newAction = 0;
		gameOver = false;
	}


}