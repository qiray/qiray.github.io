
function tryToSolve(tempData, y, x) { //Try to find correct digit for tempData[i][j]. If success return found digit else return "&nbsp"
	var variants = [1,2,3,4,5,6,7,8,9]
	for (var i = 0; i < 9; i++) {
		if (tempData[y][i] != "&nbsp" && variants.indexOf(tempData[y][i]) != -1)
			variants.splice(variants.indexOf(tempData[y][i]), 1)
		if (tempData[i][x] != "&nbsp" && variants.indexOf(tempData[i][x]) != -1)
			variants.splice(variants.indexOf(tempData[i][x]), 1)		
	}
	var col =  Math.floor(x/3), row = Math.floor(y/3)
	for (var i = col*3; i < col*3 + 3; i++)
		for (var j = row*3; j < row*3 + 3; j++)
			if (i != x && j != y && variants.indexOf(tempData[j][i]) != -1)
				variants.splice(variants.indexOf(tempData[j][i]), 1)
	if (variants.length == 1)
		return variants[0]
	else
		return "&nbsp"
}

function solveSudoku(tempData, remain) { //return true if field tempData can be solved (also fill tempData with correct digits) else return false
	while(1) {
		var prevRemain = remain; //save previous number of remaining cells
		for (var i = 0; i < 9; i++)
			for (var j = 0; j < 9; j++)
				if (tempData[i][j] == "&nbsp") {
					tempData[i][j] = tryToSolve(tempData, i, j)
					if (tempData[i][j] != "&nbsp") //reduce numer of remaining cells
						remain--					
					if (remain == 0)
						return true //we did it: we've solved sudoku.
				}
		if (remain == prevRemain) //if no cell was solved we can't solve this sudoku :-(
			return false
	}
}

function canSolve(index) { //return true if this field can be solved else return false
	var i, j, tempData = new Array(9), remain = remainingCells
	for(i = 0; i < 9; i++) {
		tempData[i] = new Array(9)
		for(j = 0; j < 9; j++)
			tempData[i][j] = data[i][j]
	}
	tempData[Math.floor(index/9)][index%9] = "&nbsp"
	if (solveSudoku(tempData, remain))
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
	data[Math.floor(index/9)][index%9] = "&nbsp"
}
