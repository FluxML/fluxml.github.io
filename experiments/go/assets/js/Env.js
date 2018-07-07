(function(obj){

Object.assign(obj, {Env})

function Env(size=9, repeat="KO"){
	this.size = size;
	this.repeat = repeat;
	this.env = new WGo.Game(size, repeat);
	console.log(this.env)

	this.turn = () => this.env.turn;
	this.size = () => this.env.size;
	this.n_moves = () => this.env.stack.length - 1;
	this.moves = [];

	this.callbacks = {};
}

Env.prototype.passes = [];

Env.prototype.state = function(){return getState(this.env)}

Env.prototype.config = function(){
    return {state: this.state(), done: this.done(), turn: this.turn()}
}

Env.prototype.setCallbacks = (cb) =>{
	this.callbacks = cb;
}

Env.prototype.step = function(a){
	this.moves.push(a)
    if(a.type== "stone"){
        this.passes = [];
        this.env.play(a.x, a.y, a.k);
    }
    else if(a.type == "pass"){
        if(this.passes.indexOf(a.c) == -1)this.passes.push(a.c);
        this.env.pass(a.c);
    }

    this.callbacks["step"](a);
}

Env.prototype.next = function(stack, action){
	var n = this.new_env(stack)
	n.play(action.x, action.y, action.c);
	return n;
}

Env.prototype.done = function(){
    return (this.passes.length >= 2);
}

Env.prototype.reset = function(){
    this.env.firstPosition();
    this.turn = 1;
    this.passes = [];
}

Env.prototype.stack = function(){
	return this.env.stack;
}

Env.prototype.new_env = function(stack){
	var n = new WGo.Game(this.size, this.repeat)
	n.stack = stack;
	return n;
}

Env.prototype.all_legal_moves = function(stack){
	var n = this.new_env(stack)
	var s = n.size();
	var legal = new Array(s * s + 1).fill(1)
	for(var x = 0; x< s; x++){
		for(var y = 0; y < s; y++){
			if(!n.isValid(x, y)) legal[x + s * y] = 0;
		}
	}
	return legal;
}

Env.prototype.check_if_done = function(moves){
	var pass = this.env.size() * this.env.size() + 1;
	return this.moves.slice(-2).reduce((acc,e) => acc && e == pass, true)

}

Env.prototype.find_score = function({capCount}={}){
	var score = capCount.black - capCount.white;
	return {black: score, white: -1 * score};
}

Env.prototype.lastMove = function(){
	return this.moves.slice(-1);
}

})(window);