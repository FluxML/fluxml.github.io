(function(obj){
	Object.assign(obj, {Keyboard});
	
	function Keyboard(container){
		const template = (
			'<div data-key="up" class="up arrowkey"></div>\
			<div data-key="down" class="down arrowkey"></div>\
			<div data-key="right" class="right arrowkey"></div>\
			<div data-key="left" class="left arrowkey"></div>'
		)

		container.innerHTML = template;

		this.highlight = (data)=>{

			var old = container.querySelector('.highlight');
			if(old != null)
				old.className = old.className.replace('highlight', '');

			var key = container.querySelector('[data-key="'+ data +'"]');
			key.className += " highlight";
			setTimeout(()=>{
				key.className = key.className.replace('highlight', '');				
			}, 200)


		}
	}
})(window)