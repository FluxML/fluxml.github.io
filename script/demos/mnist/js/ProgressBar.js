(function(obj){

	Object.assign(obj, {ProgressBar});

	function ProgressBar({ xhr, container, done, err }){
		this.container = container;
		var scope = this;

		xhr.addEventListener('progress', (event)=>{
			var p = event.loaded/event.total;
			scope.update(p);
		})
		xhr.addEventListener('load', function(event){
			scope.dismiss();
			done(event);
		});
		xhr.addEventListener('error', err);
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

	ProgressBar.prototype.update = function(frac){
		this.total = this.backdrop.querySelector('.progress-bar').getClientRects()[0].width;
		this.fill.style.width = (this.total*frac) + 'px';
		this.status.innerText = Math.round(frac*100);
	}

	ProgressBar.prototype.dismiss = function(){
		this.container.removeChild(this.backdrop);
	}
})(window)