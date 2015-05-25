
var game_delay = 100

var bomberman //bomberman unit
var bombermanTimer
var walls = []

var directions = {
	up: -9,
	right: 1,
	down: 9,
	left: -1,
	wait: 0,
}

function coordsIndexOf(list, x, y) {
	for (var i in list)
		if (list[i].x == x && list[i].y == y)
			return i
	return -1
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
	this.way = []
	this.wayIndex = 0
	this.setDirection()
	
	this.image = new Image(45, 45)
	this.image.src = 'images/Bomberman_test.png' //TODO: load textures
	this.image.id = 'bomberman' + id
	this.image.style.position = 'absolute'
	this.image.style.left = this.drawx
	this.image.style.top = this.drawy
	document.getElementById('all').appendChild(this.image)
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
				if (tmp[j].x < 0 || tmp[j].x > 8 || tmp[j].y < 0 || tmp[j].y > 8 || lengths[tmp[j].x + 9*tmp[j].y] >= 0)
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
	/*var str = ''
	for (var i = 0; i < 9; i++) {
		str += '\n'
		for (var j = 0; j < 9; j++)
			str += lengths[j + 9*i] + '\t'
	}
	console.log(str)*/
	if (finish_found) {
		d = lengths[this.targetx + 9*this.targety] 
		var current = {x: this.targetx, y: this.targety}
		this.way.push(current)
		while (current.x != this.x || current.y != this.y) {
			var x = current.x, y = current.y
			var tmp = [{x: x - 1, y: y}, {x: x + 1, y: y}, {x: x, y: y - 1}, {x: x, y: y + 1}]
			for (var j in tmp) {
				if (tmp[j].x < 0 || tmp[j].x > 8 || tmp[j].y < 0 || tmp[j].y > 8 || lengths[tmp[j].x + 9*tmp[j].y] < 0)
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
	var targetDrawX = document.getElementById('td' + this.targety + this.targetx).offsetLeft + document.getElementById('mainTable').offsetLeft
	var targetDrawY = document.getElementById('td' + this.targety + this.targetx).offsetTop + document.getElementById('mainTable').offsetTop
	if (Math.abs(this.drawx - targetDrawX) <= this.speed/2 && Math.abs(this.drawy - targetDrawY) <= this.speed/2) { //target reached
		this.direction = directions.wait
		this.way = []
		this.x = this.targetx
		this.y = this.targety
		this.plantBomb(2000)
		return
	}
	if (this.wayIndex >= this.way.length - 2)
		return
	var nextx = document.getElementById('td' + this.way[this.wayIndex + 1].y + this.way[this.wayIndex + 1].x).offsetLeft + document.getElementById('mainTable').offsetLeft
	var nexty = document.getElementById('td' + this.way[this.wayIndex + 1].y + this.way[this.wayIndex + 1].x).offsetTop + document.getElementById('mainTable').offsetTop
	if (Math.abs(this.drawx - nextx) <= this.speed/2 && Math.abs(this.drawy - nexty) <= this.speed/2) {
		this.wayIndex++
		var xdiff = this.way[this.wayIndex + 1].x - this.way[this.wayIndex].x
		var ydiff = this.way[this.wayIndex + 1].y - this.way[this.wayIndex].y
		this.x = this.way[this.wayIndex].x
		this.y = this.way[this.wayIndex].y
		this.drawx = nextx
		this.drawy = nexty
		this.direction = xdiff + 9*ydiff //TODO: change texture
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

Bomberman.prototype.setDirection = function() {
	if (this.way.length == 0)
		return
	var xdiff = this.way[this.wayIndex + 1].x - this.way[this.wayIndex].x
	var ydiff = this.way[this.wayIndex + 1].y - this.way[this.wayIndex].y
	this.direction = xdiff + 9*ydiff
}

Bomberman.prototype.setTarget = function(targetx, targety) {
	this.wayIndex = 0
	this.targetx = targetx
	this.targety = targety
	console.log(targetx + ' ' + targety)
	this.way = this.generateWay()
	this.setDirection()
}

Bomberman.prototype.draw = function() {
	this.image.style.left = this.drawx
	this.image.style.top = this.drawy
}

Bomberman.prototype.plantBomb = function(timer) {
	bombs.push(new Bomb(bombs.length, this.x, this.y, timer))
}

Bomberman.prototype.AI = function() {
	if (this.direction == directions.wait && this.way.length == 0)
		this.setTarget(Math.floor(Math.random()*8), Math.floor(Math.random()*8))
	this.move()
	this.draw()
}

function setWall(x, y) {
	walls[y*9 + x] = 1
	document.getElementById('td' + y + x).setAttribute('background', 'images/wall.jpg')
}
