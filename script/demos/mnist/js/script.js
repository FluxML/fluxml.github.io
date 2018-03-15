var editor, result;
function __init__(){
	// set up editor
	editor = new Editor(document.querySelector("#editor"));
	editor.setUp();

	result = new Result(document.querySelector("#result"));
	result.setUp();

	document.querySelector("#clearEditor").addEventListener('click', function(){
		editor.clear();
	});

	model = new Model(editor, result, model);
}
		
// draw number
var numberCanvas = document.querySelector("#number");
// drawImage(numberCanvas, exampleArray)

function drawImage(numberCanvas, data){

	var ctx = numberCanvas.getContext('2d');
	ctx.clearRect(0, 0, 28, 28);
	var rgbaArray = floatToUint8Clamped(data.map(i=> i*255));
	var imgData = ctx.createImageData(28,28);
	imgData.data.map((e, i)=>{
		imgData.data[i] = rgbaArray[i];
	})

	ctx.putImageData(imgData, 0, 0);
}

//convert float array into rgba Unit8ClampedArray
function floatToUint8Clamped(floatArray){
	var uint8Array = new Uint8ClampedArray(floatArray);
	var rgbaArray = new Uint8ClampedArray(uint8Array.length * 4);

	uint8Array.forEach((e, i)=>{
		rgbaArray[i*4] = e;
		rgbaArray[i*4 + 1] = e;
		rgbaArray[i*4 + 2] = e;
		rgbaArray[i*4 + 3] = 255;
	})
	return rgbaArray;
}

