(function(obj){

	Object.assign(obj, {Game})

	// interact with env
	function Game(env, out, model){
		var state = "";
		var newAction = 0;
		var gameOver = false;

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
				case "computer":
					this.move(a);	// apply a jolt
					this.display();	
					break;
			}
		}

		this.play = function(){
			if(env.done())return;

			switch(state){
				case "human":
					this.move(newAction);
					this.display();
					// newAction = 0; 

					if(!env.done()){
						var play = this.play.bind(this);
						setTimeout(play, 20);
					}else{
						setTimeout(()=>{
							gameOver = true;	// wait 400 ms before resetting
						}, 400)
					}
					break;
				case "computer":
					this.predict(env.state(), (a)=>{
						action = a[0] > a[1]? 1 : 2;
						this.move(action);
						this.display();
						
						if(!env.done()){
							var play = this.play.bind(this);
							setTimeout(play, 20)
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

		this.display = function(){
			out.render(env.config());
		}
		this.move = function(a){
			env.step(a);
		}
		this.predict = function(state, callback=console.log){
			({ x, xvel , theta, thetavel } = state);
			var output = model(tf.tensor([x, xvel, theta, thetavel]));
			output.data().then(callback)
		}
		this.reset = function(){
			env.reset();
			newAction = 0;
			gameOver = false;
			this.display();
		}
	}
})(window);