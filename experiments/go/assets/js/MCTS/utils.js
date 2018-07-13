(function(obj){

obj.MCTS = obj.MCTS || {}


var to_flat = (l, n) => l.type=="pass" ? n * n + 1 : l.y  + l.x * n + 1;
var to_obj = (f, c, n) =>  f == n * n + 1? ({type:"pass", c}):({type: "stone", x: Math.floor((f - 1)/n), y: Math.floor((f - 1) % n), c })
var safe_div = (n, d) => d == 0? n*1000/Math.random() : n/d;

function argMax(arr){
	var i = 0;
	for(var j = 0; j< arr.length; j++){
		if(arr[j]> arr[i])
			i = j;
	}
	return i
}


function partition(array, n){
    return partition_(array.slice(),n)
}

function partition_ (array, n){
    if(isNaN(n))debugger;
    
    var l = array.length;
    var m = l/n 
    if(m != Math.floor(m)) throw Error("Invalid partition size")
    var res = new Array(m);
    var acc = new Array(n);
    for(var i = 0; i<l; i++){
        acc[i % n] = array[i];
        if(i % n == n - 1){
            res[Math.floor(i/n)] = acc;
            acc = new Array(n);
        }
    }
    return res;
}


function searchsortedfirst (arr, x){
    // return arr.findIndex(e => e > x)
    return bs(arr, x, 0, arr.length)
}

function bs(arr, nee, beg, end){
    if(beg >= end) return beg;

    var mid = Math.floor((beg + end)/2)

    if( arr[mid] == nee) return mid;
    else if( arr[mid] > nee) return bs(arr, nee, beg, mid - 1)
    else return bs(arr, nee, mid + 1, end)
}

Object.assign(obj.MCTS, {to_flat, to_obj, safe_div, argMax, partition, searchsortedfirst})

})(window);