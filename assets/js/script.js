function CPPN(model, canvas, {z_dim=2, w=105, h=105}={}){
	canvas.width = w;
	canvas.height = h;

	var getCoords = function(){
		var x, y, r, collection = [];
		for(var i=0; i< w; i++){
			x = (i/factor) - 0.5
			for(var j=0; j< h; j++){
				y = (j/factor) - 0.5
				r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
				collection.push([x, y, r]);
			}
		}
		return collection;
	}
	
	var next = z => requestAnimationFrame( call( tf.tidy, call( draw, z)));

	var draw = function(z){
		var collection = coords.map(point=>point.concat(...z));
		model(tf.transpose(tf.tensor(collection, [w*h, 3 + z_dim]))).data().then((img)=>{
			drawImage(canvas, img, {width: w, height: h});
			counter  = counter.map(e => (e + 1/102));
			_z = counter.map(e=>Math.sin(e));
			next(_z);
		})
	}

	var factor = Math.min(w, h);
	var counter = (new Array(z_dim)).fill(0);
	var coords = getCoords();

	this.start = function(){
		tf.randomUniform([z_dim]).data().then((z)=>{
			counter = z.map(e=>Math.sinh(e));
			next(z);
		})
	}
}

var __init__ = function (){
	var canvas = document.querySelector("#cppn");
	var cppn = new CPPN(model, canvas);
	cppn.start();
}


function call(f){
	var f_ = f;
	arguments[0] = this
	return ()=> f_.call(...Array.from(arguments));
}