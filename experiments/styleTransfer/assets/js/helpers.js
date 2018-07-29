// general
var $$ = (e)=> document.querySelector(e);

function getImageCanvas(screen, width, height){
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	canvas.getContext('2d').drawImage(screen, 0, 0);
	return canvas
}

function _transformInput(canvas){
	return canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
}

function _transformOutput(res){
	return imagedata_to_image(res)
}

var timeOut = null;

function showErr(msg){
	$$(".msg").innerText = msg;
	if(timeOut == null)
		$$(".msg").className += " in";
	clearTimeout(timeOut);
	timeOut = setTimeout(()=>{
		$$(".msg").className = $$(".msg").className.replace(" in", "");
		timeOut = null;
	}, 3000);
}

function getImageData(img){
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	var img = document.getElementById('myimg');
	canvas.width = img.width;
	canvas.height = img.height;
	context.drawImage(img, 0, 0 );
	return context.getImageData(0, 0, img.width, img.height);
}

function imagedata_to_uri(imagedata) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);
    return canvas.toDataURL();
}