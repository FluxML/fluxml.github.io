function Model(model){
	this.mctsPlayer = new MCTS.Player(this);

	this.model = model;

	this.predict = async function(){
		console.log(this)
		return this.mctsPlayer.suggest_move();
	}
	this.predict = this.predict.bind(this)
}

Model.prototype.process = function(input){
	console.log(input)
	var nn_in = tf.stack(input.map(p => p.get_feats()));
	
	console.log(nn_in.shape);
	common_out = this.model.base_net(nn_in)  //  transpose ??????
	var [pi, val] = [this.model.policy(common_out), this.model.value(common_out)]
	
	return { move_probs: pi, values: val };
}

Model.prototype.play_move = function(){
	return this.mctsPlayer.play_move.bind(this.mctsPlayer);
}

Model.prototype.__init__ = function (env){
	return this.mctsPlayer.__init__(new MCTS.Position(env, env.stack(), [], env.turn()));
}