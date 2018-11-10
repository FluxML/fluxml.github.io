/**********
===========

Original code at https://github.com/tejank10/AlphaGo.jl

===========
**********/

(function(obj){

obj.MCTS = obj.MCTS || {}
Object.assign(obj.MCTS, {Player})

var MCTS = obj.MCTS;
var doNothing = () => null

function Player(network, {layer, progress, num_readouts = 1, two_player_mode = false, resign_threshold = -0.9, board_size = 9, max_game_length}={}){
	this.board_size = board_size;
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
    this.max_game_length = max_game_length;
    this.layer = layer || doNothing;
    this.progress = progress || doNothing;
    this.current_readouts = 0;
}

var player = Player.prototype;

player.__init__ = function(pos){

  this.root = new MCTS.Node(pos, {
  	max_game_length: this.max_game_length, 
  	board_size: this.board_size
  });
  this.result = 0
  this.searches_pi = [];
  this.qs = [];
}

player.suggest_move = async function(){
	if(this.root.legal_moves().filter(e => e == 1).length == 1){
		// pass move is the only legal move left
		return MCTS.to_obj(this.board_size * this.board_size + 1, this.root.position.to_play, this.board_size);
	}
	// console.log("suggest move")
	this.current_readouts = this.root.N();
	// console.log(cb)
	return (await this.search_loop.bind(this)());
}

player.search_loop = async function(){
	if(this.root.N() >= this.current_readouts + this.num_readouts)
		return this.pick_move();

	await this.tree_search();
	this.layer(this.best_n(3));
	this.progress((this.root.N() - this.current_readouts)/this.num_readouts);
	return (await this.search_loop.bind(this)());
}

player.tree_search = async function(parallel_readouts=8){
	console.log(1,tf.memory())
	var leaves = [];
	var failsafe = 0;

	var leaves = await this.tree_search_loop(leaves, failsafe, parallel_readouts, [])
	console.log(2,tf.memory())
  	if(leaves.length == 0) return [];

	var { move_probs, values } = this.network.process(leaves)
	
	var len = this.board_size*this.board_size + 1
	
	val = values.dataSync();
	tf.dispose(values)
	for (var i in leaves){
		var leaf = leaves[i];
		var move_prob = move_probs.slice(0, 1).as1D()
		var value = val[i];
		console.log(3,tf.memory())
		leaf.revert_virtual_loss(this.root)
		console.log(4,tf.memory())
		leaf.incorporate_results(move_prob, value, this.root)
		console.log(5,tf.memory())
		tf.dispose(move_prob);
	}
	tf.dispose(move_probs)
	console.log(tf.memory())
	
	return leaves
}

player.tree_search_loop = async function(leaves, failsafe, parallel_readouts, nextLeaves){
	if(!(leaves.length < parallel_readouts && failsafe < 2 * parallel_readouts))
		return leaves;

	var count = 0;

	while((leaves.length < parallel_readouts && failsafe < 2 * parallel_readouts) && count < 2){
		count++;
		failsafe += 1
	    var res = await this.root.select_leaf(nextLeaves);
	    leaf = res[0]
	    nextLeaves = res[1]
	    
	    if (leaf.is_done()){
	      value = (leaf.position.score() > 0 ? 1 : -1);
	      leaf.backup_value(value, this.root)
	      continue
	    }
	    leaf.add_virtual_loss(this.root)
	    leaves.push(leaf)
	}

    var scope = this;
    return new Promise(function(resolve,reject){
    	setTimeout(()=>{
    		scope.tree_search_loop(leaves, failsafe, parallel_readouts, nextLeaves).then(out =>{
    			resolve(out)
    		});
    	}, 50)
    })
}

player.get_feats = function(){
	return this.root.position.get_feats();
}

player.best_n = function(n){
	var arr = this.root.child_N.slice();
	var min = Math.min(...arr);
	var best = [];
	for(var i =0; i< n; i++){
		var index = MCTS.argMax(arr);
		best.push(index);
		arr[index] = min;
	}
	return best;
}

player.pick_move = function(){
	var fcoord;

	
	if (this.root.position.n >= this.tau_threshold){
		fcoord = MCTS.argMax(this.root.child_N) + 1;
	}else{
		var cdf = tf.tidy(() => tf.cumsum(tf.tensor(this.root.child_N)).dataSync());
		var n = cdf.slice(-2)[0];
		var o = cdf.length
		for(var i =0; i< o; i++){
			cdf[i] = MCTS.safe_div(cdf[i], n);
		}
		selection = Math.random()
		var m = MCTS.searchsortedfirst(cdf, selection);
		var l = this.board_size* this.board_size;
		m = m == -1 || m >= l ? Math.floor(Math.random()*l): m
		fcoord =  m + 1

	}
	// console.log("fcoord....", fcoord)
	return MCTS.to_obj(fcoord, this.root.position.to_play, this.board_size);
}

player.play_move = function(c){
	// console.log("play", c);
	c = MCTS.to_flat(c, this.board_size);

	if (!this.two_player_mode){
		this.searches_pi.push(
			this.root.children_as_pi(this.root.position.n <= this.tau_threshold))
	}
	this.qs.push(this.root.Q())
	
	this.root = this.root.maybe_add_child(c);
	
	this.position = this.root.position
	this.root.set_dummy_parent(this.root.parent.child_N);

	return true
}

})(window);