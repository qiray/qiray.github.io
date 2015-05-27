/*
 * jsSudoku Copyright 2014 Yaroslav Zotov zotovyaa@mail.ru //TODO: add normal dates and copyrights
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
var hints = 0 //number of hints
var gameTimer = 0 //timer value
var startTimer = 0 //1 when we start gameTimer

function gameTimerToString() {
	var hours = Math.floor(gameTimer/3600)
	var minutes = Math.floor((gameTimer - hours*3600)/60).toString(), seconds = (gameTimer%60).toString()
	if (minutes.length == 1)
		minutes = "0" + minutes
	if (seconds.length == 1)
		seconds = "0" + seconds		
	return (hours == 0 ? '' : hours + ':') + minutes + ':' + seconds
}

window.setInterval("if (startTimer) {gameTimer++; document.getElementById('timer').innerHTML = gameTimerToString()}", 1000) //

function resize() {
	var divAll = document.getElementById('all'), size = divAll.clientHeight
	divAll.style.left = window.innerWidth/2 - divAll.clientWidth/2
	divAll.style.top = window.innerHeight > size ? window.innerHeight/2 - size/2 : 0
	var overlay = document.getElementById('popup_overlay')
	overlay.style.width = window.innerWidth
	overlay.style.height = window.innerHeight > size ? window.innerHeight : size
	var popup = document.getElementById('popup'), height = popup.clientHeight == 0 ? 300 : popup.clientHeight
	popup.style.left = window.innerWidth/2 - (popup.clientWidth == 0 ? 112 : popup.clientWidth/2)
	popup.style.top = window.innerHeight > height ? window.innerHeight/2 - height/2 : 0
	var info = document.getElementById('info')
	height = info.clientHeight == 0 ? 200 : info.clientHeight
	info.style.left = window.innerWidth/2- (info.clientWidth == 0 ? 100 : info.clientWidth/2)
	info.style.top = window.innerHeight > height ? window.innerHeight/2 - height/2 : 0
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

function init_game() {
	init_sudoku()
	remainingCells = 0
	newGame() //generate new field
	if (difficultLevel == medium && document.getElementById('difficultySelect').selectedIndex != 2)
		document.getElementById('difficultySelect').selectedIndex = 2
	hints = Math.floor((81 - difficultLevel)/15) //init number of max hints
	if (difficultLevel >= ultra)
		hints = 0
	document.getElementById('hintsSpan').innerHTML = hints	
	if (!walls)
		walls = new Array(81)
	for (var i = 0; i < 81; i++)
		walls[i] = 0
	for (var i = 0; i < bombs.length; i++) //remove old bombs image
		if (bombs[i])
			bombs[i].destroy()
	bombs = []
	if (bomberman) { //remove old bomberman image
		var element = document.getElementById('bomberman' + bomberman.id)
		element.parentNode.removeChild(element)
	}
	bomberman = new Bomberman(0, 0, 0, 5, 0, 0)
	if (bombermanTimer)
		clearInterval(bombermanTimer)
	bombermanTimer = setInterval('game_cycle()', game_delay)
	redraw()
	//TODO: remove
	document.getElementById("speedRange").value = document.getElementById('speedSpan').innerHTML = bomberman.speed
	document.getElementById("timerRange").value = document.getElementById('timerSpan').innerHTML = defaultBombTimer
	document.getElementById("powerRange").value = document.getElementById('powerSpan').innerHTML = defaultBombPower
	document.getElementById('wallCheck').checked = false
	startStop = 1
	document.getElementById('startStopButton').value = 'Стоп'
}

function victory() {
	startTimer = 0
	document.getElementById('info').style.lineHeight = '40px'
	showInfo("Вы выиграли! <br>Ваше время - " + gameTimerToString())
}

function game_cycle() {
	if (startStop)
		bomberman.AI()
	for (var i = 0; i < bombs.length; i++) {
		if (!bombs[i])
			continue
		bombs[i].process()
	}
}

//TODO: remove these test functions

var mouseWall = 0, startStop = 1

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
	if (solveSudoku(tempData, remain, 1)) {
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++)
				text += tempData[i][j] + ' '
			text += '\n'
		}
	} else
		text = 'Не могу решить.'
	alert (text)
}
