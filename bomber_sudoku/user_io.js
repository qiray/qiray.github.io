
function handleKey(event) {
	if (event.keyCode == 27 || event.keyCode == 13) //Escape or Enter pressed
		hidePopup()
	if (popupVisible) {
		var digit = String.fromCharCode(event.which)
		if (digit >= '0' && digit <= '9')
			enterDigit(parseInt(digit))
	}
}

function enterDigit(digit) {
	var x = currentIndex%9, y = Math.floor(currentIndex/9)
	if (digit == 0) { //clear cell
		if (data[y][x] != '&nbsp')
			remainingCells++
		data[y][x] = document.getElementById('td' + y + x).innerHTML = '&nbsp'	
	}
	else {
		if (wrongDigit(currentIndex, digit)) {
			showInfo(200, 80, '80px', "Неверная цифра!")
			return
		}
		if (data[y][x] == '&nbsp')
			remainingCells--
		data[y][x] = document.getElementById('td' + y + x).innerHTML = digit
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
	var index = parseInt(parseInt(obj.id[2]*9) + parseInt(obj.id[3])), flag = false
	if (mouseWall) { //TODO: remove after test
		setWall(parseInt(obj.id[3]), parseInt(obj.id[2]))
		return
	}
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
	document.getElementById('popup_overlay').style.display = 'block'
	document.getElementById('popup').style.display = 'none'
	var info = document.getElementById('info')
	info.style.width = width
	info.style.height = height
	info.style.lineHeight = fontSize
	info.style.marginTop = -height/2
	info.style.marginLeft = -width/2
	info.innerHTML = text	
	info.style.display = 'block'
}

function showPopup() {
	document.getElementById('popup_overlay').style.display = 'block'
	document.getElementById('popup').style.display = 'block'
	popupVisible = 1
}

function hidePopup() {
	document.getElementById('popup_overlay').style.display = 'none'
	document.getElementById('popup').style.display = 'none'
	document.getElementById('info').style.display = 'none'
	popupVisible = 0
}

function difficultyTostring(level) {
	switch (level) {
		case trivial:
			return 'Элементарно'
		case easy:
			return 'Легко'
		case medium:
			return 'Норма'
		case hard:
			return 'Трудно'
		case ultra:
			return 'Ультра'
		default:
			return 'Неизвестно'
	}
}

//main menu actions

function startNewGame() {
	document.getElementById('all').style.display = 'block'
	document.getElementById('mainTable').style.left = (document.getElementById('all').clientWidth - document.getElementById('mainTable').clientWidth)/2
	init_game()
	document.getElementById('mainMenu').style.display = 'none'
}

function setDifficulty(level) {
	difficultLevel = level
	document.getElementById('difficultyButton').value = 'Уровень сложности: ' + difficultyTostring(difficultLevel)
	hidePopup()
}

function setDifficultyMenu() {
	var text = 'Выберите сложность:<br><input type = "button" style = "width: 350px; height: 70px;" value = "' + 
	difficultyTostring(trivial) + '" onclick = "setDifficulty(trivial)">' + 
	'<input type = "button" style = "width: 350px; height: 70px;" value = "' + difficultyTostring(easy) + '" onclick = "setDifficulty(easy)">' +
	'<input type = "button" style = "width: 350px; height: 70px;" value = "' + difficultyTostring(medium) + '" onclick = "setDifficulty(medium)">' + 
	'<input type = "button" style = "width: 350px; height: 70px;" value = "' + difficultyTostring(hard) + '" onclick = "setDifficulty(hard)">'
	showInfo(400, 330, '35px', text)	
}

function showRules() {
	var text = '<div style = "font-family: Arial; font-size: 18px"><p align="justify" style = "margin: 10px 20px; text-indent: 20px;">В этой игре вам нужно решить классическую игру судоку: ' +
	'требуется заполнить свободные клетки цифрами от 1 до 9 так, ' + 
	'чтобы в каждой строке, в каждом столбце и в каждом малом квадрате 3×3 ' + 
	'каждая цифра встречалась бы только один раз.</p>' + 
	'<p align="justify" style = "margin: 10px 20px; text-indent: 20px;">Однако, ваш противник ' +
	'постарается навредить вам: он ставит бомбы, которые уничтожают ближайшие цифры, и, таким образом, ' + 
	'разрушают вашу игровую стратегию.</p>' +
	'<p align="justify" style = "margin: 10px 20px; text-indent: 20px;">При полном заполнении строки, столбца или квадрата 3×3 ' +
	'вы получаете бонус: стены, которые ограничивают передвижение бомбермена и взрывные волны. ' + 
	'Также в вашем распоряжении имеется несколько видов подсказок.</p>' +
	'<p align="justify" style = "margin: 10px 20px; text-indent: 20px;">Вы готовы? Тогда вперед!</p></div>'
	showInfo(450, 365, '18px', text)
}

function showAboutInfo() {
	var text = '<div style = "margin: 20px; font-size: 16pt">Bombersudoku ' + version + '</div>' +
	'<p>Автор идеи</p><h4>Данил Михайлов</h4>' +
	'<p>Разработчик</p><h4>Ярослав Зотов</h4>' + 
	'<p>Тестирование</p><h4>Данил Михайлов</h4>' + 
	'<p>Спрайты</p><h4><a target = "_blank" href = "http://gamedevelopment.tutsplus.com/articles/enjoy-these-totally-free-bomberman-inspired-sprites--gamedev-8541">Michael James Williams</a></h4>'
	showInfo(250, 320, '12px', text)
}

function showMainMenu() {
	clearInterval(sudokuTimerInterval)
	clearInterval(bombermanTimer)
	document.getElementById('all').style.display = 'none'
	document.getElementById('mainMenu').style.display = 'block'
	document.getElementById('info').onclick = function() { return }
}

//hints

function oneDigitHint() {
	if (remainingCells == 0 || startTimer == 0)
		return
	document.getElementById('hint').blur()
	if (oneDigitHints == 0) {
		showInfo(200, 80, '80px', "Больше нет подсказок")
		return
	}
	oneDigitHints--
	var index = 0, list = []
	for (var i = 0; i < 9; i++) //y
		for (var j = 0; j < 9; j++) { //x
			index = 9*i + j
			if (!initialData[index] && data[i][j] == "&nbsp") 
				list.push(index)
		}
	index = Math.floor(Math.random() * list.length)
	var x = index%9, y = Math.floor(index/9)
	document.getElementById('td' + y + x).innerHTML = data[y][x] = trueData[y][x]
	document.getElementById('td' + y + x).setAttribute('bgcolor', '#B4CDCD')
	showInfo(200, 80, '80px', "Подсказка: (" + (x + 1) + ", " + (y + 1) + ') = ' + trueData[y][x])
	//document.getElementById('info').setAttribute('onclick', 'alert();')
	checkFilling(y, x)
	if (--remainingCells == 0) //victory checking
		victory()
}

function stopBomberHint(time) {
	if (stopBomberHints == 0) {
		showInfo(200, 80, '80px', "Больше нет подсказок")
		return
	}
	stopBomberHints--
	bomberman.waitTimer = time*1000/game_delay
	hidePopup()
}

function checkSolvability() { //awesome word
	if (checkSolvabilityHints == 0) {
		showInfo(200, 80, '80px', "Больше нет подсказок")
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
		showInfo(200, 80, '80px', 'Разрешимо')
	else
		showInfo(200, 80, '80px', 'Неразрешимо')	
}

function showHints() {
	if (remainingCells == 0 || startTimer == 0)
		return
	document.getElementById('hint').blur()
	var text = '<br><table width = "340">' + 
		'<tr align = "center">' +
			'<td width = "100"><input type = "button" style = "width: 300px; height: 75px;" value = "Показать 1 цифру (' + oneDigitHints + ')" onclick = "oneDigitHint()"></td>' +
		'</tr><tr align = "center">' +
			'<td width = "100"><input type = "button" style = "width: 300px; height: 75px;" value = "Остановить бомбера на 10 секунд (' + stopBomberHints + ')" onclick = "stopBomberHint(10)"></td>' +
		'</tr>' + 
		'</tr><tr align = "center">' +
			'<td width = "100"><input type = "button" style = "width: 300px; height: 75px;" value = "Проверить разрешимость (' + checkSolvabilityHints + ')" onclick = "checkSolvability()"></td>' +
		'</tr></table>'
	showInfo(340, 280, '25px', text)
}
