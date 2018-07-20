(function(obj){
var $$ = s => document.querySelector(s);
const q = console.log;

// divide array into groups ( adjacent ones may be in same group )
Float32Array.prototype.group = Array.prototype.group = function group(size){
	return this.reduce((acc, e)=>{
		acc.a.push(e);
		if(acc.a.length == size){
			acc.b.push(acc.a);
			acc.a = []
		}
		return acc
	}, {a:[], b:[]}).b
}

// divide array into groups ( adjacent ones in diffrent groups )
Float32Array.prototype.scatter = Array.prototype.scatter = function scatter(size, func = (e) => (e %size)){
	var scatterObj = this.reduce((acc, e, i)=>{
		acc[func(i)].push(e);
		return acc;
	}, (()=>{
		a = {};
		for (var i = 0; i<size; i++){
			a[i] = [];
		}
		return a;
	})())
	scatterObj.length = Object.keys(scatterObj).length;
	return Array.from(scatterObj);
}


function resize(data, oldw, oldh, neww=100, newh=100){
	var canvas = document.createElement('canvas');
	canvas.width = oldw;
	canvas.height = oldh;
	var ctx = canvas.getContext('2d');
	ctx.putImageData(data, 0, 0);

	var hiddenCanvas  = document.createElement('canvas');
	hiddenCanvas.width = neww;
	hiddenCanvas.height = newh;
	var hctx = hiddenCanvas.getContext('2d');
	hctx.drawImage(canvas,0, 0, oldw, oldh,0, 0, neww, newh);
	return hctx.getImageData(0, 0, neww, newh);
}

function display(t, name=""){
	q("============");
	q(name);
	q("************");
	t.print();
    q(t.shape);
    t.data().then(q);
    q("============");
}



var debugger_ = {
	x: 0,
	y: 0,
	canvas: document.createElement("canvas"),
	__init__: function(){
		this.canvas.height = 500;
		this.canvas.width = 500;
		$$('.demo_wrapper').appendChild(this.canvas);

	},
	isDrawing: false,
	queue: [],
	draw: function(tensor){
		this.queue.push(tensor)
		if(!this.isDrawing)this.draw_();
	},
	draw_: function(){
		if(this.queue.length == 0){
			this.isDrawing = false;
			return;
		}
		this.isDrawing = true;
		var tensor = this.queue.shift();
		drawTensor(tensor,this.canvas, this.x, this.y).then(r =>{
			var [c, x, y] = r;
			this.canvas = c;
			this.x = x;
			this.y = y;
			console.log(x, y)
			this.draw_();
		});
	},
	nextLine: function(){
		this.x = 0;
		this.y += 100;
	}
}


debugger_.__init__()

function drawTensor(t, canvas=null, x=0, y=0){
	var [b, c, h, w] = t.shape;
	console.log(t.shape)
	var canvas = canvas || (()=>{
		var c_ = document.createElement("canvas");
		c_.widht = 500;
		c_.height = 1000;
		return c_;
	})();
	return t.data().then(data => {
		data
		.group(w*h*c)
		.map(s => s
			.group(w*h)
			.map(e => {
				var data = castRange(e);

				var [w_, h_] = drawImage(canvas, data, x, y, w, h);
				canvas.getContext('2d').strokeStyle = "#fff";
				canvas.getContext('2d').strokeRect(x, y, w_, h_)
				console.log(w_, h_)
				x += w_;
				if( x + w_> canvas.width){
					y += h_;
					x = 0;
				}
				if(y + h_ > canvas.height){
					y = 0;
				}
			})
		)
		return [canvas, x, y]
	})
}

function castRange(data, minR=0, maxR=255){
	var min = data.reduce((acc, e)=>Math.min(acc, e), data[0]);
	var max = data.reduce((acc, e)=>Math.max(acc, e), data[0]);
	console.log("min:", min, "max:", max)
	var range = max - min;
	return data.map(e => Math.round((minR + (e - min)*maxR/range)));
}


function testImg(inData){
	var test = tf.tensor(inData
		.map((_, i)=>transpose(i, 28, 28))
		.map(i=>inData[i])
		, [1, 28, 28, 1]);
	debugger_.draw(test);
	var res = model.model(test)
	res.data().then(r => {
		console.log("result", r)
		model.showResult(r);
	})
}




// draw a number from grayscale float data
function drawImage(numberCanvas, data, x=0, y=0, w=28, h=28, resize_=true){
	var ctx = numberCanvas.getContext('2d');
	ctx.clearRect(x, y, w, h);
	var rgbaArray = floatToUint8Clamped(data.map(i=> i*255));
	var imgData = ctx.createImageData(w, h);
	imgData.data.map((e, i)=>{
		imgData.data[i] = rgbaArray[i];
	})
	if(resize_)imgData = resize(imgData, w, h);
	ctx.putImageData(imgData, x, y);
	return [imgData.width, imgData.height]
}

//convert float array into rgba Unit8ClampedArray
function floatToUint8Clamped(floatArray){
	var uint8Array = new Uint8ClampedArray(floatArray);
	var rgbaArray = new Uint8ClampedArray(uint8Array.length * 4);
	uint8Array.forEach((e, i)=>{
		rgbaArray[i*4] = e;
		rgbaArray[i*4 + 1] = e;
		rgbaArray[i*4 + 2] = e;
		rgbaArray[i*4 + 3] = 255;
	})
	return rgbaArray;
}

// invert color value
function invertColor(color){
	return 255 - color
}

// grayscale for mnist classifier
function reduceToGrayScale(i){
	return i/255;
}

// returns index in the transposed matrix
function transpose(i, row, col){
	return ((i%col)*row + Math.floor(i/row))
}

// for reverse traversal
function reverse(i, size){
	return size - i - 1;
}

Object.assign(obj, {debugger_})
}(window))
