(function(){

var factor = 6, width = 80, height = 80;

if(window.outerWidth < factor * width){
	factor = Math.floor(window.outerWidth/width) - 1;
}

$$("#game").style.width = factor * width + "px";
$$("#playground").style.minHeight = factor * height + "px";
$$(".board").style.minHeight = factor * height + "px";

var __init__ = (function(){
	model = wrap(model);

	var config = {
		width: width*factor,
		height: height*factor,
		paddle_height: 8*factor,
		paddle_width: 2*factor,
		ball_height: 2*factor,
		ball_width: factor,
		paddle_speed: 2*factor,
		paddle_margin: 8*factor
	}
	var env = new Pong(document.querySelector("#playground"), config);
	var board = new Board(document.querySelector(".board"), {env});
	var models = [new Model(model, 0), new Model(model, 1)];

	window.env = env
	window.model = models[1]

	var human = {
		dir: 0,
		action: async function(){
			var x = this;
			return {id: 0, dir: x.dir}
		},
		reset: function(){
			this.dir = 0;
		}
	}

	var opponent = {
		controller: new PaddleController(env.components.paddles.collection[0]),
		action: async function({ball}={}){
			var dir = this.controller.next(ball);
			return {id: 0, dir}
		},
		reset: ()=>{}
	}

	var players = {
		"human": [human, models[1]],
		"computer": models,
		"test": [opponent, models[1]]
	}

	var game = new MultiPlayer(players["human"],env, board);
	window.game = game;

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

	// var button = document.createElement("button");
	// button.setAttribute("data-state", "test")
	// button.className = "test"
	// button.innerText = "Test Model"
	// $$(".options").appendChild(button)

	// controls
	Array.from($$(".options").children).forEach((el, i) => {
		var mode = el.getAttribute("data-state");
		el.addEventListener('click', event => {
			game.setPlayers(players[mode])
			highlight($$("." + (mode=="computer"?"comp": mode)), $$(".options"))
		})
	})

	models[1].action(env.config())
})

loadWeights("./assets/bson/model.bson", document.querySelector('.board'), __init__, model);


function wrap(m){
	return x => tf.tidy(() => m(x))
}

})();


