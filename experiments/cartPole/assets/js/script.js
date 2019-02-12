// Game -> CartPole , ( Board --> Keyboard )

var board = new Board(document.querySelector('.board'))

function __init__(){

	var cp = new CartPole();
	var game = new Game(cp, board, (e) => tf.tidy(()=>model(e)));
	game.setState("human");

	var reset = () => {
		game.setState(game.state);
	}

	var eachEl = (p, e, cb) => 
		Array.from(p.querySelectorAll(e)).forEach(el=>
			el.addEventListener('click', (event) =>cb(el, event, p))
		)	


	eachEl(document.querySelector('.options'), '.option', (el, event, p) => {
		game.setState(el.getAttribute('data-state'));
		highlight(el, p);	
	})

	eachEl(document.querySelector('.levels'), 'div', (el, event, p) => {
		// console.log(parseInt(el.getAttribute('data-time')))
		game.timeInt = parseInt(el.getAttribute('data-time'));
		highlight(el, p);
	})
	// set level to easy
	game.timeInt = 100;


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


