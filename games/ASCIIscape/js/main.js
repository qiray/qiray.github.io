
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
		dir : dirs.right,
		mana : 100, //TODO: different timers for spells
		speed : 3,
		verticalSpeed : 4,
		status : statuses.none,
		velX: 0,
		velY: 0,
		height: lineHeight,
		width: 0
	};
	this.levels = [level1];
	this.maxWidth = 0;
	this.maxHeight = 0;
	this.canvas = canvasObject;
	this.ctx = this.canvas.getContext('2d');
	this.ctx.font = fontSize + 'px Monospace';
	this.ctx.textAlign = 'left';
	onecharwidth = this.ctx.measureText("#").width;
	this.loadLevel(this.player.currentLevel);
	this.screen = {width : 80*onecharwidth, height : 25*lineHeight, x : 0, y : 0};
	this.canvas.width = this.screen.width;
	this.canvas.height = this.screen.height;
	setObjectSize(this.player);
	this.keys = [];
	this.friction = 0.8;
	this.gravity = 0.2;
}

Game.prototype.loadLevel = function(level) {
	this.objects = this.levels[level].objects;
	this.walls = this.levels[level].walls;
	for (var i in this.walls) {
		if (this.walls[i].y + this.walls[i].height > this.maxHeight)
			this.maxHeight = this.walls[i].y + this.walls[i].height;
		if (this.walls[i].x + this.walls[i].width > this.maxWidth)
			this.maxWidth = this.walls[i].x + this.walls[i].width;
	}
}

Game.prototype.playerFire = function() {
	if (this.player.mana == 100) {
		this.player.mana = 0;
		pushToArray(this.objects, new Object(
			objectTypes.fireball, 
			this.player.x, 
			this.player.y, 
			{speed: 2, img: 'O', dir: this.player.dir})
		);
	}
}

function obectsProcess(game) {
	for (var i in game.objects) {
		if (game.objects[i])
			game.objects[i].process(game);
	}
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
		player.dir = dirs.up;
		if (player.status & statuses.grounded && !(player.status & statuses.jumping)) {
			player.status |= statuses.jumping;
			player.status &= ~statuses.grounded;
			if (player.velY > -player.verticalSpeed)
				player.velY -= 0.5;
		} 
		if (player.status & statuses.jumping) {
			if (player.velY > -player.verticalSpeed && player.velY < 0)
				player.velY -= 0.5;
			else 
				player.status &= ~statuses.jumping;
		}
	} else {
		player.status &= ~statuses.jumping;
	}
	if (game.keys[39] || game.keys[68]) { // right arrow
		player.dir = dirs.right;
		if (player.velX < player.speed) {
			player.velX++;
		}
	}
	if (game.keys[37] || game.keys[65]) { // left arrow
		player.dir = dirs.left;
		if (player.velX > -player.speed) {
			player.velX--;
		}
	}
	if (game.keys[70]) { //'f' is for fire
		game.playerFire();
	}
}

function playerProcess(game, player) {
	if (player.mana < 100)
		player.mana++;
	player.velX *= game.friction;
	if (Math.abs(player.velX) < 1e-3)
		player.velX = 0;
	player.velY += game.gravity;
	player.status &= ~statuses.grounded
	
	for (var i = 0; i < game.walls.length; i++) {
		var dir = colCheck(player, game.walls[i]);
		if (dir === "l" || dir === "r") {
			player.velX = 0;
			//player.status &= ~statuses.jumping;
		} else if (dir === "b") {
			player.status |= statuses.grounded;
			player.status &= ~statuses.jumping;
			//player.y -= player.y + player.height - game.walls[i].y; //to prevent from falling into object
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
	playerProcess(game, game.player);
	obectsProcess(game);
	moveScreen(game);
	redraw(game);
	requestAnimationFrame(game_cycle);
}
