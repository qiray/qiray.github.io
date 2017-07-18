
var version = 'v1.0.0'

var delay = 15, tactTime = 100

window.setInterval("gameTact()", delay)
window.onload = function() { init(); loadFromText(document.cookie); document.getElementById('loadingText').style.display = 'none'; document.getElementById('allGameObject').style.opacity = 1; }

var ctx, canvas// = document.getElementById("localMap").getContext("2d") //canvas context

var initialMoney = 250, money = initialMoney
var mapSize = 20, squareMapSize = mapSize*mapSize, globalMapSize = 25
var availableToBuild = 0, cantBuild = -1
var cellSize = 25
var passed = 0, maxPassed = 20
var currentWave = 0, currentLevel = 0
var start = 0, finish = 0 //coordinates
var stopGame = -1, killedEnemies = 0, totalEnemies = 0, startWave = 0
var creatingId = 0, creatingNumber = 0, creatingIndex = 0
var tact = 0
var globalIndex = 0 //for popup windows
var bulletDelta = sqr(cellSize*0.3) //bullet delta

var pauseDiff = 0

var towers = []
var enemies = []
var bullets = []
var displayedMap = new Array(mapSize*mapSize)
var buildMap = new Array(mapSize*mapSize)
var way = []

var towerLevel = 0, lives = maxPassed, currentTarget = -1

var tooltipIndex = -1, tooltipText = ''

function clone(obj) { //clone object
    if (null == obj || "object" != typeof obj) 
		return obj
    var copy = obj.constructor()
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) 
			copy[attr] = obj[attr]
    }
    return copy
}

function init() {
	canvas = document.getElementById("localMap")
	ctx = canvas.getContext("2d")
	globalLocalMap(3)
	initGlobalMap()
	loadLevel()
	redraw()
	initEnemyTextures()
	initTowerTextures()
}

function showInfo() {
	document.getElementById('money').innerHTML = money
	document.getElementById('currentWave').innerHTML = currentWave
	document.getElementById('lives').innerHTML = maxPassed - passed
	var nextWaveInfo = document.getElementById('nextWave')
	if (currentWave == waves[currentLevel].length) {
		nextWaveInfo.innerHTML = 'Last wave!'
		return
	}
	document.getElementById('startWave').value = 'Start wave (' + Math.round(waveStartTact/8) + ')'
	var nextWaveString = waves[currentLevel][currentWave].split(' ')
	nextWaveInfo.innerHTML = ''
	for (var i = 0; i < nextWaveString.length; i += 2)
		nextWaveInfo.innerHTML += nextWaveString[i + 1] +'x ' + enemyTypes[parseInt(nextWaveString[i]) - 1].name + ' '
}

function redraw() {
	drawMap()
	drawStartFinish()
	drawEnemies() 
	drawTowers()
	drawBullets()
	drawTooltip()
	showInfo()
}

function getMapAsText() {
	var text = ""
	for (var i = 0; i < squareMapSize - 1; i++) {
		if (i%mapSize == 0)
			text += '\n'
		var str = displayedMap[i].replace(/\\/g, '\\\\')
		str = str.replace(/\n|\\\\n/g, '\\n').replace(/'/g, '\\\'')
		text += "'" + str + "', "
	}
	text += "'" + displayedMap[squareMapSize - 1] + "'"
	document.getElementById('mapText').value = text
}

function gameTact() { //game logic
	if (pauseDiff >= 0) {
		pauseDiff -= delay
		return
	}
	if (stopGame) {
		if (stopGame != 5)
			checkAchievements(player)
		chooseStory()
		pauseDiff = tactTime - delay
		return
	}
	var time1 = new Date() //calc time
	var time1ms= time1.getTime(time1) 
	tact++
	chooseStory()
	checkAchievements(tempPlayer)
	var counter = 0, length = bullets.length
	for (var i = 0; i < length; i++) { //bullets
		if (bullets[i] === undefined) {
			counter++
			continue
		}
		moveBullet(i)
	}
	if (counter == length)
		bullets = []
	counter = 0
	length = towers.length
	for (var i = 0; i < length; i++) { //towers
		if (towers[i] === undefined) {
			counter++
			continue
		}
		towerAttack(i)
	}
	if (counter == length)
		towers = []	
	counter = 0
	length = enemies.length
	for (var i = 0; i < length; i++) { //enemies
		if (enemies[i] === undefined) {
			counter++
			continue
		}
		if (enemies[i].index < 0 || enemies[i].index == way.length - 1) { //enemy has passed through your defence lines!
			passed++
			deleteEnemy(i)
			continue
		}
		moveEnemy(i)
	}
	if (passed >= maxPassed)
		lose()	
	if (counter == length) {
		enemies = []
		if (currentWave == waves[currentLevel].length && killedEnemies + passed == totalEnemies)
			win()	
	}
	if (waveStartTact == 0)
		startWaveFunc()
	createWave()
	redraw()
	showRandomText(currentLevel)
	var time2 = new Date()
	var time2ms= time2.getTime(time2)
	var timeDiff = time2ms - time1ms
	if (tact%250 == 0)
		console.log('timeDiff = ' + timeDiff)
	if (timeDiff < tactTime - delay)
		pauseDiff = tactTime - delay - timeDiff
	else
		pauseDiff = 0
}

function hidePopup() {
	document.getElementById('towerMenu').style.display = 'none' //hide popup windows
	document.getElementById('buildMenu').style.display = 'none'
	document.getElementById('popupLayer').style.display = 'none'
	document.getElementById('descriptions').style.display = 'none'
	document.getElementById('info').style.display = 'none'
	document.getElementById('saveLoad').style.display = 'none'
}

function setSpeed(speed) {
	tactTime = speed
	switch (speed) {
		case 100:
			document.getElementById('speed1').disabled = true
			document.getElementById('speed2').disabled = false
			document.getElementById('speed3').disabled = false
			break
		case 50:
			document.getElementById('speed2').disabled = true
			document.getElementById('speed1').disabled = false
			document.getElementById('speed3').disabled = false
			break
		case 25:
			document.getElementById('speed2').disabled = false
			document.getElementById('speed1').disabled = false
			document.getElementById('speed3').disabled = true
			break
	}
}

function pauseFunc() {
	if (stopGame == 5) { //continue
		stopGame = 0
		document.getElementById('pauseText').innerHTML = 'pause'
	} else {
		stopGame = 5
		document.getElementById('pauseText').innerHTML = 'continue'
	}
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
