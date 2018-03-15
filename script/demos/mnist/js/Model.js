(function(obj){

	Object.assign(obj, {Model})

	function Model(editor, result, model){
		this.editor = editor;
		this.result = result;
		this.model = model;

		var scope = this;
		this.editor.setDrawEndCallback(callback.bind(scope))
		
		function callback(image){
			this.findResult(image)
		}
	}

	Model.prototype.findResult = function(image){
		var scope = this;
		var input = this.blackAndWhite(image.data);
		
		drawImage(document.querySelector('#number'), input.map((_, i)=>input[transpose(i, 28, 28)]))
		
		var tensor = dl.tensor(input);	

		var output = this.model(tensor);

		output.data().then(function(val){
			(scope.showResult.bind(scope))(val);
		})
	}

	// 28*28*4 rgba Unit8 array into 28*28 grayscale Float32Array 
	Model.prototype.blackAndWhite = function(imageData){
		return (
			(new Float32Array(784)).fill(0.0)
			.map((_, i)=> transpose(i, 28, 28))
			.map(i => imageData[i*4])
			.map(invertColor)
			.map(reduceToGrayScale)
		);
	}

	Model.prototype.showResult = function(val){
		console.log(val)
		this.result.update(val)
	}

})(window)

function invertColor(color){
	return 255 - color
}

function reduceToGrayScale(i){
	return i/255;
}

function transpose(i, row, col){
	return ((i%col)*row + Math.floor(i/row))
}

function reverse(i, size){
	return size - i - 1;
}

