function Board(id, config){
	this.board = new ChessBoard(id,config);

	console.log(this.board)
	this.render = function({
		state,
		done,
		action,
		turn
	}){
		this.board.move(action);
		var ele = $$("." + (turn=="b"?"comp":"human"));
		highlight(ele, $$(".options"))

		if(done){
			show($$(".overlay #gameOver"))
		}else{
			hide($$(".overlay #gameOver"))
		}
	}
}