WGo.Board.prototype.render = function(config){
    this.restoreState(config.state);
}

Game.prototype.nextGameState = function(curr){
    console.log("turn....", this.env.turn())
    if(this.env.turn() == WGo.B)return this.states.H;
    return this.states.C;
}



function getState(env){
    var k = partition(env.position.schema.slice(), 9);

    var l = {
        "objects": k.map((a, i)=> a.map((b, j)=>{f = []; if(b != 0)f.push({x: i, y: j, c: b}); return f }))
    }
    return l;
}
