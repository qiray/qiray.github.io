
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function Game(canvasObject) {
	this.player = {
		currentLevel : 0, 
		img : '\\o/', 
		x : 10, 
		y : 80,
		speed : 3,
		jumping: false, //TODO: make 1 status
		grounded: false,
		velX: 0,
		velY: 0,
		height: fontSize,
		width: lineHeight
	};
	this.levels = [level1];
	this.objects = [];
	this.units = [];
	this.canvas = canvasObject;
	this.ctx = this.canvas.getContext('2d');
	this.keys = [];
	this.friction = 0.8;
	this.gravity = 0.2;
}

function init() {
	game = new Game(document.getElementById("canvas"));
}

function checkControls(player) {
	if (game.keys[38] || game.keys[32] || game.keys[87]) {// up arrow or space
		if (!player.jumping && player.grounded) {
			player.jumping = true;
			player.grounded = false;
			player.velY = -player.speed * 2;
		}
	}
	if (game.keys[39] || game.keys[68]) { // right arrow
		if (player.velX < player.speed) {
			player.velX++;
		}
	}
	if (game.keys[37] || game.keys[65]) { // left arrow
		if (player.velX > -player.speed) {
			player.velX--;
		}
	}
}

function playerProcess(player) {
	var width = game.canvas.width, height = game.canvas.height;
	player.velX *= game.friction;
	player.velY += game.gravity;
	player.grounded = false;
	
	var boxes = game.levels[game.player.currentLevel];
	for (var i = 0; i < boxes.length; i++) { //TODO: boxes from level
		var dir = colCheck(player, boxes[i]);
		if (dir === "l" || dir === "r") {
			player.velX = 0;
			player.jumping = false;
		} else if (dir === "b") {
			player.grounded = true;
			player.jumping = false;
		} else if (dir === "t") {
			player.velY *= -1;
		}

	}

	if (player.grounded) {
		player.velY = 0;
	}

	player.x += player.velX;
	player.y += player.velY;
}

function game_cycle() {
	checkControls(game.player);
	playerProcess(game.player);
	redraw();
	requestAnimationFrame(game_cycle);
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
