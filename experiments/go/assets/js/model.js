function Model(model, config){
	this.mctsPlayer = new MCTS.Player(this, config);
	this.model = model;

	this.predict = async function(config, cb){
		var a = await this.mctsPlayer.suggest_move();
		return a;
	}
	this.predict = this.predict.bind(this)
}

Model.prototype.process = function(input){
	var l= input.length;
	var p = new Array(l);
	var [pi, val] = tf.tidy(() =>{
		for(var i=0; i<l; i++){ p[i] = input[i].get_feats()}
		var nn_in = tf.stack(p);
		var common_out = this.model.base_net(nn_in)
		var pi = this.model.policy(common_out);
		var val = this.model.value(common_out);
		return [pi, val]
	});
	return { move_probs: pi, values: val };
}

Model.prototype.play_move = function(a){
	return this.mctsPlayer.play_move(a);
}

Model.prototype.__init__ = function (env){
	return this.mctsPlayer.__init__(new MCTS.Position(env, env.stack(), [], env.turn()));
}