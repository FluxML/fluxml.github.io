/**********
===========

Original code at https://github.com/tejank10/AlphaGo.jl

===========
**********/

(function(obj){

obj.MCTS = obj.MCTS || {}

Object.assign(obj.MCTS, {Node, DummyNode})

var MCTS = obj.MCTS;

var c_puct = 0.96;
var val = (n, v) => new Array(n).fill(v);
var zeros = (n) => val(n, 0);
var ones = (n) => val(n, 1);
var defObj = (n) => ({...zeros(n), "null":0, "-1":0});


function Node(position, {isRoot, parent, fmove=null, board_size=9, max_game_length, stack}={}){
	this.max_game_length = max_game_length || Math.floor((Math.pow(board_size,2) * 7) / 5);
	this.parent = parent || new DummyNode(board_size);
	this.board_size = board_size;
	this.position = position;
	this.fmove = fmove;
	this.is_expanded = false;
	this.losses_applied = 0;

	var total_moves = board_size * board_size + 1;
	this.child_N = zeros(total_moves)
    this.child_W = tf.zeros([total_moves])

    // this.original_prior = zeros(total_moves)
    this.child_prior = tf.zeros([total_moves])

    this.children = {}
    this.isRoot = false;
    this.stack = stack || [position.schema()]
}

var node = Node.prototype;

node.N = function(){
	return this.parent.child_N[this.fmove - 1];
}

node.set_N = function(value){
	this.parent.child_N[this.fmove - 1] = value;
}

node.W = function(){
	return this.parent.child_W.buffer().get(this.fmove - 1);
}

node.set_W = function(value){
	var x = this;
	tf.tidy(()=>{
		var l = x.parent.child_W.buffer();
		l.set(value, x.fmove - 1)
		x.parent.child_W = l.toTensor();
		return x.parent.child_W
	})
}

node.select_leaf = async function(){
	var current = this;
	var n = this.board_size;
	var pass_move = n * n + 1;

	return (await this.select_leaf_loop(current, pass_move, n))
}

node.select_leaf_loop = async function(current, pass_move, n){
	var readouts = 0;

	while(readouts < 3){
		readouts++;
		var current_new_N = current.N() + 1
    	current.set_N(current_new_N)
    	
    	if (!current.is_expanded){
      		break;
    	}
    	// console.log(current.position.last_move)
	    if (current.position.last_move == pass_move
	      && current.child_N[pass_move - 1] == 0){
	      current = current.maybe_add_child(pass_move)
	      continue;
		}
    	cas = current.child_action_score()
    	// console.log("cas", this.child_N, current.child_N)
    	best_move = tf.argMax(cas).dataSync()[0] + 1
    	
    	current = current.maybe_add_child(best_move)
	}

	if(!current.is_expanded)return current;
	else{
		var x= this;
		return new Promise(function(resolve, reject){
			setTimeout(()=>{
				x.select_leaf_loop(current, pass_move, n).then(out =>{
					resolve(out)
				})
			},1)
		})
	}

}

node.maybe_add_child = function(move){
	// console.log("maybe_add_child", move)
	
	if(!this.children[move]){
		var new_pos = this.position.play_move(move);
		this.children[move] = new Node(new_pos, {fmove:move, parent:this, max_game_length: this.max_game_length})
	}

	return this.children[move];
}

node.child_action_score = function(){
	var larr = tf.tensor(this.legal_moves().map(e => 1000 *( 1 - e)));
	var qarr = this.child_Q();
	// debugger;
	var uarr = this.child_U();
	var l = this.board_size * this.board_size + 1;
	var x = this;
	return tf.tidy(() => tf.sub(tf.add(tf.mul(qarr, tf.scalar(x.position.to_play)), uarr),larr));
}

node.child_Q = function(){
	var x = this;
	var out =  tf.tidy(() => (tf.div(x.child_W, tf.add(tf.scalar(1), tf.tensor(x.child_N)))))
	// debugger;
	return out;
}

node.child_U = function(){
	var d = tf.scalar(c_puct * Math.sqrt(1 + this.N()));
	var x = this;
	return tf.tidy(() => tf.mul(d, 
		tf.div(x.child_prior, tf.add(tf.scalar(1), tf.tensor(x.child_N)))))
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
  	this.set_W(this.W() + loss)
  	if (this.parent == null || this == root_) return;
	this.parent.add_virtual_loss(root_)
}

node.revert_virtual_loss = function(root_){
	this.losses_applied -= 1
  	var revert = -1 * this.position.to_play;
	this.set_W(this.W() + revert)
  	if (this.parent == null || this == root_) return;
  	this.parent.revert_virtual_loss(root_)
}

node.incorporate_results = function(move_probs, value, up_to){
	// console.log("incorporate_results", value, this.is_done())
	if (this.is_expanded){
		this.revert_visits(up_to)
		return
	}
	this.is_expanded = true
	// this.original_prior = move_probs.slice();
	this.child_prior = move_probs;

	var len = this.board_size * this.board_size + 1
	this.child_W = tf.fill([len], value)
	this.backup_value(value, up_to)
}


node.revert_visits = function(up_to){
	this.set_N(this.N() - 1)
	// console.log(this.child_N)
	if (this.parent == null || this == up_to )return;
	this.parent.revert_visits(up_to);
}

node.children_as_pi = function(squash=false){
	var probs = this.child_N;
	var l = probs.length;
	if(squash){
		for(var i = 0; i< l; i++){
			probs[i]= Math.pow(probs[i], 0.98)
		}
	}
	var sum = 0;
	for(var i = 0; i<l; i++){
		sum += probs[i]
	}
	for(var i = 0; i<l; i++){
		probs[i] = MCTS.safe_div(probs[i],sum);
	}
	return probs;
}

node.Q = function(){
	return this.W() / (1 + this.N());
}

node.is_done = function(){
	return this.position.is_done() || this.position.n >= this.max_game_length
}

node.get_feats = function(){
	var last_eight = this.get_stack(8);
	return this.position.get_feats(last_eight);
}

node.get_stack = function(n){
	if(n == 0) return [];
	if(this.isRoot) return this.stack.slice(-n);

	return [this.position.schema()].concat(this.parent.get_stack(n - 1));
}

node.set_stack = function(n){
	this.stack = this.get_stack(n);
}

node.set_dummy_parent = function(n){
	// debugger
	this.parent = new DummyNode(this.board_size);
}

function DummyNode(n){
	this.parent = null;
	this.child_N = zeros(n*n + 1);
	// console.log("eee", this.child_N)
	this.child_W = tf.zeros([n*n + 1]);
}

DummyNode.prototype = Object.create(node);

DummyNode.prototype.get_stack = function(){
	return [];
};

})(window);