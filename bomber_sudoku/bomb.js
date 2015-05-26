
var bombs = []

function Bomb(id, x, y, power, timer) {
	this.id = id
	this.x = x
	this.y = y
	this.power = power
	this.powerTact = 0
	this.timer = timer
	this.explosionWallFlag = 0  
	this.drawx = document.getElementById('td' + y+x).offsetLeft + document.getElementById('mainTable').offsetLeft
	this.drawy = document.getElementById('td' + y+x).offsetTop + document.getElementById('mainTable').offsetTop
	
	this.image = new Image(45, 45)
	this.image.src = 'images/bomb.png'
	this.image.id = 'bomb' + id
	this.image.style.position = 'absolute'
	this.image.style.left = this.drawx
	this.image.style.top = this.drawy
	this.image.style.zIndex = 8
	document.getElementById('all').appendChild(this.image)
}

Bomb.prototype.process = function() {
	this.timer -= game_delay
	if (this.timer <= 0)
		this.explode()
}

Bomb.prototype.destroy = function() {
	var element = document.getElementById('bomb' + this.id)
	element.parentNode.removeChild(element)
	for (var i = this.x - this.power; i <= this.x + this.power; i++) {
		if (i < 0 || i > 8 || walls[9*this.y + i])
			continue
		document.getElementById('td' + this.y + i).removeAttribute('background') //remove explosions
	}
	for (var i = this.y - this.power; i <= this.y + this.power; i++) {
		if (i < 0 || i > 8 || walls[9*i + this.x])
			continue
		document.getElementById('td' + i + this.x).removeAttribute('background') //remove explosions
	}
	bombs[this.id] = undefined
}

Bomb.prototype.explode = function() {
	this.image.src = 'images/explosion.png'
	if (this.powerTact == 0) { 
		destroyCell(this.x, this.y)
		this.powerTact++
	}
	if (this.powerTact != this.power) {
		for (var i = this.x - this.powerTact; i <= this.x + this.powerTact; i += 2*this.powerTact) {
			if (i < 0 || i > 8)
				continue
			if (walls[9*this.y + i] || (this.explosionWallFlag & (i < this.x ? 1 : i > this.x ? 2 : 0))) {
				this.explosionWallFlag |=  i < this.x ? 1 : i > this.x ? 2 : 0 //if there is a wall then stop wave in this direction
				continue
			}
			destroyCell(i, this.y)
		}
		for (var i = this.y - this.powerTact; i <= this.y + this.powerTact; i += 2*this.powerTact) {
			if (i < 0 || i > 8)
				continue
			if (walls[9*i + this.x] || (this.explosionWallFlag & (i < this.y ? 4 : i > this.y ? 8 : 0))) {
				this.explosionWallFlag |=  i < this.y ? 4 : i > this.y ? 8 : 0
				continue
			}
			destroyCell(this.x, i)
		}
		this.powerTact++
	} else {
		this.destroy()
	}
}

function destroyCell(x, y) {
	if (walls[9*y + x])
		return
	document.getElementById('td' + y + x).setAttribute('background', 'images/explosion.jpg')
	if (data[y][x] != '&nbsp')
		remainingCells++
	document.getElementById('td' + y + x).innerHTML = data[y][x] = '&nbsp'
	for (var i = 0; i < bombs.length; i++)
		if (bombs[i] && bombs[i].x == x && bombs[i].y == y && bombs[i].timer > 0) { //explode another bombs
			bombs[i].timer = 0
			break
		}
}
