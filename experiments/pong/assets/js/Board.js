function Board(container, {env}={}){
	this.container = container
	this.render	= ()=>{
		this.removeStartScreen();
		env.render();
		if(env.done()){
			show($$(".overlay #gameOver"))
		}else{
			hide($$(".overlay #gameOver"))
		}
	};

	this.removeStartScreen = ()=>{
		hide($$(".overlay #start"));
	}
}
