
function lookNeighbours(index, finish, list) {
	if (index < 0 || index >= squareMapSize || displayedMap[index] != '' || list.indexOf(index) != -1)
		return false
	list.push(index)
	var tmp = [index - mapSize, index + mapSize, index - 1, index + 1]
	for (var i in tmp) {
		var pos = tmp[i]
		if (pos == finish || lookNeighbours(pos, finish, list)) {
			way.push(pos)
			return true
		}
	}
	return false
}

function findWay(start, finish) {
	way = []
	var list = []
	if (lookNeighbours(start, finish, list)) {
		way.push(start)
		way.reverse()
	}
}
