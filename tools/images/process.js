// draw a number from grayscale float data
function drawImage(numberCanvas, data, {width=28, height=28}={}){
	var ctx = numberCanvas.getContext('2d');
	ctx.clearRect(0, 0, width, height);
	var rgbaArray = floatToUint8Clamped(data.map(i=> i*255));
	var imgData = ctx.createImageData(width, height);
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

// invert color value 
function invertColor(color){
	return 255 - color
}

// grayscale for mnist classifier
function reduceToGrayScale(i){
	return i/255;
}

// returns index in the transposed matrix
function transpose(i, row, col){
	return ((i%col)*row + Math.floor(i/row))
}

// for reverse traversal
function reverse(i, size){
	return size - i - 1;
}

