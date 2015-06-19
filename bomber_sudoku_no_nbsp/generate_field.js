
function transposing() {
	var i = 0, j = 0
	for(i = 0; i < 9; i++)
		for(j = i; j < 9; j++) {
			var temp = trueData[i][j]
			trueData[i][j] = trueData[j][i]
			trueData[j][i] = temp				
		}
}

function genRandom(obj) {
	obj.square = Math.floor(Math.random() * 3)
	obj.n1 = Math.floor(Math.random() * 3), obj.n2 = Math.floor(Math.random() * 3)
	while (obj.n1 == obj.n2)
		obj.n2 = Math.floor(Math.random() * 3)
	obj.n1 += obj.square*3
	obj.n2 += obj.square*3
}

function swapRows() {
	var obj = new Object()
	obj.square = obj.n1 = obj.n2 = 0
	genRandom(obj)
	var temp = trueData[obj.n1].slice(0)
	trueData[obj.n1] = trueData[obj.n2].slice(0)
	trueData[obj.n2] = temp
}

function swapCols() {
	var obj = new Object()
	obj.square = obj.n1 = obj.n2 = 0
	genRandom(obj)
	var i = 0
	for (; i < 9; i++) {
		var temp = trueData[i][obj.n1]
		trueData[i][obj.n1] = trueData[i][obj.n2]
		trueData[i][obj.n2] = temp
	}
}

function swapRowsRegions() {
	var line1 = Math.floor(Math.random() * 3), line2 = Math.floor(Math.random() * 3), j
	while (line1 == line2)
		line2 = Math.floor(Math.random() * 3)
	line1 *= 3
	line2 *= 3
	for (j = 0; j < 3; j++) {
		var temp = trueData[line1 + j].slice(0)
		trueData[line1 + j] = trueData[line2 + j].slice(0)
		trueData[line2 + j] = temp
	}	
}

function swapColsRegions() {
	var col1 = Math.floor(Math.random() * 3), col2 = Math.floor(Math.random() * 3), i, j
	while (col1 == col2)
		col2 = Math.floor(Math.random() * 3)
	col1 *= 3
	col2 *= 3
	for (i = 0; i < 9; i++)
		for (j = 0; j < 3; j++) {
			var temp = trueData[i][col1 + j]
			trueData[i][col1 + j] = trueData[i][col2 + j]
			trueData[i][col2 + j] = temp
		}
}

