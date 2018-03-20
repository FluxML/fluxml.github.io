function loadWeights(url, progressContainer, __init__){
	let Buffer = new BSON().serialize({}).constructor

	// send an xhr Request so as to show event progress
	var weightsRequest = new XMLHttpRequest();
	weightsRequest.open('GET', url);
	weightsRequest.responseType = "arraybuffer";

	// initialise progress bar
	var pbar = new ProgressBar({
		xhr: weightsRequest,
		container: progressContainer,
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

}