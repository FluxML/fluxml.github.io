(function(){

	var env = new Pong(document.querySelector("#playground"));	
	var game = new Game(env, null);

	document.addEventListener('keydown', event => {
		var code = event.keyCode;
		if(code == 38 || code == 40){
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