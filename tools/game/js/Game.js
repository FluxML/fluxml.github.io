/*****************

Game Controller
================

env : {
	done : () => { done ? (bool) }
	step : (action) => { go to next state }
	state : () => { return state }
	config : () => { rendering info }
	reset : () => { reset env }
}

out : {
	render : () { draw }
}

model : (input tf vector) => { output tf vector }

*****************/


// interact with env 
function Game(env, out, model, {
		state=0,
		mode="timer",  // mode: "async" | "timer"
		timeInt=20,
		callBacks={}, 
		transform={
			state: function(state){
				({ x, xvel , theta, thetavel } = state);
				return tf.tensor([x, xvel, theta, thetavel])
			},
			action: function(a){
				return a[0] > a[1]? 1 : 2;
			}
		}
	}={}){ 
	this.state = state;
	this.newAction = 0;
	this.gameOver = false;
	this.env = env;
	this.out = out;
	this.model = model;
	this.mode = mode;
	this.timeInt = timeInt;
	this.callBacks = callBacks;
	this.transform = transform;
	this.states = {
		H : 0,
		C : 1,
		"human": 0,
		"computer": 1
	};
	this.playTimeout = null;
}

Game.prototype.nextGameState = function(curr){
	return curr;
}

Game.prototype.gameOverHandler = function(){
	this.setState(this.state);
}

Game.prototype.isValidAction = function(action){
	return true;
}

Game.prototype.turn = function(string){
	return this.state == this.states[string];
}

Game.prototype.action = function(a){
	if(this.gameOver)
		return this.gameOverHandler();

	if(!this.isValidAction(a))return false;

	switch(this.state){
		case this.states.H:
			this.newAction = a;
			if(this.mode == "async")this.move(this.newAction);	// action initiates a move
			break;
		case this.states.C:
			break;
	}

	if(typeof(this.callBacks.action) == "function")return this.callBacks.action(a);
	return true;
}

Game.prototype.play = function(){
	clearTimeout(this.playTimeout);
	if(this.env.done())return;

	var scope = this;
	switch(this.state){
		case this.states.H:
			this.move(this.newAction);
			// newAction = 0; 
			break;
		case this.states.C:
			this.predict(this.env.state()).then((a)=>{
				var action = this.transform.action(a);
				this.move(action);
			})
			break;
		default:
			console.log("Invalid state", this.state);
	}
}

Game.prototype.next = function(){
	this.state = this.nextGameState(this.state)
	if(!this.env.done()){
		var play = this.play.bind(this);
		if(this.mode=="timer" || this.state == this.states.C)	// play initiates a move
			this.playTimeout = setTimeout(play, this.timeInt);
	}else{
		var scope = this;
		setTimeout(()=>{
			scope.gameOver = true;	// wait 400 ms before resetting
		}, 400)
	}
	
}

Game.prototype.display = function(){
	this.out.render(this.env.config());
}
Game.prototype.move = function(a){
	this.env.step(a);
	this.display();
	this.next();
}
Game.prototype.predict = function(state){
	var input = this.transform.state(state);
	var output = this.model(input);
	return output.data()
}
Game.prototype.reset = function(){
	this.env.reset();
	this.newAction = 0;
	this.gameOver = false;
	this.display();
}

Game.prototype.setState = function(newState){
	this.reset();
	if(typeof(newState) == "string")
		this.state = this.states[newState];
	else
		this.state = newState;
	this.play();
}