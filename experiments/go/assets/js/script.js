
var model = (x) => x

var env, board, game
var __init__ = function(){

    var $$ = (e)=> document.querySelector(e);
    var game;
    
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

    env = new Env(9, "KO");

    game = new Game(env, new Board(board), null, {
        mode: "async"
    })

    board.addEventListener("click", function(x, y){
        console.log(x, y, env.turn())
        if(env.turn() == WGo.B){
            game.action({type: "stone", x, y, c: WGo.B});
        }
    })
    
    $$("#controls .pass").addEventListener("click", function(event){
        game.action({type: "pass", c:WGo.b})
    })
    

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

window.onload = __init__;