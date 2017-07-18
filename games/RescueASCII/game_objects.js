
function sqr(number) {
	return number*number
}

function firstEmptySlot(array) {
	var index = 0, flag = 1
	for (var i = 0; i < array.length; i++)
		if (array[i] == undefined) {
			index = i
			flag = 0
			break
		}
	if (flag)
		index = array.length
	return index
}

//enemies:

function moveEnemy(i) {
	var diff = way[enemies[i].index + 1] - way[enemies[i].index]
	var tdLeft = way[enemies[i].index + 1]%mapSize*cellSize, tdTop = Math.floor(way[enemies[i].index + 1]/mapSize)*cellSize
	switch (diff) {
		case 1: //moving right
			enemies[i].x += enemies[i].speed
			if (enemies[i].direction == 1) {//turn right
				enemies[i].direction = 2 //right
			}
			if (enemies[i].x >= tdLeft) {
				enemies[i].index++
				if (enemies[i].index < way.length - 1) {
					var nextDiff = way[enemies[i].index + 1] - way[enemies[i].index]
					if (nextDiff == mapSize || nextDiff == -mapSize)
						enemies[i].x += Math.random()*cellSize/4 - cellSize/8
				}
			}
			break
		case -1: //moving left
			enemies[i].x -= enemies[i].speed
			if (enemies[i].direction == 2) {//turn left
				enemies[i].direction = 1 //left
			}
			if (enemies[i].x <= tdLeft) {
				enemies[i].index++
				if (enemies[i].index < way.length - 1) {
					var nextDiff = way[enemies[i].index + 1] - way[enemies[i].index]
					if (nextDiff == mapSize || nextDiff == -mapSize)
						enemies[i].x += Math.random()*cellSize/4 - cellSize/8
				}
			}
			break
		case mapSize: //moving down
			enemies[i].y += enemies[i].speed
			if (enemies[i].y >= tdTop) {
				enemies[i].index++
				if (enemies[i].index < way.length - 1) {
					var nextDiff = way[enemies[i].index + 1] - way[enemies[i].index]
					if (nextDiff == 1 || nextDiff == -1)
						enemies[i].y += Math.random()*cellSize/4 - cellSize/8
				}
			}
			break
		case -mapSize: //moving up
			enemies[i].y -= enemies[i].speed	
			if (enemies[i].y <= tdTop) {
				enemies[i].index++
				if (enemies[i].index < way.length - 1) {
					var nextDiff = way[enemies[i].index + 1] - way[enemies[i].index]
					if (nextDiff == 1 || nextDiff == -1)
						enemies[i].y += Math.random()*cellSize/4 - cellSize/8
				}
			}
			break
	}
}

function deleteEnemy(i) {
	enemies[i] = undefined
}

function createEnemy(id, index) {
	var enemyIndex = firstEmptySlot(enemies)
	enemies[enemyIndex] = clone(enemyTypes[id - 1])
	enemies[enemyIndex].index = index
	enemies[enemyIndex].x = way[index]%mapSize*cellSize + Math.random()*cellSize/4 - cellSize/8
	enemies[enemyIndex].y = Math.floor(way[index]/mapSize)*cellSize + Math.random()*cellSize/4 - cellSize/8
	enemies[enemyIndex].health *= player.difficulty //set difficulty
	enemies[enemyIndex].health *= Math.pow(1.07, currentWave)*Math.pow(1.01, currentLevel) //set balance :-)
	enemies[enemyIndex].cost = Math.floor(enemies[enemyIndex].cost*Math.pow(0.92, currentWave)) //balance :-)
	if (way[index + 1] - way[index] == -1)
		enemies[enemyIndex].direction = 1
	if (tempPlayer.knownEnemies.indexOf(id) == -1) {//for descriptions
		tempPlayer.knownEnemies.push(id)
		document.getElementById('levelStatusBar').innerHTML = translations[currentLanguage].newEnemy + enemyTypes[id - 1].name
	}
}

//towers:

var damageUpgradeCoef = 1.85, rangeUpgradeCoef = 1.1, attackSpeedUpgradeCoef = 1.15, costUpgradeCoef= 1.2

function updateTower(index) {
	for (var i = 0; i < towers.length; i++)
		if (towers[i] != undefined && towers[i].index == index) {
			if (Math.round(towers[i].cost*costUpgradeCoef) > money || towers[i].level == tempPlayer.maxTowerLevel) //not enough money or max level
				return
			hidePopup()
			money -= Math.round(towers[i].cost*costUpgradeCoef)
			towers[i].level++
			towerLevel = towers[i].level > towerLevel ? towers[i].level : towerLevel//for achievements
			towers[i].cost = Math.round(towers[i].cost*costUpgradeCoef)
			towers[i].range *= rangeUpgradeCoef
			towers[i].damage *= damageUpgradeCoef
			towers[i].attackSpeed *= attackSpeedUpgradeCoef
			var element = document.getElementById('towerRange' + index)
			element.style.width = towers[i].range*cellSize*2
			element.style.height = element.style.width
			element.style.left = canvas.offsetLeft + drawShift + towers[i].x - towers[i].range*cellSize
			element.style.top = canvas.offsetTop + drawShift + towers[i].y - towers[i].range*cellSize
			tempPlayer.statistics.upgradedTowers++
			return
		}
}

function showHideRange(index) {
	var rangeDiv = document.getElementById('towerRange' + index)
	if (rangeDiv.style.display == 'none')
		document.getElementById('towerRange' + index).style.display = 'block' //show attack radius	
	else 
		document.getElementById('towerRange' + index).style.display = 'none' //hide attack radius
	hidePopup()
}

function towerMenu(index) {
	globalIndex = index
	///////////////////Set menu buttons text
	var i = 0
	for (i = 0; i < towers.length; i++) //get tower number in towers array
		if (towers[i] != undefined && towers[i].index == index)
			break
	document.getElementById('towerMenuLabel').innerHTML = towers[i].name + ' ' + translations[currentLanguage].level + ' ' + towers[i].level + '<br>' +
		translations[currentLanguage].range + ': ' + Math.round(towers[i].range*100)/100 + ' ' + 
		translations[currentLanguage].damage + ': ' + Math.round(towers[i].damage) + ' ' + translations[currentLanguage].attackSpeed + Math.round(towers[i].attackSpeed*100)/100
	document.getElementById('towerRangeLabel').innerHTML = translations[currentLanguage].ShowHideRange + ' (' + Math.round(towers[i].range*100)/100 + ')'
	if (towers[i].level < tempPlayer.maxTowerLevel) {
		document.getElementById('towerUpdateLabel').innerHTML = translations[currentLanguage].upgradeTower + '<br>' + translations[currentLanguage].cost + ':' + Math.round(towers[i].cost*costUpgradeCoef) +
			'<br>' + translations[currentLanguage].range + ': ' + Math.round(towers[i].range *rangeUpgradeCoef*100)/100 + 
			'<br>' + translations[currentLanguage].damage + ': ' + Math.round(towers[i].damage*damageUpgradeCoef*100)/100 + 
			'<br>' + translations[currentLanguage].attackSpeed + Math.round(towers[i].attackSpeed*attackSpeedUpgradeCoef*100)/100
	} else {
		document.getElementById('towerUpdateLabel').innerHTML = translations[currentLanguage].notAvailable
	}
	document.getElementById('towerSellLabel').innerHTML = translations[currentLanguage].sellTower + Math.round(towers[i].cost*0.5) + translations[currentLanguage].getMoney
	document.getElementById('setTargetting').selectedIndex = towers[i].targetting - 1
	///////////////////
	var menu = document.getElementById('towerMenu')
	bigPopupSize()
	menu.style.display = 'inline-block'
	var tmp = (menu.parentNode.parentNode.clientWidth - menu.clientWidth)/2
	menu.style.left = tmp > 0 ? tmp : 0
	menu.style.top = document.getElementById('level').clientHeight/2
}

function createTower(tower, index) {
	if (tower > towerTypes.length || money < Math.round(towerTypes[tower - 1].cost*player.upgradeCoeffs.towerCost.mul + player.upgradeCoeffs.towerCost.add)) //can't create
		return
	towers.push(clone(towerTypes[tower - 1]))
	towers[towers.length - 1].index = index
	towers[towers.length - 1].x = index%mapSize*cellSize
	towers[towers.length - 1].y = Math.floor(index/mapSize)*cellSize
	towers[towers.length - 1].cost = Math.round(towerTypes[tower - 1].cost*player.upgradeCoeffs.towerCost.mul + player.upgradeCoeffs.towerCost.add)
	towers[towers.length - 1].damage = towerTypes[tower - 1].damage*player.upgradeCoeffs.towerDamage.mul + player.upgradeCoeffs.towerDamage.add
	towers[towers.length - 1].range = towerTypes[tower - 1].range*player.upgradeCoeffs.towerRange.mul + player.upgradeCoeffs.towerRange.add
	towers[towers.length - 1].attackSpeed = towerTypes[tower - 1].attackSpeed*player.upgradeCoeffs.towerAttackSpeed.mul + player.upgradeCoeffs.towerAttackSpeed.add
	money -= Math.round(towerTypes[tower - 1].cost*player.upgradeCoeffs.towerCost.mul + player.upgradeCoeffs.towerCost.add)
	///////
	var tmp = document.createElement('div')
	tmp.id = 'towerRange' + index
	tmp.style.position = 'absolute'
	tmp.style.width = towerTypes[tower - 1].range*cellSize*2
	tmp.style.height = tmp.style.width
	tmp.innerHTML = '&nbsp'
	tmp.style.opacity = 0.4
	tmp.style.borderRadius = '50%'
	tmp.style.border = '1px solid'
	tmp.style.left = canvas.offsetLeft + drawShift + towers[towers.length - 1].x - towerTypes[tower - 1].range*cellSize
	tmp.style.top = canvas.offsetTop + drawShift + towers[towers.length - 1].y - towerTypes[tower - 1].range*cellSize
	tmp.style.display = 'none'
	tmp.onclick = function() {showHideRange(index)}
	tmp.style.zIndex = document.getElementById('level').style.zIndex + 1
	document.getElementById('level').appendChild(tmp)
	hidePopup()
	tempPlayer.statistics.builtTowers++
}

function deleteTower(index, flag) {
	if (!flag)
		hidePopup()
	var element = document.getElementById('towerRange' + index)
	element.parentNode.removeChild(element)
	for (var i = 0; i < towers.length; i++)
		if (towers[i] != undefined && towers[i].index == index) {
				money += Math.round(towers[i].cost*0.5)
				towers[i] = undefined
				if (!flag)
					tempPlayer.statistics.soldTowers++
				return
		}
}

function attackEnemy(towerId) {
	towers[towerId].currentAttackWait = 0
	createBullet(towerId)
}

function isTargetBetter(index, enemyIndex, currentTarget) {
	switch (towers[index].targetting) {
		case closerToFinish:
			return enemies[currentTarget].index < enemies[enemyIndex].index
		case closerToStart:
			return enemies[currentTarget].index > enemies[enemyIndex].index
		case fastEnemy:
			return enemies[currentTarget].speed < enemies[enemyIndex].speed
		case slowEnemy:
			return enemies[currentTarget].speed > enemies[enemyIndex].speed
		case strongEnemy:
			return enemies[currentTarget].health < enemies[enemyIndex].health
		case weakEnemy:
			return enemies[currentTarget].health > enemies[enemyIndex].health
		case cheapEnemy:
			return enemies[currentTarget].cost > enemies[enemyIndex].cost
		case expensiveEnemy:
			return enemies[currentTarget].cost < enemies[enemyIndex].cost
		case randomEnemy:
			return Math.random() > 0.5
	}
}

function towerAttack(index) {
	if (towers[index].currentAttackWait < 20) {
		towers[index].currentAttackWait += towers[index].attackSpeed
		return
	}
	var towerX = towers[index].x, towerY = towers[index].y
	var range = sqr(towers[index].range*cellSize)
	var enemy = towers[index].target
	if (enemy != -1) { //the tower has a target
		if (enemies[enemy] === undefined) { //target was killed by someone else
			towers[index].target = -1
			return
		}
		if (sqr(towerY - enemies[enemy].y) + sqr(towerX - enemies[enemy].x) > range) {//too far
			towers[index].target = -1
		} else {
			attackEnemy(index)
			return
		}
	}
	currentTarget = -1
	for (var i = 0; i < enemies.length; i++) { //find new target
		if (enemies[i] === undefined)
			continue
		if (sqr(towerY - enemies[i].y) + sqr(towerX - enemies[i].x) > range) //too far
			continue
		else {
			if (currentTarget == -1 || isTargetBetter(index, i, currentTarget)) //choose target according to tower's target priotity
				currentTarget = i
		}
	}
	if (currentTarget == -1) //no available targets
		return
	towers[index].target = currentTarget
	attackEnemy(index)
}

function setTargettingFunc(index, value) {
	for (var i = 0; i < towers.length; i++)
		if (towers[i] != undefined && towers[i].index == index) {
			towers[i].targetting = value
			hidePopup()
			return
		}
}

//bullets:

function createBullet(towerId) {
	var index = firstEmptySlot(bullets)
	bullets[index] = clone(bulletTypes[towers[towerId].bullet - 1])
	bullets[index].x = towers[towerId].x
	bullets[index].y = towers[towerId].y
	bullets[index].target = towers[towerId].target
	bullets[index].targetX = enemies[towers[towerId].target].x
	bullets[index].targetY = enemies[towers[towerId].target].y
	bullets[index].damage = towers[towerId].damage
	bullets[index].prevCoord = enemies[towers[towerId].target].index
}

function deleteBullet(i) {
	bullets[i] = undefined
}

function damageEnemy(enemyId, i) {
	enemies[enemyId].health -= bullets[i].damage
	if (enemies[enemyId].health <= 0) {
		money += Math.round(enemies[enemyId].cost) //profit
		tempPlayer.statistics.money += Math.round(enemies[enemyId].cost)
		killedEnemies++ //statistics
		tempPlayer.statistics.killedEnemies++
		deleteEnemy(enemyId)
	}	
}

function moveBullet(i) {
	var enemyId = bullets[i].target
	if (enemies[enemyId] != undefined) { //target exists so change target position
		bullets[i].targetX = enemies[enemyId].x
		bullets[i].targetY = enemies[enemyId].y
	}
	var diffX = bullets[i].x - bullets[i].targetX
	var diffY = bullets[i].y - bullets[i].targetY
	if (enemies[enemyId] && Math.abs(bullets[i].prevCoord - enemies[enemyId].index) > 1) { //too far
		deleteBullet(i)
		return
	}
	if (enemies[enemyId])
		bullets[i].prevCoord = enemies[enemyId].index
	if (sqr(diffX) + sqr(diffY) < bulletDelta) { //BOOM!
		if (enemies[enemyId] != undefined) {
			damageEnemy(enemyId, i)
		}
		if (bullets[i].img == 'o') {//for heavy gun tower
			for (var j = 0; j < enemies.length; j++)
				if (enemies[j] != undefined && j != enemyId && sqr(enemies[j].x - bullets[i].x) + sqr(enemies[j].y - bullets[i].y) < bulletDelta/0.09)
					damageEnemy(j, i)
		}
		if (bullets[i].img == '>' && bullets[i].damage >= 2) { //for magic crystal
			for (var j = 0; j < enemies.length; j++)
				if (enemies[j] != undefined && j != enemyId && sqr(enemies[j].x - bullets[i].x) + sqr(enemies[j].y - bullets[i].y) < sqr(2*cellSize)) {
					var index = firstEmptySlot(bullets)
					bullets[index] = clone(bullets[i])
					bullets[index].target = j
					bullets[index].targetX = enemies[j].x
					bullets[index].targetY = enemies[j].y
					bullets[index].damage /= 2
					break;
				}
		}
		deleteBullet(i)
	} else {
		var dist = Math.sqrt(sqr(diffX) + sqr(diffY)), cos = diffX/dist, sin = diffY/dist
		var angle = Math.atan(Math.abs(diffY/diffX))
		if (diffX > 0)
			bullets[i].x -= bullets[i].speed*Math.cos(angle)
		else
			bullets[i].x += bullets[i].speed*Math.cos(angle)
		if (diffY > 0)
			bullets[i].y -= bullets[i].speed*Math.sin(angle)
		else
			bullets[i].y += bullets[i].speed*Math.sin(angle)
	}
}
