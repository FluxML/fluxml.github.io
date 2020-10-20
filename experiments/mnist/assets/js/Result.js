(function(){

Object.assign(window, {Result});

function Result (ele, 
	{	
		labels=[...Array(10).keys()],  // default labels from 0 to 9
		max=1,
		maxHeight=100,
		barWidth=10,
		horizontalSpacing=10,
		color=getComputedStyle(document.body).getPropertyValue('--medium'),
		fontSize=16,  
		fontFamily="arial",
		verticalSpacing=20,
		highlight=getComputedStyle(document.body).getPropertyValue('--dark'),
		padding=20
    }={})
{
	this.canvas = ele;
	this.ctx = this.canvas.getContext('2d');
	this.labels = labels;
	this.max = max;
	this.maxHeight = maxHeight;
	this.barWidth = barWidth;
	this.horizontalSpacing = horizontalSpacing;
	this.color = color;
	this.fontSize = fontSize;
	this.fontFamily = fontFamily;
	this.verticalSpacing = verticalSpacing;
	this.highlight = highlight;
	this.padding = padding;
	this.topMargin = this.canvas.height - (2*this.padding + this.fontSize + this.maxHeight + this.verticalSpacing);
}

Result.prototype.setUp = function(){
	var labelTopOffset = this.topMargin + this.maxHeight + this.verticalSpacing + this.padding;
	var labelLeftOffset = this.padding;
	this.ctx.fillStyle = this.color;
	this.ctx.font = this.fontSize + "px " + this.fontFamily;
	
	for(var label of this.labels){
		this.ctx.fillText(label, labelLeftOffset, labelTopOffset);
		labelLeftOffset += this.barWidth + this.horizontalSpacing;
	}
}

Result.prototype.update = function(values){
	var scope = this;
	var max_i = 0;

	scope.ctx.clearRect(0, 0, scope.canvas.width, scope.canvas.height);
	this.setUp();	// write the labels again ( remove highlighting )

	// draw as histogram
	values.forEach((val, i)=>{
		fill(val, i, scope.color);
		if(val> values[max_i]){
			max_i = i;
		}
	})

	// highlight highest bar
	fill(values[max_i], max_i, scope.highlight);
	var labelTopOffset = this.topMargin + this.maxHeight + this.verticalSpacing + this.padding;
	var labelLeftOffset = max_i * ( this.barWidth + this.horizontalSpacing ) + this.padding;
	this.ctx.fillStyle = this.highlight;
	this.ctx.font = this.fontSize + "px " + this.fontFamily;
	this.ctx.fillText(this.labels[max_i], labelLeftOffset, labelTopOffset);

	// for filling each bar
	function fill(val, i, color){	
		var height = scope.maxHeight * (val/scope.max);
		var leftOffset = i*(scope.horizontalSpacing + scope.barWidth) + scope.padding;
		var topOffset = scope.topMargin + (scope.maxHeight - height) + scope.padding;
		
		scope.ctx.fillStyle = color;
		scope.ctx.fillRect(leftOffset, topOffset, scope.barWidth, height);
	}
}

})(window)