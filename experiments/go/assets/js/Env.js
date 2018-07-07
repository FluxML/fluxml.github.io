(function(obj){

Object.assign(obj, {Env})

function Env(size=9, repeat="KO"){
	this.size = size;
	this.repeat = repeat;
	this.env = new WGo.Game(size, repeat);

	
	this.size = () => this.env.size;
	this.n_moves = () => this.env.stack.length - 1;
	this.moves = [];

	this.model = null;
}

Env.prototype.passes = [];

Env.prototype.turn = function(){
	return this.env.turn;
}

Env.prototype.state = function(){return getState(this.env)}

Env.prototype.config = function(){

    return {state: this.state(), done: this.done(), turn: this.turn()}
}

Env.prototype.setModel = function (m){
	this.model = m;
}

Env.prototype.step = function(a){
	console.log(a, "action")
	this.moves.push(a)
    if(a.type== "stone"){
        this.passes = [];
        console.log(this.turn(), "eeeeeeee....")
        this.env.play(a.x, a.y, a.k);
        console.log(this.turn(), "e....")
    }
    else if(a.type == "pass"){
        if(this.passes.indexOf(a.c) == -1)this.passes.push(a.c);
        this.env.pass(a.c);
    }

    this.model.play_move(a);
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
	console.log(this.env.stack[0])
    this.env.firstPosition();
    console.log(this.env.stack[0])
    this.passes = [];
    this.model.__init__(this)
    console.log(this.env.stack[0])
}

Env.prototype.stack = function(){
	console.log(this.env.stack[0])
	return this.env.stack;
}

Env.prototype.getPosition = function(){
	return this.env.getPosition();
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