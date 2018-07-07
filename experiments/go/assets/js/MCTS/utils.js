(function(obj){

obj.MCTS = obj.MCTS || {}
Object.assign(obj.MCTS, {to_flat, to_obj})

var to_flat = (l, n) => l.type=="pass" ? n * n + 1 : l.y * n + l.x + 1;
var to_obj = (f, c, n) => ({ x: (f - 1) %n, y: (f - 1)/n, c })

})(window);