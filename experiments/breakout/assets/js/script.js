var __init__ = (function(){

	var env = new Breakout(document.querySelector("#playground"));	
	var board = new Board(document.querySelector(".board"), {env});
	var game = new Game(env, board, null);

	document.addEventListener('keydown', event => {
		var code = event.keyCode;

		if(code == 13){
			// remove startScreen
			board.removeStartScreen();
			return game.play();
		}

		if(code != 39 && code != 37)return;
		
		game.action(code - 38);
	})

	document.addEventListener('keyup', event => {
		game.action(0);
	})
	env.draw();
})

__init__();