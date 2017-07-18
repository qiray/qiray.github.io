
function getMouseIndex(event) {
	var clickY = 0, clickX = 0, step = 10
	if (event.layerX || event.layerX == 0) { //Firefox
		clickX = event.layerX + step
		clickY = event.layerY + step
	} else if (event.offsetX || event.offsetX == 0) { //Opera
		clickX = event.offsetX + step
		clickY = event.offsetY + step
	}
	if (navigator.userAgent.search(/Chrome/) > 0) { //Chrome
		clickX = event.offsetX + step
		clickY = event.offsetY + step
	}
	if (clickX < drawShift || clickY < drawShift || clickX > drawShift + mapSize*cellSize || clickY > drawShift + mapSize*cellSize)
		return -1
	return Math.floor((clickY - drawShift)/cellSize)*mapSize + Math.floor((clickX - drawShift)/cellSize)
}	

function handleMouseMove(event) {
	var index = getMouseIndex(event)
	if (index < 0)
		return	
	var i = 0, flag = 0
	for (i = 0; i < towers.length; i++)
		if (towers[i] != undefined && towers[i].index == index) {
			flag = 1
			break
		}
	if (flag) {
		tooltipIndex = index
		tooltipText = towers[i].name + ' level ' + towers[i].level
	}
	else {
		tooltipIndex = -1
		tooltipText = ''	
	}
	if (flag || buildMap[index] != cantBuild) {
		canvas.style.cursor = "pointer"
		return
	} else
		canvas.style.cursor = "default"
}

function handleClick(event) {
	if (stopGame)
		return
	var index = getMouseIndex(event)
	if (index < 0)
		return
	if (buildMap[index] == cantBuild)
		return
	
	var i = 0, flag = 0
	for (i = 0; i < towers.length; i++) //get tower number in towers array
		if (towers[i] != undefined && towers[i].index == index) {
			flag = 1
			break
		}
	if (flag) {
		towerMenu(index)
		return
	}
		
	globalIndex = index
	for (var i = 1; i <= 4; i++) { //set text for menu buttons
		if (player.unlockedTowers.indexOf(i) == -1) {
			var obj = document.getElementById('towerButton' + i)
			obj.style.lineHeight = '1'
			obj.style.fontSize = '100%'
			obj.innerHTML = translations[currentLanguage].locked 
			obj.removeAttribute('onclick')
			obj = document.getElementById('towerInfo' + i)
			obj.style.lineHeight = '1'
			obj.style.fontSize = '100%'
			obj.innerHTML = translations[currentLanguage].locked
			obj.removeAttribute('onclick')
			continue
		}
		var obj = document.getElementById('towerButton' + i)
		obj.style.lineHeight = towerTypes[i - 1].lineHeight
		obj.style.fontSize = parseInt(towerTypes[i - 1].size)*1.5 + '%'
		obj.innerHTML = towerTypes[i - 1].img
		obj.setAttribute('onclick', 'createTower(' + i + ', globalIndex)')
		obj = document.getElementById('towerInfo' + i)
		obj.setAttribute('onclick', 'createTower(' + i + ', globalIndex)')
		obj.innerHTML = towerTypes[i - 1].name + '\n' + translations[currentLanguage].cost + ': ' + 
			Math.round(towerTypes[i - 1].cost*player.upgradeCoeffs.towerCost.mul + player.upgradeCoeffs.towerCost.add) + 
			'\n' + translations[currentLanguage].range + ': ' + Math.round((towerTypes[i - 1].range*player.upgradeCoeffs.towerRange.mul + player.upgradeCoeffs.towerRange.add)*100)/100 + 
			'\n' + translations[currentLanguage].damage + ': ' + Math.round(towerTypes[i - 1].damage*player.upgradeCoeffs.towerDamage.mul + player.upgradeCoeffs.towerDamage.add) + 
			'\n' + translations[currentLanguage].attackSpeed + Math.round((towerTypes[i - 1].attackSpeed*player.upgradeCoeffs.towerAttackSpeed.mul + player.upgradeCoeffs.towerAttackSpeed.add)*100)/100
	} 
	var menu = document.getElementById('buildMenu')
	bigPopupSize()
	menu.style.display = 'inline-block'
	var tmp = (menu.parentNode.parentNode.clientWidth - menu.clientWidth)/2
	menu.style.left = tmp > 0 ? tmp : 0
	tmp = document.getElementById('level').clientHeight/2 - 100
	menu.style.top = tmp > 0 ? tmp : 0
}

function handleKey(event) {
	if (event.keyCode == 27 || event.keyCode == 13) //Escape or Enter pressed
		hidePopup()
	if (document.getElementById('buildMenu').style.display == 'inline-block') {
		var cmd = parseInt(String.fromCharCode(event.keyCode || event.charCode))
		if (cmd > 0 && cmd < 5 && player.unlockedTowers.indexOf(cmd) != -1)
			createTower(cmd, globalIndex)			
	}
	if (document.getElementById('towerMenu').style.display == 'inline-block')
		switch (event.key) {
			case 'r':
				showHideRange(globalIndex)
				break
			case 'u':
				updateTower(globalIndex)
				break
			case 's':
				deleteTower(globalIndex)
				break
		}
}
