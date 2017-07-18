
function getMouseCoordinates(event, flag) {
	var clickY = 0, clickX = 0
	if (event.layerX || event.layerX == 0) { //Firefox
		clickY = event.layerY// - canvas.offsetTop 
		clickX = event.layerX// - canvas.offsetLeft 
	} else if (event.offsetX || event.offsetX == 0) { //Opera
		clickY = event.offsetY
		clickX = event.offsetX
	}
	if (navigator.userAgent.search(/Chrome/) > 0) { //Chrome
		clickY = event.offsetY
		clickX = event.offsetX
	}
	if (flag) {
		clickX = (clickX - shiftX)/(tileSize + shift)
		clickY = (clickY - shiftY)/(tileSize + shift)
	} else {
		clickX = Math.floor((clickX - shiftX)/(tileSize + shift))
		clickY = Math.floor((clickY - shiftY)/(tileSize + shift))		
	}
	return {x : clickX, y : clickY}
}

function handleMouseDown(event) {
	if (needResize >= maxNeedResize)
		return
	var coords = getMouseCoordinates(event, 1)
	if (coords.y < 0) {
		if (coords.x >= 2*fieldSize/3 - 0.1) //new game button
			init(0) //start new game
		return
	}
	coords.x = Math.floor(coords.x)
	coords.y = Math.floor(coords.y)
	mousePressed = true
	mouseWay = []
	mouseWay.push(coords)
	needRedraw = 0
	redraw()
	if (redrawTiles.length > 0) {
		for (var i = currentRedrawnTile >= 0 ? currentRedrawnTile : 0; i < redrawTiles.length; i++)
			addNewTile(i)
		currentRedrawnTile = -1
		redrawTiles = []
		redraw()
	}		
}

function getDecimal(num) {
	return num > 0 ? (num % 1) : (-num % 1)
}

function handleMouseMove(event) {
	if (mousePressed) {
		if (totalTimer - currentTimer < 2)
			return		
		var coords = getMouseCoordinates(event, 1)
		if (coords.x < 0 || coords.x >= fieldSize || coords.y < 0 || coords.y >= fieldSize)
			return
		var x = getDecimal(coords.x), y = getDecimal(coords.y)
		x = x > 0.5 ? 1 - x : x
		y = y > 0.5 ? 1 - y : y
		if (x < 0.3 && y < 0.3)
			return
		coords.x = Math.floor(coords.x)
		coords.y = Math.floor(coords.y)
		var diff = Math.abs(mouseWay[mouseWay.length - 1].x - coords.x + (mouseWay[mouseWay.length - 1].y - coords.y)*fieldSize)
		if (diff == 1 || diff == fieldSize || diff == fieldSize + 1 || diff == fieldSize - 1) {
			mouseWay.push(coords)
			currentTimer = totalTimer
		}
		redraw()
	}
}

function handleMouseUp(event) {
	checkMouseWay()
	mousePressed = false
	currentTimer = 0
	redraw()
}

function handleMouseOut(event) {
	mousePressed = false
	currentTimer = 0
	if (mouseWay.length > 0) {
		mouseWay = []
		redrawTiles = []
		currentRedrawnTile = -1
		redraw()	
	}
}
