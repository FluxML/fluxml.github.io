var $$ = (s)=>document.querySelector(s);

function Board(container, {env}={}){
	this.container = container
	this.render	= ()=>{
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

function show(ele){
	if(ele.className.match(" hidden") != null){
		ele.className = ele.className.replace(" hidden", "");
	}
}

function hide(ele){
	if(ele.className.match(" hidden") == null){
		ele.className += " hidden";
	}
}