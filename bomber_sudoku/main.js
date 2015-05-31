
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
var trivial = 22, easy = 32, medium = 42, hard = 52, ultra = 58 //some preseted difficult levels
var difficultLevel = medium //number of cells to remove
var remainingCells = 0
var currentIndex = 0 //for correct processing of popup window with digits to select
var popupVisible = 0 //1 when a popup window is visible
var oneDigitHints = 0, stopBomberHints = 0, checkSolvabilityHints = 0 //number of hints
var gameTimer = 0 //timer value
var sudokuTimerInterval
var startTimer = 0 //1 when we start gameTimer
var version = '1.0'
var cellSize = 45, cellHalfSize = Math.floor(cellSize/2), cellSizeWithBorders = 1.12*cellSize

function gameTimerToString() {
	var hours = Math.floor(gameTimer/3600)
	var minutes = Math.floor((gameTimer - hours*3600)/60).toString(), seconds = (gameTimer%60).toString()
	if (minutes.length == 1)
		minutes = "0" + minutes
	if (seconds.length == 1)
		seconds = "0" + seconds
	return (hours == 0 ? '' : hours + ':') + minutes + ':' + seconds
}

function resize() {
	var divAll = document.getElementById('all'), size = document.getElementById('all').clientHeight
	var overlay = document.getElementById('popup_overlay')
	overlay.style.width = window.innerWidth//  10
	overlay.style.height = window.innerHeight > size ? window.innerHeight : size
}

function newGame() {
	var funcArray = [swapRows, swapCols, swapRowsRegions, swapColsRegions, transposing] //these functions are used to transform the field
	var i = 0, j = 0
	for (; i < 15; i++)
		funcArray[Math.floor(Math.random() * funcArray.length)]() //apply random function to the field
	for(i = 0; i < 9; i++)
		for(j = 0; j < 9; j++)	{
			data[i][j] = trueData[i][j]
			var obj = document.getElementById('td' + i + j)
			if (obj != null) {
				obj.removeAttribute('bgcolor') //to remove color from 'hinted' cells
				obj.removeAttribute('background') //remove walls
			}
		}
	for (i = 0; i < difficultLevel; i++)
		removeOneCell()
	currentIndex = 0
	popupVisible = 0
	gameTimer = 0
	startTimer = 1
	document.getElementById('timer').innerHTML = '00:00'
}

function init_sudoku() {
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
	init_sudoku()
	remainingCells = 0
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
	if (bomberman && !bomberman.destroyed) //remove old bomberman data
		bomberman.destroy()
	bomberman = new Bomberman(0, 0, 0, 1, 0, 0)
	if (bombermanTimer)
		clearInterval(bombermanTimer)
	bombermanTimer = setInterval('game_cycle()', game_delay)
	sudokuTimerInterval = setInterval("gameTimer++; document.getElementById('timer').innerHTML = gameTimerToString()", 1000) //
	redraw()
	//TODO: remove
	document.getElementById("speedRange").value = document.getElementById('speedSpan').innerHTML = bomberman.speed
	document.getElementById("timerRange").value = document.getElementById('timerSpan').innerHTML = defaultBombTimer
	document.getElementById("powerRange").value = document.getElementById('powerSpan').innerHTML = defaultBombPower
	document.getElementById("wallRange").value = document.getElementById('wallSpan').innerHTML = wallsToBuild
	document.getElementById("sizeRange").value = document.getElementById('cellSizeSpan').innerHTML = cellSize
	document.getElementById('wallCheck').checked = false
	mouseWall = 0
	startStop = 1
	document.getElementById('startStopButton').value = 'Стоп'
}

function victory() {
	bomberman.surrenderTimer = 1
	clearInterval(sudokuTimerInterval)
	startTimer = 0
	document.getElementById('info').style.lineHeight = '40px'
	showInfo(200, 80, '40px', "Вы выиграли! <br>Ваше время - " + gameTimerToString())
}

function redraw() {
	for(var i = 0; i < 9; i++)
		for(var j = 0; j < 9; j++)
			document.getElementById('td' + i+j).innerHTML = "<b>" + data[i][j] + "</b>"
}

//Game with bomberman logic

function game_cycle() {
	if (startStop) //TODO: remove after tests
		bomberman.AI()	
	var flag = 1
	for (var i = 0; i < bombs.length; i++) {
		if (!bombs[i])
			continue
		if (startTimer) {
			bombs[i].process()
			flag = 0
		}
	}
	if (bomberman.destroyed && flag)
		clearInterval(bombermanTimer)
}

function setWall(x, y) {
	walls[y*9 + x] = 1
	document.getElementById('td' + y + x).setAttribute('background', 'images/wall.jpg')
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
				if (data[j][i] != '&nbsp')
					sum++
		if (sum == 9) { //square is filled
			squareWalls[row*3 + col] = 1
			setNWalls(wallsToBuild, row*3, col*3, 3, 3)
		}
	}
	sum = 0
	if (!rowWalls[y]) {
		for (var i = 0; i < 9; i++)
			if (data[y][i] != '&nbsp')
				sum++
		if (sum == 9) { //row is filled
			rowWalls[y] = 1
			setNWalls(wallsToBuild, y, 0, 0, 9)
		}
	}
	sum = 0
	if (!colWalls[x]) {
		for (var i = 0; i < 9; i++)
			if (data[i][x] != '&nbsp')
				sum++
		if (sum == 9) { //col is filled
			colWalls[x] = 1
			setNWalls(wallsToBuild, 0, x, 9, 0)
		}
	}
}

//TODO: remove these test functions

var mouseWall = 0, startStop = 1

function setCellSize() {
	cellSize = parseInt(document.getElementById("sizeRange").value)
	cellHalfSize = Math.floor(cellSize/2)
	cellSizeWithBorders = 1.12*cellSize
	document.getElementById('cellSizeSpan').innerHTML = cellSize
	document.getElementById('mainTable').setAttribute('width', 10*cellSize) 
	document.getElementById('mainTable').setAttribute('height', 10*cellSize) 
	document.getElementById('mainTable').style.left = (document.getElementById('all').clientWidth - document.getElementById('mainTable').clientWidth)/2
	for (var i = 0; i < 9; i++)
		for (var j = 0; j < 9; j++) {
			document.getElementById('td' + i + j).setAttribute('width', cellSize)
			document.getElementById('td' + i + j).setAttribute('height', cellSize)
		}
	for (var i = 0; i < bombs.length; i++)
		if (bombs[i]) {
			bombs[i].image.style.left = bombs[i].drawx = document.getElementById('td' + bombs[i].y+bombs[i].x).offsetLeft + document.getElementById('mainTable').offsetLeft
			bombs[i].image.style.top = bombs[i].drawy = document.getElementById('td' + bombs[i].y+bombs[i].x).offsetTop + document.getElementById('mainTable').offsetTop
			bombs[i].image.style.height = bombs[i].image.style.width = cellSize
		}
	if (bomberman && !bomberman.destroyed) {
		bomberman.image.style.height = bomberman.image.style.width = cellSize	
		bomberman.target.style.height = cellSizeWithBorders - 0.5
		bomberman.target.style.width = cellSizeWithBorders - 2
		bomberman.target.style.left = document.getElementById('td' + bomberman.targety+bomberman.targetx).offsetLeft + document.getElementById('mainTable').offsetLeft
		bomberman.target.style.top = document.getElementById('td' + bomberman.targety+bomberman.targetx).offsetTop + document.getElementById('mainTable').offsetTop
		bomberman.drawx = document.getElementById('td' + bomberman.y+bomberman.x).offsetLeft + document.getElementById('mainTable').offsetLeft
		bomberman.drawy = document.getElementById('td' + bomberman.y+bomberman.x).offsetTop + document.getElementById('mainTable').offsetTop
		bomberman.image.style.left = bomberman.drawx
		bomberman.image.style.top = bomberman.drawy
	}			
}

function setSpeed() {
	if (bomberman)
		bomberman.speed = parseInt(document.getElementById("speedRange").value)
	document.getElementById('speedSpan').innerHTML = bomberman.speed
}

function setPower() {
	defaultBombPower = parseInt(document.getElementById("powerRange").value)
	document.getElementById('powerSpan').innerHTML = defaultBombPower
}

function setTimer() {
	defaultBombTimer = parseInt(document.getElementById("timerRange").value)
	document.getElementById('timerSpan').innerHTML = defaultBombTimer
}

function setWallRange() {
	wallsToBuild = parseInt(document.getElementById("wallRange").value)
	document.getElementById('wallSpan').innerHTML = wallsToBuild
}

function switchMouseWall() {
	if (document.getElementById('wallCheck').checked)
		mouseWall = 1
	else
		mouseWall = 0
}

function switchStartStop() {
	startStop = startStop == 0 ? 1 : 0
	document.getElementById('startStopButton').value = startStop == 1 ? 'Стоп' : 'Старт'
}

function showSolution() {
	var text = ''
	var remain = remainingCells
	var tempData = new Array (9)
	for (var i = 0; i < 9; i++) {
		tempData[i] = new Array (9)
		for (var j = 0; j < 9; j++)
			tempData[i][j] = data[i][j]
	}
	if (solveSudoku(tempData, remain, 1, undefined)) {
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++)
				text += tempData[i][j] + ' '
			text += '\n'
		}
	} else
		text = 'Не могу решить.'
	alert (text)
}

