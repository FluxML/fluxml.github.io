function Model(color, url){
	var scope = this;
	scope.color = color;
	scope.mctsPlayer = null;

	scope.getMCTSPlayer = function(){
		var progress = (e)=>{
			console.log("loading...", e.loaded/e.total);
		}
		var load = (e, res, rej) =>{
			// check success
			var data = JSON.parse(e.currentTarget.response);
			// set mctsPlayer 
			resolve()
		}

		return sendXHR("GET", url, "", progress, load);
	}

	scope.predict = function(envState){
		var data = {
			MCTSPlayer: this.mctsPlayer,
			// any other data ...
		}
		var progress = (e)=>{
			console.log("loading...", e.loaded/e.total);	
		}

		var load = (e, res, rej) =>{
			var { action } = JSON.parse(e.currentTarget.response);
			// action.type = play | pass
			// action = { type=play, x, y } | { type=pass }
			var {type} = action
			if (type == "pass"){
				resolve({type , c:scope.color})
			}else{
				var {x, y} = action
				resolve({type: "stone", x, y, c: scope.color})
				
			}

		}

		return sendXHR("POST", url, "", progress, load);
	}


	function sendXHR(method, url, data, progress, load){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url);
		xhr.send(data);
		return new Promise(function(resolve, reject){
			xhr.addEventListener("progress", function(p){
				progress(p, resolve, reject);
			})

			xhr.addEventListener("load", function(event){
				load(event, resolve, reject)
			})
		});
	}


}