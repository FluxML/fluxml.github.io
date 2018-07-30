function MultiPlayer(players, env, board){
	this.players = players;
	this.env = env;
	this.out = board;	
	this.interval = null;
}

MultiPlayer.prototype = Object.create(Game.prototype);

var mp = MultiPlayer.prototype;

mp.play = async function(){
	var x = this;
	x.move(await x.players[0].action(x.env.config()));
	
	var next = async function(){
		x.move(await x.players[1].action(x.env.config()))
	}
	setTimeout(next, 1);
};

mp.move = function(a){
	var x = this;
	x.env.step(a)
	x.display();
	if(x.env.done()){
		x.gameOverHandler();
	}
}

mp.reset = function(){
	var x = this;
	x.interval = null
	x.env.reset();
	x.players.forEach(p => p.reset());
	x.display();
}

mp.start = function(){
	var x = this;
	clearInterval(x.interval)
	x.interval = setInterval(function(){
		x.play();
	}, 60)
}

mp.gameOverHandler = function(){
	var x = this;
	clearTimeout(x.interval);
	x.reset();
	x.start();
}

mp.setPlayers = function(ps){
	this.players = ps;
	this.gameOverHandler();
}