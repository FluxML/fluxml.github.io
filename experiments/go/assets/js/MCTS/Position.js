(function(obj){

obj.MCTS = obj.MCTS || {}

Object.assign(obj.MCTS, {Position})

var MCTS = obj.MCTS

var pos_to_board = (pos, n) => partition(pos.schema.slice(), n)

// MCTS's representation of env
function Position(env, stack, moves, turn, n=0){
	this.position = stack.slice(-1)[0];
	this.size = env.size();
	this.stack = stack.slice();
	this.to_play = turn;
	this.n = n;
	this.last_move = moves.slice(-1)[0];
	this.env = env;
	this.store = {}
	this.recent = moves.slice(-2)
}

var pos = Position.prototype;

// doesn't affect the real environment
pos.play_move = function(f){
	var k = this.env.next(this.stack, MCTS.to_obj(f, this.to_play, this.size));
	return new Position(this.env, k.stack, this.recent.concat(f), k.turn, this.n + 1)
};

pos.schema = function(){
	return this.position.schema.slice();
}

pos.legal_moves = function(){
	// since it needs to be calculated only once for this stack
	return this.store["legal_moves"] ? this.store["legal_moves"] : (()=>{
		var l = this.env.all_legal_moves(this.stack, this.to_play)
		this.store["legal_moves"] = l;
		return l;
	})();
}

pos.is_done = function(){
	return this.env.check_if_done(this.recent)
}
pos.score = function(){
	return this.env.find_score(this.position)
}

pos.get_feats = function(last_eight){
	return tf.tidy(() => tf.concat([this.stone_features(last_eight),this.color_to_play_feature()]));
}

pos.stone_features = function(last_eight){
	while(last_eight.length < 8){
		last_eight.push(last_eight.slice(-1)[0]);
	}
	
	var features = last_eight.reduce((acc, e) =>{
		var p = e.slice();
		var o = e.slice();
		p = p.map(f => (f == this.to_play) + 0);
		o = o.map(f => (f == -1 * this.to_play) + 0);
		acc.push(p, o)
		return acc
	}, [])
	return tf.tidy(() => tf.tensor(features, [16, 81]).reshape([16, 9, 9]));
}

pos.color_to_play_feature = function() {
	return tf.tidy(() =>tf.fill([1, this.size, this.size], this.to_play));
};


})(window)