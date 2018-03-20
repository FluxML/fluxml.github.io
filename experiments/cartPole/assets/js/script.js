// Game -> CartPole -> Board --> Keyboard

var board = new Board(document.querySelector('.board'))

function __init__(){
	var cp = new CartPole(board.render.bind(board), model);
	cp.display();

	var game = new Game(cp);
	game.setState("human");

	var options = document.querySelector('.options');
	Array.from(options.querySelectorAll('.option')).forEach(el=>{
		el.addEventListener('click', function(event){
			game.setState(el.getAttribute('data-state'));

			var old = options.querySelector('.selected');
			if( old != el){
				if(old)
					old.className = old.className.replace("selected", "");
				el.className += " selected";
			}
			
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



