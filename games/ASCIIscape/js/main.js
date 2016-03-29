
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

function Game(canvasObject) {
	this.player = {
		currentLevel : 0, 
		img : '\\o/', 
		x : 10, 
		y : 40,
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
	this.ctx.font = fontSize + 'px Monospace';
	this.ctx.textAlign = 'left';
	this.screen = {width : 80*this.ctx.measureText("a").width, height : 25*lineHeight, x : 0, y : 0};
	this.canvas.width = this.screen.width;
	this.canvas.height = this.screen.height;
	this.keys = [];
	this.friction = 0.8;
	this.gravity = 0.2;
}

function moveScreen(game) {
	game.screen.x = game.player.x - game.screen.width/2;
	game.screen.y = game.player.y - game.screen.height/2;
	var max = 1000000; //TODO: load from level
	if (game.screen.x < 0)
		game.screen.x = 0;
	if (game.screen.y < 0)
		game.screen.y = 0;
	if (game.screen.x + game.screen.width > max)
		game.screen.x = max - game.screen.width;
	if (game.screen.y + game.screen.height > max)
		game.screen.y = max - game.screen.height;
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
	for (var i = 0; i < boxes.length; i++) {
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
	moveScreen(game);
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
