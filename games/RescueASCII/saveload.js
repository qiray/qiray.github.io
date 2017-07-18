
function saveGame() {
	var elm = document.getElementById('saveLoad')
	elm.innerHTML = '<div style = "text-align: center"><input type = "button" style = "width: 20em;  height: 2em;" value = "Save local" onclick = "getSaveText(1); this.parentNode.parentNode.style.display = \'none\'">' +
		'<br>You can also get current game as text (press "Get game as text" button and save this text):' +
		'<br><input type = "button" style = "width: 20em;  height: 2em;" value = "Get game as text" onclick = "document.getElementById(\'saveText\').value = encrypt(getSaveText(0));">' +
		'<textarea id = "saveText" cols = 35 rows = 9></textarea>\<input type = "button" style = "width: 20em;  height: 2em;" value = "Close" onclick = "this.parentNode.parentNode.style.display = \'none\'"></div>'
	elm.style.display = 'inline-block'
	var tmp = (elm.parentNode.parentNode.clientWidth - elm.clientWidth)/2
	elm.style.left = tmp > 0 ? tmp : 0
	elm.style.top = 200
}

function loadGame() {
	var elm = document.getElementById('saveLoad')
	elm.innerHTML = '<div style = "text-align: center"><input type = "button" style = "width: 20em;  height: 2em;" value = "Load local save" onclick = "loadFromText(document.cookie); this.parentNode.parentNode.style.display = \'none\'">'
		+ '<br>You can also load from text: <textarea id = "loadText" cols = 35 rows = 10></textarea>'
		+ '<input type = "button" style = "width: 20em;  height: 2em;" value = "Load from text" onclick = "loadFromText(decrypt(document.getElementById(\'loadText\').value)); this.parentNode.parentNode.style.display = \'none\'"><br>'
		+ '<input type = "button" style = "width: 20em;  height: 2em;" value = "RESET GAME PROGRESS!" onclick = "resetProgress()">'
		+ '<br><input type = "button" style = "width: 20em;  height: 2em;" value = "Close" onclick = "this.parentNode.parentNode.style.display = \'none\'"></div>'
	elm.style.display = 'inline-block'
	var tmp = (elm.parentNode.parentNode.clientWidth - elm.clientWidth)/2
	elm.style.left = tmp > 0 ? tmp : 0
	elm.style.top = 200	
}

function getCookie(txt, name) {
	var matches = txt.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	))
	return matches ? decodeURIComponent(matches[1]) : -10
}

function getCookieArray(txt, cookie) {
	var temp = getCookie(txt, cookie)
	if (temp == -10)
		return -10
	if (temp.search(',') > 0) {
		temp = temp.split(",")
		for (var i = 0; i < temp.length; i++)
			temp[i] = parseInt(temp[i])
		return temp
	} else if (temp == -1)
		return []
	else
		return [parseInt(temp)]
}

function loadFromText(txt) {
	tempPlayer.statistics.killedEnemies = parseInt(getCookie(txt, 'killedEnemies'))
	tempPlayer.statistics.builtTowers = parseInt(getCookie(txt, 'builtTowers'))
	tempPlayer.statistics.upgradedTowers = parseInt(getCookie(txt, 'upgradedTowers'))
	tempPlayer.statistics.soldTowers = parseInt(getCookie(txt, 'soldTowers'))
	tempPlayer.statistics.wins = parseInt(getCookie(txt, 'wins'))
	tempPlayer.statistics.loses = parseInt(getCookie(txt, 'loses'))
	tempPlayer.statistics.money = parseInt(getCookie(txt, 'statistics.money'))
	tempPlayer.difficulty = parseInt(getCookie(txt, 'difficulty'))
	tempPlayer.money = parseInt(getCookie(txt, 'money'))
	tempPlayer.maxTowerLevel = parseInt(getCookie(txt, 'maxTowerLevel'))
	tempPlayer.currentLevel = parseInt(getCookie(txt, 'currentLevel'))
	tempPlayer.currentStory = parseInt(getCookie(txt, 'currentStory'))
	
	tempPlayer.achievements = getCookieArray(txt, 'achievements')
	tempPlayer.upgrades = getCookieArray(txt, 'upgrades')
	tempPlayer.unlockedTowers = getCookieArray(txt, 'unlockedTowers')
	tempPlayer.knownEnemies = getCookieArray(txt, 'knownEnemies')
	
	tempPlayer.upgradeCoeffs.money.mul = parseFloat(getCookie(txt, 'money.mul'))
	tempPlayer.upgradeCoeffs.money.add = parseFloat(getCookie(txt, 'money.add'))
	tempPlayer.upgradeCoeffs.towerDamage.mul = parseFloat(getCookie(txt, 'towerDamage.mul'))
	tempPlayer.upgradeCoeffs.towerDamage.add = parseFloat(getCookie(txt, 'towerDamage.add'))	
	tempPlayer.upgradeCoeffs.towerCost.mul = parseFloat(getCookie(txt, 'towerCost.mul'))
	tempPlayer.upgradeCoeffs.towerCost.add = parseFloat(getCookie(txt, 'towerCost.add'))	
	tempPlayer.upgradeCoeffs.towerRange.mul = parseFloat(getCookie(txt, 'towerRange.mul'))
	tempPlayer.upgradeCoeffs.towerRange.add = parseFloat(getCookie(txt, 'towerRange.add'))
	tempPlayer.upgradeCoeffs.towerAttackSpeed.mul = parseFloat(getCookie(txt, 'towerAttackSpeed.mul'))
	tempPlayer.upgradeCoeffs.towerAttackSpeed.add = parseFloat(getCookie(txt, 'towerAttackSpeed.add'))
	
	var tmp = parseInt(getCookie(txt, 'gameSpeed'))
	if (tmp == -10)
		setSpeed(100)
	else
		setSpeed(tmp)
	
	for (var i in tempPlayer)
		if (tempPlayer[i] == -10) //load failed
			return
	player = cloneAll(tempPlayer)
	tempPlayer = cloneAll(newPlayer)
	
	var i = 0
	for (i = 0; i < player.currentLevel; i++) {
		document.getElementById('battle' + i).style.backgroundColor = '#007700'
		document.getElementById('battle' + i).style.opacity = '0.2'
	}
	if (i < battles.length)
		document.getElementById('battle' + i).style.opacity = '0.2'
	var str = player.difficulty == normal ? 'normal' : player.difficulty == hard ? 'hard' : player.difficulty == easy ? 'easy' : 'ultra' //awesome
	document.getElementById('difficulty').innerHTML = 'Difficulty: ' + str
}

function getSaveText(cookie) {
	var str = ''
	str += 'killedEnemies=' + player.statistics.killedEnemies + '; '
	str += 'builtTowers=' + player.statistics.builtTowers + '; '
	str += 'upgradedTowers=' + player.statistics.upgradedTowers	 + '; '
	str += 'soldTowers=' + player.statistics.soldTowers	 + '; '
	str += 'wins=' + player.statistics.wins	+ '; '
	str += 'loses=' + player.statistics.loses + '; '
	str += 'statistics.money=' + player.statistics.money + '; '
	str += 'difficulty=' + player.difficulty + '; '
	str += 'money=' + player.money + '; '
	str += 'maxTowerLevel=' + player.maxTowerLevel + '; '
	str += 'currentLevel=' + player.currentLevel + '; '
	str += 'currentStory=' + player.currentStory + '; '
	str += 'achievements=' + (player.achievements.length == 0 ? '-1' :  player.achievements) + '; '
	str += 'upgrades=' + (player.upgrades.length == 0 ? '-1' :  player.upgrades) + '; '
	str += 'unlockedTowers=' + (player.unlockedTowers.length == 0 ? '-1' :  player.unlockedTowers) + '; '
	str += 'knownEnemies=' + (player.knownEnemies.length == 0 ? '-1' :  player.knownEnemies) + '; '
	str += 'money.mul=' + player.upgradeCoeffs.money.mul + '; '
	str += 'money.add=' + player.upgradeCoeffs.money.add + '; '
	str += 'towerDamage.mul=' + player.upgradeCoeffs.towerDamage.mul + '; '
	str += 'towerDamage.add=' + player.upgradeCoeffs.towerDamage.add + '; '	
	str += 'towerCost.mul=' + player.upgradeCoeffs.towerCost.mul + '; '
	str += 'towerCost.add=' + player.upgradeCoeffs.towerCost.add + '; '
	str += 'towerRange.mul=' + player.upgradeCoeffs.towerRange.mul + '; '
	str += 'towerRange.add=' + player.upgradeCoeffs.towerRange.add + '; '
	str += 'towerAttackSpeed.mul=' + player.upgradeCoeffs.towerAttackSpeed.mul + '; '
	str += 'towerAttackSpeed.add=' + player.upgradeCoeffs.towerAttackSpeed.add + '; '
	str += 'gameSpeed=' + tactTime + ';'
	var date = new Date( new Date().getTime() + 60*1000*60*24*365 )
	if (cookie) {
		var tmp = str.split('; ')
		for (var i in tmp)
			document.cookie = tmp[i] + '; path=/; expires=' + date.toUTCString() + '; '
	}
	return str
}

function resetProgress() {
	var str = '<div style = "text-align: center"><h1>Reset game progress</h1>' + 
		'<h2 style = "text-align: center">Are you sure? You will lose all your statistics, achievements and upgrades.</h2>' + 
		"<input style = 'width: 20em;  height: 2em;' type = 'button' value = 'OK' onclick = 'clearProgress(this)'>" +
		"<input style = 'width: 20em;  height: 2em;' type = 'button' value = 'Cancel' onclick = 'this.parentNode.parentNode.style.display = \"none\"' ></div>"	
	popupInLevel(str)
}

function clearProgress(obj) {
	player = cloneAll(newPlayer)
	tempPlayer = cloneAll(newPlayer)
	hidePopup()
	obj.parentNode.parentNode.style.display = "none"
	for (var i = 0; i < battles.length; i++) {
		document.getElementById('battle' + i).style.backgroundColor = '#D0D0D0'	
	}
	getSaveText(1)
}

function encrypt(str) {
	var etalon = 'zPFkIh3ZlUwNK38sg3u3Wm550S2Blmj0tdttdCPQGUfJkjqoWTHe4ickPSk9oaKafMhVsy8OXun8OWjG0iMG0pl0NAq5gukqPtLiaPfNOEeG61sjaTxPIK72f23j9w4FqReoew6slafhRLM6OdwgEqKdBTVtricB'
	var len = str.length, tmp = new Array (len)
	for (var i = 0; i < len; i++)
		tmp[i] = str.charCodeAt(i) ^ etalon.charCodeAt(i%len)
	return tmp
}

function decrypt(str) {
	var etalon = 'zPFkIh3ZlUwNK38sg3u3Wm550S2Blmj0tdttdCPQGUfJkjqoWTHe4ickPSk9oaKafMhVsy8OXun8OWjG0iMG0pl0NAq5gukqPtLiaPfNOEeG61sjaTxPIK72f23j9w4FqReoew6slafhRLM6OdwgEqKdBTVtricB'
	var arr = str.split(','), len = arr.length, tmp = ''
	for (var i = 0; i < len; i++) 
		tmp += String.fromCharCode(arr[i]^etalon.charCodeAt(i%len))
	return tmp
}
