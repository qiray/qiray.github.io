
/*
 * Bombersudoku v 1.0
 * Idea - Danil Mikhaylov
 * Programming - Yaroslav Zotov
 * Based on jsSudoku (https://sourceforge.net/projects/jssudoku/)
 * 2015
 */

var data = new Array(9) //this array is used to display digits
var initData = [[2,5,7,1,3,9,4,8,6],[9,6,3,8,5,4,1,7,2],[1,8,4,6,7,2,9,5,3],[6,1,2,7,9,8,5,3,4],[7,3,5,4,2,1,8,6,9],[4,9,8,5,6,3,7,2,1],[3,4,6,9,8,5,2,1,7],[8,7,1,2,4,6,3,9,5],[5,2,9,3,1,7,6,4,8]] //Awesome initial data. This array will be transformed to make new start conditions.
var trueData = new Array(9) //this array contains true digits (not inputed by user)
var initialData = new Array(81) //contains bool data: true if this cell is initially occupied with digit, else false
var trivial = 22, easy = 32, medium = 40, hard = 39, ultra = 50 //some preseted difficult levels
var difficultLevel = trivial//medium //number of cells to remove
var remainingCells = 0
var currentIndex = 0 //for correct processing of popup window with digits to select
var popupVisible = 0 //1 when a popup window is visible
var oneDigitHints = 0, stopBomberHints = 0, checkSolvabilityHints = 0 //number of hints
var hintedCells = []
var gameTimer = 0 //timer value
var sudokuTimerInterval
var startTimer = 0 //1 when we start gameTimer
var version = '1.0'
var vkInited = 0, current_id = 0 //for VK API
var cellSize = 45, cellHalfSize = Math.floor(cellSize/2), cellSizeWithBorders = 1.12*cellSize
var cellSizeSlider = undefined
var buttonsSizeAboveMainTable = 110 //height of main menu and hints button
var wrongDigits = 0, bombPlantedFlag = 0
var settingsMenuActive = false

if (!Array.prototype.indexOf) { //IE is awesome
	Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++)
			if (this[i] === obj)
				return i
		return -1
	}
}

if (!window.console) { //IE is the greatest browser: it doesn't work correctly when console isn't opened
	var console = {
		log : function(){},
		warn : function(){},
		error : function(){},
		time : function(){},
		timeEnd : function(){}
	}
}

function detectIE() { //returns true if browser is IE ()
	var ua = window.navigator.userAgent
	if (ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') >  0 || ua.indexOf('Edge/') > 0)
		return true
	return false
}

function gameTimerToString(timerValue) {
	var hours = Math.floor(timerValue/3600)
	var minutes = Math.floor((timerValue - hours*3600)/60).toString(), seconds = (timerValue%60).toString()
	if (minutes.length == 1)
		minutes = "0" + minutes
	if (seconds.length == 1)
		seconds = "0" + seconds
	return (hours == 0 ? '' : hours + ':') + minutes + ':' + seconds
}

function resize() {
	var divAll = getElement('all'), size = getElement('all').clientHeight
	var overlay = getElement('popupOverlay')
	overlay.style.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth//  10
	var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	overlay.style.height = height > size ? height : size
	//setCellSize(cellSize)
}

function newGame() {
	var funcArray = [swapRows, swapCols, swapRowsRegions, swapColsRegions, transposing] //these functions are used to transform the field
	var i = 0, j = 0
	for (; i < 15; i++)
		funcArray[Math.floor(Math.random() * funcArray.length)]() //apply random function to the field
	for(i = 0; i < 9; i++)
		for(j = 0; j < 9; j++)	{
			data[i][j] = trueData[i][j]
			var obj = getElement('td' + i + j)
			if (obj != null) {
				obj.removeAttribute('bgcolor') //to remove color from 'hinted' cells
				obj.removeAttribute('background') //remove walls
				obj.className = ''
			}
		}
	for (i = 0; i < difficultLevel; i++)
		removeOneCell()
	currentIndex = 0
	popupVisible = 0
	gameTimer = 0
	startTimer = 1
	getElement('timer').innerHTML = '00:00'
}

function init_data() {
	var i, j
	for(i = 0; i < 9; i++) {
		if (!data[i])
			data[i] = new Array(9)
		if (!trueData[i])
			trueData[i] = new Array(9)
		for(j = 0; j < 9; j++) {
			data[i][j] = trueData[i][j] = initData[i][j] //copy initial array
			initialData[i+j*9] = true //array for initial digits
		}
	}
	if (ExplosionImg.length == 0) //preload explosion image
		for (var i = 0; i < bombTexts.length; i++) {
			var tmp = new Image(cellSize, cellSize)
			tmp.src = bombTexts[i]
			ExplosionImg.push(tmp)
		}
	if (bombermanTextures.length == 0)
		for (var i = 0; i < bombermanTexturesLength; i++)
			for (var j = 0; j < bombermanPaths.length; j++) {
				var tmp = new Image(cellSize, cellSize)
				tmp.src = bombermanPaths[j] + i + '.png'
				bombermanTextures.push(tmp)
			}
	if (achievementsImages.length == 0)
		for (var i = 0; i < achievements.length; i++) {
			var tmp = new Image(cellSize, cellSize)
			tmp.src = achievements[i].img
			achievementsImages.push(tmp)			
		}
	if (!teleportImage) {
		teleportImage = new Image(cellSize, cellSize)
		teleportImage.src = 'images/fireball.png'
	}
	if (!badThoughtsImage) {
		badThoughtsImage = new Image(cellSize, cellSize)
		badThoughtsImage.src = 'images/badThoughts.png'
	}
}

function initNumberOfHints(one, stop, check) {
	oneDigitHints = one
	stopBomberHints = stop
	checkSolvabilityHints = check
}

function setHints() {
	switch (difficultLevel) {
		case trivial:
			initNumberOfHints(5, 3, 10)
			break
		case easy:
			initNumberOfHints(3, 2, 7)
			break
		case medium:
			initNumberOfHints(2, 1, 5)
			break
		default:
			initNumberOfHints(1, 0, 3)
			break
	}
}

function init_game() {
	init_data()
	remainingCells = wrongDigits = bombPlantedFlag = 0
	newGame() //generate new field
	setHints()
	if (!walls)
		walls = new Array(81)
	for (var i = 0; i < 81; i++)
		walls[i] = 0
	for (var i = 0; i < bombs.length; i++) //remove old bombs image
		if (bombs[i])
			bombs[i].destroy()
	bombs = []
	squareWalls = new Array (9)
	colWalls = new Array (9)
	rowWalls = new Array (9)
	for (var i = 0; i < 9; i++)
		squareWalls[i] = colWalls[i] = rowWalls[i] = 0
	hintedCells = []
	if (bomberman && !(bomberman.status & statuses.destroyed)) //remove old bomberman data
		bomberman.destroy()
	bomberman = new Bomberman(0, 0, 0, 1, 0, 0)
	if (bombermanTimer)
		clearInterval(bombermanTimer)
	bombermanTimer = setInterval('game_cycle()', game_delay)
	sudokuTimerInterval = setInterval('timerFunction()', 1000) //
	getElement('info').onclick = function(e) {
		var target = window.event ? window.event.srcElement : e.target
		if (target == getElement('info'))
			hidePopup()
	}
	redraw()
}

function victory() {
	if (!(bomberman.status & statuses.surrender))
		bomberman.status |= statuses.surrender
	clearInterval(sudokuTimerInterval)
	startTimer = 0
	getElement('info').style.lineHeight = '40px'
	showInfo(200, 80, '40px', translations[playerInfo.currentLanguage].youwon + "<br>" + translations[playerInfo.currentLanguage].time + ": " + gameTimerToString(gameTimer))
	playerInfo.statistics.victories++
	playerInfo.statistics.totalTime += gameTimer
	switch (difficultLevel) {
		case trivial:
			if (playerInfo.bestTime.trivial > gameTimer || playerInfo.bestTime.trivial == 0)
				playerInfo.bestTime.trivial = gameTimer
			break
		case easy:
			if (playerInfo.bestTime.easy > gameTimer || playerInfo.bestTime.easy == 0)
				playerInfo.bestTime.easy = gameTimer
			break
		case medium:
			if (playerInfo.bestTime.medium > gameTimer || playerInfo.bestTime.medium == 0)
				playerInfo.bestTime.medium = gameTimer
			break
		case hard:
			if (playerInfo.bestTime.hard > gameTimer || playerInfo.bestTime.hard == 0)
				playerInfo.bestTime.hard = gameTimer
			break
	}
	saveGame()
}

function redraw() {
	for(var i = 0; i < 9; i++)
		for(var j = 0; j < 9; j++)
			getElement('td' + i+j).innerHTML = '<pre>' + (data[i][j] == 0 ? ' ' : "<b>" + data[i][j] + "</b>") + '</pre>'
}

//Game with bomberman logic

function timerFunction() {
	if (startTimer) {
		gameTimer++
		getElement('timer').innerHTML = gameTimerToString(gameTimer)
	}
}

function game_cycle() {
	checkAchievements()
	if (startTimer || remainingCells == 0)
		bomberman.AI()
	for (var i = 0; i < hintedCells.length; i++) {
		if (hintedCells[i].timer > 0) 
			hintedCells[i].timer -= game_delay
		else if (hintedCells[i].x != -1) {
			getElement('td' + hintedCells[i].y + hintedCells[i].x).removeAttribute('bgcolor')
			hintedCells[i].x = hintedCells[i].y = -1
		}
	}
	for (var i = 0; i < bombs.length; i++) {
		if (!bombs[i])
			continue
		if (startTimer)
			bombs[i].process()
	}
}

function setWall(x, y) {
	walls[y*9 + x] = 1
	setCellClassImage(getElement('td' + y + x), 'images/wall.jpg', 'wallIEFixBackgroundSize')
}

function setNWalls(wallsToBuild, starty, startx, maxY, maxX) {
	var temp = 0, inc = 0
	while (temp != wallsToBuild && inc < 50) {
		var wallY = starty + Math.floor(Math.random()*maxY)
		var wallX = startx + Math.floor(Math.random()*maxX)
		if (!walls[9*wallY + wallX]) {
			setWall(wallX, wallY)
			temp++
		}
		inc++
	}
}

function checkFilling(y, x) {
	var sum = 0
	var col =  Math.floor(x/3), row = Math.floor(y/3)
	if (!squareWalls[row*3 + col]) {
		for (var i = col*3; i < col*3 + 3; i++)
			for (var j = row*3; j < row*3 + 3; j++)
				if (data[j][i] != 0)
					sum++
		if (sum == 9) { //square is filled
			squareWalls[row*3 + col] = 1
			setNWalls(wallsToBuild, row*3, col*3, 3, 3)
		}
	}
	sum = 0
	if (!rowWalls[y]) {
		for (var i = 0; i < 9; i++)
			if (data[y][i] != 0)
				sum++
		if (sum == 9) { //row is filled
			rowWalls[y] = 1
			setNWalls(wallsToBuild, y, 0, 0, 9)
		}
	}
	sum = 0
	if (!colWalls[x]) {
		for (var i = 0; i < 9; i++)
			if (data[i][x] != 0)
				sum++
		if (sum == 9) { //col is filled
			colWalls[x] = 1
			setNWalls(wallsToBuild, 0, x, 9, 0)
		}
	}
}

function setCellSize(value) {
	cellSize = parseInt(value)
	if (cellSize < 30)
		cellSize = 30
	cellHalfSize = Math.floor(cellSize/2)
	cellSizeWithBorders = 1.12*cellSize
	if (getElement('cellSizeSpan'))
		getElement('cellSizeSpan').innerHTML = cellSize
	getElement('mainTable').setAttribute('width', 10*cellSize)
	var size = cellSize < 45 ? 45 : cellSize
	getElement('buttonsTable').setAttribute('width', 10*size)
	getElement('buttonsTable').style.marginLeft = -5*size
	getElement('mainTable').setAttribute('height', 10*cellSize) 
	getElement('mainTable').style.left = (getElement('all').clientWidth - getElement('mainTable').clientWidth)/2
	for (var i = 0; i < 9; i++)
		for (var j = 0; j < 9; j++) {
			getElement('td' + i + j).setAttribute('width', cellSize)
			getElement('td' + i + j).setAttribute('height', cellSize)
			getElement('td' + i + j).style.fontSize = cellSize/2 + 'px'
		}
	for (var i = 0; i < bombs.length; i++)
		if (bombs[i]) {
			bombs[i].image.style.left = bombs[i].drawx = getElement('td' + bombs[i].y+bombs[i].x).offsetLeft + getElement('mainTable').offsetLeft
			bombs[i].image.style.top = bombs[i].drawy = getElement('td' + bombs[i].y+bombs[i].x).offsetTop + getElement('mainTable').offsetTop
			bombs[i].image.style.height = bombs[i].image.style.width = cellSize
		}
	if (bomberman && !(bomberman.status & statuses.destroyed)) {
		bomberman.image.style.height = bomberman.image.style.width = cellSize
		bomberman.drawx = getElement('td' + bomberman.y+bomberman.x).offsetLeft + getElement('mainTable').offsetLeft
		bomberman.drawy = getElement('td' + bomberman.y+bomberman.x).offsetTop + getElement('mainTable').offsetTop
		bomberman.image.style.left = bomberman.drawx
		bomberman.image.style.top = bomberman.drawy
	}
}

function setCellClassImage(obj, image, className) {
	if (obj) {
		if (!detectIE()) {
			if (image == '')
				obj.removeAttribute('background')
			else 
				obj.setAttribute('background', image)
		} else
			obj.className = className
	}
}

function checkWallTexture(y, x) {
	if (walls[y*9 + x])
		setCellClassImage(getElement('td' + y + x), 'images/wall.jpg', 'wallIEFixBackgroundSize')
}

function getElement(id) {
	return document.getElementById(id)
}

function loadComplete() {
	getElement('loading').style.display = 'none'
	getElement('mainMenu').style.display = 'block'
}
