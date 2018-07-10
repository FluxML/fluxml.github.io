(function(obj){

obj.MCTS = obj.MCTS || {}


var to_flat = (l, n) => l.type=="pass" ? n * n + 1 : l.y  + l.x * n + 1;
var to_obj = (f, c, n) =>  f == n * n + 1? ({type:"pass", c}):({type: "stone", x: Math.floor((f - 1)/n), y: Math.floor((f - 1) % n), c })
var safe_div = (n, d) => d == 0? n*1000/Math.random() : n/d;
var deepcopy = (arr) => (JSON.parse(JSON.stringify({arr})).arr);
function argMax(arr){
	var i = 0;
	for(var j = 0; j< arr.length; j++){
		if(arr[j]> arr[i])
			i = j;
	}
	return i
}

Object.assign(obj.MCTS, {to_flat, to_obj, safe_div, deepcopy, argMax})

})(window);