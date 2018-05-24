(function(){

	var env = new Pong(document.querySelector("#playground"));	
	var board = new Board(document.querySelector(".board"), {env});
	var game = new Game(env, board, null);

	document.addEventListener('keydown', event => {

		var code = event.keyCode;
		
		if(code == 13){
			board.removeStartScreen();
			return game.play();
		}

		if(code == 38 || code == 40){
			event.preventDefault();
			game.action(code - 39);
			return;
		}
	})

	document.addEventListener('keyup', event => {
		var code = event.keyCode;
		
		if(code == 38 || code == 40){
			game.action(0);
			return;
		}
	})

	env.draw();
})()