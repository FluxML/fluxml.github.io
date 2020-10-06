function loadWeights(url, pc, func, model=null){
	return _loadWeights([{url, model: (model || window.model)}], pc, func);
}

function _loadWeights(configArr, progressContainer, __init__){

	let Buffer = new BSON().serialize({}).constructor

	// send an xhr Request so as to show event progress
	var config = configArr.map((c)=>{
		var weightsRequest = new XMLHttpRequest();
		weightsRequest.open('GET', c.url);
		weightsRequest.responseType = "arraybuffer";
		return Object.assign({}, c, {xhr: weightsRequest})
	});

	// initialise progress bar
	var pbar = new ProgressBar({
		config,
		container: progressContainer,
		done: function(results){
			results.forEach(({event, model})=>{
				{
					var target = (event.currentTarget || event.target);
					var response = new Buffer(target.response);
					var data = new BSON().deserialize(response);
					model.weights = flux.convertArrays_(data).weights;
				}
			});
			__init__()
		},
		err: console.log
	})

	
	pbar.start();
	config.forEach(({xhr}) => xhr.send());
}