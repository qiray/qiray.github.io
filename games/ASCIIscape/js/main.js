
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
		status : statuses.none,
		velX: 0,
		velY: 0,
		height: lineHeight, //TODO: calc from img
		width: fontSize
	};
	this.levels = [level1];
	this.maxWidth = 0;
	this.maxHeight = 0;
	var boxes = this.levels[this.player.currentLevel];
	for (var i in boxes) { //TODO: load levels
		if (boxes[i].y + boxes[i].height > this.maxHeight)
			this.maxHeight = boxes[i].y + boxes[i].height;
		if (boxes[i].x + boxes[i].width > this.maxWidth)
			this.maxWidth = boxes[i].x + boxes[i].width;
	}
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

Game.prototype.playerFire = function() {
	//TODO: add fireballs, arrows, etc
}

function moveScreen(game) {
	game.screen.x = game.player.x - game.screen.width/2;
	game.screen.y = game.player.y - game.screen.height/2;
	if (game.screen.x < 0)
		game.screen.x = 0;
	if (game.screen.y < 0)
		game.screen.y = 0;
	if (game.screen.x + game.screen.width > game.maxWidth)
		game.screen.x = game.maxWidth - game.screen.width;
	if (game.screen.y + game.screen.height > game.maxHeight)
		game.screen.y = game.maxHeight - game.screen.height;
}

function init() {
	game = new Game(document.getElementById("canvas"));
}

function checkControls(game, player) {
	if (game.keys[38] || game.keys[32] || game.keys[87]) {// up arrow or space
		if (player.status & statuses.grounded && !(player.status & statuses.jumping)) {
			player.status |= statuses.jumping;
			player.status &= ~statuses.grounded;
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
	if (game.keys[70]) { //'f' is for fire
		game.playerFire();
	}
}

function playerProcess(player) {
	var width = game.canvas.width, height = game.canvas.height;
	player.velX *= game.friction;
	if (Math.abs(player.velX) < 1e-3)
		player.velX = 0;
	player.velY += game.gravity;
	player.status &= ~statuses.grounded
	
	var boxes = game.levels[game.player.currentLevel];
	for (var i = 0; i < boxes.length; i++) {
		var dir = colCheck(player, boxes[i]);
		if (dir === "l" || dir === "r") {
			player.velX = 0;
			player.status &= ~statuses.jumping;
		} else if (dir === "b") {
			player.status |= statuses.grounded;
			player.status &= ~statuses.jumping;
			player.y -= player.y + player.height - boxes[i].y; //to prevent from falling into object
		} else if (dir === "t") {
			player.velY = 0;
		}
	}
	if (player.status & statuses.grounded)
		player.velY = 0;

	player.x += player.velX;
	player.y += player.velY;
}

function game_cycle() {
	checkControls(game, game.player);
	playerProcess(game.player);
	moveScreen(game);
	redraw(game);
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
