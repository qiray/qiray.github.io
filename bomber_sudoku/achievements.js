
var playerInfo = {
	statistics: {
		victories: 0,
		totalTime: 0
	},
	bestTime: {
		trivial: 0,
		easy: 0,
		medium: 0,
		hard: 0
	},
	cellSize: 45,
	difficultLevel: trivial,
	currentLanguage: 'ru',
	achievements: []
}

var achievementsImages = []

function checkBombermanDestroyed() {
	if (bomberman.status & statuses.surrender) {
		var sum = 0
		for (var i = 0; i < 81; i++) 
			if (walls[i]) 
				sum++ 
		if (sum <= 25)
			return true
	} else 
		return false
}

var achievements = [
	{id: 0, img: 'images/achievements/thumbsUpLeft.png', name: function() { return translations[playerInfo.currentLanguage].easiest }, description: function() { return translations[playerInfo.currentLanguage].completeLevel + '"' + difficultyTostring(trivial) + '"' }, condition: function() {return playerInfo.bestTime.trivial > 0} },
	{id: 1, img: 'images/achievements/impossibleCubes.png', name: function() { return translations[playerInfo.currentLanguage].easy }, description: function() { return translations[playerInfo.currentLanguage].completeLevel + '"' + difficultyTostring(easy) + '"' }, condition: function() {return playerInfo.bestTime.easy > 0} },
	{id: 2, img: 'images/achievements/normal.png', name: function() { return translations[playerInfo.currentLanguage].norm }, description: function() { return translations[playerInfo.currentLanguage].completeLevel + '"' + difficultyTostring(medium) + '"' }, condition: function() {return playerInfo.bestTime.medium > 0} },
	{id: 3, img: 'images/achievements/toucanJedi.png', name: function() { return translations[playerInfo.currentLanguage].master }, description: function() { return translations[playerInfo.currentLanguage].completeLevel + '"' + difficultyTostring(hard) + '"' }, condition: function() {return playerInfo.bestTime.hard > 0} },
	{id: 4, img: 'images/achievements/3oclock.png', name: function() { return translations[playerInfo.currentLanguage].nohurry }, description: function() { return translations[playerInfo.currentLanguage].completeLevel10 }, condition: function() {for (var i in playerInfo.bestTime) if (playerInfo.bestTime[i] > 0 && playerInfo.bestTime[i] < 600) return true; return false; } },
	{id: 5, img: 'images/achievements/2oclock.png', name: function() { return translations[playerInfo.currentLanguage].blitzkrieg }, description: function() { return translations[playerInfo.currentLanguage].completeLevel5 }, condition: function() {for (var i in playerInfo.bestTime) if (playerInfo.bestTime[i] > 0 && playerInfo.bestTime[i] < 300) return true; return false; } },
	{id: 6, img: 'images/achievements/1oclock.png', name: function() { return translations[playerInfo.currentLanguage].fasterThanSound }, description: function() { return translations[playerInfo.currentLanguage].completeLevel3 }, condition: function() {for (var i in playerInfo.bestTime) if (playerInfo.bestTime[i] > 0 && playerInfo.bestTime[i] < 180) return true; return false; } },
	{id: 7, img: 'images/achievements/soldier.png', name: function() { return translations[playerInfo.currentLanguage].fighter }, description: function() { return translations[playerInfo.currentLanguage].complete10levels }, condition: function() {return playerInfo.statistics.victories >= 10 } },
	{id: 8, img: 'images/achievements/corporal.png', name: function() { return translations[playerInfo.currentLanguage].veteran }, description: function() { return translations[playerInfo.currentLanguage].complete30levels }, condition: function() {return playerInfo.statistics.victories >= 30 } },
	{id: 9, img: 'images/achievements/sargeant.png', name: function() { return translations[playerInfo.currentLanguage].iamlegend }, description: function() { return translations[playerInfo.currentLanguage].complete50levels }, condition: function() {return playerInfo.statistics.victories >= 50 } },
	{id: 10, img: 'images/achievements/radacinaHandcuffs.png', name: function() { return translations[playerInfo.currentLanguage].gotcha }, description: function() { return translations[playerInfo.currentLanguage].lockBomber }, condition: checkBombermanDestroyed },
	{id: 11, img: 'images/achievements/sniper.png', name: function() { return translations[playerInfo.currentLanguage].sniper }, description: function() { return translations[playerInfo.currentLanguage].completeNoErrors }, condition: function() { return wrongDigits == 0 && remainingCells == 0 } },
	{id: 12, img: 'images/achievements/noBomb.png', name: function() { return translations[playerInfo.currentLanguage].nobombs }, description: function() { return translations[playerInfo.currentLanguage].completeNoBombs }, condition: function() { return bombPlantedFlag == 0 && remainingCells == 0 } },
	{id: 13, img: 'images/achievements/SierpinskiTriangle.png', name: function() { return translations[playerInfo.currentLanguage].recursion }, description: function() { return translations[playerInfo.currentLanguage].allAchievements }, condition: function() {return playerInfo.achievements.length == achievements.length - 1} }
]

function checkAchievements() {
	if (getElement('info').style.display != 'none')
		return
	for (var i = 0; i < achievements.length; i++)
		if (playerInfo.achievements.indexOf(i) == -1 && achievements[i].condition()) {
			playerInfo.achievements.push(i) 
			var text = '<h2>' + translations[playerInfo.currentLanguage].newAchievement + '</h2>' +
			'<table width = "280" style = "margin: 10px">' +
				'<tr align = "center">' + 
				'<td><img src="' + achievements[i].img +'" height="100" width="100"></td>' + 
				'<td><h3>' + achievements[i].name() + '</h3>' + achievements[i].description() + '</td>' +
				'</tr>' +
			'</table>'
			showInfo(300, 220, '20px', text)
			saveToVK()
			return
		}
}

function loadFormVK() {
	if (vkInited) {
		VK.api('storage.get', {key: 'playerInfo', user_id: current_id}, function(data) {
			console.log(data, data.response)
			if (data.response != '') {
				playerInfo = JSON.parse(data.response)
				setLanguage(playerInfo.currentLanguage)
				cellSize = playerInfo.cellSize == 0 ? 45 : playerInfo.cellSize
				cellHalfSize = Math.floor(cellSize/2)
				cellSizeWithBorders = 1.12*cellSize
				difficultLevel = playerInfo.difficultLevel
				defaultBombPower = difficultLevel == hard ? 3 : 2
			}
		})
	} else {
		//TODO: load from local storage!
	}
}

function saveToVK() {
	if (vkInited) {
		playerInfo.cellSize = cellSize
		var text = JSON.stringify(playerInfo)
		VK.api('storage.set', {key: 'playerInfo', value: text, user_id: current_id}, function() {})
	} else {
		//TODO: save to local storage!
	}
}

function tellFriends() {
	if (vkInited) {
		VK.api('wall.post', {owner_id: current_id, from_group: '1', message: translations[playerInfo.currentLanguage].shareText, attachments: 'photo9921766_388085077', version: '5.37'}, function() {})
	}	
}
