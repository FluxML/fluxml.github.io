(function(){

Object.assign(window, {Editor})

// editor 
function Editor(ele, 
	{
		strokeWidth=15,
		// color="#555",
		color=getComputedStyle(document.body).getPropertyValue('--medium'),
		scale=1
	}={})
{
	this.canvas = ele;
	this.ctx = ele.getContext('2d');
	this.strokeWidth = strokeWidth;
	this.color = color;
	this.prevPoint = null;

	this.ctx.scale(scale, scale);
	this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
	this.callback = null;
}

Editor.prototype = Object.create(EventTarget.prototype)

Editor.prototype.draw = function({clientX, clientY}={}){
	// event end might trigger clientX = 0 and clientY = 0
	if(clientX == 0 && clientY == 0)return;
	
	var editorOffsets = this.canvas.getClientRects()[0];
	var dx = clientX - editorOffsets.left - 16;
	var dy = clientY - editorOffsets.top - 16;
	if(this.prevPoint){
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.color;
		this.ctx.moveTo(this.prevPoint.dx, this.prevPoint.dy);
		this.ctx.lineWidth = this.strokeWidth;
		var xc = (this.prevPoint.dx + dx) / 2;
      	var yc = (this.prevPoint.dy + dy) / 2;
		this.ctx.quadraticCurveTo(xc, yc, dx, dy);
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		this.ctx.arc(dx, dy, this.strokeWidth*.5, 0, Math.PI * 2, true);
		this.ctx.fill();
	}
	this.prevPoint = {dx, dy};
}

Editor.prototype.handleDrawEvent = function(event){
	event.preventDefault();
	var scope = this;
	if(event instanceof MouseEvent){
		this.draw(event);
	}else if(event instanceof TouchEvent){
		Array.prototype.forEach.call(event.touches,( t ) => scope.draw(t))
	}
}

Editor.prototype.setUp = function(){
	var scope = this;
	scope.handleDrawEvent = scope.handleDrawEvent.bind(scope);
	if(window.innerWidth > 768){
		scope.canvas.addEventListener('mousedown', function(event){
			scope.canvas.addEventListener('mousemove',scope.handleDrawEvent, true)
		})

		scope.canvas.addEventListener('mouseup', function(event){	
			scope.canvas.removeEventListener('mousemove',scope.handleDrawEvent, true)
			scope.prevPoint = null;
			scope.drawEnd();
		})
	}else{
		scope.canvas.addEventListener('touchstart', function(event){
			scope.canvas.addEventListener('touchmove',scope.handleDrawEvent, true)
		})

		scope.canvas.addEventListener('touchend', function(event){	
			scope.canvas.removeEventListener('touchmove',scope.handleDrawEvent, true)
			scope.prevPoint = null;
			scope.drawEnd();
		})
	}
}

Editor.prototype.setDrawEndCallback = function(callback){
	this.callback = callback;
}

Editor.prototype.drawEnd = function(){
	if(this.callback != null){
		var image = this.getImage();
		this.callback(image)
	}
}

Editor.prototype.clear = function(){
	var scope = this;
	scope.ctx.clearRect(0, 0, scope.canvas.width, scope.canvas.height);
	scope.prevPoint =  null;
}

Editor.prototype.getImage = function() {
	var cropped = cropToCenter(this.canvas);
	return scale(cropped, 28, 28);
};

function scale(imgSrc, nwidth, nheight){
	// create a hidden canvas, render the image as 28*28 and then extract data
	var hiddenCanvas  = document.createElement('canvas');
	hiddenCanvas.width = nwidth;
	hiddenCanvas.height = nheight;
	var hctx = hiddenCanvas.getContext('2d');
	hctx.drawImage(imgSrc,0, 0, imgSrc.width, imgSrc.height,0, 0, nwidth, nheight);
	return hctx.getImageData(0, 0, nwidth, nheight);
}


function cropToCenter(imgSrc) {
	var imgData = imgSrc.getContext("2d").getImageData(0, 0, imgSrc.width, imgSrc.height)
	var { data, width, height } = imgData

	let [xmin, ymin] = [width, height]
	let [xmax, ymax] = [-1, -1]
	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			var idx = i + j * width
			if (data[4 * idx + 3] > 0) {
				if (i < xmin) xmin = i
				if (i > xmax) xmax = i
				if (j < ymin) ymin = j
				if (j > ymax) ymax = j
			}
		}
	}

	xmin -= 10
	xmax += 10
	ymin -= 10
	ymax += 10

	let [widthNew, heightNew] = [xmax - xmin + 1, ymax - ymin + 1]
	if (widthNew < heightNew) {
		var half = Math.floor((heightNew - widthNew) / 2)
		xmax += heightNew - widthNew - half
		xmin -= half
		widthNew = xmax - xmin + 1
	} else if (widthNew > heightNew) {
		var half = Math.floor((widthNew - heightNew) / 2)
		ymax += widthNew - heightNew - half
		ymin -= half
		heightNew = ymax - ymin + 1
	}
	var dataNew = new Uint8ClampedArray(widthNew * heightNew * 4)
	for (var i = xmin; i <= xmax; i++) {
		for (var j = ymin; j <= ymax; j++) {
			if (i >= 0 && i < width && j >= 0 && j < height) {
				var idx = i + j * width
				var idxNew = i - xmin + (j - ymin) * widthNew
				dataNew[4 * idxNew + 3] = data[4 * idx + 3]
			}
		}
	}

	var nImgData = new ImageData(dataNew, widthNew, heightNew)
	var nImgSrc = document.createElement("canvas");
	nImgSrc.height = nImgData.height;
	nImgSrc.width = nImgData.width;
	nImgSrc.getContext("2d").putImageData(nImgData, 0, 0);
	return nImgSrc;

}

})(window);