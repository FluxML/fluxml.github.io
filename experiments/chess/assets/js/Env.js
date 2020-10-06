function Env(){
	this.chess = new Chess();
	var action = null;

	this.done = function(){
		return this.chess.game_over();
	}

	this.step = function(a){
		action = a;
		return this.chess.move(a);
	}

	this.state = function(){
		return this.chess.fen();
	}

	this.config = function(){
		return {state: this.state(), done: this.done(), action, turn: this.chess.turn()};
	}

	this.reset = function(){
		return chess.reset();
	}
}