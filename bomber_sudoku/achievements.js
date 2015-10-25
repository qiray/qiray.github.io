
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
	cellSize: 0,
	difficultLevel: trivial,
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
	{id: 0, img: 'images/achievements/thumbsUpLeft.png', name: 'Одной левой', description: 'Пройти уровень "' + difficultyTostring(trivial) + '"', condition: function() {return playerInfo.bestTime.trivial > 0} },
	{id: 1, img: 'images/achievements/impossibleCubes.png', name: 'Проще, чем кажется', description: 'Пройти уровень "' + difficultyTostring(easy) + '"', condition: function() {return playerInfo.bestTime.easy > 0} },
	{id: 2, img: 'images/achievements/normal.png', name: 'Это норма', description: 'Пройти уровень "' + difficultyTostring(medium) + '"', condition: function() {return playerInfo.bestTime.medium > 0} },
	{id: 3, img: 'images/achievements/toucanJedi.png', name: 'Мастер', description: 'Пройти уровень "' + difficultyTostring(hard) + '"', condition: function() {return playerInfo.bestTime.hard > 0} },
	{id: 4, img: 'images/achievements/3oclock.png', name: 'Некуда спешить', description: 'Пройти уровень быстрее, чем за 10 минут', condition: function() {for (var i in playerInfo.bestTime) if (playerInfo.bestTime[i] > 0 && playerInfo.bestTime[i] < 600) return true; return false; } },
	{id: 5, img: 'images/achievements/2oclock.png', name: 'Блицкриг', description: 'Пройти уровень быстрее, чем за 5 минут', condition: function() {for (var i in playerInfo.bestTime) if (playerInfo.bestTime[i] > 0 && playerInfo.bestTime[i] < 300) return true; return false; } },
	{id: 6, img: 'images/achievements/1oclock.png', name: 'Быстрее мысли', description: 'Пройти уровень быстрее, чем за 3 минуты', condition: function() {for (var i in playerInfo.bestTime) if (playerInfo.bestTime[i] > 0 && playerInfo.bestTime[i] < 180) return true; return false; } },
	{id: 7, img: 'images/achievements/soldier.png', name: 'Боец', description: 'Пройти 10 уровней', condition: function() {return playerInfo.statistics.victories >= 10 } },
	{id: 8, img: 'images/achievements/corporal.png', name: 'Ветеран', description: 'Пройти 30 уровней', condition: function() {return playerInfo.statistics.victories >= 30 } },
	{id: 9, img: 'images/achievements/sargeant.png', name: 'Я легенда', description: 'Пройти 50 уровней', condition: function() {return playerInfo.statistics.victories >= 50 } },
	{id: 10, img: 'images/achievements/radacinaHandcuffs.png', name: 'Попался!', description: 'Запереть бомбермена меньше чем 25-ю стенами', condition: checkBombermanDestroyed },
	{id: 11, img: 'images/achievements/sniper.png', name: 'Снайпер', description: 'Пройти уровень без единой ошибки', condition: function() { return wrongDigits == 0 && remainingCells == 0 } },
	{id: 12, img: 'images/achievements/noBomb.png', name: 'Проверено, бомб нет', description: 'Пройти уровень, помешав бомбермену поставить бомбы', condition: function() { return bombPlantedFlag == 0 && remainingCells == 0 } },
	{id: 13, img: 'images/achievements/SierpinskiTriangle.png', name: 'Рекурсия', description: 'Получить все достижения', condition: function() {return playerInfo.achievements.length == achievements.length - 1} }
]

function checkAchievements() {
	if (getElement('info').style.display != 'none')
		return
	for (var i = 0; i < achievements.length; i++)
		if (playerInfo.achievements.indexOf(i) == -1 && achievements[i].condition()) {
			playerInfo.achievements.push(i) 
			var text = '<h2>Новое достижение</h2>' +
			'<table width = "280" style = "margin: 10px">' +
				'<tr align = "center">' + 
				'<td><img src="' + achievements[i].img +'" height="100" width="100"></td>' + 
				'<td><h3>' + achievements[i].name + '</h3>' + achievements[i].description + '</td>' +
				'</tr>' +
			'</table>'
			showInfo(300, 220, '20px', text)
			saveToVK()
			return
		}
}

function loadFormVK() {
	if (vkInited)
		VK.api('storage.get', {key: 'playerInfo', user_id: current_id}, function(data) {
			console.log(data, data.response)
			if (data.response != '') {
				playerInfo = JSON.parse(data.response)
				cellSize = playerInfo.cellSize
				cellHalfSize = Math.floor(cellSize/2)
				cellSizeWithBorders = 1.12*cellSize
				setDifficulty(playerInfo.difficultLevel)
				hidePopup()
			}
		})
}

function saveToVK() {
	if (vkInited) {
		var text = JSON.stringify(playerInfo)
		VK.api('storage.set', {key: 'playerInfo', value: text, user_id: current_id}, function() {})
	}
}
