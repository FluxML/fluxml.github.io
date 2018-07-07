(function(obj){
obj.MCTS = obj.MCTS || {}

Object.assign(obj.MCTS, {Position})

var MCTS = obj.MCTS

var partition = (array, n) =>
   array.length ? [array.splice(0, n)].concat(partition(array, n)) : [];

var pos_to_board = (pos, n) => partition(pos.schema, n)

// MCTS's representation of env
function Position(env, moves){
	var position = env.getPosition();

	var l = env.lastMove();
	var n = env.size();
	
	// flattened along col with 1-based indexing
	var last_move = MCTS.to_flat(l, n)

	this.stack = this.env.stack().slice()
	this.size = n;
	this.to_play = env.turn(),
	this.board = pos_to_board(position, env.size());
	this.n = moves.length,
	this.recent = moves.slice(),
	this.last_move = last_move,
	// doesn't affect the real environment
	this.play_move = (f) => {
		return new Position(env.next(this.stack, MCTS.to_obj(f, this.to_play, n)), moves.concat(f))
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
	return tf.concat(this.stone_features(), this.color_to_play_feature())
}

Position.prototype.stone_features = function(){
	var last_eight = this.stack.slice(-8).reverse(); // newest first order;
	while(last_eight.length < 8){
		last_eight.push(last_eight.slice(-1)[0]);
	}

	var scope = this;
	var player = last_eight.map(l => {
		return l.schema.map(e => e == scope.to_play ? 1 : 0)
	})

	var opponent = last_eight.map(l => {
		return l.schema.map(e => e == -scope.to_play ? 1 : 0)
	})

	var features = new Array(16);
	for(var i = 0; i< 8; i++){
		features[i*2] = player[i]
		features[i*2 + 1] = opponent[i]
	}


	return tf.tensor(features.map(l => partition(l, scope.size)), [16, this.size, this.size]);
}

Position.prototype.color_to_play_feature = function() {
	return tf.ones([1, this.size, this.size]);
};

})