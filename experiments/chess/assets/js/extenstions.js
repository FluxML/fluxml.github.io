Game.prototype.isValidAction = function(action){
	// computer -> black piece
	// human -> white piece
	var nextColor = this.env.chess.turn()
	var color = action.peice[0];
	if((color != nextColor) 
		// || (this.state == this.states.C && color == "w") || (this.state == this.states.H && action.peice[0] == "b")
	){
		return false;
	}

	var res = this.env.chess.move(action);
	console.log(this.env.chess.turn());
	if(res)this.env.chess.undo();
	console.log(this.env.chess.turn());
	return res != null;
}

Game.prototype.nextGameState = function(curr) {
	// return (curr + 1)%2;
	return curr
};

