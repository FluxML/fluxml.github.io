(function(obj){

Object.assign(obj, {Env})

function Env(s=9, repeat="KO"){
	this.s = s;
	this.repeat = repeat;
	this.env = new WGo.Game(s, repeat);	
	this.size = () => this.env.size;
	this.n_moves = () => this.env.stack.length - 1;
	this.moves = [];
	this.model = null;
	this.passes = [];
}

Env.prototype.turn = function(){
	return this.env.turn;
}

Env.prototype.state = function(){return getState(this.env)}

Env.prototype.config = function(){
	var capCount = {};
	capCount[WGo.W] = this.env.getCaptureCount(WGo.W);
	capCount[WGo.B] = this.env.getCaptureCount(WGo.B);
    return {state: this.state(), done: this.done(), turn: this.turn(), capCount, lastMove: this.moves.slice(-1)[0]}
}

Env.prototype.setModel = function (m){
	this.model = m;
}

Env.prototype.step = function(a){
	// console.log(a, "action")
	this.moves.push(a)
    if(a.type== "stone"){
        this.passes = [];
        this.env.play(a.x, a.y, a.k);
    }
    else if(a.type == "pass"){
        if(this.passes.indexOf(a.c) == -1)this.passes.push(a.c);
        this.env.pass(a.c);
    }

    this.model.play_move(a);
}

Env.prototype.next = function(stack, action){
	var n = this.new_env(stack)
	;
	n.play(action.x, action.y, action.c);
	return n;
}

Env.prototype.done = function(){
    return (this.passes.length >= 2);
}

Env.prototype.reset = function(){
    this.env.firstPosition();
    this.passes = [];
    this.model.__init__(this)
}

Env.prototype.stack = function(){
	return this.env.stack;
}

Env.prototype.getPosition = function(){
	return this.env.getPosition();
}

Env.prototype.new_env = function(stack){
	var n = new WGo.Game(this.s, this.repeat)
	n.stack = stack;
	return n;
}

Env.prototype.all_legal_moves = function(stack){
	var n = this.new_env(stack)
	var s = n.size;
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
	console.log(moves)
	return moves.length >= 2 && moves.slice(-2).reduce((acc,e) => acc && e == pass, true)

}

Env.prototype.find_score = function({capCount}={}){
	var score = capCount.black - capCount.white;
	return {black: score, white: -1 * score};
}

Env.prototype.lastMove = function(){
	return this.moves.slice(-1);
}

})(window);