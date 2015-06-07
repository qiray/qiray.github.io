
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
	wait: 0
}

var bombermanTextures = [], bombermanTexturesLength = 8
var bombermanPaths = ['images/Bomberman/Front/', 'images/Bomberman/Back/', 'images/Bomberman/Side/']

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
	this.waitTimer = 0
	this.way = []
	this.wayIndex = 0
	this.destroyed = 0
	this.surrenderTimer = 0
	this.needToPlantBomb = 1
	this.nextTargetx = this.nextTargety = -1
	this.setDirection()

	this.currentFrame = 0
	this.spritePath = 'images/Bomberman/Front/'
	this.image = new Image(cellSize, cellSize)
	this.image.src = 'images/Bomberman/Front/0.png'
	this.image.id = 'bomberman' + id
	this.image.style.position = 'absolute'
	this.image.style.left = this.drawx
	this.image.style.top = this.drawy
	this.image.style.zIndex = 9
	this.image.onclick = function () { clickObject (y, x) }
	document.getElementById('all').appendChild(this.image)
	document.getElementById('td' + this.targety + this.targetx).setAttribute('background', 'images/target.png')
}

Bomberman.prototype.destroy = function() {
	var element = document.getElementById('bomberman' + this.id)
	element.parentNode.removeChild(element)
	document.getElementById('td' + this.targety + this.targetx).removeAttribute('background')
	if (this.nextTargetx != -1 && this.nextTargety != -1) {
		document.getElementById('td' + this.nextTargety + this.nextTargetx).removeAttribute('background')
		if (walls[this.nextTargety*9 + this.nextTargetx])
			document.getElementById('td' + this.nextTargety + this.nextTargetx).setAttribute('background', 'images/wall.jpg')		
	}
	if (walls[this.targety*9 + this.targetx])
		document.getElementById('td' + this.targety + this.targetx).setAttribute('background', 'images/wall.jpg')
	this.destroyed = 1
}

Bomberman.prototype.generateWay = function () {
	if (this.x == this.targetx && this.y == this.targety) {
		this.way.push({x: this.x, y: this.y})
		return this.way
	}
	this.way = []
	var tmp = [], finish = {found: false}
	var lengths = this.possibleMoves(tmp, 1, finish)
	if (finish.found) {
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
		if (this.needToPlantBomb) 
			this.plantBomb(defaultBombPower, defaultBombTimer)
		else 
			this.setTarget(this.nextTargetx, this.nextTargety, 1)
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
	
	if (this.wayIndex <= this.way.length - 2 && walls[this.way[this.wayIndex + 1].y*9 + this.way[this.wayIndex + 1].x] &&
		 walls[this.way[this.wayIndex].y*9 + this.way[this.wayIndex].x]) {
console.log(3)
		var list = []
		for (var i = 0; i < 81; i++)
			if(!walls[i])
				list.push(i)
		if(list.length > 0) {
			this.direction = directions.wait
			this.way = []
			var index = Math.floor(Math.random()*list.length)
			this.x = list[index]%9
			this.y = Math.floor(list[index]/9)
console.log('Teleport: x = ' + this.x + ' y = ' + this.y)
			this.drawx = document.getElementById('td' + this.y + this.x).offsetLeft + document.getElementById('mainTable').offsetLeft
			this.drawy = document.getElementById('td' + this.y + this.x).offsetTop + document.getElementById('mainTable').offsetTop
			if (this.nextTargety != -1 && this.nextTargetx != -1) {
				document.getElementById('td' + this.nextTargety + this.nextTargetx).removeAttribute('background')
				if (walls[this.nextTargety*9 + this.nextTargetx])
					document.getElementById('td' + this.nextTargety + this.nextTargetx).setAttribute('background', 'images/wall.jpg')
			}
			document.getElementById('td' + this.targety + this.targetx).removeAttribute('background')
			if (walls[this.targety*9 + this.targetx])
				document.getElementById('td' + this.targety + this.targetx).setAttribute('background', 'images/wall.jpg')
		} else
			this.surrenderTimer = this.surrenderTimer == 0 ? 1 : this.surrenderTimer
		return
	}	
	if (this.wayIndex <= this.way.length - 2 && walls[this.way[this.wayIndex + 1].y*9 + this.way[this.wayIndex + 1].x]) { //there is a wall so we need to recalc the way
console.log(1)
		this.x = this.way[this.wayIndex + 1].x
		this.y = this.way[this.wayIndex + 1].y
		this.nextTargetx = this.targetx
		this.nextTargety = this.targety
		this.setTarget(this.way[this.wayIndex].x, this.way[this.wayIndex].y, 0)
		return
	}
	if (this.wayIndex >= this.way.length - 2)
		return
	var nextx = document.getElementById('td' + this.way[this.wayIndex + 1].y + this.way[this.wayIndex + 1].x).offsetLeft + document.getElementById('mainTable').offsetLeft
	var nexty = document.getElementById('td' + this.way[this.wayIndex + 1].y + this.way[this.wayIndex + 1].x).offsetTop + document.getElementById('mainTable').offsetTop	
	if ((this.direction == directions.left || this.direction == directions.right) && Math.abs(this.drawx - nextx) <= this.speed/2
		|| (this.direction == directions.down || this.direction == directions.up) && Math.abs(this.drawy - nexty) <= this.speed/2) { //next cell reached
		this.wayIndex++
		this.calcDirection()
		this.x = this.way[this.wayIndex].x
		this.y = this.way[this.wayIndex].y
		if (walls[this.targety*9 + this.targetx]) {
console.log(2)
			this.direction = directions.wait
			this.way = []
			return
		}		
	}
}

Bomberman.prototype.move = function () {
	this.checkDirection()
	if (this.direction != directions.wait) {
		this.image.src = this.spritePath + this.currentFrame + '.png'
		this.currentFrame = (this.currentFrame + 1)%bombermanTexturesLength
	}
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
	this.direction = xdiff + 9*ydiff
	switch (this.direction) {
		case directions.up:
			this.spritePath = 'images/Bomberman/Back/'
			break
		case directions.down:
			this.spritePath = 'images/Bomberman/Front/'
			break
		case directions.left:
			this.spritePath = 'images/Bomberman/Side/'
			break
		case directions.right:
			this.spritePath = 'images/Bomberman/Side/'
			break
			
	}
	this.currentFrame = 0
	if (this.direction == directions.left)
		this.image.style.transform = 'scale(-1, 1)'
	else
		this.image.style.transform = 'scale(1, 1)'
	this.image.src = this.spritePath + '0.png'
}

Bomberman.prototype.setDirection = function() {
	if (this.way.length == 0)
		return
	this.calcDirection()
}

Bomberman.prototype.setTarget = function(targetx, targety, needToPlantBomb) {
	this.needToPlantBomb = needToPlantBomb
	this.wayIndex = 0
	var oldtargetx = this.targetx, oldtargety = this.targety
	if (!this.needToPlantBomb && this.nextTargetx != -1 && this.nextTargety != -1) {
		oldtargetx = this.nextTargetx
		oldtargety = this.nextTargety
	}
	this.targetx = targetx
	this.targety = targety
	console.log('target: x = ' + targetx + ' y = ' + targety + ' bomb = ' + needToPlantBomb)
	if (targetx == this.x && targety == this.y) {
		this.direction = directions.wait
		this.way = []
		return
	}
	this.way = this.generateWay()
	if (this.way.length == 0)
		this.direction = directions.wait
	if (this.needToPlantBomb) {
		document.getElementById('td' + oldtargety + oldtargetx).removeAttribute('background')
		if (walls[oldtargety*9 + oldtargetx])
			document.getElementById('td' + oldtargety + oldtargetx).setAttribute('background', 'images/wall.jpg')
		if (!walls[this.targety*9 + this.targetx])
			document.getElementById('td' + this.targety + this.targetx).setAttribute('background', 'images/target.png')
		this.nextTargetx = this.nextTargety = -1
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

Bomberman.prototype.possibleMoves = function(result, searchFinish, finish) {
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
			if (searchFinish && finish_found)
				break
			var x = list[i].x, y = list[i].y
			var tmp = [{x: x - 1, y: y}, {x: x + 1, y: y}, {x: x, y: y - 1}, {x: x, y: y + 1}]
			for (var j in tmp) {
				roundTheWorld(tmp[j])
				if (lengths[tmp[j].x + 9*tmp[j].y] >= 0)
					continue
				list_next.push(tmp[j])
				lengths[tmp[j].x + 9*tmp[j].y] = d
				if (searchFinish && tmp[j].x == this.targetx && tmp[j].y == this.targety) {
					finish_found = 1
					break
				}
			}
		}
	}
	for (var i = 0; i < 81; i++)
		if (lengths[i] != 10000 && lengths[i] >= 0)
			result.push(i)
	if (finish)
		finish.found = finish_found
	return lengths
}

Bomberman.prototype.findNewTarget = function() {
	var list = []
	this.possibleMoves(list)
	if (list.length <= 3) {
		this.surrenderTimer = this.surrenderTimer == 0 ? 1 : this.surrenderTimer
		return
	}
	var nextTargetIndex = list.indexOf(this.nextTargety*9 + this.nextTargetx)
	if (nextTargetIndex != -1)
		list.splice(nextTargetIndex, 1)
	if (list.length != 0) {
		var index = list[Math.floor(Math.random()*list.length)]
		console.log('findNewTarget')
		this.setTarget(index%9, Math.floor(index/9), 1)
	}
}

Bomberman.prototype.AI = function() {
	if (this.destroyed)
		return
	if (this.surrenderTimer) {
		this.surrenderAnimation()
		return
	}
	if (this.waitTimer > 0) {
		this.waitTimer--
		return
	}
	if (this.direction == directions.wait && this.way.length == 0)
		this.findNewTarget()
	this.move()
	this.draw()
}
