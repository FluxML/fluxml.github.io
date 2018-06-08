var __init__ = function(){

    var board = new WGo.Board(document.querySelector("#playground"), {
        width: 500,
        section: {
            top: -1,
            left: -1,
            right: -1,
            bottom: -1
        }
    });

    var env = new WGo.Game(19, "KO");
    var game = new Game(env, new Board(board), null, {
        mode: "async"
    })

    board.addEventListener("click", function(x, y){
        game.action({type: "stone", x, y, c: WGo.B});
    })

    k = -1;
    var $$ = (e)=> document.querySelector(e);
    $$("#controls .pass").addEventListener("click", function(event){
        // game.action({type: "pass", c:WGo.b})
        k = (k + 3)%4 - 1
        game.action({type: "pass", c:k})
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