
var game_delay = 100

var bomberman //bomberman unit
var bombermanTimer
var walls = []
var squareWalls = [], colWalls = [], rowWalls = []
var wallsToBuild = 3

var defaultBombPower = 2, defaultBombTimer = 3000

var directions = {
	up: -9,
	right: 1,
	down: 9,
	left: -1,
	wait: 0,
}

function roundTheWorld(coords) {
	if (coords.x < 0)
		coords.x += 9
	if (coords.y < 0)
		coords.y += 9
	if (coords.x > 8)
		coords.x -= 9
	if (coords.y > 8)
		coords.y -= 9
}

function Bomberman(id, x, y, speed, targetx, targety) {
	this.id = id
	this.x = x
	this.y = y
	this.drawx = document.getElementById('td' + y+x).offsetLeft + document.getElementById('mainTable').offsetLeft
	this.drawy = document.getElementById('td' + y+x).offsetTop + document.getElementById('mainTable').offsetTop
	this.speed = speed
	this.direction = directions.wait //default
	this.targetx = targetx
	this.targety = targety
	this.cantFindWay = 0
	this.waitTimer = 0
	this.way = []
	this.wayIndex = 0
	this.destroyed = 0
	this.surrenderTimer = 0
	this.setDirection()
	
	this.image = new Image(cellSize, cellSize)
	this.image.src = 'images/Bomberman_test.png' //TODO: load textures
	this.image.id = 'bomberman' + id
	this.image.style.position = 'absolute'
	this.image.style.left = this.drawx
	this.image.style.top = this.drawy
	this.image.style.zIndex = 9
	this.image.onclick = function () { clickObject (y, x) }
	document.getElementById('all').appendChild(this.image)
	this.target = new Image(cellSizeWithBorders - 2, cellSizeWithBorders - 2)
	this.target.src = 'images/target.png'
	this.target.id = 'target' + id
	this.target.style.position = 'absolute'
	this.target.style.left = document.getElementById('td' + this.targety + this.targetx).offsetLeft + document.getElementById('mainTable').offsetLeft
	this.target.style.top = document.getElementById('td' + this.targety + this.targetx).offsetTop + document.getElementById('mainTable').offsetTop
	this.target.onclick = function() { }
	this.target.style.zIndex = 8
	document.getElementById('all').appendChild(this.target)	
}

Bomberman.prototype.destroy = function() {
	var element = document.getElementById('bomberman' + this.id)
	element.parentNode.removeChild(element)
	var element = document.getElementById('target' + this.id)
	element.parentNode.removeChild(element)
	this.destroyed = 1
}

Bomberman.prototype.generateWay = function () {
	if (this.x == this.targetx && this.y == this.targety) {
		this.way.push({x: this.x, y: this.y})
		return this.way
	}
	this.way = []
	var list = [], list_next = []
	var lengths = new Array(81)
	list_next.push ({x: this.x, y: this.y})
	var d = 0
	var finish_found = 0
	for (var i = 0; i < 81; i++)
		lengths[i] = walls[i] ? 10000 : -1
	lengths[this.x + 9*this.y] = d
	while (!finish_found && list_next.length) {
		list = list_next
		list_next = []
		d++
		for (var i in list) {
			if (finish_found)
				break
			var x = list[i].x, y = list[i].y
			var tmp = [{x: x - 1, y: y}, {x: x + 1, y: y}, {x: x, y: y - 1}, {x: x, y: y + 1}]
			for (var j in tmp) {
				roundTheWorld(tmp[j])
				if (lengths[tmp[j].x + 9*tmp[j].y] >= 0)
					continue
				list_next.push(tmp[j])
				lengths[tmp[j].x + 9*tmp[j].y] = d
				if (tmp[j].x == this.targetx && tmp[j].y == this.targety) {
					finish_found = 1
					break
				}
			}
		}
	}
	if (finish_found) {
		d = lengths[this.targetx + 9*this.targety] 
		var current = {x: this.targetx, y: this.targety}
		this.way.push(current)
		while (current.x != this.x || current.y != this.y) {
			var x = current.x, y = current.y
			var tmp = [{x: x - 1, y: y}, {x: x + 1, y: y}, {x: x, y: y - 1}, {x: x, y: y + 1}]
			for (var j in tmp) {
				roundTheWorld(tmp[j])
				if (lengths[tmp[j].x + 9*tmp[j].y] < 0)
					continue
				if (lengths[tmp[j].x + 9*tmp[j].y] == d - 1) {
					current = {x: tmp[j].x, y: tmp[j].y}
					this.way.push(current)
					d--
					break
				}
			}
		}
		this.way.reverse()
		this.cantFindWay = 0
	}
	return this.way
}

Bomberman.prototype.checkDirection = function () {
	if (this.drawx < document.getElementById('mainTable').offsetLeft - cellHalfSize)
		this.drawx = document.getElementById('td' + this.y + 8).offsetLeft + document.getElementById('mainTable').offsetLeft + cellHalfSize
	if (this.drawy < document.getElementById('mainTable').offsetTop - cellHalfSize)
		this.drawy = document.getElementById('td' + 8 + this.x).offsetTop + document.getElementById('mainTable').offsetTop + cellHalfSize
	if (this.drawx > document.getElementById('mainTable').offsetLeft + document.getElementById('td' + this.y + 8).offsetLeft + cellHalfSize)
		this.drawx = document.getElementById('mainTable').offsetLeft - cellHalfSize
	if (this.drawy > document.getElementById('mainTable').offsetTop + document.getElementById('td' + 8 + this.x).offsetTop + cellHalfSize)
		this.drawy = document.getElementById('mainTable').offsetTop - cellHalfSize
		
	var targetDrawX = document.getElementById('td' + this.targety + this.targetx).offsetLeft + document.getElementById('mainTable').offsetLeft
	var targetDrawY = document.getElementById('td' + this.targety + this.targetx).offsetTop + document.getElementById('mainTable').offsetTop
	if (Math.abs(this.drawx - targetDrawX) <= this.speed/2 && Math.abs(this.drawy - targetDrawY) <= this.speed/2) { //target reached
		this.direction = directions.wait
		this.way = []
		this.x = this.targetx
		this.y = this.targety	
		this.plantBomb(defaultBombPower, defaultBombTimer)
		return
	}
	
	var drawx = this.drawx - document.getElementById('mainTable').offsetLeft, drawy = this.drawy - document.getElementById('mainTable').offsetTop
	this.image.onclick = function () {
		if (drawx < 0 || drawx > document.getElementById('td' + 8 + 8).offsetLeft || drawy < 0 || drawy > document.getElementById('td' + 8 + 8).offsetTop)
			return
		var x = (drawx + cellHalfSize)/cellSizeWithBorders
		var y = (drawy + cellHalfSize)/cellSizeWithBorders
		clickObject(Math.floor(y), Math.floor(x))
	}
	
	if (this.wayIndex >= this.way.length - 2)
		return
	var nextx = document.getElementById('td' + this.way[this.wayIndex + 1].y + this.way[this.wayIndex + 1].x).offsetLeft + document.getElementById('mainTable').offsetLeft
	var nexty = document.getElementById('td' + this.way[this.wayIndex + 1].y + this.way[this.wayIndex + 1].x).offsetTop + document.getElementById('mainTable').offsetTop
	if (Math.abs(this.drawx - nextx) <= this.speed/2 && Math.abs(this.drawy - nexty) <= this.speed/2) { //next cell reached
		this.wayIndex++
		this.calcDirection()
		this.x = this.way[this.wayIndex].x
		this.y = this.way[this.wayIndex].y
		this.drawx = nextx
		this.drawy = nexty
		if (this.wayIndex < this.way.length - 1 && walls[this.way[this.wayIndex + 1].y*9 + this.way[this.wayIndex + 1].x] || //there is a wall so we need to recalc the way
		    walls[this.way[this.wayIndex].y*9 + this.way[this.wayIndex].x]) {
			this.setTarget(this.targetx, this.targety)
		}
	}
}

Bomberman.prototype.move = function () {
	this.checkDirection()
	switch (this.direction) {
		case directions.up :
			this.drawy -= this.speed
			break
		case directions.right :
			this.drawx += this.speed
			break
		case directions.down :
			this.drawy += this.speed
			break
		case directions.left :
			this.drawx -= this.speed
			break
		default : //don't move
			break
	}
}

Bomberman.prototype.calcDirection = function() {
	var xdiff = this.way[this.wayIndex + 1].x - this.way[this.wayIndex].x
	var ydiff = this.way[this.wayIndex + 1].y - this.way[this.wayIndex].y
	xdiff = xdiff == 8 ? -1 : xdiff == -8 ? 1 : xdiff
	ydiff = ydiff == 8 ? -1 : ydiff == -8 ? 1 : ydiff
	this.direction = xdiff + 9*ydiff //TODO: change texture
}

Bomberman.prototype.setDirection = function() {
	if (this.way.length == 0)
		return
	this.calcDirection()
}

Bomberman.prototype.setTarget = function(targetx, targety) {
	this.wayIndex = 0
	this.targetx = targetx
	this.targety = targety
	console.log(targetx + ' ' + targety)
	if (targetx == this.x && targety == this.y) {
		this.direction = directions.wait
		this.way = []
		return
	}
	this.way = this.generateWay()
	if (this.way.length == 0) {
		this.direction = directions.wait
		this.cantFindWay++
	} else {
		document.getElementById('target' + this.id).style.left = document.getElementById('td' + this.targety + this.targetx).offsetLeft + document.getElementById('mainTable').offsetLeft
		document.getElementById('target' + this.id).style.top = document.getElementById('td' + this.targety + this.targetx).offsetTop + document.getElementById('mainTable').offsetTop
		var y = this.targety, x = this.targetx
		document.getElementById('target' + this.id).onclick = function () { clickObject (y, x) }
	}
	this.setDirection()
}

Bomberman.prototype.draw = function() {
	this.image.style.left = this.drawx
	this.image.style.top = this.drawy
}

Bomberman.prototype.plantBomb = function(power, timer) {
	var i 
	for (i = 0; i < bombs.length; i++)
		if (!bombs[i])
			break
	bombs[i] = new Bomb(i, this.x, this.y, power, timer)
}

Bomberman.prototype.surrenderAnimation = function()  {
	if (this.surrenderTimer < 7)
		this.drawy -= 15 - this.surrenderTimer
	else
		this.drawy += 15 + (this.surrenderTimer - 7)
	this.surrenderTimer++
	this.draw()
	if (this.drawy > document.getElementById('mainTable').offsetTop + document.getElementById('td' + 8 + this.x).offsetTop + cellHalfSize) //bomberman fell too deep
		this.destroy()
}

Bomberman.prototype.findNewTarget = function() {
	var list = []
	for (var i = 0; i < 81; i++)
		if (!walls[i])
			list.push(i)
	if (list.length != 0) {
		var index = list[Math.floor(Math.random()*list.length)]
		this.setTarget(index%9, Math.floor(index/9))
		this.waitTimer = 0
	}
	if (this.cantFindWay == 1 && this.waitTimer == 0)
		this.waitTimer = 10 //wait 1 second
} 

Bomberman.prototype.AI = function() {
	if (this.destroyed)
		return
	if (this.surrenderTimer) {
		this.surrenderAnimation()
		return
	}
	if (this.waitTimer <= 0 && this.direction == directions.wait && this.way.length == 0) {
		this.findNewTarget()
		if (this.cantFindWay == 50) { //surrender
			this.surrenderTimer = 1
			return
		}		
	} else {
		this.waitTimer--
	}
	if (this.waitTimer <= 0)
		this.move()
	this.draw()
}

