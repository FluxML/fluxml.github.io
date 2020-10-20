var __init__ = function(){
	var start = "", end = "", env = new Env();

	var board_config = {
		draggable: true,
		dropOffBoard: 'snapback', // this is the default
		position: 'start', 
		onDragStart: dragStart,
		onDrop: drop
	}
	var board = new Board("playground", board_config);
	var game = new Game(env, board, null, {mode:"async"});

	function dragStart(source, peice, state, orientation){
		// if(peice[0] == "b")return false; // user can't move black peices
	}

	function drop(source, target, peice, newPos, oldPos, orientation){
		if(source == target)return;	// no action
		if(!game.action({from: source, to: target, nextState: ChessBoard.objToFen(newPos), peice})){
			return 'snapback';
		}

		return true;
	}
}

__init__()