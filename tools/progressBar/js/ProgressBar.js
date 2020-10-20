(function(obj){

	Object.assign(obj, {ProgressBar});

	function ProgressBar({ config, container, done, err }){
		this.container = container;
		this.progress = new Array(config.length).fill(0);
		
		var scope = this;

		var promises = config.map(({xhr, model, url}, index)=>{
			xhr.addEventListener('progress', (event)=>{
				if(event.currentTarget.status == 200){
					var p = event.loaded/event.total;
					this.progress[index] = p;
					scope.update();
				}
			})

			return new Promise((accept, reject)=>{
				xhr.addEventListener('load', function(event){
					if(event.currentTarget.readyState == 4 && event.currentTarget.status == 200){
						accept({ event, model});
					}
				});
				xhr.addEventListener('error', (e)=> reject(url, e));
			})
		})

		Promise.all(promises).then((results)=>{
			scope.dismiss();
			done(results)
		}).catch(err);
	}

	ProgressBar.prototype.start = function(){
		var backdrop = document.createElement('div');
		backdrop.className = 'progress-backdrop';
		backdrop.innerHTML = ('<div class="progress-lightbox">\
			<h3>Loading Weights ... <span class="progress-status">0</span>%</h3>\
			<div class="progress-bar">\
				<div class="progress-bar-fill"></div>\
			</div>\
		</div>')

		this.backdrop = backdrop;
		this.container.appendChild(backdrop);
		this.fill = backdrop.querySelector('.progress-bar-fill');
		this.status = backdrop.querySelector('.progress-status');
	}


	ProgressBar.prototype.update = function(){
		var frac = Math.min(...this.progress)
		this.total = this.backdrop.querySelector('.progress-bar').getClientRects()[0].width;
		this.fill.style.width = (this.total*frac) + 'px';
		this.status.innerText = Math.round(frac*100);
	}

	ProgressBar.prototype.dismiss = function(){
		this.container.removeChild(this.backdrop);
	}
})(window)