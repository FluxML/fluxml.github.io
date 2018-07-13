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
        this.env.play(a.x, a.y, a.c);
    }
    else if(a.type == "pass"){
        if(this.passes.indexOf(a.c) == -1)this.passes.push(a.c);
        this.env.pass(a.c);
    }

    this.model.play_move(a);
}

Env.prototype.next = function(stack, a){
	var n = this.new_env(stack);
	if(a.type== "stone"){
        n.play(a.x, a.y, a.c);
    }
    else if(a.type == "pass"){
        n.pass(a.c);
    }
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
	return this.env.stack.slice();
}

Env.prototype.getPosition = function(){
	return this.env.getPosition();
}

Env.prototype.new_env = function(stack){
	var n = new WGo.Game(this.s, this.repeat)
	n.stack = stack.slice();
	return n;
}

Env.prototype.all_legal_moves = function(stack, to_play){
	var n = this.new_env(stack)
	var s = n.size;
	var legal = new Array(s * s + 1).fill(1)
	for(var x = 0; x< s; x++){
		for(var y = 0; y < s; y++){
			if(!(n.play(x, y, to_play, true) instanceof Object)) legal[MCTS.to_flat({x, y, type: "stone"}) - 1] = 0;
		}
	}
	legal[81] = 0.5;
	return legal;
}

Env.prototype.check_if_done = function(moves){
	var pass = this.env.size * this.env.size + 1;
	// console.log(moves)
	out = moves.length >= 2 && moves.slice(-2).reduce((acc,e) => acc && (e == pass), true)
	// console.log(out)
	return out;
}

var empty = 0;
var visited = 2;
var free = 3;
var edge = -2;

Env.prototype.find_score = function({capCount, schema}={}){
	var board = schema.slice()
	var n =this.size();
	board = MCTS.partition(board, n);
	
	
	var i = 0;
	var path = [], curr = null;
	while((i = chooseEmpty(board, n)) && i ){
		var boundary = frontier({board, x: i[0], y: i[1], n});
		if(boundary.length == 0) break;
		var same = true;
		var h = boundary[0];
		for(var j of boundary){
			if(j != h){
				same =false;
				break;
			}
		}
		if(same){
			for(var x = 0; x< n; x++){
				for(var y = 0; y< n; y++){
					if(board[x][y] == visited){
						board[x][y] = h;
					}
				}	
			}
		}
	}

	var blackStones = schema.filter(e => e == WGo.B).length;
	var whiteStones = schema.filter(e => e == WGo.W).length;
	score += (blackStones - whiteStones);
	console.log("score: ", score)
	return {black: score, white: -1 * score};
}

function chooseEmpty(board, n){
		for(var i = 0; i< n; i++){
			for(var j = 0; j< n; j++){
				if(board[i][j] == empty)return [i, j];
			}
		}
		return null;
	}

function frontier({board, x, y, n}){
	if(x < 0 || y< 0 || x> n || y > n || board[x][y] == visited) return [];
	if(board[x][y]== WGo.B || board[x][y] == WGo.W)return [board[x][y]]

	var set = neighbours(board, x, y, n);
	board[x][y] = visited;
	var list = [];
	for(var i of set){
		var [a, b] = i;
		list.concat(frontier({board, x: a, b:y, n}));
	}
	return list;
}

function neighbours(board, x, y, n){
	return [[x -1, y], [x, y -1], [x + 1, y], [x, y + 1]]

}

Env.prototype.lastMove = function(){
	return this.moves.slice(-1);
}

})(window);