// Game -> CartPole , ( Board --> Keyboard )

var board = new Board(document.querySelector('.board'), model)

function __init__(){

	var cp = new CartPole();
	var game = new Game(cp, board, model, {timeInt:100});
	game.setState("human");
	setTimeout(() => board.initVis(model), 50);

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
}

loadWeights("assets/bson/dqn.bson", document.querySelector('.board'), __init__, model);