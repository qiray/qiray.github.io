
var player = {
	statistics: {
		killedEnemies: 0,
		builtTowers: 0,
		upgradedTowers: 0,
		soldTowers: 0,
		wins: 0,
		loses: 0,
		money: 0,
	},
	difficulty: 1, //normal
	maxTowerLevel: 1,
	money: 0,
	currentLevel: 0,
	currentStory: 0,
	achievements: [],
	upgrades: [],
	unlockedTowers: [1], //default tower
	knownEnemies: [1], //default enemy
	upgradeCoeffs: {
		money: {
			mul: 1,
			add: 0,
		},
		towerDamage: {
			mul: 1,
			add: 0,
		},
		towerCost: {
			mul: 1,
			add: 0,
		},
		towerRange: {
			mul: 1,
			add: 0,
		},
		towerAttackSpeed: {
			mul: 1,
			add: 0,
		},	
	}
}

var levelMoneyCoef = 1.35

function cloneAll(obj) {
	var copy;

	// Handle the 3 simple types, and null or undefined
	if (null == obj || "object" != typeof obj) return obj;

	// Handle Date
	if (obj instanceof Date) {
		copy = new Date();
		copy.setTime(obj.getTime());
		return copy;
	}

	// Handle Array
	if (obj instanceof Array) {
		copy = [];
		for (var i = 0, len = obj.length; i < len; i++) {
			copy[i] = cloneAll(obj[i]);
		}
		return copy;
	}

	// Handle Object
	if (obj instanceof Object) {
		copy = {};
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = cloneAll(obj[attr]);
		}
		return copy;
	}

	throw new Error("Unable to copy obj! Its type isn't supported.");
}

var newPlayer = cloneAll(player), tempPlayer = cloneAll(player)

//achievements

var achievements = [
	{id: 0, name: 'Defence started', description: 'Built 1 tower', condition: function() { return tempPlayer.statistics.builtTowers >= 1 }},
	{id: 1, name: 'First kill', description: 'Kill 1 enemy', condition: function() { return tempPlayer.statistics.killedEnemies >= 1 }},
	{id: 2, name: 'Tastes like victory', description: 'Complete the 1st level', condition: function() { return player.currentLevel >= 1 }},
	{id: 3, name: 'Constructor', description: 'Built 10 towers', condition: function() { return tempPlayer.statistics.builtTowers >= 10 }},
	{id: 4, name: 'Architect', description: 'Built 100 towers', condition: function() { return tempPlayer.statistics.builtTowers >= 100 }},
	{id: 5, name: 'Civilisation creator', description: 'Built 1000 towers', condition: function() { return tempPlayer.statistics.builtTowers >= 1000 }},
	{id: 6, name: 'Destroyer', description: 'Kill 100 enemies', condition: function() { return tempPlayer.statistics.killedEnemies >= 100 }},
	{id: 7, name: 'Madness? This is SPARTA!', description: 'Kill 1000 enemies', condition: function() { return tempPlayer.statistics.killedEnemies >= 1000 }},
	{id: 8, name: 'Exterminatus!', description: 'Kill 10000 enemies', condition: function() { return tempPlayer.statistics.killedEnemies >= 10000 }},
	{id: 9, name: 'Far over the misty mountains cold', description: 'Complete "Mountain village"', condition: function() { return player.currentLevel >= 5 }},
	{id: 10, name: 'I can see the sea', description: 'Start "Coastal road"', condition: function() { return tempPlayer.currentLevel >= 6 && currentLevel >= 6 }},
	{id: 11, name: 'Is there a troll?', description: 'Start crossing the bridge', condition: function() { return tempPlayer.currentLevel >= 8 && currentLevel >= 8 }},
	{id: 12, name: 'Excuse me, can you open the door?', description: 'Start defending the gates', condition: function() { return tempPlayer.currentLevel >= 11 && currentLevel >= 11 }},
	{id: 13, name: 'Traveller', description: 'Unlock all levels', condition: function() { return player.currentLevel >= levels.length - 1 }},
	{id: 14, name: 'ASCII defender', description: 'Complete the game', condition: function() { return player.currentLevel >= levels.length }},
	{id: 15, name: 'Improver', description: 'Upgrade a tower to level 2', condition: function() { return towerLevel > 1 }},	
	{id: 16, name: 'Trust me, I\'m an engineer', description: 'Upgrade a tower to level 3', condition: function() { return towerLevel > 2 }},
	{id: 17, name: 'It can be better', description: 'Upgrade 10 towers', condition: function() { return tempPlayer.statistics.upgradedTowers >= 10 }},
	{id: 18, name: 'Searching perfection', description: 'Upgrade 100 towers', condition: function() { return tempPlayer.statistics.upgradedTowers >= 100 }},
	{id: 19, name: 'Pocket money', description: 'Earn 1000 money', condition: function() { return tempPlayer.statistics.money >= 1000 }},
	{id: 20, name: 'Serious business', description: 'Earn 10000 money', condition: function() { return tempPlayer.statistics.money >= 10000 }},
	{id: 21, name: 'Capitalism', description: 'Earn 100000 money', condition: function() { return tempPlayer.statistics.money >= 100000 }},
	{id: 22, name: 'Good, bad, but I have the gun', description: 'Unlock gun tower', condition: function() { return player.unlockedTowers.indexOf(2) != -1 }},
	{id: 23, name: 'We\'v got heavy artillery', description: 'Unlock heavy gun tower', condition: function() { return player.unlockedTowers.indexOf(3) != -1 }},
	{id: 24, name: 'What\'s the time? It\'s magic time.', description: 'Unlock magic crystal', condition: function() { return player.unlockedTowers.indexOf(4) != -1 }},
	{id: 25, name: 'You are doing it wrong', description: 'Sell a tower', condition: function() { return tempPlayer.statistics.soldTowers >= 1 }},
	{id: 26, name: 'Cashback', description: 'Sell 10 towers', condition: function() { return tempPlayer.statistics.soldTowers >= 10 }},
	{id: 27, name: 'What are you doing?', description: 'Sell 100 towers', condition: function() { return tempPlayer.statistics.soldTowers >= 100 }},
	{id: 28, name: 'Being a hero', description: 'Complete 5 levels without defeats', condition: function() { return player.statistics.loses == 0 && player.currentLevel >= 5 }},
	{id: 29, name: 'Stand your ground!', description: 'Complete 10 levels without defeats', condition: function() { return player.statistics.loses == 0 && player.currentLevel >= 10 }},
	{id: 30, name: 'Legendary', description: 'Complete the whole game without defeats', condition: function() { return player.statistics.loses == 0 && player.currentLevel >= levels.length }},
	{id: 31, name: 'I have an idea', description: 'Buy 1 upgrade', condition: function() { return player.upgrades.length > 0 }},
	{id: 32, name: 'Inventor', description: 'Buy 10 upgrades', condition: function() { return player.upgrades.length > 9 }},
	{id: 33, name: 'Scientist', description: 'Buy all upgrades', condition: function() { return player.upgrades.length == upgrades.length }},
	{id: 34, name: 'Extreme', description: 'Win with 1 live', condition: function() { return lives == 1 }},
	{id: 35, name: 'Recursively', description: 'Have all achievements', condition: function() { return player.achievements.length == achievements.length - 1 }},
]

function checkAchievements(player_t) {
	if (document.getElementById('achievement').style.display == 'inline-block' || globalMapVisible == 3)
		return
	for (var i = 0; i < achievements.length; i++) {
		if (player_t.achievements.indexOf(achievements[i].id) == -1 && achievements[i].condition()) { //new achievement
			player_t.achievements.push(achievements[i].id)
			var str = '<div style = "text-align: center"><h1>' + translations[currentLanguage].newAchievement + '</h1>' + '<h2 style = "text-align: center">' 
				+ achievements[i].name + '</h2>' + achievements[i].description + '\n\n' + 
				"<input style = 'width: 20em;  height: 2em;' type = 'button' value = 'OK' onclick = 'this.parentNode.parentNode.style.display = \"none\"' ></div>"
			popupInLevel(str)
			break
		}
	}
}

//upgrades

var upgrades = [
	{id: 0, name: 'Guns ready!', description: 'Unlock gun tower', cost: 1, unlock: function() { return player.currentLevel > 0 }, effect: function() { player.unlockedTowers.push(2) }},
	{id: 1, name: 'Big guns are better', description: 'Unlock heavy gun tower <br>(can damage all enemies in the cell by single shot)', cost: 100, unlock: function() { return player.currentLevel > 4 }, effect: function() { player.unlockedTowers.push(3) }},
	{id: 2, name: 'Magic in the air', description: 'Unlock magic crystal <br>(magic bullets can attack enemies<br> near the target with halved damage)', cost: 300, unlock: function() { return player.currentLevel > 7 }, effect: function() { player.unlockedTowers.push(4) }},
	{id: 3, name: 'Ancient drawings', description: 'Unlock towers level 2', cost: 25, unlock: function() { return player.currentLevel > 1 }, effect: function() { player.maxTowerLevel = 2 }},
	{id: 4, name: 'Crazy machines', description: 'Unlock towers level 3', cost: 200, unlock: function() { return player.currentLevel > 3 && player.upgrades.indexOf(3) != -1 }, effect: function() { player.maxTowerLevel = 3 }},
	{id: 5, name: 'Wealth', description: 'Start money +50', cost: 150, unlock: function() { return player.currentLevel > 3 }, effect: function() { player.upgradeCoeffs.money.add += 50 }},
	{id: 6, name: 'Doing business', description: 'Start money +100', cost: 350, unlock: function() { return player.statistics.wins > 5 && player.upgrades.indexOf(5) != -1 }, effect: function() { player.upgradeCoeffs.money.add += 100 }},
	{id: 7, name: '??? PROFIT!', description: 'Start money +150', cost: 750, unlock: function() { return player.statistics.wins > 10 && player.upgrades.indexOf(6) != -1}, effect: function() { player.upgradeCoeffs.money.add += 150 }},
	{id: 8, name: 'Money, money, money', description: 'Start money +5%', cost: 100, unlock: function() { return player.statistics.wins > 3 }, effect: function() { player.upgradeCoeffs.money.mul *= 1.05 }},
	{id: 9, name: 'Multimillionaire', description: 'Start money +7%', cost: 250, unlock: function() { return player.statistics.wins > 7 && player.upgrades.indexOf(8) != -1 }, effect: function() { player.upgradeCoeffs.money.mul *= 1.07 }},
	{id: 10, name: 'Globalisation', description: 'Start money +10%', cost: 650, unlock: function() { return player.statistics.wins > 11 && player.upgrades.indexOf(9) != -1}, effect: function() { player.upgradeCoeffs.money.mul *= 1.1 }},
	{id: 11, name: 'New bullets', description: 'Towers damage +1', cost: 30, unlock: function() { return player.currentLevel > 1 && player.upgrades.indexOf(0) != -1 }, effect: function() { player.upgradeCoeffs.towerDamage.add += 1 }},
	{id: 12, name: 'Heavy guns', description: 'Towers damage +5', cost: 150, unlock: function() { return player.currentLevel > 3 && player.upgrades.indexOf(11) != -1 }, effect: function() { player.upgradeCoeffs.towerDamage.add += 5 }},
	{id: 13, name: 'Weapon of victory', description: 'Towers damage +10', cost: 500, unlock: function() { return player.currentLevel > 5 && player.upgrades.indexOf(12) != -1 }, effect: function() { player.upgradeCoeffs.towerDamage.add += 10 }},
	{id: 14, name: 'Destroy', description: 'Towers damage +10%', cost: 100, unlock: function() { return player.currentLevel > 2 }, effect: function() { player.upgradeCoeffs.towerDamage.mul *= 1.1 }},
	{id: 15, name: 'Eliminate', description: 'Towers damage +25%', cost: 500, unlock: function() { return player.currentLevel > 5 && player.upgrades.indexOf(14) != -1 }, effect: function() { player.upgradeCoeffs.towerDamage.mul *= 1.25 }},
	{id: 16, name: 'Exterminate', description: 'Towers damage +50%', cost: 1000, unlock: function() { return player.currentLevel > 7 && player.upgrades.indexOf(15) != -1 }, effect: function() { player.upgradeCoeffs.towerDamage.mul *= 1.5 }},
	{id: 17, name: 'Building optimisation', description: 'Towers cost -5%', cost: 50, unlock: function() { return player.currentLevel > 3 }, effect: function() { player.upgradeCoeffs.towerCost.mul *= 0.95 }},
	{id: 18, name: 'Composite materials', description: 'Towers cost -5%', cost: 200, unlock: function() { return player.currentLevel > 5 && player.upgrades.indexOf(17) != -1 }, effect: function() { player.upgradeCoeffs.towerCost.mul *= 0.95 }},
	{id: 19, name: 'Hightech', description: 'Towers cost -5%', cost: 800, unlock: function() { return player.currentLevel > 7 && player.upgrades.indexOf(18) != -1 }, effect: function() { player.upgradeCoeffs.towerCost.mul *= 0.95 }},
	{id: 20, name: 'Division of labor', description: 'Towers cost -5', cost: 40, unlock: function() { return player.currentLevel > 2 }, effect: function() { player.upgradeCoeffs.towerCost.add -= 5 }},
	{id: 21, name: 'Logistics', description: 'Towers cost -5', cost: 180, unlock: function() { return player.currentLevel > 4 && player.upgrades.indexOf(20) != -1 }, effect: function() { player.upgradeCoeffs.towerCost.add -= 5 }},
	{id: 22, name: 'ASCII help', description: 'Towers cost -5', cost: 750, unlock: function() { return player.currentLevel > 8 && player.upgrades.indexOf(21) != -1 }, effect: function() { player.upgradeCoeffs.towerCost.add -= 5 }},
	{id: 23, name: 'Binoculars', description: 'Towers range +5%', cost: 100, unlock: function() { return player.statistics.wins > 5 }, effect: function() { player.upgradeCoeffs.towerRange.mul *= 1.05 }},
	{id: 24, name: 'Snipers training', description: 'Towers range +10%', cost: 350, unlock: function() { return player.statistics.wins > 10 && player.upgrades.indexOf(23) != -1 }, effect: function() { player.upgradeCoeffs.towerRange.mul *= 1.1 }},
	{id: 25, name: 'In a galaxy far far away', description: 'Towers range +15%', cost: 750, unlock: function() { return player.statistics.wins > 15 && player.upgrades.indexOf(24) != -1 }, effect: function() { player.upgradeCoeffs.towerRange.mul *= 1.15 }},
	{id: 26, name: 'Look where you shoot', description: 'Towers range +0.1', cost: 125, unlock: function() { return player.statistics.wins > 6 }, effect: function() { player.upgradeCoeffs.towerRange.add += 0.1 }},
	{id: 27, name: 'Ballistic trajectory', description: 'Towers range +0.25', cost: 800, unlock: function() { return player.statistics.wins > 11 && player.upgrades.indexOf(26) != -1 }, effect: function() { player.upgradeCoeffs.towerRange.add += 0.25 }},
	{id: 28, name: 'Automatic weapons', description: 'Towers attack speed +0.5', cost: 500, unlock: function() { return player.statistics.wins > 7 && player.currentLevel > 5 }, effect: function() { player.upgradeCoeffs.towerAttackSpeed.add += 0.5 }},
	{id: 29, name: 'Machineguns', description: 'Towers attack speed +10%', cost: 220, unlock: function() { return player.statistics.wins > 10 && player.currentLevel > 7 }, effect: function() { player.upgradeCoeffs.towerAttackSpeed.mul *= 1.1 }},
	{id: 30, name: 'Super speed reloading', description: 'Towers attack speed +20%', cost: 900, unlock: function() { return player.statistics.wins > 11 && player.currentLevel > 7 && player.upgrades.indexOf(29) != -1}, effect: function() { player.upgradeCoeffs.towerAttackSpeed.mul *= 1.2 }},
	{id: 31, name: 'Ultimate defender', description: 'Towers damage +50%, towers range +15%, towers attack speed  +20%', cost: 2500, unlock: function() { return player.statistics.wins > 20 && player.currentLevel > 10 && player.upgrades.length >= 15}, effect: function() { player.upgradeCoeffs.towerAttackSpeed.mul *= 1.2; player.upgradeCoeffs.towerRange.mul *= 1.15; player.upgradeCoeffs.towerDamage.mul *= 1.5;  }},
]

function buyUpgrade(i) {
	if (i <= upgrades.length && upgrades[i].cost <= player.money && player.upgrades.indexOf(i) == -1) {
		player.upgrades.push(upgrades[i].id)
		upgrades[i].effect() //apply effect
		player.money -= upgrades[i].cost
		hidePopup()
	}
	showUgrades() //redraw window
}

function popupInLevel(str) {
	var desc = document.getElementById('achievement')
	desc.innerHTML = str
	desc.style.display = 'inline-block'
	var tmp = (desc.parentNode.parentNode.clientWidth - desc.clientWidth)/2
	desc.style.left = tmp > 0 ? tmp : 0
	desc.style.top = 200	
}

function lose() {
	stopGame = 2
	var str = '<div style = "text-align: center"><h1>' + translations[currentLanguage].youLose + '</h1>' + 
		"<input style = 'width: 20em;  height: 2em;' type = 'button' value = 'OK' onclick = 'this.parentNode.parentNode.style.display = \"none\"; globalLocalMap(1)' ></div>"
	popupInLevel(str)
	document.getElementById('globalStatusBar').innerHTML = translations[currentLanguage].defenseOf + battles[currentLevel].name + translations[currentLanguage].defenseFailed
	player = cloneAll(tempPlayer)
	player.statistics.loses++
}

function win() {
	stopGame = 1
	lives = maxPassed - passed //for achievements
	var str = '<div style = "text-align: center"><h1>' + translations[currentLanguage].youWin + '</h1>' + translations[currentLanguage].youEarned + Math.round(Math.pow(levelMoneyCoef, currentLevel)*lives) + '<br>' +
		"<input style = 'width: 20em;  height: 2em;' type = 'button' value = 'OK' onclick = 'this.parentNode.parentNode.style.display = \"none\"; globalLocalMap(1)' ></div>"
	popupInLevel(str)
	document.getElementById('globalStatusBar').innerHTML = translations[currentLanguage].defenseOf + battles[currentLevel].name + translations[currentLanguage].defenseCompleted
	player = cloneAll(tempPlayer)
	if (currentLevel >= player.currentLevel) {
		document.getElementById('battle' + currentLevel).style.backgroundColor = '#007700'
		player.currentLevel = currentLevel + 1
		document.getElementById('battle' + currentLevel).style.opacity = '0.2' //next level
		displayStory = player.currentStory += 2 //story must go on
	}
	player.money += Math.round(Math.pow(levelMoneyCoef, currentLevel)*(maxPassed - passed)) //Earned money
	player.statistics.wins++
	getSaveText(1)
}
