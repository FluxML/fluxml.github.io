(function(obj){

obj.MCTS = obj.MCTS || {}

Object.assign(obj.MCTS, {Position})

var MCTS = obj.MCTS

var deepcopy = (s) => MCTS.deepcopy(s)

var pos_to_board = (pos, n) => partition(pos.schema.slice(), n)

function scatter(array, n){
	if(isNaN(n))debugger;
    
    var l = array.length;
    var m = l/n 
    if(m != Math.floor(m)) throw Error("Invalid partition size")
    var res = new Array(m);
    var acc;
    for(var i = 0; i<l; i++){
    	var j = Math.floor(i/n);
    	if(!res[j])res[j] = []

    	acc = res[j];
        acc.push(array[i]);
    }
    return res;
}

// MCTS's representation of env
function Position(env, stack, moves, turn){
	var position = stack.slice(-1)[0];

	var last_move = moves.slice(-1)[0];
	var n = env.size();
	
	// flattened along col with 1-based indexing
	this.stack = stack.slice();
	this.size = n;

	this.to_play = turn;
	this.board = pos_to_board(position, n);
	this.n = moves.length;
	this.recent = moves.slice();
	this.last_move = last_move;
	
	// doesn't affect the real environment
	this.play_move = (f) => {
		var k = env.next(this.stack, MCTS.to_obj(f, this.to_play, n));

		return new Position(env, k.stack, moves.concat(f), k.turn)
	};

	this.store = {}
	this.legal_moves = () =>{
		// since it needs to be calculated only once for this stack
		return this.store["legal_moves"] ? this.store["legal_moves"] : (()=>{
			var l = env.all_legal_moves(this.stack)
			this.store["legal_moves"] = l;
			return l;
		})();
	}

	this.is_done = () => env.is_done(this.recent)
	this.score = () => env.find_score(position).white
}

Position.prototype.get_feats = function(){
	return tf.concat([this.stone_features(),this.color_to_play_feature()])
}

Position.prototype.stone_features = function(){
	var last_eight = deepcopy(this.stack.slice(-8).map(e => e.schema).reverse());
	while(last_eight.length < 8){
		last_eight.push(last_eight.slice(-1)[0]);
	}
	var features = last_eight.reduce((acc, e) =>{
		var p = e.slice();
		var o = e.slice();
		p = p.map(f => (f == this.to_play) + 0);
		o = o.map(f => (f == -1 * this.to_play) + 0);
		// console.log("acc",acc)
		acc.push(p, o)
		return acc
	}, [])
	
	return tf.tensor(features, [16, 81]).reshape([16, 9, 9])
}

Position.prototype.color_to_play_feature = function() {
	return tf.fill([1, this.size, this.size], this.to_play);
};


})(window)