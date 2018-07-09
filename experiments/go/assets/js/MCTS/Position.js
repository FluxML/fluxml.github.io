(function(obj){

obj.MCTS = obj.MCTS || {}

Object.assign(obj.MCTS, {Position})

var MCTS = obj.MCTS

var pos_to_board = (pos, n) => partition(pos.schema.slice(), n)

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
		return new Position(env, env.next(this.stack, MCTS.to_obj(f, this.to_play, n)).stack, moves.concat(f), -turn)
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
	return tf.concat([this.stone_features(), this.color_to_play_feature()])
}

Position.prototype.stone_features = function(){
	var last_eight = this.stack.slice(-8).reverse(); // newest first order;
	while(last_eight.length < 8){
		last_eight.push(last_eight.slice(-1)[0]);
	}

	var scope = this;
	var board = null, s, p_board, o_board;
	var features = new Array(16);
	var n = scope.size;
	for(var i in last_eight){
		board = last_eight[i].schema
		p_board = board.slice();
		o_board = board.slice();
		for(var j in board){
			if(board[j] == 0){
				p_board[j] = 0
				o_board[j] = 0
			}else{
				s = (board[j] == this.to_play);
				p_board[j] = s + 0;
				o_board[j] = !s + 0;
			}
		}
		features[i*2] = partition(p_board, n);
		features[i*2 + 1] = partition(o_board, n);
	}

	return tf.tensor(features, [16, n, n]);
}

Position.prototype.color_to_play_feature = function() {
	return tf.fill([1, this.size, this.size], this.to_play);
};

})(window)