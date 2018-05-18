function Board(board){
	this.render	= (config)=>{
		board.render(config);
		if(config.done){
			show($$(".overlay #gameOver"))
		}else{
			hide($$(".overlay #gameOver"))
		}
	};
}

