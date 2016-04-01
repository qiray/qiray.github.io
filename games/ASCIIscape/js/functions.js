
function setObjectSize(obj) {
	var lines = obj.img.split('\n');
	obj.height = lineHeight*lines.length;
	obj.width = 0;
	for (var k in lines)
		if (lines[k].length*onecharwidth > obj.width)
			obj.width = lines[k].length*onecharwidth;
}

function colCheck(shapeA, shapeB) {
	var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
	vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
	hWidths = (shapeA.width / 2) + (shapeB.width / 2),
	hHeights = (shapeA.height / 2) + (shapeB.height / 2),
	colDir = null;

	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		var oX = hWidths - Math.abs(vX),
		oY = hHeights - Math.abs(vY);
		if (oX >= oY) {
			if (vY > 0) {
				colDir = "t";
				shapeA.y += oY;
			} else {
				colDir = "b";
				shapeA.y -= oY;
			}
		} else {
			if (vX > 0) {
				colDir = "l";
				shapeA.x += oX;
			} else {
				colDir = "r";
				shapeA.x -= oX;
			}
		}
	}
	return colDir;
}

function pushToArray(arr, val) {
	for (var i in arr)
		if (!arr[i]) {
			if (typeof val === 'object')
				val.index = i;
			arr[i] = val;
			return;
		}
	if (typeof val === 'object')
		val.index = arr.length;
	arr.push(val);
}