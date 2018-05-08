var init = function (){
	var canvas = document.querySelector("#cppn"),
	ctx = canvas.getContext('2d'),
	{width, height} = canvas.getBoundingClientRect(),
	w = 128, h = 128, i = 0, j = 0, z, z_dim = 2;

	// if(width > height){
	// 	h = Math.floor(height*w/width);
	// }else{
	// 	w = Math.floor(width*h/height);
	// }
	console.log(w, h, width, height)

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
				// collection.push(x, y, r, ...z, 1);
			}
		}
		return collection;
	}

	// function getColorAt(i, j, factor, z){
	// 	// console.log(i, j)
	// 	var x = (i/factor) - 0.5;
	// 	var y = (j/factor) - 0.5;
	// 	r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) 
	// 	var input = tf.tensor([x, y, r].concat(...z, 1));
	// 	model(input).data().then(([v])=>{
	// 		console.log(i, j, v*255)
	// 	})	
	// }

	
	// function animate(){
	// 	getColorAt(i, j, factor, z);
	// 	j++;
	// 	if(j == h){
	// 		j = 0;
	// 		i++;
	// 	}
	// 	if(i == w)return;

	// 	requestAnimationFrame(animate)
	// }
	
	// Promise.all([tf.randomUniform([8]).data(), tf.randomUniform([8]).data()]).then((_z)=>{
	// 	var z1 = _z[0],
	// 	zn = _z[1],
	// 	n = 30,
	// 	t = z1.map((e, k)=>{
	// 		return zn[k] - e;
	// 	}),
	// 	latentVec = [z1];
	// 	for(var a = 1; a<n-1; a++){
	// 		var d = z1.map((e, k)=>{return e + a*t[k]});
	// 		latentVec.push(d);
	// 	}
	// 	// latentVec.push(zn);

	// 	// requestAnimationFrame(animate)
	// 	// Promise.all(getImage(w, h, z)).then(r=>{
	// 	// 	var img = r.map(e=>e[0])
	// 	// 	console.log(img)
	// 	// 	drawImage(canvas, img, {width: w, height: h})
	// 	// })

	// 	// var collection = getImage(w, h, z1);
	// 	// console.log(collection);
	// 	// var vec = tf.transpose(tf.tensor(collection, [w*h, 12]))
	// 	// console.log(vec)
	// 	// vec.data().then(console.log)

	// 	var coords = getCoords(w, h)

	// 	// images = [];
	// 	Promise.all(latentVec.map((z, i)=>{
	// 		var collection = coords.map(point=>point.concat(...z, 1))
	// 		console.log(i, collection, w*h, w*h*12)
	// 		// return Promise.all(collection.map((e, i)=>{
	// 		// 	return model(tf.tensor(e)).data();
	// 		// }))
	// 		return model(tf.transpose(tf.tensor(collection, [w*h, 12]))).data();
	// 	})).then(imgs=>{
	// 		console.log("done", imgs[0]);
	// 		// imgs = _imgs.map(img=> img.map(e=>e[0]))
	// 		var tic = 0;
	// 		var dir = 0;
	// 		clock = setInterval(()=>{
	// 			drawImage(canvas, imgs[tic], {width: w, height: h})
	// 			if(dir == 0)tic++;
	// 			else tic--;

	// 			if(tic == imgs.length){
	// 				tic = Math.max(imgs.length - 2, 0);
	// 				dir = 1;
	// 			}else if(tic < 0){
	// 				tic = Math.min(1, imgs.length - 1);
	// 				dir = 0;
	// 			}
	// 		}, 100)
	// 	})
	// })

	var counter = (new Array(z_dim)).fill(0);

	var coords = getCoords(w, h)
	function draw(z){
		console.log(z)
		var collection = coords.map(point=>point.concat(...z));
		// console.log(collection)
		model(tf.transpose(tf.tensor(collection, [w*h, 3 + z_dim]))).data().then((img)=>{
			drawImage(canvas, img, {width: w, height: h});
			// _z = z.map((e, o)=> {
			// 	// if(Math.floor(e) == 1)k = -1;
			// 	_e = Math.cos(e + 1/102) ;
			// 	diff[o] = _e - e;
			// 	return _e;
			// });

			counter  = counter.map(e => (e + 1/102));
			_z = counter.map(e=>Math.sin(e));
			requestAnimationFrame(()=>{tf.tidy(()=>draw(_z))});
		})
	}
	tf.randomUniform([z_dim]).data().then((z)=>{
		requestAnimationFrame(()=>{tf.tidy(()=>draw(z))});
	})
}