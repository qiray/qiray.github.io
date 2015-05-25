
var bombs = []

function Bomb(id, x, y, timer) {
	this.id = id
	this.x = x
	this.y = y
	this.timer = timer
	this.drawx = document.getElementById('td' + y+x).offsetLeft + document.getElementById('mainTable').offsetLeft
	this.drawy = document.getElementById('td' + y+x).offsetTop + document.getElementById('mainTable').offsetTop
	
	this.image = new Image(45, 45)
	this.image.src = 'images/bomb.png'
	this.image.id = 'bomb' + id
	this.image.style.position = 'absolute'
	this.image.style.left = this.drawx
	this.image.style.top = this.drawy
	document.getElementById('all').appendChild(this.image)
}

Bomb.prototype.process = function() { //TODO: add processing into game cycle
	this.timer -= game_delay
	if (this.timer <= 0)
		this.explode()
}

Bomb.prototype.explode = function() {
	this.image.src = 'images/explosion.jpg'
	//TODO: animation and destruction!
}
