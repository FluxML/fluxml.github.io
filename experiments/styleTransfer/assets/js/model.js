// dummy model
// var model = {
// 	predict : () => { return new Promise((a, b)=>{ setTimeout(() => a(null), 100) }) },
// 	loadWeights: ()=> { }
// }
(function(obj){

var mean = [123.675 ,116.79, 104.04]

function Model(name, model, loaded=false){
	var _input = null;
	this.load = function(){
		if(loaded) return;
		console.log("loading", name)
		loadWeights('./assets/bson/' + name +'_fluxjs.bson', document.querySelector('.demo_wrapper'), this.onload.bind(this), model)
	}

	this.onload = function(){
		console.log("loaded")
		loaded = true;
		model = wrap(model);
		if(_input) this.predict(_input)
	}

	this.predict = function(data){
		if(!loaded) {
			_input = data
			this.load();
		}
		
		var input = this.pre(data);
		var out = model(input);
		return out.data().then(res =>{
			_input = null
			res = this.post(res, data.width, data.height)
			
			var i = new Uint8ClampedArray(res);
			var idata = new ImageData(i, data.width, data.height)
			return idata;
		})

	}

	this.pre = function(data){
		var rgb = data.data;
		var input = [[], [], []];
		for(var i =0; i< data.height; i++){
			var r = [];
			var g = [];
			var b = [];
			for(var j =0; j< data.width; j++){
				r.push(data.data[i*data.width*4 + j*4] - mean[0])
				g.push(data.data[i*data.width*4 + j*4 + 1] - mean[1])
				b.push(data.data[i*data.width*4 + j*4 + 2] - mean[2])
			}
			input[0].push(r)
			input[1].push(g)
			input[2].push(b)
		}
		input = tf.tensor([input])
		return input;
	}

	this.post = function(res, w,h){
		var t = new Array(w*h*4).fill(255);
		for(var c = 0; c< 3; c++){
			for(var i = 0; i< h; i++){
				for(var j = 0; j< w; j++){
					t[i*w*4 + j*4 + c] = res[c*w*h + i*h + j] + mean[c];
				}
			}
		}
		return t;
	}

}

function wrap(m){
	return (x) => tf.tidy(() => m(x))
}

Object.assign(obj, {Model})

})(window);