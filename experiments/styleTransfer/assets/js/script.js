var __init__ = function(){

	// event listeners
	$$('#screenshot-button').onclick = function() {
		var video = $$('#screenshot-video');
		var canvas = getImageCanvas(video, video.videoWidth, video.videoHeight);
		$$('#content-img').src = canvas.toDataURL('image/webp');
	};

	Array.from($$(".select_style ul").children)
	.forEach(e => {
		e.onclick = (event)=>{
			$$("#style-img").setAttribute("src", e.querySelector("img").getAttribute("src"));
			var id = e.querySelector("img").getAttribute("img-id");
			$$("#style-img").setAttribute("img-id", id);
			model.loadWeights(id);
		}
	})

	$$("#upload_button").onclick = ()=>{
		$$('#imageReader').click();
	}


	$$("#generate").onclick = ()=>{
		var conImg = $$("#content-img")
		var conCanvas = getImageCanvas(conImg, conImg.width, conImg.height);
		var styleId = $$("#style-img").getAttribute("img-id");
		if(conImg.src == ""){
			return showErr("Please choose a content image")
		}else if(styleId == null){
			return showErr("Please choose a style image")
		}
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

	$$("#imageReader").onchange = function(){	
		var file = this.files[0];
		$$("#content-img").src = window.URL.createObjectURL(file);
	}

}

__init__();