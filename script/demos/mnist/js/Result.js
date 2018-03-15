(function(){

Object.assign(window, {Result});

function Result (ele, 
	{	
		labels,
		max=1,
		maxHeight=100,
		barWidth=10,
		horizontalSpacing=10,
		color="#777",
		fontSize=16,  
		fontFamily="arial",
		verticalSpacing=20,
		highlight="#555"
    }={})
{
	this.canvas = ele;
	this.ctx = this.canvas.getContext('2d');
	if(labels == undefined){
		labels = [];
		(new Array(10)).fill(0).forEach((e, i)=>{
			labels.push(i);
		})
	}

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
}

Result.prototype.setUp = function(){
	var labelTopOffset = this.maxHeight + this.verticalSpacing;
	var labelLeftOffset = 0;
	this.ctx.fillStyle = this.color;
	this.ctx.font = this.fontSize + "px " + this.fontFamily;
	
	for(var label of this.labels){
		this.ctx.fillText(label, labelLeftOffset, labelTopOffset);
		labelLeftOffset += this.barWidth + this.horizontalSpacing;
	}
}

Result.prototype.update = function(values){
	this.setUp();

	var scope = this;
	var max_i = 0;
	
	values.forEach((val, i)=>{
		fill(val, i, scope.color);
		if(val> values[max_i]){
			max_i = i;
		}
	})

	fill(values[max_i], max_i, scope.highlight);

	var labelTopOffset = this.maxHeight + this.verticalSpacing;
	var labelLeftOffset = max_i * ( this.barWidth + this.horizontalSpacing );
	this.ctx.fillStyle = this.highlight;
	this.ctx.font = this.fontSize + "px " + this.fontFamily;
	this.ctx.fillText(this.labels[max_i], labelLeftOffset, labelTopOffset);

	function fill(val, i, color){	
		var height = scope.maxHeight * (val/scope.max);
		var leftOffset = i*(scope.horizontalSpacing + scope.barWidth);
		var topOffset = (scope.maxHeight - height);
		scope.ctx.clearRect(leftOffset, 0, scope.barWidth, scope.maxHeight);
		scope.ctx.fillStyle = color;
		scope.ctx.fillRect(leftOffset, topOffset, scope.barWidth, height);
	}

}

})(window)