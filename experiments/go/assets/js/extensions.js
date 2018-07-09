WGo.Board.prototype.render = function(config){
    this.restoreState(config.state);
}

Game.prototype.nextGameState = function(curr){
    console.log("turn....", this.env.turn())
    if(this.env.turn() == WGo.B)return this.states.H;
    return this.states.C;
}

Game.prototype.defaultAction = () => ({x: -1, y: -1, c: 1, type:"stone"})


function getState(env){
    var n = env.size;
    var k = env.position.schema.slice();

    var objects = [];
    for(var i = 0; i< n; i++){
        var o = [];
        for(var j = 0; j< n; j++){
            var c = k[i*n + j];
            if(c != 0)o.push([{x: i, y: j, c }])
            else o.push([])
        }
        objects.push(o);
    }

    return ({ objects });
}
