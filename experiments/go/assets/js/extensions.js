WGo.Board.prototype.render = function(config){
    this.restoreState(config.state);
}

Game.prototype.nextGameState = function(curr){
    if(this.env.turn == WGo.B)return this.states.H;
    return this.states.C;
}


function getState(env){
    console.log(env, env.size)
    l = {
        "objects": env.position.schema.reduce((acc, curr)=>{
            acc.tail = acc.tail.concat(curr);
            if(acc.tail.length == env.size){
                acc.list.push(acc.tail);
                acc.tail = []
            }
            return acc
        }, {list:[], tail:[]}).list.map((a, i)=> a.map((b, j)=>{f = []; if(b != 0)f.push({x: i, y: j, c: b}); return f }))
    }

    console.log(l)
    return l;
}
