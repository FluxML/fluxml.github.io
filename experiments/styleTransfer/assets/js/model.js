// dummy model
var model = {
	predict : () => { return new Promise((a, b)=>{ setTimeout(() => a(null), 100) }) },
	loadWeights: ()=> { }
}