
function drawRoundedRect(x, y, width, height, radius, fill, stroke) {
	if (typeof stroke == "undefined" )
		stroke = true
	if (typeof radius === "undefined")
		radius = 5
	ctx.beginPath()
	ctx.moveTo(x + radius, y)
	ctx.lineTo(x + width - radius, y)
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
	ctx.lineTo(x + width, y + height - radius)
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
	ctx.lineTo(x + radius, y + height)
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
	ctx.lineTo(x, y + radius)
	ctx.quadraticCurveTo(x, y, x + radius, y)
	ctx.closePath()
	if (stroke) {
		ctx.stroke()
	}
	if (fill) {
		ctx.fill()
	}        
}

function drawTiles() {
	//var mul = tileSize/(4000)
	for (var i = 0; i < fieldSize; i++) 
		for (var j = 0; j < fieldSize; j++) {
			ctx.fillStyle = colors[field[i + j*fieldSize]%colors.length]
			ctx.strokeStyle = colors[field[i + j*fieldSize]%colors.length]
			if (field[i + j*fieldSize] == 0) {
				ctx.fillStyle = "#cccccc"
				ctx.strokeStyle = "#aaaaaa"
				drawRoundedRect(shiftX + i*(tileSize + shift), shiftY + j*(tileSize + shift), tileSize, tileSize, 5, 1)
				continue
			}
			drawRoundedRect(shiftX + i*(tileSize + shift), shiftY + j*(tileSize + shift), tileSize, tileSize, 5, 1)
			ctx.fillStyle = 'black'
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			var str = Math.pow(2, field[i + j*fieldSize]).toString()
			//var fontSize = tileSize/3*(str.length <= 3 ? 1 : 0.035*tileSize/str.length)
			var fontSize = str.length <= 3 ? tileSize/3 : tileSize/(0.82*str.length)
			ctx.font = 'bold ' + fontSize + 'pt Courier'
			ctx.fillText(str, shiftX + i*(tileSize + shift) + tileSize/2, shiftY + j*(tileSize + shift) + tileSize/2)
		}
}

function drawText(text, x, y, fontSize) {
	ctx.fillStyle = 'black'
	ctx.textAlign = "center"
	ctx.textBaseline = "middle"
	ctx.font = 'bold ' + fontSize + 'pt Courier'
	ctx.fillText(text, x, y)
}

function redraw() {
	if (needResize >= maxNeedResize)
		return	
	ctx.clearRect (0 ,0 , canvas.width, canvas.height )
	ctx.fillStyle = colors[7]
	ctx.strokeStyle = colors[7]
	var ysize = shiftY - shift - 2, xsize = canvas.width/3 - 2
	drawRoundedRect(0, 0, xsize, ysize, 10, 1)
	drawText('Score:', canvas.width/6, ysize/2 - 7, 10)
	drawText(score, canvas.width/6, ysize/2 + 7, 10)
	ctx.fillStyle = colors[9]
	ctx.strokeStyle = colors[9]
	drawRoundedRect(canvas.width/3, 0, xsize, ysize, 10, 1, 10)
	drawText('Best score:', canvas.width/3 + canvas.width/6, ysize/2 - 7, 10)
	drawText(bestScore, canvas.width/3 + canvas.width/6, ysize/2 + 7, 10)
	ctx.fillStyle = colors[10]
	ctx.strokeStyle = colors[10]	
	drawRoundedRect(2*canvas.width/3, 0, xsize, ysize, 10, 1)
	drawText('New game', 2*canvas.width/3 + canvas.width/6, ysize/2, 10)
	ctx.fillStyle = "#aaaaaa"
	ctx.strokeStyle = "#aaaaaa"
	drawRoundedRect(0, shiftY - shift, canvas.width, canvas.width, 10, 1)
	drawTiles()
	ctx.fillStyle = 'rgba(100, 100, 100, 0.5)'
	for (var i = 0; i < mouseWay.length; i++)
		drawRoundedRect(shiftX + mouseWay[i].x*(tileSize + shift), shiftY + mouseWay[i].y*(tileSize + shift), tileSize, tileSize, 5, 1)
}

function timerRedraw() {
	var flag = false
	totalTimer++
	if (redrawTiles.length > 1 || currentRedrawnTile != -1) {
		redraw()
		flag = true
		if (currentRedrawnTile >= -1 && currentRedrawnTile < redrawTiles.length)
			currentRedrawnTile++
		addNewTile(currentRedrawnTile)
		if (currentRedrawnTile == redrawTiles.length - 1) {
			redrawTiles = []
			currentRedrawnTile = -1
		}
	}
	if (needRedraw) {
		if (!flag)
			redraw()
		if (redrawX == 0 && redrawY == 0) {
			redrawX = redrawIndex%fieldSize
			redrawY = Math.floor(redrawIndex/fieldSize)
			redrawX = redrawX*(tileSize + shift) + shiftX + tileSize/2
			redrawY = redrawY*(tileSize + shift) + shiftY + tileSize/2
		}
		drawText('+' + redrawAdd, redrawX, redrawY, 20)
		redrawY -= 10
		if (redrawY < 0) {
			needRedraw = redrawX = redrawY = 0
			redraw()
		}
	}
	if (needResize == maxNeedResize)
		resizeField()
	if (needResize >= maxNeedResize && needResize < maxNeedResize + 10) {
		needRedraw = 0
		ctx.fillStyle = 'rgba(100, 100, 100, 0.5)'
		drawRoundedRect(0, shiftY - shift, canvas.width, canvas.height - shiftY + shift, 5, 1)
		drawText('Time to resize', canvas.width/2, shiftY + (canvas.height - shiftY)/2, 20)		
		needResize++
	}
	if (needResize == maxNeedResize + 10) {
		maxNeedResize *= 2
		needResize = 0
		if (redrawTiles.length > 0) {
			for (var i = currentRedrawnTile >= 0 ? currentRedrawnTile : 0; i < redrawTiles.length; i++)
				addNewTile(i)
			currentRedrawnTile = -1
			redrawTiles = []
		}			
		redraw()
	}
}
