(function(obj){
	var canvas = document.createElement('canvas');
	$$(".demo_wrapper").appendChild(canvas);

	var showInp = function(t, c=canvas){
		// console.log(t.shape)
		tf.toPixels(t.transpose().squeeze(), canvas)
	}

	Object.assign(obj, {Model, showInp})

	function Model(model, id){
		this.counter = 0;
		this.prev = [];
		this.a = 0;

		this.predict = function(){
			while(this.prev.length < 4){
				this.prev.push(this.prev[0]);
			}
			var input = tf.concat(this.prev.slice(), 1);
			var out = model(input);
			out.print()
			return tf.argMax(out, 1).data();
		}

		this.reset = function(){
			this.counter = 0;
			this.prev = [];
		}

		this.action = async function(config){
			this.counter++;
			var inp = tf.tensor(config.screen, [1, 1, 80, 80])
			if(id == 0) inp = inp.reverse();
			this.prev.unshift(inp)
			this.prev = this.prev.slice(0, 4);
			// if(this.counter % 4 != 0) return {id, dir: this.a}
			var dir = await this.predict();
			dir = dir[0] == 1 ? -1 : dir[0] == 2? 1 : 0;
			if(id == 0) dir *= -1;
			this.a = dir
			return {id, dir }
		}

		
	}
})(window)
