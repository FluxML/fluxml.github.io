function Board(board){
	this.render	= (config)=>{
		board.render(config);
		
		highlight($$("." + (config.turn==1?"human":"comp")), $$(".options"))
		if(config.done){
			show($$(".overlay #gameOver"))
		}else{
			hide($$(".overlay #gameOver"))
		}
	};
}

