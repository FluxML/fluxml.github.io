WGo.Board.prototype.render = function(config){
    this.restoreState(config.state);
}

Game.prototype.nextGameState = function(curr){
    // console.log("turn....", this.env.turn())
    if(this.env.turn() == WGo.B)return this.states.H;
    return this.states.C;
}

Game.prototype.defaultAction = () => ({x: -1, y: -1, c: 1, type:"stone"})

Game.prototype.play = function(){
    clearTimeout(this.playTimeout);
    if(this.env.done())return;

    var scope = this;
    switch(this.state){
        case this.states.H:
            this.move(this.newAction);
            // newAction = 0; 
            break;
        case this.states.C:
            var move = this.move.bind(this)
            this.model(this.env.state()).then( a => move(a))
            break;
        default:
            console.log("Invalid state", this.state);
    }
}

Game.prototype.startState = function (){
    return this.states.H;
}


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
