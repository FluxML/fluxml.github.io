var init = function (){
	var canvas = document.querySelector("#cppn"),
	ctx = canvas.getContext('2d'),
	{width, height} = canvas.getBoundingClientRect(),
	w = 128, h = 128, i = 0, j = 0, z, z_dim = 2;

	canvas.width = w;
	canvas.height = h;
	var factor = Math.min(w, h);

	function getCoords(width, height){	
		var x, y, r, collection = [];
		for(var i=0; i< width; i++){
			x = (i/factor) - 0.5
			for(var j=0; j< height; j++){
				y = (j/factor) - 0.5
				r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
				collection.push([x, y, r]);
			}
		}
		return collection;
	}

	var counter = (new Array(z_dim)).fill(0);
	var coords = getCoords(w, h);
	function draw(z){
		var collection = coords.map(point=>point.concat(...z));
		model(tf.transpose(tf.tensor(collection, [w*h, 3 + z_dim]))).data().then((img)=>{
			drawImage(canvas, img, {width: w, height: h});
			counter  = counter.map(e => (e + 1/102));
			_z = counter.map(e=>Math.sin(e));
			requestAnimationFrame(()=>{tf.tidy(()=>draw(_z))});
		})
	}
	
	tf.randomUniform([z_dim]).data().then((z)=>{
		counter = z.map(e=>Math.sinh(e));
		requestAnimationFrame(()=>{tf.tidy(()=>draw(z))});
	})
}