(function(){

Object.assign(window, {Editor})

// editor 
function Editor(ele, 
	{
		strokeWidth=15,
		color="#000",
		scale=1,
		background="#fff"
	}={})
{
	this.canvas = ele;
	this.ctx = ele.getContext('2d');
	this.strokeWidth = strokeWidth;
	this.color = color;
	this.prevPoint = null;

	this.ctx.scale(scale, scale);
	this.ctx.fillStyle = background;
	this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
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
	scope.ctx.beginPath();
	scope.ctx.fillStyle = "#fff";
	scope.ctx.rect(0, 0, scope.canvas.width, scope.canvas.height);
	scope.ctx.fill();
	scope.prevPoint =  null;
}

Editor.prototype.getImage = function() {
	var imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
	
	// create a hidden canvas, render the image as 28*28 and then extract data
	var hiddenCanvas  = document.createElement('canvas');
	hiddenCanvas.width = 28;
	hiddenCanvas.height = 28;
	var hctx = hiddenCanvas.getContext('2d');
	hctx.drawImage(this.canvas,0, 0, this.canvas.width, this.canvas.height,0, 0, 28, 28);
	return hctx.getImageData(0, 0, 28, 28)
};



})(window);