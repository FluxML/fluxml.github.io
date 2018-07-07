function Model(model){
	var mctsPlayer = new MCTS.Player(this);

	this.predict = (input)=>{
		var nn_in = tf.stack(input.map(p => p.get_feats()));
		
		common_out = model.base_net(nn_in)  //  transpose ??????
		var [pi, val] = [model.policy(common_out), model.value(common_out)]
		
		return { move_probs: pi, values: val };
	}

	this.play_move = mctsPlayer.play_move.bind(mctsPlayer);

	return () => {
		return mctsPlayer.suggestMove();
	}
}