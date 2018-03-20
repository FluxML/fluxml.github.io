(function(obj){

	Object.assign(obj, {Game})

	// interact with env
	function Game(cartPole){
		var state = "";
		var newAction = 0;

		this.setState = function(newState){
			cartPole.reset();
			cartPole.display();
			state = newState;
			if(state == "computer"){
				cartPole.start();
			}else if(state == "human"){
				newAction = 0;
				this.play();
			}
		}

		this.action = function(a){
			if(state == "human"){
				newAction = a;
			}else if(state == "computer"){
				cartPole.step(a);	// apply a jolt
				cartPole.display();	
			}
		}

		this.play = function(){

			if(state != "human")return;

			cartPole.step(newAction);
			cartPole.display();
			newAction = 0;

			if(!cartPole.done()){
				var play = this.play.bind(this);
				setTimeout(play, 100);
			}
		}

	}
})(window);