function Board(board){

	this.render	= (config)=>{
		board.render(config);
		
		highlight($$("." + (config.turn==1?"human":"comp")), $$(".options"))
		
		var addS = (n, str) => n <= 1? str : str + "s";
		// var stats= $$("#game .stats");
		// if(stats == null){
		// 	stats = document.createElement('div');
		// 	stats.className = "stats"
		// 	$$("#game").insertBefore(stats, $$("#game .board"))
		// }

		// stats.innerHTML = "<p>Captures</p>\
		// <div>\
		// 	<p class='black_score'> <span class='dot black'></span> " + config.capCount[WGo.B]+ " " + addS(config.capCount[WGo.B], "stone")+ "</p>\
		// 	<p class='white_score'> <span class='dot white'></span> " + config.capCount[WGo.W]+ " " + addS(config.capCount[WGo.W], "stone")+ "</p>\
		// </div>"



		if(config.lastMove && config.lastMove.type == "pass"){
			var n = $$(".pass").className;
			if(n.match("active") == null) $$(".pass").className = n + " active";
			setTimeout(()=>{
				var n = $$(".pass").className;
				if(n.match("active") != null) $$(".pass").className = n.replace(" active", "");
			}, 1000)
		}

		if(config.done){
			show($$(".overlay #gameOver"))
			var score_ = $$(".overlay #gameOver .score");
			var info = "Black scores " + config.score + " points. " + (config.score > 0? "Black": "White") + " wins!";
			if(score_ == null){
				score_ = document.createElement('p');
				$$(".overlay #gameOver").appendChild(score_);
			}	
			score_.innerText = info;
		}else{
			hide($$(".overlay #gameOver"))
		}
	};
}

