
var game_delay = 100

var bomberman //bomberman unit
var bombermanTimer
var walls = []
var squareWalls = [], colWalls = [], rowWalls = []
var wallsToBuild = 3

var defaultBombPower = 2, defaultBombTimer = 3000

var targetImagePath = 'images/target.png'

var directions = {
	up: -9,
	right: 1,
	down: 9,
	left: -1,
	wait: 0
}

var statuses = {
	surrender: 1,
	teleport: 2,
	destroyed: 4,
	needToPlantBomb: 8,
	badPhrases: 16
}

var bombermanTextures = [], bombermanTexturesLength = 8
var bombermanPaths = ['images/Bomberman/Front/', 'images/Bomberman/Back/', 'images/Bomberman/Left/', 'images/Bomberman/Right/']
var teleportImage = undefined

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
	this.drawx = getElement('td' + y+x).offsetLeft + getElement('mainTable').offsetLeft
	this.drawy = getElement('td' + y+x).offsetTop + getElement('mainTable').offsetTop
	this.speed = speed
	this.direction = directions.wait //default
	this.targetx = targetx
	this.targety = targety
	this.waitTimer = 0
	this.way = []
	this.wayIndex = 0
	this.status = statuses.needToPlantBomb
	this.animationTimer = 0
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
	getElement('all').appendChild(this.image)
	setCellClassImage(getElement('td' + this.targety + this.targetx), targetImagePath, 'targetIEFixBackgroundSize')
}

Bomberman.prototype.destroy = function() {
	var element = getElement('bomberman' + this.id)
	element.parentNode.removeChild(element)
	var image = getElement('badThoughts' + this.id)
	if (image) //remove
		image.parentNode.removeChild(image)	
	setCellClassImage(getElement('td' + this.targety + this.targetx), '', '')
	if (this.nextTargetx != -1 && this.nextTargety != -1) {
		setCellClassImage(getElement('td' + this.nextTargety + this.nextTargetx), '', '')
		checkWallTexture(this.nextTargety, this.nextTargetx)
	}
	checkWallTexture(this.targety, this.targetx)
	this.status |= statuses.destroyed
}

Bomberman.prototype.clearWay = function () {
	this.way = []
	this.direction = directions.wait
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

Bomberman.prototype.checkOutOfBorders = function () {
	if (this.drawx < getElement('mainTable').offsetLeft - cellHalfSize)
		this.drawx = getElement('td' + this.y + 8).offsetLeft + getElement('mainTable').offsetLeft + cellHalfSize
	if (this.drawy < getElement('mainTable').offsetTop - cellHalfSize)
		this.drawy = getElement('td' + 8 + this.x).offsetTop + getElement('mainTable').offsetTop + cellHalfSize
	if (this.drawx > getElement('mainTable').offsetLeft + getElement('td' + this.y + 8).offsetLeft + cellHalfSize)
		this.drawx = getElement('mainTable').offsetLeft - cellHalfSize
	if (this.drawy > getElement('mainTable').offsetTop + getElement('td' + 8 + this.x).offsetTop + cellHalfSize)
		this.drawy = getElement('mainTable').offsetTop - cellHalfSize
}

Bomberman.prototype.checkTargetReached = function () {
	var targetDrawX = getElement('td' + this.targety + this.targetx).offsetLeft + getElement('mainTable').offsetLeft
	var targetDrawY = getElement('td' + this.targety + this.targetx).offsetTop + getElement('mainTable').offsetTop
	if (Math.abs(this.drawx - targetDrawX) <= this.speed/2 && Math.abs(this.drawy - targetDrawY) <= this.speed/2) { //target reached
		this.clearWay()
		this.x = this.targetx
		this.y = this.targety
		if (this.status & statuses.needToPlantBomb) 
			this.plantBomb(defaultBombPower, defaultBombTimer)
		else 
			this.setTarget(this.nextTargetx, this.nextTargety, 1)
		return true
	} else 
		return false
}

Bomberman.prototype.checkWallFound = function () {
	if (this.wayIndex <= this.way.length - 2 && walls[this.way[this.wayIndex + 1].y*9 + this.way[this.wayIndex + 1].x]) { //there is a wall so we need to recalc the way
		console.log('Wall found')
		this.x = this.way[this.wayIndex + 1].x
		this.y = this.way[this.wayIndex + 1].y
		this.nextTargetx = this.targetx
		this.nextTargety = this.targety
		this.setTarget(this.way[this.wayIndex].x, this.way[this.wayIndex].y, 0)
		return true
	} else
		return false
}

Bomberman.prototype.checkNextCellReached = function () {
	var nextx = getElement('td' + this.way[this.wayIndex + 1].y + this.way[this.wayIndex + 1].x).offsetLeft + getElement('mainTable').offsetLeft
	var nexty = getElement('td' + this.way[this.wayIndex + 1].y + this.way[this.wayIndex + 1].x).offsetTop + getElement('mainTable').offsetTop	
	if ((this.direction == directions.left || this.direction == directions.right) && Math.abs(this.drawx - nextx) <= this.speed/2
		|| (this.direction == directions.down || this.direction == directions.up) && Math.abs(this.drawy - nexty) <= this.speed/2) { //next cell reached
		this.wayIndex++
		this.calcDirection()
		this.x = this.way[this.wayIndex].x
		this.y = this.way[this.wayIndex].y
		if (walls[this.targety*9 + this.targetx]) {
			console.log('Our target is a wall')
			this.status |= statuses.badPhrases
			this.clearWay()
		}
	}	
}

Bomberman.prototype.checkDirection = function () {
	this.checkOutOfBorders()
	if (this.checkTargetReached())
		return
	
	var drawx = this.drawx - getElement('mainTable').offsetLeft, drawy = this.drawy - getElement('mainTable').offsetTop
	this.image.onclick = function () {
		if (drawx < 0 || drawx > getElement('td' + 8 + 8).offsetLeft || drawy < 0 || drawy > getElement('td' + 8 + 8).offsetTop)
			return
		var x = (drawx + cellHalfSize)/cellSizeWithBorders
		var y = (drawy + cellHalfSize)/cellSizeWithBorders
		clickObject(Math.floor(y), Math.floor(x))
	}
	
	if (this.wayIndex <= this.way.length - 2 && walls[this.way[this.wayIndex + 1].y*9 + this.way[this.wayIndex + 1].x] &&
	    walls[this.way[this.wayIndex].y*9 + this.way[this.wayIndex].x]) {
		this.teleport() 
		return
	}
	if (this.checkWallFound())
		return
	if (this.wayIndex >= this.way.length - 2)
		return
	this.checkNextCellReached()
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
			this.spritePath = 'images/Bomberman/Left/'
			break
		case directions.right:
			this.spritePath = 'images/Bomberman/Right/'
			break
			
	}
	this.currentFrame = 0
	this.image.src = this.spritePath + '0.png'
}

Bomberman.prototype.setDirection = function() {
	if (this.way.length == 0)
		return
	this.calcDirection()
}

Bomberman.prototype.setTarget = function(targetx, targety, needToPlantBomb) {
	this.status = needToPlantBomb ? (this.status | statuses.needToPlantBomb) : (this.status & ~statuses.needToPlantBomb)
	this.wayIndex = 0
	var oldtargetx = this.targetx, oldtargety = this.targety
	if (!(this.status & statuses.needToPlantBomb) && this.nextTargetx != -1 && this.nextTargety != -1) {
		oldtargetx = this.nextTargetx
		oldtargety = this.nextTargety
	}
	this.targetx = targetx
	this.targety = targety
	console.log('target: x = ' + targetx + ' y = ' + targety + ' bomb = ' + needToPlantBomb)
	if (targetx == this.x && targety == this.y) {
		this.clearWay()
		return
	}
	this.way = this.generateWay()
	if (this.way.length == 0)
		this.direction = directions.wait
	if (this.status & statuses.needToPlantBomb) {
		setCellClassImage(getElement('td' + oldtargety + oldtargetx), '', '')
		checkWallTexture(oldtargety, oldtargetx)
		if (!walls[this.targety*9 + this.targetx])
			setCellClassImage(getElement('td' + this.targety + this.targetx), targetImagePath, 'targetIEFixBackgroundSize')
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
	bombPlantedFlag++
}

Bomberman.prototype.surrenderAnimation = function() {
	if (this.animationTimer < 7)
		this.drawy -= 15 - this.animationTimer
	else
		this.drawy += 15 + (this.animationTimer - 7)
	this.animationTimer++
	this.draw()
	if (this.drawy > getElement('mainTable').offsetTop + getElement('td' + 8 + this.x).offsetTop + cellHalfSize) //bomberman fell too deep
		this.destroy()
}

Bomberman.prototype.teleportAnimation = function() {
	if (this.animationTimer < 3)
		this.image.src = 'images/fireball.png'
	else if (this.animationTimer < 5) {
		this.drawx = getElement('td' + this.y + this.x).offsetLeft + getElement('mainTable').offsetLeft
		this.drawy = getElement('td' + this.y + this.x).offsetTop + getElement('mainTable').offsetTop
	} else {
		this.status &= ~statuses.teleport
		this.animationTimer = -1
	}
	this.animationTimer++
	this.draw()
}

Bomberman.prototype.badPhrasesAnimation = function() {
	var image = getElement('badThoughts' + this.id)
	if (!image) { //create
		image = new Image(cellSize, cellSize)
		image.src = 'images/badThoughts.png'
		image.id = 'badThoughts' + this.id
		image.style.position = 'absolute'
		image.style.left = this.drawx + cellSize/2
		image.style.top = this.drawy - cellSize/2
		image.style.zIndex = 10
		getElement('all').appendChild(image)
	}
	if (this.animationTimer < 16) {
		image.style.left = this.drawx + cellSize/2
		image.style.top = this.drawy - cellSize/2
		this.animationTimer++
	} else {
		image.parentNode.removeChild(image)
		this.animationTimer = 0
		this.status &= ~statuses.badPhrases
	}
}

Bomberman.prototype.teleport = function() {
	var list = []
	for (var i = 0; i < 81; i++)
		if(!walls[i])
			list.push(i)
	if(list.length > 0) {
		this.clearWay()
		var index = Math.floor(Math.random()*list.length)
		this.x = list[index]%9
		this.y = Math.floor(list[index]/9)
		console.log('Teleport: x = ' + this.x + ' y = ' + this.y)
		this.status |= statuses.teleport
		if (this.nextTargety != -1 && this.nextTargetx != -1) {
			setCellClassImage(getElement('td' + this.nextTargety + this.nextTargetx), '', '')
			checkWallTexture(this.nextTargety, this.nextTargetx)
		}
		setCellClassImage(getElement('td' + this.targety + this.targetx), '', '')
		checkWallTexture(this.targety, this.targetx)
	} else
		this.status |= statuses.surrender
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
		this.status |= statuses.surrender
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
	if (this.status & statuses.destroyed)
		return
	if (this.status & statuses.surrender) {
		this.surrenderAnimation()
		return
	}
	if (this.status & statuses.teleport) {
		this.teleportAnimation()
		return
	}
	if (this.status & statuses.badPhrases)
		this.badPhrasesAnimation()
	if (this.waitTimer > 0) {
		this.waitTimer--
		return
	}
	if (this.direction == directions.wait && this.way.length == 0)
		this.findNewTarget()
	this.move()
	this.draw()
}
