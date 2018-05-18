function Board(id, config){
	this.board = new ChessBoard(id,config);

	console.log(this.board)
	this.render = function({
		state,
		done,
		action,
		turn
	}){
		var fen = state.split(" ")[0];
		if(this.board.fen().valueOf() == fen.valueOf())
			this.board.position(fen, true);

		var ele = $$("." + (turn=="b"?"comp":"human"));
		highlight(ele, $$(".options"))

		if(done){
			show($$(".overlay #gameOver"))
		}else{
			hide($$(".overlay #gameOver"))
		}
	}
}