// Game -> CartPole , ( Board --> Keyboard )

var board = new Board(document.querySelector('.board'))

function __init__(){

	var cp = new CartPole();
	var game = new Game(cp, board, model);
	game.setState("human");

	var options = document.querySelector('.options');
	Array.from(options.querySelectorAll('.option')).forEach(el=>{
		el.addEventListener('click', function(event){
			game.setState(el.getAttribute('data-state'));
			highlight(el, options);		
		})
	})

	// event listeners for keyboard
	document.addEventListener('keydown', function(event){
		if(event.keyCode == 39){ // right
			game.action(2);
		}else if(event.keyCode == 37){ // left
			game.action(1);
		}
	})
	var keyboard = document.querySelector('.keyboard')
	keyboard.querySelector('.left').addEventListener('click', function(){
		game.action(1);
	})
	keyboard.querySelector('.right').addEventListener('click', function(){
		game.action(2);
	})

	createVis(document.querySelector(".vis"))
}

loadWeights("assets/bson/dqn.bson", document.querySelector('.board'), __init__, model);

function createVis(container){
	var x_max = 24, y_max = 24;
	var to_x = (i) => (i - 24)/10;
	var to_theta = (i) => (i - 24) * Math.PI /360;
	var canvas = document.createElement('canvas');
	var w = 2*x_max + 1, h = 2*y_max + 1;
	var x_vel = 0.5;
	var theta_vel = 0.5;
	var atlas = (new Array(h).fill(0).map((e, i)=>{
		return Promise.all(new Array(w).fill(0).map((ee, ii)=>{
			return model(tf.tensor([to_x(ii), x_vel, to_theta(i), theta_vel])).data();
		}))
	}));
	atlas = Promise.all(atlas);

}