// general helper
function Vector(x, y){
	this.x = x;
	this.y = y;

	this.add = (other)=>{
		this.x += other.x;
		this.y += other.y;
	}
}

function CircBuf(size){
	this.size = size;
	this.buf = new Array(size);
	this.index = 0;
}
CircBuf.prototype.fill = function(n){this.buf.fill(n)}
CircBuf.prototype.set = function(n){
	this.buf[this.index] = n;
}
CircBuf.prototype.next = function() {
	this.index = (this.index + 1) % this.size;
};
CircBuf.prototype.sum = function(){
	return this.buf.reduce((acc, ele) => acc + ele, 0)
}

function randColor(){
	return "#" + Math.floor(Math.random()*999);
}

function show(ele){
	if(ele.className.match(" hidden") != null){
		ele.className = ele.className.replace(" hidden", "");
	}
}

function hide(ele){
	if(ele.className.match(" hidden") == null){
		ele.className += " hidden";
	}
}

var $$ = (s)=>document.querySelector(s);

function highlight(el, container){
	var old = container.querySelector('.selected');
	if( old != el){
		if(old)
			old.className = old.className.replace("selected", "");
		el.className += " selected";
	}
}