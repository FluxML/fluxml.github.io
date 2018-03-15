// flux.fetchWeights('mnist-mlp.bson').then(ws=>{
// 	console.log("loaded")
// 	model.weights = ws;
// 	__init__();
// })

let Buffer = new BSON().serialize({}).constructor

// send an xhr Request so as to show event progress
var weightsRequest = new XMLHttpRequest();
weightsRequest.open('GET', 'assets/bson/mnist-mlp.bson');
weightsRequest.responseType = "arraybuffer";

// initialise progress bar
var pbar = new ProgressBar({
	xhr: weightsRequest,
	container: document.querySelector('.render_editor'),
	done: function(res){
		if(res.currentTarget.readyState == 4 && res.currentTarget.status == 200){
			var response = new Buffer(res.currentTarget.response);
			var data = new BSON().deserialize(response);
			model.weights = flux.convertArrays_(data).weights;
		}
		__init__()
	},
	err: console.log
})

window.onload = ()=>{
	weightsRequest.send();
	pbar.start();
}

