(function(obj){
obj.MCTS = obj.MCTS || {}

Object.assign(obj.MCTS, {Position})

var partition = (array, n) =>
   array.length ? [array.splice(0, n)].concat(partition(array, n)) : [];

var to_flat = (l, n) => l.type=="pass" ? n * n + 1 : l.y * n + l.x + 1;
var to_obj = (f, c, n) => ({ x: (f - 1) %n, y: (f - 1)/n, c })

// MCTS's representation of env
function Position(env, moves){
	var position = env.getPosition();

	var l = env.lastMove();
	var n = env.size();
	
	// flattened along col with 1-based indexing
	var last_move = to_flat(l, n)

	this.stack = this.env.stack().slice()
	this.to_play = env.turn(),
	this.board = partition(position.schema, env.size()),
	this.n = moves.length,
	this.recent = moves.slice(),
	this.last_move = last_move,
	// doesn't affect the real environment
	this.play_move = (f) => {
		return new Position(env.next(this.stack, to_obj(f, this.to_play, n)), moves.concat(f))
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

})