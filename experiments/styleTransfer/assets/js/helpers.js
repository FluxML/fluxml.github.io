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
	return null
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