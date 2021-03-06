
function handleKey(event) {
	if (event.keyCode == 27 || event.keyCode == 13) //Escape or Enter pressed
		hidePopup()
	if (popupVisible) {
		var digit = String.fromCharCode(event.which || event.keyCode)
		if (digit >= '0' && digit <= '9')
			enterDigit(parseInt(digit))
	}
}

function enterDigit(digit) {
	var x = currentIndex%9, y = Math.floor(currentIndex/9)
	if (digit == 0) { //clear cell
		if (data[y][x] != 0) {
			remainingCells++
			wrongDigits = 1 //user cleared inputed digit
		}
		data[y][x] = 0
		getElement('td' + y + x).innerHTML = '<pre> </pre>'
	}
	else {
		if (wrongDigit(currentIndex, digit)) {
			showInfo(200, 80, '80px', translations[playerInfo.currentLanguage].wrongDigit)
			wrongDigits = 1
			return
		}
		if (data[y][x] == 0)
			remainingCells--
		else if (data[y][x] != digit)//user changed inputed digit
			wrongDigits = 1
		data[y][x] = digit
		getElement('td' + y + x).innerHTML = '<pre>' + digit + '</pre>'
	}
	hidePopup()
	checkFilling(y, x)
	if (remainingCells == 0) //victory checking
		victory()
}

function clickObject (y, x) {
	var index = y*9 + x
	if (!initialData[index]) {//Don't allow to modify initial digits.
		currentIndex = index
		showPopup()
	}
}

function handleClick(obj) {
	if (startTimer == 0)
		return
	var index = parseInt(parseInt(obj.id.charAt(2))*9 + parseInt(obj.id.charAt(3))), flag = false
	if (!initialData[index]) {//Don't allow to modify initial digits.
		currentIndex = index
		showPopup()
	}
}

function wrongDigit(index, digit) {
	var x = index%9, y = Math.floor(index/9)
	var col =  Math.floor(x/3), row = Math.floor(y/3)
	for (var i = 0; i < 9; i++) {
		if (i != x && data[y][i] == digit)
			return true
		if (i != y && data[i][x] == digit)
			return true
	}
	for (var i = col*3; i < col*3 + 3; i++)
		for (var j = row*3; j < row*3 + 3; j++)
			if (i != x && j != y && data[j][i] == digit)
				return true
	return false
}

function showInfo(width, height, fontSize, text) {
	popupVisible = 1
	getElement('popupOverlay').style.display = 'block'
	getElement('popup').style.display = 'none'
	var info = getElement('info')
	info.style.width = width
	info.style.height = height
	info.style.lineHeight = fontSize
	info.style.marginTop = -height/2
	info.style.marginLeft = -width/2
	info.innerHTML = text
	info.style.display = 'block'
}

function showPopup() {
	var x = currentIndex%9, y = Math.floor(currentIndex/9)
	var tdobj = getElement('td' + y + x).getBoundingClientRect()
	var left = tdobj.left - 120 + cellHalfSize, top = tdobj.top - 110 + cellHalfSize //TODO: change these sizes when popup windows size changes
	var popupWindow = getElement('popup')
	popupWindow.style.left = left
	popupWindow.style.top = top
	getElement('popupOverlay').style.display = 'block'
	popupWindow.style.display = 'block'
	var height = popupWindow.offsetHeight
	var width = popupWindow.offsetWidth
	var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
	var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
	if (left < 0)
		popupWindow.style.left = 0
	if (top < 0)
		popupWindow.style.top = 0	
	if (left + width > windowWidth)
		popupWindow.style.left = windowWidth - width
	if (top + height > windowHeight)
		popupWindow.style.top = windowHeight - height
	popupVisible = 1
}

function hidePopup() {
	if (settingsMenuActive)
		saveGame()
	getElement('popupOverlay').style.display = 'none'
	getElement('popup').style.display = 'none'
	getElement('info').style.display = 'none'
	popupVisible = 0
	settingsMenuActive = false
}

function difficultyTostring(level) {
	switch (level) {
		case trivial:
			return translations[playerInfo.currentLanguage].trivial
		case easy:
			return translations[playerInfo.currentLanguage].easy
		case medium:
			return translations[playerInfo.currentLanguage].normal
		case hard:
			return translations[playerInfo.currentLanguage].hard
		case ultra:
			return translations[playerInfo.currentLanguage].ultra
		default:
			return translations[playerInfo.currentLanguage].unknown
	}
}

//main menu actions

function startNewGame() {
	getElement('all').style.display = 'block'
	getElement('mainTable').style.left = (getElement('all').clientWidth - getElement('mainTable').clientWidth)/2
	var size = cellSize < 45 ? 45 : cellSize
	getElement('buttonsTable').setAttribute('width', 10*size)
	getElement('buttonsTable').style.marginLeft = -5*size	
	init_game()
	getElement('mainMenu').style.display = 'none'
	getElement('tellFriendsButton').style.display = 'none'
	getElement('translationsDiv').style.display = 'none'
}

function showAchievements() {
	var text = '<h2 style = "margin: 20px">' + translations[playerInfo.currentLanguage].achievements + '</h2>' +
		'<div style = "font-family: Arial; font-size: 16px; margin-top: -10px; margin-left:auto; margin-right:auto; padding: 10px; width: 370px; height: 245px; overflow-y: auto;">' + 
		'<b>' + translations[playerInfo.currentLanguage].highscore + '</b><br><table width = "350" style = "font-size: 12px;">' + 
		'<tr>' +
			'<td width = "25%">' + difficultyTostring(trivial) + '</td><td width = "25%">' + difficultyTostring(easy) + '</td><td width = "25%">' + difficultyTostring(medium) + '</td><td width = "25%">' + difficultyTostring(hard) + '</td>' +  
		'</tr><tr>' +
			'<td>' + (playerInfo.bestTime.trivial == 0 ? translations[playerInfo.currentLanguage].notCompleted : gameTimerToString(playerInfo.bestTime.trivial)) + '</td>' + 
			'<td>' + (playerInfo.bestTime.easy == 0 ? translations[playerInfo.currentLanguage].notCompleted : gameTimerToString(playerInfo.bestTime.easy)) + '</td>' + 
			'<td>' + (playerInfo.bestTime.medium == 0 ? translations[playerInfo.currentLanguage].notCompleted : gameTimerToString(playerInfo.bestTime.medium)) + '</td>' + 
			'<td>' + (playerInfo.bestTime.hard == 0 ? translations[playerInfo.currentLanguage].notCompleted : gameTimerToString(playerInfo.bestTime.hard)) + '</td>' + 
		'</tr></table>' + 
		'<table width = "350">'
	for (var i = 0; i < playerInfo.achievements.length; i++) {
		var index = playerInfo.achievements[i]
		text += '<tr align = "center"><td><img src="' + achievements[index].img +'" height="50" width="50"></td>' + 
			'<td><b>' + achievements[index].name() + '</b><br>' + achievements[index].description() + '</td></tr>'
	}
	text += '</table></div>'
	showInfo(400, 330, '21px', text)
}

function showSettings() {
	settingsMenuActive = true
	var text = '<div onselectstart="return false;" unselectable="on" style = "-o-user-select:none;-moz-user-select: -moz-none;-khtml-user-select: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;">' + 
	'<h3 style = "margin: 20px">' + translations[playerInfo.currentLanguage].settings + ':</h3><table width = "400">' +
		'<tr align = "center"><td>' + 
		'<input type = "button" style = "width: 330px; height: 75px;" value = "' + translations[playerInfo.currentLanguage].difficulty + " " +
			difficultyTostring(difficultLevel) + '" onclick = "setDifficultyMenu()">' +
		'</td></tr><tr align = "center"><td>' +
		'<br>' + translations[playerInfo.currentLanguage].cellSize + '<br><div id = "rangeDiv" align="left" style = "height: 50px; width: 300px;" ></div><br><span id = "cellSizeSpan">' + cellSize + '</span><br>' + 
		'</td></tr>' +
	'</table></div>'
	showInfo(400, 275, '5px', text)
	var maxSize = Math.floor(Math.min(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 
	                                  (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - buttonsSizeAboveMainTable)/10.5)
	if (maxSize < 30)
		maxSize = 30
	cellSizeSlider = new slider('rangeDiv', 300, 30, maxSize, 1, setCellSize)
	if (cellSize < 30 || cellSize > maxSize)
		cellSize = maxSize
	cellSizeSlider.setValue(cellSize)
	getElement('info').onmouseup = cellSizeSlider.mouseUp
	getElement('popupOverlay').onmouseup = cellSizeSlider.mouseUp
}

function setDifficulty(level) {
	difficultLevel = level
	defaultBombPower = difficultLevel == hard ? 3 : 2
	hidePopup()
	showSettings()
}

function setDifficultyMenu() {
	var text = '<div align = "center">' + translations[playerInfo.currentLanguage].chooseDifficulty + '<br><input type = "button" style = "width: 350px; height: 70px;" value = "' + 
	difficultyTostring(trivial) + '" onclick = "setDifficulty(trivial)">' + 
	'<input type = "button" style = "width: 350px; height: 70px;" value = "' + difficultyTostring(easy) + '" onclick = "setDifficulty(easy)">' +
	'<input type = "button" style = "width: 350px; height: 70px;" value = "' + difficultyTostring(medium) + '" onclick = "setDifficulty(medium)">' + 
	'<input type = "button" style = "width: 350px; height: 70px;" value = "' + difficultyTostring(hard) + '" onclick = "setDifficulty(hard)"></div>'
	showInfo(400, 330, '35px', text)
}

function showRules() {
	var text = '<div onclick = "hidePopup()" style = "font-family: Arial; font-size: 16px"><p align="justify" style = "margin: 10px 20px; text-indent: 20px;">' + translations[playerInfo.currentLanguage].gameDescription1 + '</p>' + 
	'<p align="justify" style = "margin: 10px 20px; text-indent: 20px;">' + translations[playerInfo.currentLanguage].gameDescription2 + '</p>' +
	'<p align="justify" style = "margin: 10px 20px; text-indent: 20px;">' + translations[playerInfo.currentLanguage].gameDescription3 + '</p>' +
	'<p align="justify" style = "margin: 10px 20px; text-indent: 20px;">' + translations[playerInfo.currentLanguage].gameDescription4 + '</p></div>'
	showInfo(450, 330, '18px', text)
}

function showAboutInfo() {
	var text = '<div style = "margin: 20px; font-size: 16pt">Bombersudoku ' + version + '</div>' +
	'<p>' + translations[playerInfo.currentLanguage].author + '</p><h4>' + translations[playerInfo.currentLanguage].authorName + '</h4>' +
	'<p>' + translations[playerInfo.currentLanguage].developer + '</p><h4>' + translations[playerInfo.currentLanguage].developerName + '</h4>' + 
	'<p>' + translations[playerInfo.currentLanguage].tester + '</p><h4>' + translations[playerInfo.currentLanguage].testerName + '</h4>' + 
	'<p>' + translations[playerInfo.currentLanguage].images + '</p><h4><a target = "_blank" href = "http://gamedevelopment.tutsplus.com/articles/enjoy-these-totally-free-bomberman-inspired-sprites--gamedev-8541">Michael James Williams</a><br>' + 
	'<a target = "_blank" href = "https://openclipart.org">openclipart.org</a></h4>'
	showInfo(250, 370, '16px', text)
}

function showMainMenu() {
	clearInterval(sudokuTimerInterval)
	clearInterval(bombermanTimer)
	for (var i = 0; i < bombs.length; i++)
		if (bombs[i])
			bombs[i].destroy()
	getElement('all').style.display = 'none'
	getElement('mainMenu').style.display = 'block'
	if (vkInited)
		getElement('tellFriendsButton').style.display = 'block'
	getElement('translationsDiv').style.display = 'block'
	getElement('info').onclick = function() { return }
}

function startPause() {
	if (getElement('mainMenu').style.display != 'none' || getElement('loading').style.display != 'none')
		return
	showInfo(200,100, '100px', '<b>' + translations[playerInfo.currentLanguage].pause + '</b>')
	getElement('all').style.display = 'none'
	startTimer = 0
	if (detectIE()) {
		getElement('info').onclick = stopPause
		getElement('popupOverlay').onclick = stopPause
	} else {
		getElement('info').addEventListener("click", stopPause, true)
		getElement('popupOverlay').addEventListener("click", stopPause, true)
	}
}

function stopPause() {
	if (getElement('mainMenu').style.display != 'none')
		return
	getElement('all').style.display = 'block'
	startTimer = 1
	if (detectIE()) {
		getElement('info').onclick = hidePopup
		getElement('popupOverlay').onclick = hidePopup
	} else {
		getElement('info').removeEventListener("click", stopPause, true)
		getElement('popupOverlay').removeEventListener("click", stopPause, true)
	}
	hidePopup()
}

//hints

function noMoreTipsFunc() {
	showInfo(200, 80, '80px', translations[playerInfo.currentLanguage].noMoreTips)
}

function oneDigitHint() {
	if (remainingCells == 0 || startTimer == 0)
		return
	getElement('hint').blur()
	if (oneDigitHints == 0) {
		noMoreTipsFunc()
		return
	}
	oneDigitHints--
	var index = 0, list = []
	for (var i = 0; i < 9; i++) //y
		for (var j = 0; j < 9; j++) { //x
			index = 9*i + j
			if (data[i][j] == 0) 
				list.push(index)
		}
	index = Math.floor(Math.random() * list.length)
	var x = list[index]%9, y = Math.floor(list[index]/9)
	hintedCells.push({x: x, y: y, timer: 5000})
	data[y][x] = trueData[y][x]
	getElement('td' + y + x).innerHTML = '<pre>' + (data[y][x] == 0 ? ' ' : "<b>" + data[y][x] + "</b>") + '</pre>'
	getElement('td' + y + x).setAttribute('bgcolor', '#B4CDCD')
	showInfo(200, 80, '80px', translations[playerInfo.currentLanguage].tip + " (" + (x + 1) + ", " + (y + 1) + ') = ' + trueData[y][x])
	checkFilling(y, x)
	if (--remainingCells == 0) //victory checking
		victory()
}

function stopBomberHint(time) {
	if (stopBomberHints == 0) {
		noMoreTipsFunc()
		return
	}
	stopBomberHints--
	bomberman.waitTimer = time*1000/game_delay
	hidePopup()
}

function checkSolvability() { //awesome word
	if (checkSolvabilityHints == 0) {
		noMoreTipsFunc()
		return
	}
	checkSolvabilityHints--
	var remain = remainingCells
	var tempData = new Array (9)
	for (var i = 0; i < 9; i++) {
		tempData[i] = new Array (9)
		for (var j = 0; j < 9; j++)
			tempData[i][j] = data[i][j]
	}
	if (solveSudoku(tempData, remain, 1, undefined))
		showInfo(200, 80, '80px', translations[playerInfo.currentLanguage].solvable)
	else
		showInfo(200, 80, '80px', translations[playerInfo.currentLanguage].unsolvable)
}

function showHints() {
	if (remainingCells == 0 || startTimer == 0)
		return
	getElement('hint').blur()
	var text = '<div align = "center"><br><input type = "button" style = "width: 300px; height: 75px;" value = "' + translations[playerInfo.currentLanguage].show1digit + ' (' + oneDigitHints + ')" onclick = "oneDigitHint()">' +
		'<input type = "button" style = "width: 300px; height: 75px;" value = "' + translations[playerInfo.currentLanguage].stopBomber + ' (' + stopBomberHints + ')" onclick = "stopBomberHint(10)">' +
		'<input type = "button" style = "width: 300px; height: 75px;" value = "' + translations[playerInfo.currentLanguage].checkSolvability + ' (' + checkSolvabilityHints + ')" onclick = "checkSolvability()"></div>'
	showInfo(340, 280, '25px', text)
}
