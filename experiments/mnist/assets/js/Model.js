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
		
		var output = tf.tidy(() => {
			var tensor = tf.tensor(input, [28, 28]).transpose().reshape([1, 1, 28,28]);
			return this.model(tensor);
		});
		
		output.data().then(function(val){
			(scope.showResult.bind(scope))(val);
			tf.dispose(output);
		})
	}

	// 28*28*4 rgba Unit8 array into 28*28 grayscale Float32Array 
	Model.prototype.blackAndWhite = function(imageData){
		return (
			(new Float32Array(784)).fill(0.0)
			.map((_, i) => imageData[i*4 + 3])
			.map(reduceToGrayScale)
		);
	}

	Model.prototype.showResult = function(val){
		this.result.update(val)
	}

})(window)


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