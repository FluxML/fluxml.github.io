var $$ = (e)=> document.querySelector(e);

var model = {
	predict : () => { return new Promise((a, b)=>{ a(null); }) }
}

var constraints = {
  video: {width: {exact: 256}, height: {exact: 256}}
};

var video = $$('#screenshot-video');
var capture_button = $$('#screenshot-button');
var img = $$('#content-img');

function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function handleSuccess(stream) {
  video.srcObject = stream;
}

function handleError(error) {
  console.error('Reeeejected!', error);
}

if (hasGetUserMedia()) {
  navigator.mediaDevices.getUserMedia(constraints)
  .then(handleSuccess)
  .catch(handleError);
} else {
  alert('getUserMedia() is not supported by your browser');
}

capture_button.onclick = function() {
	var canvas = getImageCanvas(video, video.videoWidth, video.videoHeight);
	img.src = canvas.toDataURL('image/webp');
};

Array.from($$(".select_style ul").children)
.forEach(e => {
	e.onclick = (event)=>{
		$$("#style-img").setAttribute("src", e.querySelector("img").getAttribute("src"));
		$$("#style-img").setAttribute("img-id", e.querySelector("img").getAttribute("img-id"));
	}
})

$$("#upload_button").onclick = ()=>{
	$$('#imageReader').click();
}

function getImage(){	
	var file = $$("#imageReader").files[0];
	$$("#content-img").src = window.URL.createObjectURL(file);
}

function getImageCanvas(screen, width, height){
	var canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	canvas.getContext('2d').drawImage(video, 0, 0);
	return canvas
}

function _transformInput(canvas){
	return canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)
}

function _transformOutput(res){
	return null
}

$$("#generate").onclick = ()=>{
	var conImg = $$("#content-img")
	var conCanvas = getImageCanvas(conImg, conImg.width, conImg.height);
	var styleId = $$("#style-img").getAttribute("img-id");
	var input = _transformInput(conCanvas);
	model.predict(input).then((res)=>{
		var out = _transformOutput(res);
		if(out != null){
			$$("#output-img").src = getImageCanvas(out.data, out.width, out.height).toDataURL();
		}else{
			console.log(out);
		}
	})
}
