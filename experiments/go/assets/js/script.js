var env, board, game, model;

(function(){

model = { policy, value, base_net }

var configArr = [];
for(var i in model){
    configArr.push({url: "./assets/bson/" + i + ".bson", model: model[i]});
}
_loadWeights(configArr, document.querySelector(".demo_wrapper"), __init__)


function __init__(){

    var $$ = (e)=> document.querySelector(e);
    var doNothing = async function (e){ return e};

    function tidyWrap(f){
        return (x) => tf.tidy(() => f(x))
    }

    for(var i in model){
        model[i] = tidyWrap(model[i]);
    }



    var pBar = document.createElement("div");
    pBar.className = "pbar";
    var controls = $$("#controls");
    controls.appendChild(pBar);
    
    board = new WGo.Board(document.querySelector("#playground"), {
        width: 500,
        section: {
            top: -1,
            left: -1,
            right: -1,
            bottom: -1
        }
    });
    board.setSize(9)


    config.layer = add_best;
    config.progress = function(val){
        var w = val * controls.offsetWidth;
        pBar.style.width = w + "px"
    }

    env = new Env(config.board_size, "KO");
    model = new Model(model, config);

    env.setModel(model);
    env.reset();

    game = new Game(env, new Board(board), model.predict.bind(this), {
        mode: "async",
        transform: {
            state: doNothing,
            action: doNothing
        }
    })

    board.addEventListener("click", function(x, y){
        // console.log(x, y, env.turn())
        if(env.turn() == WGo.B){
            game.action({type: "stone", x, y, c: WGo.B});
        }
    })

    $$("#controls .pass").addEventListener("click", function(event){
        game.action({type: "pass", c:WGo.b})
    })
    
    drawCoords(board);
    drawBest(board);
    drawIllegal(board);
    game.display();

    var inc = document.createElement('div');
    var input = document.createElement('input')
    var label = document.createElement('label')
    inc.appendChild(label)
    inc.appendChild(input)
    $$(".demo_wrapper").insertBefore(inc, $$(".instructions"));
    label.innerText = "Number of searches";
    input.type = "number";
    input.className="num_readouts"
    input.value = model.mctsPlayer.num_readouts;
    input.onchange = function(){
        model.mctsPlayer.num_readouts = parseInt(event.target.value);
    }


}

function drawCoords(){

    var coordinates = {
        // draw on grid layer
        grid: {
            draw: function(args, board) {
                
                var ch, t, xright, xleft, ytop, ybottom;
                
                this.fillStyle = "rgba(0,0,0,0.7)";
                this.textBaseline="middle";
                this.textAlign="center";
                this.font = board.stoneRadius+"px "+(board.font || "");
                
                xright = board.getX(-0.75);
                xleft = board.getX(board.size-0.25);
                ytop = board.getY(-0.75);
                ybottom = board.getY(board.size-0.25);
                
                for(var i = 0; i < board.size; i++) {
                    ch = i+"A".charCodeAt(0);
                    if(ch >= "I".charCodeAt(0)) ch++;
                    
                    t = board.getY(i);
                    this.fillText(board.size-i, xright, t);
                    this.fillText(board.size-i, xleft, t);
                    
                    t = board.getX(i);
                    this.fillText(String.fromCharCode(ch), t, ytop);
                    this.fillText(String.fromCharCode(ch), t, ybottom);
                }
                
                this.fillStyle = "black";
            }
        }
    }
    board.addCustomObject(coordinates);
}


var container = {
    best: [],
    getBest: function(){
        return this.best;
    },
    setBest: function(arr){
        this.best = arr;
    }
}

var colors = ["#009688"]

function drawBest(board){
    var best_layer = {
        grid: {
            draw: function(args, board){
                $$(".pass").style.borderStyle = "solid";
                var best = container.getBest();
                if(best.length == 0) return
                for(var i = 0; i< best.length; i++){
                    var fmove = best[i] + 1;
                    var {x, y, type} = MCTS.to_obj(fmove, -1, board.size);
                    // console.log(type, x, y)
                    if(x == -1 || y == -1) continue;
                    if(type == "pass"){
                        $$(".pass").style.borderStyle = "dashed";
                        continue
                    }

                    var xr = board.getX(x),
                    yr = board.getY(y),
                    sr = ((board.stoneRadius - 2)/(i + 1));
                
                    this.beginPath();
                    this.strokeStyle = colors[i] || colors[colors.length - 1];
                    this.lineWidth = 2;
                    this.setLineDash([2])
                    this.arc(xr, yr, sr, 0, 2*Math.PI, true);
                    this.stroke();
                    this.setLineDash([])
                    container.setBest([]);
                }
            }
        }
    }
    board.addCustomObject(best_layer);
}

function add_best (arr) {
    container.setBest(arr)
    board.redraw()
}

function drawIllegal(board){
    var iLayer = {
        grid:{
            draw:function(){
                var illegal = model.mctsPlayer.root.legal_moves()
                .map((e,i)=> [e, i]).filter((e)=> e[0] == 0);

                if(illegal.length == 0) return
                for(var i = 0; i< illegal.length; i++){
                    var fmove = illegal[i][1] + 1;
                    var {x, y, type} = MCTS.to_obj(fmove, -1, board.size);
                    // console.log(type, x, y)
                    if(x == -1 || y == -1) continue;

                    var xr = board.getX(x),
                    yr = board.getY(y),
                    sr = ((board.stoneRadius - 2)/(i + 1));
                
                    this.beginPath();
                    this.strokeStyle = "#8a1c1c";
                    this.lineWidth = 2;
                    this.arc(xr, yr, 2, 0, 2*Math.PI, true);
                    this.stroke();
                    container.setBest([]);
                }
            }
        }
    }
    board.addCustomObject(iLayer);
}


}());