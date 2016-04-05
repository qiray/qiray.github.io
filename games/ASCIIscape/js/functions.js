
function clone(obj) {
	var copy;
	// Handle the 3 simple types, and null or undefined
	if (null == obj || "object" != typeof obj) 
		return obj;
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
			copy[i] = clone(obj[i]);
		}
		return copy;
	}
	// Handle Object
	if (obj instanceof Object) {
		copy = {};
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) 
				copy[attr] = clone(obj[attr]);
		}
		return copy;
	}
	throw new Error("Unable to copy obj! Its type isn't supported.");
}

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

function physicsSim(game, obj) {
	obj.velX *= game.friction;
	if (Math.abs(obj.velX) < 1e-3)
		obj.velX = 0;
	obj.velY += game.gravity;
	obj.status &= ~statuses.grounded
	
	obj.x += obj.velX;
	obj.y += obj.velY;
	
	for (var i = 0; i < game.walls.length; i++) {
		var dir = colCheck(obj, game.walls[i]);
		if (dir === "l" || dir === "r") {
			obj.velX = 0;
		} else if (dir === "b") {
			obj.status |= statuses.grounded;
			obj.status &= ~statuses.jumping;
		} else if (dir === "t") {
			obj.velY = 0;
		}
	}
	if (obj.status & statuses.grounded)
		obj.velY = 0;
}