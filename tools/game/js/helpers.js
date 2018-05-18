// general helper
function Vector(x, y){
	this.x = x;
	this.y = y;

	this.add = (other)=>{
		this.x += other.x;
		this.y += other.y;
	}
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