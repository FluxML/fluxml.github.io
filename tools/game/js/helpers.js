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