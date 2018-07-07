/**********
===========

Original code at https://github.com/tejank10/AlphaGo.jl

===========
**********/

(function(obj){

obj.MCTS = obj.MCTS || {}
Object.assign(obj.MCTS, {Player})

var MCTS = obj.MCTS;

function Player(network, { num_readouts = 800, two_player_mode = false, resign_threshold = -0.9, board_size=9}={}){
	this.board_size = this.board_size;
    this.tau_threshold = two_player_mode ? -1 : (board_size * board_size / 12) / 2 * 2
    this.network = network;
    this.num_readouts = num_readouts;
    this.two_player_mode = two_player_mode;
    this.qs = [];
    this.searches_pi = [];
    this.result = 0;
    this.result_string = "";
    this.root = null
    this.resign_threshold = resign_threshold;
    this.position = null;
}

var player = Player.prototype;

player.__init__ = function(pos){
  this.root = new MCTS.Node(pos);
  this.result = 0
  this.searches_pi = [];
  this.qs = [];
}

player.suggest_move = function(){
  var current_readouts = this.root.N();
  while (this.root.N() < current_readouts + this.num_readouts){
  	this.tree_search();
  }

  return this.pick_move();
}

player.tree_search = function(parallel_readouts = 8){
	var leaves = [];
	var failsafe = 0;

	while (leaves.length() < parallel_readouts && failsafe < 2 * parallel_readouts){
	    failsafe += 1
	    var leaf = this.root.select_leaf()
	    // if game is over, override the value estimate with the true score
	    if (leaf.is_done()){
	      value = leaf.position.score() > 0 ? 1 : -1
	      leaf.backup_value(value, this.root)
	      continue
	    }
	    leaf.add_virtual_loss(this.root)
	    leaves.push(leaf)
  	}

  	if(leaves.length() == 0) return leaves;

	var { move_probs, values } = this.network.predict(leaves.map(l=>l.position))
	
	move_probs = tf.layers.flatten.apply(move_probs).dataSync();
	values = values.dataSync();
	for (var i in leaves){
		var leaf = leaves[i];
		var move_prob = move_probs[i]
		var value = values[i];
		leaf.revert_virtual_loss(this.root)
		leaf.incorporate_results(move_prob, value, this.root)
	}
	
	return leaves
}

player.get_feats = function(){
	return this.root.position.get_feats();
}

player.pick_move = function(){
	var fcoord;
	if (this.root.position.n >= this.tau_threshold){
		fcoord = this.root.child_N.indexOf(Math.max(...this.root.child_N)) + 1;
	}else{
		var cdf = tf.cumsum(tf.tensor(this.root.child_N)).dataSync();
		var n = cdf.slice(-2)[0];
		cdf = cdf.map(c => c/n)
		selection = Math.random()
		fcoord = searchsortedfirst(cdf, selection)
	}

	return MCTS.to_obj(fcoord, this.root.position.to_play, this.board_size);
}

player.play_move = function(c){
	c = MCTS.to_flat(c, this.board_size);
	if (!this.two_player_mode){
		this.searches_pi.push(
			this.root.children_as_pi(this.root.position.n <= this.tau_threshold))
	}
	this.qs.push(this.root.Q())
	
	this.root = this.root.maybe_add_child(c);
	
	this.position = this.root.position
	this.root.parent.children = {}
	return true
}

})(window);