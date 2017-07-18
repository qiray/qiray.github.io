
var globalMapVisible = 3
var globalMapString = 
'<pre style = "font-family:courier new;font-size: 13px;line-height: 15px">\
+-------------------------------------------------------------------------------------+\n\
|                                              ~                           WW         |\n\
|      W     ~                        ~                              ___;-/II\\        |\n\
|     / \\               ~                                     ~     / 88  |++|\\__     |\n\
|     |O|                                                           \\8888 |  |   \\    |\n\
|     | |                         ~                                 / ||  |++|    \\   |\n\
| ^  /===\\  ^  /=\\                                                 (__    |UU|    |   |\n\
|/ \\ |   | / \\ |o|      ~                            ~                \\  /====\\   /   |\n\
|\\__\\|O O|/__/=\\ |                 ^     ~                             )       _/     |\n\
||   |HHH|   |o|  \\               / \\                         ~        \\_    _/       |\n\
||   |   |   | |  |    ~ I     ___|#|                                    \\__/         |\n\
|=\\ /=====\\ /===\\ |     /=\\__/-\\  | |     ~                                     ~     |\n\
| |_|     |_|   | |_/-\\_|O|  |_| /|#|\\                               ~                |\n\
| | |HHHHH| |   |_| |_| | |\\__  / /   \\__               ~                             |\n\
| |_|_____|_|   |   /=\\ |U|___| | |      \\_                                           |\n\
|_|  \\ # /  |___|(O)|_|  ^    -/ _/        (_________                        ~        |\n\
|O|__| # |__|O     /==\\ / \\ -/ _/                   |                                 |\n\
| /=\\  #      /==\\ |__| |#|/ _/    /=\\              /   .___                          |\n\
| |-| ## Y /-\\|__| /=\\  | |_/      |U|             /   /    )____    ~                |\n\
|/==\\ #/-\\ |_| /=\\ |_|-/|#|    ####### /=\\        /   /    .     \\                    |\n\
||__|##|_|/==\\ |_|  -/ _/      #/-\\  ##|_|      _/    )         . |                   |\n\
|WW  # WW |__| ----/ _/   /=\\  #|_|/=\\#        / ~   /      #####. //_______          |\n\
|o \\ #/ o\\ ---/ ____/     |_| ##   |_|##  /=\\ /     (       #R..### .  .   (          |\n\
|  | #|  |/ ___/            ### /-\\    #  |U| \\     //=\\         .########  \\         |\n\
|  |--|  |_/       (O)      #   |_|    ##########\\ / |U|   #     .   . . ##  \\    ~   |\n\
|__|OO|__|       ############                / \\############   .  .(O)  . # . \\       |\n\
|   #     /!!/!!/#/!!/!!/                ___(    /         #           .  ### (_____  |\n\
|   #    /!!/!!/#/!!/!!/      _____     /   ~   ^          #        ^   .  .#   .   \\ |\n\
|   #   /!!/!!/#/!!/!!/      /     \\___/    ___/_\\^     ^  #       /_\\    . ####     \\|\n\
|  ##  /!!/!!/#/!!/!!/      / ~         ~  /  /  /-\\^  /_\\ ##     /   \\      . #      |\n\
|  #  /!!/!!/#/!!/!!/      /    /-\\_______/  / _/  / ^/   \\ ##   / - - \\       #  ..  |\n\
|  # /!!/!!/#/!!/!!/      /    /       ,       /  / /-\\  ^ \\ ##               ##      |\n\
|  ##########          __(  ~ /    ,  ##### ,    / / \\ \\/_\\ ^ ######         R#       |\n\
|                     /      /       ## , #####   /  _ /   /-\\  ^  ############       |\n\
|                    / ~   __)   ,  ##     ,  ##      / _ /  ^\\/_\\         ^  ##     ^|\n\
|         __________(     /         #  ,       #  ,      /  / /  ^\\  ^    /-\\  # ^  /_|\n\
|        /     ~      ~  /      88  #       ,  ##     ,      /  / \\\\/-\\  /   \\ #/ \\/  |\n\
|_______/ ~  _____--____/      8888##   ,       ##         ^   /   \\   \\/     #/   \\  |\n\
|           /                88 ||##88     ,   , ##  ,    / \\ / ^   \\ I \\    #/   /=\\ |\n\
|____~,____/  ^          88 8888  #8888      ,    #      /   \\ /-\\   /=\\ /==\\#### |_| |\n\
|          /=X=\\  ..    8888 ||   # ||    88    , ######/O^   /   \\  |O| |U_|   #  _/\\|\n\
|   /=\\ /=\\|U| |         ||##88####  88  8888         ^##/*\\ /O   /=\\| |\\__  /\\ # / o||\n\
|   |U| |_|  |_|   #####88##8888 88 688900||       , /-\\/   \\ ##  |U||U|___| ||## |U_||\n\
|  ######/-\\##/-\\###   8888  || 8888 ||0000  ..     /   \\    \\ #/-\\##/==\\#/II\\##/-\\   |\n\
|  #     |_|  |U|       ||       ||     ||         /     \\      |_|  |__| |==|  |_|(O)|\n\
+-------------------------------------------------------------------------------------+\n\
</pre>'

//difficulty:
var normal = 1, hard = 1.5, easy = 0.5, ultra = 2

function globalLocalMap(watch) { //switch global/local map
	if (watch == 1) { //show global map
		if (globalMapVisible == 2 && currentLevel >= player.currentLevel && stopGame == 0)
			player.currentStory--
		globalMapVisible = 1
		stopGame = 3
		document.getElementById('pauseText').innerHTML = translations[currentLanguage].pauseText
		clearLevel()
		tempPlayer = cloneAll(newPlayer)
		document.getElementById('level').style.display = 'none'
		document.getElementById('mainMenu').style.display = 'none'
		var globalMap = document.getElementById('global')
		globalMap.style.display = 'inline-block'
		var tmp = (globalMap.parentNode.parentNode.clientWidth - globalMap.clientWidth)/2
		globalMap.style.left = tmp > 0 ? tmp : 0
	} else if (watch == 2) { //show local map
		globalMapVisible = 2
		document.getElementById('global').style.display = 'none'
		document.getElementById('mainMenu').style.display = 'none'
		stopGame = 0
		tempPlayer = cloneAll(player)
		var levelDiv = document.getElementById('level')
		levelDiv.style.display = 'inline-block'
		var tmp = (levelDiv.parentNode.parentNode.clientWidth - levelDiv.clientWidth)/2
		levelDiv.style.left = tmp > 0 ? tmp : 0
	} else if (watch == 3) { //show main menu
		globalMapVisible = 3
		document.getElementById('level').style.display = 'none'
		document.getElementById('global').style.display = 'none'
		var menu = document.getElementById('mainMenu')
		menu.style.display = 'inline-block'
		var tmp = (menu.parentNode.parentNode.clientWidth - menu.clientWidth)/2
		menu.style.left = tmp > 0 ? tmp : 0
	}
}

function showBattle(b) {
	if (player.currentLevel < b)
		return
	for (var i = 0; i < battles.length; i++)
		if (player.currentLevel < i)
			document.getElementById('battle' + i).style.opacity = '0.01' //not  available level
		else
			document.getElementById('battle' + i).style.opacity = '0.2'
	if (b != -1)
		document.getElementById('battle' + b).style.opacity = '0.8' //show
}

function initGlobalMap() {
	stopGame = 3
	var globalMap = document.getElementById('globalMap')
	globalMap.innerHTML = globalMapString
	var tmp = (globalMap.parentNode.parentNode.clientWidth - globalMap.clientWidth)/2
	globalMap.parentNode.style.left = tmp > 0 ? tmp : 0
	for (var i = 0; i < battles.length; i++) {
		var tmp = document.createElement('div')
		tmp.className = 'battle'
		tmp.style.left = battles[i].x
		tmp.style.top = battles[i].y
		if (player.currentLevel < i)
			tmp.style.opacity = '0.01'
		else
			tmp.style.opacity = '0.2'
		tmp.id = 'battle' + i
		tmp.innerHTML = '<div style = "display:table-cell; vertical-align: middle;" id = "battleText' + i + '">' + battles[i].name + '</div>'
		tmp.setAttribute('onclick', 'startLevel(' + i + ')')
		tmp.setAttribute('onmouseenter', "showBattle(" + i + ")") //show this
		tmp.setAttribute('onmouseleave', "showBattle(" + (-1) + ")") //hide
		globalMap.appendChild(tmp)
	}
}

//main menu

function continueGame() {
	globalLocalMap(1)
}

function changeDifficulty() {
	switch (player.difficulty) {
		case normal:
			player.difficulty = hard //hard
			document.getElementById('difficulty').innerHTML = translations[currentLanguage].difficulty.hard
			break
		case hard:
			player.difficulty = ultra //ultra
			document.getElementById('difficulty').innerHTML = translations[currentLanguage].difficulty.ultra
			break
		case ultra:
			player.difficulty = easy //easy
			document.getElementById('difficulty').innerHTML = translations[currentLanguage].difficulty.easy
			break
		case easy:
			player.difficulty = normal //normal
			document.getElementById('difficulty').innerHTML = translations[currentLanguage].difficulty.normal
			break
	}
}

function bigPopupSize() {
	var bigPopup = document.getElementById('popupLayer')
	bigPopup.style.display = 'inline-block'
	bigPopup.style.width = window.innerWidth - 1
	var body = document.body, html = document.documentElement;
	var height = Math.max( body.scrollHeight, body.offsetHeight, 
		html.clientHeight, html.scrollHeight, html.offsetHeight )
	bigPopup.style.height = height	
	bigPopup.style.width = Math.max( body.scrollWidth, body.offsetWidth, 
		html.clientWidth, html.scrollWidth, html.offsetWidth ) - 1
}

function showDescWindow(str) {
	var desc = document.getElementById('descriptions')
	desc.innerHTML = str
	desc.style.display = 'inline-block'
	var tmp = (desc.parentNode.parentNode.clientWidth - desc.clientWidth)/2
	desc.style.left = tmp > 0 ? tmp : 0
	bigPopupSize()
}

function showDescriptions() {
	var table = "<h2 style = 'text-align: center'>Towers</h2><table border = '1' align = 'center'>"
	for (var i = 0; i < towerTypes.length; i++) {
		if (player.unlockedTowers.indexOf(i + 1) == -1)
			continue
		table += "<tr align = 'center'><td style = 'white-space: pre; line-height: " + towerTypes[i].lineHeight + "' height = '150' width = '150'>" + towerTypes[i].img + 
			"</td><td style = 'white-space: pre-wrap' height = '150' width = '150'>" + towerTypes[i].name + ':\n' + translations[currentLanguage].cost + ': ' + 
			Math.round(towerTypes[i].cost*player.upgradeCoeffs.towerCost.mul + player.upgradeCoeffs.towerCost.add) + '\n' + translations[currentLanguage].damage
			': ' + Math.round(towerTypes[i].damage*player.upgradeCoeffs.towerDamage.mul + player.upgradeCoeffs.towerDamage.add) + '\n' + translations[currentLanguage].range + ': ' + 
			Math.round((towerTypes[i].range*player.upgradeCoeffs.towerRange.mul + player.upgradeCoeffs.towerRange.add)*100)/100 + '\n' + towerTypes[i].description + '</td></tr>'
	}
	table += "</table><h2 style = 'text-align: center'>Enemies</h2><table border = '1' align = 'center'>"
	for (var i = 0; i < enemyTypes.length; i++) {
		if (player.knownEnemies.indexOf(i + 1) == -1)
			continue
		table += "<tr align = 'center'><td style = 'white-space: pre; line-height: " + enemyTypes[i].lineHeight + "' height = '150' width = '150'>" + enemyTypes[i].img + 
			"</td><td style = 'white-space: pre-wrap' height = '150' width = '150'>" + enemyTypes[i].name + ':\n' + translations[currentLanguage].speed + ': ' + enemyTypes[i].speed + '\n' + 
			translations[currentLanguage].health + ': ' + enemyTypes[i].health + '\n' + enemyTypes[i].description + '</td></tr>'
	}
	table += "</table>"
	showDescWindow(table)
}

function showUgrades() {
	var table = "<h2 style = 'text-align: center'>" + translations[currentLanguage].upgrades + "</h2><h3 style = 'text-align: center'>" + translations[currentLanguage].yourMoney + player.money + "</h3><table border = '1' align = 'center'>"
	table += "<tr align = 'center'><td style = 'white-space: pre-wrap;'>" + translations[currentLanguage].name + 
		"</td><td style = 'white-space: pre-wrap;'>" + translations[currentLanguage].description + 
		"</td><td style = 'white-space: pre-wrap;'>" + translations[currentLanguage].cost + "</td></tr>"
	for (var i = 0; i < upgrades.length; i++) {
		if (player.upgrades.indexOf(i) == -1 && upgrades[i].unlock())
			table += "<tr align = 'center' onclick = 'buyUpgrade(" + i + ")'><td style = 'white-space: pre-wrap;'>" + upgrades[i].name + 
				"</td><td style = 'white-space: pre-wrap;'>" + upgrades[i].description + 
				"</td><td style = 'white-space: pre-wrap;'>" + upgrades[i].cost + '</td></tr>'
	}
	table += "</table>"
	showDescWindow(table)
}

function showPlayerInfo() {
	var str = '<h2 style = "text-align: center">' + translations[currentLanguage].statistics + '</h2><table border = "1" align = "center"' +
		"<tr><td style = 'white-space: pre-wrap;'>" + translations[currentLanguage].killedEnemies + "</td><td style = 'white-space: pre-wrap;'>" + player.statistics.killedEnemies + "</td></tr>" + 
		"<tr><td style = 'white-space: pre-wrap;'>" + translations[currentLanguage].builtTowers + "</td><td style = 'white-space: pre-wrap;'>" + player.statistics.builtTowers + "</td></tr>" + 
		"<tr><td style = 'white-space: pre-wrap;'>" + translations[currentLanguage].upgradedTowers + "</td><td style = 'white-space: pre-wrap;'>" + player.statistics.upgradedTowers + "</td></tr>" + 
		"<tr><td style = 'white-space: pre-wrap;'>" + translations[currentLanguage].earnedMoney + "</td><td style = 'white-space: pre-wrap;'>" + Math.floor(player.statistics.money) + "</td></tr>" + 
		"<tr><td style = 'white-space: pre-wrap;'>" + translations[currentLanguage].wins + "</td><td style = 'white-space: pre-wrap;'>" + player.statistics.wins + "</td></tr>" + 
		"<tr><td style = 'white-space: pre-wrap;'>" + translations[currentLanguage].loses + "</td><td style = 'white-space: pre-wrap;'>" + player.statistics.loses + "</td></tr>" + 
		'</table>'
	if (player.achievements.length > 0) {
		str += '<h2 style = "text-align: center">' + translations[currentLanguage].achievementsText + '(' + player.achievements.length + '/' + achievements.length + ')</h2><table border = "1" align = "center"'
		for (var i = 0; i < player.achievements.length; i++)
			str += "<tr align = 'center'><td align = 'center' style = 'white-space: pre-wrap;'>" + achievements[player.achievements[i]].name + "</td><td align = 'center' style = 'white-space: pre-wrap;'>" +  achievements[player.achievements[i]].description + "</td></tr>"
		str += '</table>'
	}
	if (player.upgrades.length > 0) {
		str += '<h2 style = "text-align: center">' + translations[currentLanguage].upgrades + '(' + player.upgrades.length + '/' + upgrades.length + ')</h2><table border = "1" align = "center"'
		for (var i = 0; i < player.upgrades.length; i++)
			str += "<tr align = 'center'><td align = 'center' style = 'white-space: pre-wrap;'>" + upgrades[player.upgrades[i]].name + "</td><td align = 'center' style = 'white-space: pre-wrap;'>" +  upgrades[player.upgrades[i]].description + "</td></tr>"
		str += '</table>'
	}
	str += '<br>'
	showDescWindow(str)
}

function about() {
	var str = '<h3 style="text-align: center">Rescue ASCII ' + version + '</h3>' + 
		'<div style = "width: 640; padding: 10px"><h3 style="text-align: center">' + translations[currentLanguage].about.author + '</h3>' + translations[currentLanguage].about.authorInfo + 
		'<h3 style="text-align: center">' + translations[currentLanguage].about.game + '</h3>' + translations[currentLanguage].about.gameInfo + 
		'<h3 style="text-align: center">' + translations[currentLanguage].about.specialThanks + '</h3>' + translations[currentLanguage].about.specialThanksInfo +
		'</div>'
	str += '<br>' + buttonText + '<br>'
	showDescWindow(str)
}
