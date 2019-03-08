// Game -> CartPole , ( Board --> Keyboard )

Game.prototype.play = async function(){
	clearTimeout(this.playTimeout);
	if(this.env.done())return;

	var scope = this;
	switch(this.state){
		case this.states.H:
			this.move(this.newAction);
			// newAction = 0; 
			break;
		case this.states.C:
			this.kick();
			var a = await this.predict(this.env.state())
			var action = await this.transform.action(a);
			this.move(action);
			tf.dispose(a);
			break;
		default:
			console.log("Invalid state", this.state);
	}
}

Game.prototype.kick = function(){
	this.env.step(this.newAction);
	this.kicked = this.newAction;
	this.newAction = this.defaultAction(); // we only kick once, not continously
}

Game.prototype.display = function(){
	var s = this.defaultAction()
	var kicked = s;
	var apm = -1;
	if(this.state == this.states.C){
		kicked = this.kicked;
		apm = 60*1000/this.timeInt;
	}
	this.kicked = s;

	this.out.render(Object.assign({}, this.env.config(), {kicked, apm}));
}


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
	game.setTimeInt(100);


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


