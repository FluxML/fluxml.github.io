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

			var input = tf.concat(prev.slice(), 1);
			var out = model(input);
			// out.print()
			// debugger
			return tf.argMax(out.reverse(), 1).data();
		}

		this.reset = function(){
			this.counter = 0;
			this.prev = [];
		}

		this.action = async function(config){
			counter++;
			var inp = tf.tensor(config.screen, [1, 1, 80, 80])
			if(id == 0) inp = inp.reverse();
			prev.unshift(inp)
			prev = prev.slice(0, 4);
			if(counter % 4 != 0) return {id, dir: action}
			var dir = await predict();
			// console.log(dir)
			dir = dir[0] == 1 ? -1 : dir[0] == 2? 1 : 0;
			if(id == 0) dir *= -1;
			action = dir
			return {id, dir }
		}
	}
})(window)
