(function(obj){

obj.MCTS = obj.MCTS || {}


var to_flat = (l, n) => l.type=="pass" ? n * n + 1 : l.y * n + l.x + 1;
var to_obj = (f, c, n) =>  f == n * n + 1? ({type:"pass", c}):({type: "stone", x: Math.floor((f - 1) %n), y: Math.floor((f - 1)/n), c })
var safe_div = (n, d) => d == 0? n*1000/Math.random() : n/d;

Object.assign(obj.MCTS, {to_flat, to_obj, safe_div})

})(window);