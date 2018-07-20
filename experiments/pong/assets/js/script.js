var __init__ = (function(){
	var factor = 6, width = 80, height = 80;
	var env = new Pong(document.querySelector("#playground"), {
		width: width*factor, 
		height: height*factor,
		paddle_height: 8*factor,
		paddle_width: 2*factor,
		ball_height: 2*factor,
		ball_width: factor,
		paddle_speed: 2*factor
	});	
	var board = new Board(document.querySelector(".board"), {env});
	var model_ = new Model(model);
	
	var human = {
		dir: 0,
		action: function(){
			var x = this;
			return {id: 0, dir: x.dir}
		},
		reset: function(){
			this.dir = 0;
		}
	}

	var game = new MultiPlayer(human, model_,env, board);

	document.addEventListener('keydown', event => {

		var code = event.keyCode;
		
		if(code == 13){
			board.removeStartScreen();
			return game.start();
		}

		if(code == 38 || code == 40){
			event.preventDefault();
			human.dir = code - 39;
			return;
		}
	})

	document.addEventListener('keyup', event => {
		var code = event.keyCode;
		
		if(code == 38 || code == 40){
			human.dir = 0;
			return;
		}
	})

	env.draw();
})

flux.fetchWeights("./assets/bson/model.bson").then((function (ws) {
  model.weights = ws;
  __init__();
}));
