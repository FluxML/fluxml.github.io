
WGo.Game.prototype.passes = [];

WGo.Game.prototype.config = function(){
    return {state:getState(this), done: this.done(), turn: this.turn}
}

WGo.Board.prototype.render = function(config){
    this.restoreState(config.state);
}

WGo.Game.prototype.step = function(a){
    if(a.type== "stone"){
        this.passes = [];
        this.play(a.x, a.y, a.k);
    }
    else if(a.type == "pass"){
        if(this.passes.indexOf(a.c) == -1)this.passes.push(a.c);
        this.pass(a.c);
    }
}

WGo.Game.prototype.done = function(){
    return (this.passes.length >= 2);
}

WGo.Game.prototype.reset = function(){
    this.stack = [this.stack[0]]
    this.turn = 1;
    this.passes = [];
}

// Game.prototype.nextGameState = function(curr){
//     if(this.env.turn == WGo.B)return this.states.H;
//     else return this.states.B;
// }


function getState(env){
    return {
        "objects": env.position.schema.reduce((acc, curr)=>{
            acc.tail = acc.tail.concat(curr);
            if(acc.tail.length == 19){
                acc.list.push(acc.tail);
                acc.tail = []
            }
            return acc
        }, {list:[], tail:[]}).list.map((a, i)=> a.map((b, j)=>{f = []; if(b != 0)f.push({x: i, y: j, c: b}); return f }))
    }
}
