/**********
===========

Original code at https://github.com/tejank10/AlphaGo.jl

===========
**********/

(function(obj){

obj.MCTS = obj.MCTS || {}

Object.assign(obj.MCTS, {Node, DummyNode})

var c_puct = 0.96;
var zeros = (n) => new Array(n).fill(0);
var ones = (n) => new Array(n).fill(1);
var val = (n, v) => new Array(n).fill(v);

function DummyNode(){}

function Node(position, {parent=(new DummyNode()), fmove=null, board_size=9}={}){
	this.board_size = board_size;
	this.parent = parent;
	this.position = position;
	this.fmove = fmove;
	this.is_expanded = false;
	this.losses_applied = 0;

	var total_moves = board_size * board_size + 1;
	this.child_N = zeros(total_moves)
    this.child_W = zeros(total_moves)
    this.original_prior = zeros(total_moves)
    this.child_prior = zeros(total_moves)

    this.children = {}
}

var node = Node.prototype;

node.N = function(){
	return this.parent.child_N[this.fmove];
}

node.set_N = function(value){
	this.parent.child_N[this.fmove] = value;
}

node.W = function(){
	return this.parent.child_W[this.fmove];
}

node.set_W = function(value){
	this.parent.child_W[this.fmove] = value;
}

node.select_leaf = function(){
	var current = this;
	var pass_move = this.board_size * this.board_size + 1;
	while (true){
		var current_new_N = current.N() + 1
	
    	current.set_N(current_new_N)
    	// if a node has never been evaluated, we have no basis to select a child.
    	if !current.is_expanded
      		break;
		
	    // HACK: if last move was a pass, always investigate double-pass first
	    // to avoid situations where we auto-lose by passing too early.
	    if (current.position.recent.length() != 0
	      && current.position.recent.slice(-1)[0] == pass_move
	      && current.child_N[pass_move] == 0){
	      current = current.maybe_add_child(pass_move)
	      continue;
		}
    	cas = current.child_action_score()
    	best_move = cas.indexOf(Math.max(...cas)) + 1
    	current = current.maybe_add_child(best_move)
	}
  	return current
}

node.maybe_add_child = function(move){
	if(!this.children[move]){
		var new_pos = this.position.play_move(move);
		this.children[move] = new Node(new_pos, {fmove:move, parent:this})
	}

	return this.children[move];
}

node.child_action_score = function(){
	var larr = this.legal_moves();
	var qarr = this.child_Q();
	var uarr = this.child_U();
	var res = zeros(this.board_size * this.board_size + 1)
	return res.map((_,i) => qarr[i] * this.position.to_play .+ uarr[i] - 1000 * (1 - larr[i]);
}

node.child_Q = function(){
	var d = 1 + this.child_N;
	return this.child_W.map(e => e/d);
}

node.child_U = function(){
	var d = c_puct * Math.sqrt(1 + this.N())/(1 + x.child_N);
	return this.child_prior.map(e=> e * d);
}

node.legal_moves = function () { return this.position.legal_moves() };


node.backup_value = function(value, root_){
	this.set_W(this.W() + value);
	if( this.parent == null || this == root_ )return;
	this.parent.backup_value(value, root_);
}
node.add_virtual_loss = function(root_){
	this.losses_applied += 1;
	var loss = this.position.to_play
  	this.set_W!(this.W() + loss)
  	if (mcts_node.parent == nothing || mcts_node == up_to) return;
	this.parent.add_virtual_loss(root_)
}

node.revert_virtual_loss = function(root_){
	this.losses_applied -= 1
  	var revert = - this.position.to_play;
	this.set_W(this.W() + revert)
  	if (this.parent == null || this == root_) return;
  	this.parent.revert_virtual_loss(root_)
}

node.incorporate_results = function(move_probs, value, up_to){
	if (this.is_expanded){
		this.revert_visits(up_to)
		return
	}
	this.is_expanded = true
	this.original_prior = move_probs.slice();
	this.child_prior = move_probs.slice();

	this.child_W = val(go.N * go.N + 1, value)
	this.backup_value(value, up_to)
}


node.revert_visits = function(up_to){
	this.set_N(this.N() - 1)
	if this.parent == null || this == up_to return;
	this.parent.revert_visits(up_to);
}

})(window);