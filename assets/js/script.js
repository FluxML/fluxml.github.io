(function(){
function Screen(ele, w, h){
	this.frames = [];
	this.isDrawing = false;

	this.index = 0;
	var l = w*h;
	var canvas = ele;

	this.addFrame = function(data){
		this.frames.push(data);
	}

	this.next = function(){
		if(this.frames.length ==0) return;

		this.index = Math.floor((this.index + 1)%(this.frames.length));
		if(!this.isDrawing)
			requestAnimationFrame(this.draw_);
	}


	this.draw_ = function(){
		if(this.isDrawing || this.frames.length == 0)return;

		this.isDrawing = true;
		var data = this.frames[this.index];

		var img = [];
		for(var i = 0; i< w*h; i++){
			c = data[i]*255;
			img.push(c, c, c, 255);
		}

		var uint8 = new Uint8ClampedArray(img);
		var imgData = new ImageData(uint8,w,h);


		canvas.getContext("2d", {alpha: false}).putImageData(imgData, 0, 0)
		this.isDrawing = false;
	}

	this.draw_ = this.draw_.bind(this);
	this.frameCount = ()=> this.frames.length;
}


function CPPN(canvas, {z_dim=2, w=100, h=100, rate=1, max=1, frames = 1000, func=Math.sin}={}){
	canvas.width = w;
	canvas.height = h;

	// scaling canvas since CSS scaling is faster
	canvas.style.width = w + "px";
	canvas.style.height = h + "px";
	var scaleX = window.innerWidth/ canvas.width;
	var scaleY = canvas.parentElement.offsetHeight / canvas.height;
	canvas.style.transform = "scaleX("+ scaleX +") scaleY(" + scaleY +")";
	canvas.style.transformOrigin = "0 0";


	var screen = new Screen(canvas, w, h);
	var model_ = null;

	var counter = new Array(z_dim);
	var speed = 2*Math.PI/frames;
	var factor = Math.min(w, h);
	var coords = getCoords();
	var zArr = new Array(frames);

	tf.randomUniform([z_dim]).data().then((counter)=>{
		for(var i = 0; i< frames; i++){
			var z_ = new Array(z_dim);
			for(var j = 0; j< z_dim; j++){
				var n = counter[j] + speed;
				z_[j] = max*func(rate*n);
				counter[j] = n;
			}
			zArr[i] = z_;
		}
	})

	function getCoords(){
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

	var next = z => requestAnimationFrame( call( draw, z));

	var draw = function(){
		// console.log("draw ")
		if(screen.frameCount() >= frames){
			screen.next();
			return next();
		}
		var index = screen.frameCount();

		var l = coords.length
		var collection = new Array(l);


		var z = zArr[index];
		for(var j = 0; j< l; j++){
			collection[j] = coords[j].concat(z);
		}

		var input = tf.tensor(collection, [l, 3 + z_dim]);
		var output = model_(input);
		tf.dispose(input);

		output.data().then(r=>{
			screen.addFrame(r);
			screen.next();
			tf.dispose(output);
		})

        next();
	}

	this.start = function(model){
		model_ = e => tf.tidy(() => model(e));

		next();
	}
}

var canvas = document.querySelector("#cppn");
var cppn = new CPPN(canvas);

function call(f){
	var f_ = f;
	arguments[0] = this
	return ()=> f_.call(...Array.from(arguments));
}

window.__init__ = ()=> cppn.start(model);
})();
