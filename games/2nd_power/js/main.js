
var timerId = window.setInterval('timerRedraw()', 100)
var redrawAdd = 0, redrawIndex = 0, needRedraw = 0, redrawX = 0, redrawY = 0
var currentRedrawnTile = -1, redrawTiles = []

var canvas
var ctx
var fieldSize = 4, fieldLength = fieldSize*fieldSize
var field = new Array(fieldLength)
var tileSize = 100, shiftX = 5, shiftY = 55, shift = 5
var score = 0, bestScore = 0, fieldSum = 0
var totalTimer = 0, currentTimer = 0
var needResize = 0, maxNeedResize = 35

var mousePressed = false
var mouseWay = []

var colors = [
	'#FFFFFF', '#D0F5A9', '#F3F781', '#A9E2F3', '#FA5858', '#BEF781', '#F4FA58', 
	'#81DAF5', '#FE2E2E', '#ACFA58', '#F7FE2E', '#58D3F7', '#FF0000', 
	'#9AFE2E', '#FFFF00', '#2ECCFA', '#DF0101', '#80FF00', '#D7DF01', 
	'#00BFFF', '#B40404', '#74DF00', '#AEB404', '#01A9DB', '#FF4400', '#DDDDDD',
]

function random3() {
	var tmp = Math.random()*100
	if (tmp < 70)
		return 0
	if (tmp < 90)
		return 1
	if (tmp < 99)
		return 2
	return 3
}

function init(load) {
	canvas = document.getElementById("draw")
	ctx = canvas.getContext('2d')
	fieldSize = 4
	tileSize = 100
	/*canvas.addEventListener('touchstart', 'handleMouseDown(event)') //TODO: for mobile devices!
	canvas.addEventListener('touchmove', 'handleMouseMove(event)')
	canvas.addEventListener('touchend', 'handleMouseUp(event)')
	canvas.addEventListener('touchleave', 'handleMouseUp(event)')*/
	if (!load) {
		if (window.innerWidth - 40 < fieldSize*(tileSize + shift) + shift)
			tileSize = (window.innerWidth - 40 - shift*(fieldSize + 1))/fieldSize
		else //default value
			tileSize = 100
	}
	canvas.width = fieldSize*(tileSize + shift) + shift
	canvas.height = canvas.width + shiftY
	fieldSum = 0
	for (var i = 0; i < fieldLength; i++) {
		field[i] = random3() + 1
		fieldSum += field[i]
	}
	mousePressed = false
	mouseWay = []
	score = redrawAdd = redrawIndex = needRedraw = redrawX = redrawY = 0
	totalTimer = currentTimer = 0
	needResize = 0
	currentRedrawnTile = -1
	redrawTiles = []
	if (load)
		loadBestScore()
	redraw()
}

function checkMouseWay() {
	if (mouseWay.length == 0)
		return
	var index = mouseWay[0].x + mouseWay[0].y*fieldSize
	var sum = field[index], flag = true
	redrawTiles = []
	redrawTiles[0] = index
	for (var i = 1; i < mouseWay.length; i++) {
		index = mouseWay[i].x + mouseWay[i].y*fieldSize
		if (field[index] == sum) {
			sum++
			redrawTiles.push(index)
		}
		else {
			flag = false
			break
		}
	}
	if (redrawTiles.length > 1 && flag) {
		var mul = 0
		redrawAdd = redrawX = redrawY = 0
		needRedraw = 1		
		for (var i = 0; i < redrawTiles.length - 1; i++) {
			redrawAdd += Math.pow(2, field[redrawTiles[i]])
			mul++
			fieldSum -= field[redrawTiles[i]]
			field[redrawTiles[i]] = 0
		}
		redrawAdd *= Math.pow(2, mul - 1)
		score += redrawAdd
		redrawIndex = index
		field[index] = sum
		fieldSum += sum
	}
	mouseWay = []
	if (score > bestScore) {
		bestScore = score
		saveBestScore()
	}
	redraw()
}

function fromNeighbours(x, y) {
	if (fieldSize < 12)
		needResize++
	var temp = []
	for (var i = x - 1; i <= x + 1; i++)
		for (var j = y - 1; j <= y + 1; j++)
			if (i >= 0 && i < fieldSize && j >= 0 && j < fieldSize && (i != x || j != y) && field[i + j*fieldSize] != 0) 
				temp.push(field[i + j*fieldSize])
	if (temp.length == 0)
		return 1
	var rnd = Math.random()
	if (rnd < 0.02) //return max value
		return Math.max.apply(null, temp)
	if (rnd < 0.75) //return min value
		return Math.min.apply(null, temp)
	else
		return temp[Math.floor(Math.random()*temp.length)]
}

function addNewTile(index) {
	if (field[redrawTiles[index]] == 0) {
		var x = redrawTiles[index]%fieldSize, y = Math.floor(redrawTiles[index]/fieldSize)
		field[redrawTiles[index]] = random3() + 1 + Math.floor(Math.random()*Math.pow(fieldSum/fieldLength, 0.5))
		if (!checkMoves())
			field[redrawTiles[index]] = fromNeighbours(x, y)
		fieldSum += field[redrawTiles[index]]
	}	
}

function checkTile(x, y) {
	if (field[x + y*fieldSize] == 0)
		return false
	for (var i = x - 1; i <= x + 1; i++)
		for (var j = y - 1; j <= y + 1; j++) {
			if (i >= 0 && i < fieldSize && j >= 0 && j < fieldSize && (i != x || j != y) && field[x + y*fieldSize] == field[i + j*fieldSize])
				return true
		}	
	return false
}

function checkMoves() {
	for (var i = 0; i < fieldSize; i++)
		for (var j = 0; j < fieldSize; j++)
			if (checkTile(i, j))
				return true
	return false
}

function loadBestScore() {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + 'bestScore'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	))
	bestScore = matches ? decodeURIComponent(matches[1]) : 0	
}

function saveBestScore() {
	if (bestScore >= 2147483647) //max kongregate statistics
		bestScore = 2147483647
	str = 'bestScore=' + bestScore
	var date = new Date( new Date().getTime() + 60*1000*60*24*365 )
	document.cookie = str + '; path=/; expires=' + date.toUTCString() + '; '
	if (kongregate) { //kongregate statistics
		kongregate.stats.submit("HighScore", bestScore) //max
	}
}

function resizeField() { //needResize >= 15
	var oldFieldSize = fieldSize, oldFieldLen = fieldLength
	fieldSize = fieldSize + 2
	fieldLength = fieldSize*fieldSize	
	var temp = new Array(oldFieldLen)
	for (var i = 0; i < oldFieldLen; i++)
		temp[i] = field[i]
	field = new Array(fieldLength)
	for (var i = 0; i < fieldSize; i++)
		for (var j = 0; j < fieldSize; j++) {
			if (i > 0 && j > 0 && i < fieldSize - 1 && j < fieldSize - 1 && temp[i - 1 + (j - 1)*oldFieldSize] != 0) {
				field[i + j*fieldSize] = temp[i - 1 + (j - 1)*oldFieldSize]		
			} else {
				field[i + j*fieldSize] = random3() + 1 + Math.floor(Math.random()*Math.pow(fieldSum/fieldLength, 0.75))
				fieldSum += field[i + j*fieldSize]
			}
		}
	tileSize = (canvas.width - shift*(fieldSize + 1))/fieldSize
}

//Kongregate:

var kongregate
kongregateAPI.loadAPI(onComplete)

// Callback function
function onComplete(){
	console.log('Kongregate')
	// Set the global kongregate API object
	kongregate = kongregateAPI.getAPI()
}
