
var drawShift = 35, fontSize = 12, mapImage = 0
var EnemyTextures = new Array(enemyTypes.length*2) //2 for each left and right image
var TowerTextures = new Array(towerTypes.length)

function initEnemyTextures() {
	var len = EnemyTextures.length
	var tmpSize = canvas.width
	canvas.width = canvas.height = drawShift + cellSize*2 //not sure
	ctx.textAlign = 'center'
	for (var i = 0; i < len; i++) {
		EnemyTextures[i] = new Image()
		ctx.clearRect (0 ,0 ,canvas.width, canvas.height)
		var index = i&1 ? (i - 1)/2 : i/2
		var text = i&1 ? enemyTypes[index].img : enemyTypes[index].imgLeft
		var localFontSize = parseInt(enemyTypes[index].size)/100*fontSize	
		var localLineHeight = enemyTypes[index].lineHeight*localFontSize	
		text = text.replace(/&nbsp/g, " ")		
		if (text.search('<b>') != -1) {
			ctx.font = 'bold ' + localFontSize + 'px Arial'
			text = text.replace(/<b>|<\/b>/g, "")
		} else
			ctx.font = localFontSize + 'px Arial'
		var lines = text.split('\n')
		for (var k = 0; k < lines.length; k++)
			ctx.fillText(lines[k], drawShift, drawShift + k*localLineHeight)		
		EnemyTextures[i].src = canvas.toDataURL("image/png")
	}
	canvas.width = canvas.height = tmpSize //restore canvas size
}

function initTowerTextures() {
	var len = TowerTextures.length
	var tmpSize = canvas.width
	canvas.width = canvas.height = drawShift + cellSize*2 //not sure
	ctx.textAlign = 'center'
	for (var i = 0; i < len; i++) {
		TowerTextures[i] = new Image()
		ctx.clearRect (0 ,0 ,canvas.width, canvas.height)
		var localFontSize = parseInt(towerTypes[i].size)/100*fontSize
		var localLineHeight = towerTypes[i].lineHeight*localFontSize
		var offset = cellSize*towerTypes[i].divShift
		ctx.font = localFontSize + 'px Arial'
		var lines = towerTypes[i].img.split('\n')
		for (var k = 0; k < lines.length; k++)
			ctx.fillText(lines[k], drawShift, drawShift + k*localLineHeight - offset)	
		TowerTextures[i].src = canvas.toDataURL("image/png")
	}
	canvas.width = canvas.height = tmpSize //restore canvas size
}

function drawMap() {
	ctx.clearRect (0 ,0 , canvas.width, canvas.height)
	if (mapImage) {
		ctx.drawImage(mapImage, 0, 0)
		return
	}
	var text = ''
	ctx.font = fontSize + 'px Arial'
	ctx.textAlign = "center"
	for (var i = 0; i < mapSize; i++) //draw map
		for (var j = 0; j < mapSize; j++) {
			text = displayedMap[i + j*mapSize].replace(/&nbsp/g, " ")
			if (text.search('<b>') != -1) {
				ctx.font = 'bold ' + fontSize + 'px Arial'
				text = text.replace(/<b>|<\/b>/g, "")
			} else
				ctx.font = fontSize + 'px Arial'
			var lines = text.split('\n'), lineheight = lines.length == 0 ? 0.8*fontSize : fontSize
			for (var k = 0; k < lines.length; k++)
				ctx.fillText(lines[k], drawShift + i*cellSize, drawShift + j*cellSize + k*lineheight)
		}
	mapImage = new Image()
	mapImage.src = canvas.toDataURL("image/png")
}

function drawEnemies() {
	var length = enemies.length
	for (var i = 0; i < length; i++) {
		if (enemies[i] == undefined)
			continue
		ctx.drawImage(EnemyTextures[2*enemies[i].type + (enemies[i].direction == 1 ? 0 : 1)], enemies[i].x, enemies[i].y)
	}
}

function drawTowers() {
	var length = towers.length
	for (var i = 0; i < length; i++) {
		if (towers[i] == undefined)
			continue
		ctx.drawImage(TowerTextures[towers[i].type], towers[i].x, towers[i].y)
	}
}

function drawBullets() {
	var length = bullets.length
	ctx.font = fontSize + 'px Arial'
	for (var i = 0; i < length; i++) {
		if (bullets[i] == undefined)
			continue
		ctx.fillText(bullets[i].img, drawShift + bullets[i].x, drawShift + bullets[i].y)
	}
}

function drawStartFinish() {
	ctx.font = Math.floor(fontSize*3/4) + 'px Arial'
	ctx.fillText('start', drawShift + way[0]%mapSize*cellSize, drawShift + Math.floor(way[0]/mapSize)*cellSize)
	ctx.fillText('finish', drawShift + way[way.length - 1]%mapSize*cellSize, drawShift + Math.floor(way[way.length - 1]/mapSize)*cellSize)
}

function drawTooltip() {
	if (tooltipIndex < 0)
		return
	ctx.font = 'bold ' + fontSize + 'px Arial'
	ctx.fillText(tooltipText, drawShift + tooltipIndex%mapSize*cellSize, drawShift + Math.floor(tooltipIndex/mapSize - 1)*cellSize)	
}
