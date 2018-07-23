(function(obj){

	Object.assign(obj, {Model})

	function Model(model, id){
		var counter = 0;
		var prev = [];
		var action = 0;
		
		var predict = function(){
			while(prev.length < 4){
				prev.push(prev[0]);
			}

			var input = tf.stack(prev);
			input = tf.stack([input]);
			
			

			var out = model(input);
			
			return tf.argMax(out, 1).data();
		}

		this.reset = function(){
			this.counter = 0;
			this.prev = [];
		}

		this.action = async function(config){
			counter++;
			var inp = tf.tensor(config.screen, [80, 80]).transpose();
			if(id == 1) inp = inp.reverse();
			prev.unshift(inp)
			prev = prev.slice(0, 4);
			// if(counter % 3 != 0) return {id, dir: 0}
			var dir = await predict();

			dir = dir[0] == 0 ? -1 : 1;
			action = dir
			return {id, dir }
		}
	}
})(window)
