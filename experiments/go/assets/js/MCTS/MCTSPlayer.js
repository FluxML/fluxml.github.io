/**********
===========

Original code at https://github.com/tejank10/AlphaGo.jl

===========
**********/

(function(obj){

obj.MCTS = obj.MCTS || {}
Object.assign(obj.MCTS, {Player})

var MCTS = obj.MCTS;

function Player(network, { num_readouts = 800, two_player_mode = false, resign_threshold = -0.9, board_size=9}){
	
    this.tau_threshold = two_player_mode ? -1 : (board_size * board_size / 12) / 2 * 2
    this.network = network;
    this.num_readouts = num_readouts;
    this.two_player_mode = two_player_mode;
    this.qs = [];
    this.searches_π = [];
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
  this.searches_π = [];
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
	    if leaf.is_done(){
	      value = leaf.position.score() > 0 ? 1 : -1
	      leaf.backup_value(value, this.root)
	      continue
	    }
	    leaf.add_virtual_loss(this.root)
	    leaves.push(leaf)
  	}

  	if(leaves.length() == 0) return leaves;

	var { move_probs, values } = this.network(leaves.map(l=>l.position))
	
	// move_probs, values = move_probs.tracker.data, values.tracker.data
	// move_probs = [move_probs[:, i] for i = 1:size(move_probs, 2)]
	// for (leaf, move_prob, value) in zip(leaves, move_probs, values){
	//   revert_virtual_loss!(leaf, mcts_player.root)
	//   incorporate_results!(leaf, move_prob, value, mcts_player.root)
	// }
	
	return leaves
}

})(window);