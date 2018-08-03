
var __init__ = function (){
	var models = { abstract_art, popsty, starry_night }

	function wrap(n, x){
		return new Model(n, x);
	}

	for(var i in models){
		models[i] = wrap(i, models[i])
	}

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
			var name = e.querySelector("img").getAttribute("data-name");
			$$("#style-img").setAttribute("data-name", name);
			models[name].load();
		}
	})

	$$("#upload_button").onclick = ()=>{
		$$('#imageReader').click();
	}


	$$("#generate").onclick = ()=>{
		var conImg = $$("#content-img")
		var conCanvas = getImageCanvas(conImg, conImg.width, conImg.height);
		var styleName = $$("#style-img").getAttribute("data-name");
		if(conImg.src == ""){
			return showErr("Please choose a content image")
		}else if(styleName == null){
			return showErr("Please choose a style image")
		}
		var obj = {t: false};
		$$(".tree").setAttribute("green", true)
		glow(false, obj)
		var model = models[styleName];
		var input = _transformInput(conCanvas);
		model.predict(input).then((out)=>{
			if(out != null){
				$$("#output-img").src = imagedata_to_uri(out);
				obj.t = true;
			}else{
				console.log(out);
			}
		})
	}

	function glow(a, obj){
		setTimeout(() => {
			$$(".tree").setAttribute("green", a)
			if(!obj.t) glow(!a, obj);
		}, 1000)
	}

	$$("#imageReader").onchange = function(){	
		var file = this.files[0];
		$$("#content-img").src = window.URL.createObjectURL(file);
	}

}

__init__();