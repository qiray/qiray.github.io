
function findVariantsForCell(tempData, y, x) {
	var variants = [1,2,3,4,5,6,7,8,9]
	for (var i = 0; i < 9; i++) {
		if (tempData[y][i] != "" && variants.indexOf(tempData[y][i]) != -1)
			variants.splice(variants.indexOf(tempData[y][i]), 1)
		if (tempData[i][x] != "" && variants.indexOf(tempData[i][x]) != -1)
			variants.splice(variants.indexOf(tempData[i][x]), 1)
	}
	var col =  Math.floor(x/3), row = Math.floor(y/3)
	for (var i = col*3; i < col*3 + 3; i++)
		for (var j = row*3; j < row*3 + 3; j++)
			if (i != x && j != y && variants.indexOf(tempData[j][i]) != -1)
				variants.splice(variants.indexOf(tempData[j][i]), 1)
	if (variants.length == 0)
		return []
	return variants
}

function tryToSolve(tempData, y, x) { //Try to find correct digit for tempData[i][j]. If success return found digit else return ""
	var variants = findVariantsForCell(tempData, y, x) 
	if (variants.length == 1)
		return variants[0]
	else
		return ""
}

function backtrackingSolve(tempData, remain) { //TODO: maybe add another simple algorithms
	var currentX = -1, currentY = -1, minValue = 10
	for (var i = 0; i < 9; i++) {
		if (currentX != -1 && currentY != -1)
			break
		for (var j = 0; j < 9; j++)
			if (tempData[i][j] == "") {
				var len = findVariantsForCell(tempData, i, j).length
				if (len == 0)
					return false
				if (len < minValue) {
					currentX = j
					currentY = i
				}
			}
	}
	if (currentX == -1 && currentY == -1)
		return true
	var tmp = findVariantsForCell(tempData, currentY, currentX)
	while (tmp.length > 0) {
		var digit = tmp[0]
		tmp.splice(0, 1)
		tempData[currentY][currentX] = digit
		var list = []
		list.push({x : currentX, y : currentY})
		if (solveSudoku(tempData, remain, 1, list))
			return true
		for (var i = 0; i < list.length; i++)
			tempData[list[i].y][list[i].x] = ''
	}
	return false
}

function solveSudoku(tempData, remain, useBacktracking, list) { //return true if field tempData can be solved (also fill tempData with correct digits) else return false
	while(1) {
		var prevRemain = remain //save previous number of remaining cells
		for (var i = 0; i < 9; i++)
			for (var j = 0; j < 9; j++)
				if (tempData[i][j] == "") {
					tempData[i][j] = tryToSolve(tempData, i, j)
					if (tempData[i][j] != "") { //reduce numer of remaining cells
						remain--
						if (list)
							list.push({x : j, y : i})
					}
					if (remain == 0)
						return true //we did it: we've solved sudoku.
				}
		if (remain == prevRemain) //if no cell was solved we can't solve this sudoku in usual way :-(
			break
	}
	if (useBacktracking && backtrackingSolve(tempData, remain))
		return true
	return false //sudoku can not be solved. Really.
}

function canSolve(index) { //return true if this field can be solved else return false
	var i, j, tempData = new Array(9), remain = remainingCells
	for(i = 0; i < 9; i++) {
		tempData[i] = new Array(9)
		for(j = 0; j < 9; j++)
			tempData[i][j] = data[i][j]
	}
	tempData[Math.floor(index/9)][index%9] = ""
	if (solveSudoku(tempData, remain, 0, undefined))
		return true
	else
		return false
}

function removeOneCell() {
	var index = Math.floor(Math.random() * 81)
	remainingCells++
	while (1) {
		if (initialData[index] && (difficultLevel >= ultra || canSolve(index))) //if can be solved (or ultra level) break
			break
		else	
			index = Math.floor(Math.random() * 81)
	}
	initialData[index] = false
	data[Math.floor(index/9)][index%9] = ""
}
