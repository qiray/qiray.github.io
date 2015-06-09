
var bombs = []
var ExplosionImg = [], explosionImageText = 'images/explosion.png'
var bombTexts = [explosionImageText]

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
	
	this.image = new Image(cellSize, cellSize)
	this.image.src = 'images/bomb.png'
	this.image.id = 'bomb' + id
	this.image.style.position = 'absolute'
	this.image.style.left = this.drawx
	this.image.style.top = this.drawy
	this.image.style.zIndex = 8
	this.image.onclick = function () { clickObject(y, x) }
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
		var coords = {x: i, y: this.y}
		roundTheWorld(coords)
		if (walls[9*this.y + coords.x])
			continue
		setCellClassImage(document.getElementById('td' + this.y + coords.x), '', '')  //remove explosions
	}
	for (var i = this.y - this.power; i <= this.y + this.power; i++) {
		var coords = {x: this.x, y: i}
		roundTheWorld(coords)
		if (walls[9*coords.y + this.x])
			continue
		setCellClassImage(document.getElementById('td' + coords.y + this.x), '', '')  //remove explosions
	}
	if (!walls[bomberman.targety*9 + bomberman.targetx] && !bomberman.destroyed)
		setCellClassImage(document.getElementById('td' + bomberman.targety + bomberman.targetx), targetImagePath, 'targetIEFixBackgroundSize')
	bombs[this.id] = undefined
}

Bomb.prototype.explode = function() {
	this.image.src = explosionImageText
	if (this.powerTact == 0) { 
		destroyCell(this.x, this.y)
		this.powerTact++
	}
	if (this.powerTact != this.power) {
		for (var i = this.x - this.powerTact; i <= this.x + this.powerTact; i += 2*this.powerTact) {
			var coords = {x: i, y: this.y}
			roundTheWorld(coords)
			if (walls[9*this.y + coords.x] || (this.explosionWallFlag & (i < this.x ? 1 : i > this.x ? 2 : 0))) {
				this.explosionWallFlag |=  i < this.x ? 1 : i > this.x ? 2 : 0 //if there is a wall then stop wave in this direction
				continue
			}
			destroyCell(coords.x, this.y)
		}
		for (var i = this.y - this.powerTact; i <= this.y + this.powerTact; i += 2*this.powerTact) {
			var coords = {x: this.x, y: i}
			roundTheWorld(coords)
			if (walls[9*coords.y + this.x] || (this.explosionWallFlag & (i < this.y ? 4 : i > this.y ? 8 : 0))) {
				this.explosionWallFlag |=  i < this.y ? 4 : i > this.y ? 8 : 0
				continue
			}
			destroyCell(this.x, coords.y)
		}
		this.powerTact++
	} else {
		this.destroy()
	}
}

function destroyCell(x, y) {
	if (walls[9*y + x])
		return
	document.getElementById('td' + y + x).removeAttribute('bgcolor')
	setCellClassImage(document.getElementById('td' + y + x), explosionImageText, 'explosionIEFixBackgroundSize')
	if (data[y][x] != '&nbsp')
		remainingCells++
	document.getElementById('td' + y + x).innerHTML = data[y][x] = '&nbsp'
	initialData[9*y + x] = false
	for (var i = 0; i < bombs.length; i++)
		if (bombs[i] && bombs[i].x == x && bombs[i].y == y && bombs[i].timer > 0) { //explode another bombs
			bombs[i].timer = 0
			break
		}
}
