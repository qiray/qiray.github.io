
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
		hp : 100,
		mana : 100, //TODO: different timers for spells
		damage : 50,
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
	this.objects = [];
	var objs = this.levels[level].objects;
	for (var i = 0; i < objs.length; i++) {
		this.objects[i] = new Object(objs[i].type, objs[i].x, objs[i].y, objs[i].params);
		this.objects[i].index = i;
	}
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
			{speed: 2, img: 'O', dir: this.player.dir, damage : this.player.damage})
		);
	}
}

Game.prototype.obectsProcess = function() {
	for (var i in this.objects) {
		if (this.objects[i])
			this.objects[i].process(this);
	}
}

Game.prototype.moveScreen = function() {
	this.screen.x = this.player.x - this.screen.width/2;
	this.screen.y = this.player.y - this.screen.height/2;
	if (this.screen.x < 0)
		this.screen.x = 0;
	if (this.screen.y < 0)
		this.screen.y = 0;
	if (this.screen.x + this.screen.width > this.maxWidth)
		this.screen.x = this.maxWidth - this.screen.width;
	if (this.screen.y + this.screen.height > this.maxHeight)
		this.screen.y = this.maxHeight - this.screen.height;
}

function init() {
	game = new Game(document.getElementById("canvas"));
}

Game.prototype.checkControls = function() {
	if (this.keys[38] || this.keys[32] || this.keys[87]) {// up arrow or space
		this.player.dir = dirs.up;
		if (this.player.status & statuses.grounded && !(this.player.status & statuses.jumping)) {
			this.player.status |= statuses.jumping;
			this.player.status &= ~statuses.grounded;
			if (this.player.velY > -this.player.verticalSpeed)
				this.player.velY -= 0.5;
		} 
		if (this.player.status & statuses.jumping) {
			if (this.player.velY > -this.player.verticalSpeed && this.player.velY < 0)
				this.player.velY -= 0.5;
			else 
				this.player.status &= ~statuses.jumping;
		}
	} else {
		this.player.status &= ~statuses.jumping;
	}
	if (this.keys[39] || this.keys[68]) { // right arrow
		this.player.dir = dirs.right;
		if (this.player.velX < this.player.speed) {
			this.player.velX++;
		}
	}
	if (this.keys[37] || this.keys[65]) { // left arrow
		this.player.dir = dirs.left;
		if (this.player.velX > -this.player.speed) {
			this.player.velX--;
		}
	}
	if (this.keys[70]) { //'f' is for fire
		this.playerFire();
	}
}

Game.prototype.playerProcess = function() {
	if (this.player.mana < 100)
		this.player.mana++;
	this.physicsSim(this.player);
}

Game.prototype.physicsSim = function(obj) {
	obj.velX *= this.friction;
	if (Math.abs(obj.velX) < 1e-3)
		obj.velX = 0;
	obj.velY += this.gravity;
	obj.status &= ~statuses.grounded
	
	obj.x += obj.velX;
	obj.y += obj.velY;
	
	for (var i = 0; i < this.walls.length; i++) {
		var dir = colCheck(obj, this.walls[i]);
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

function game_cycle() {
	game.checkControls();
	game.playerProcess();
	game.obectsProcess();
	game.moveScreen();
	game.redraw();
	requestAnimationFrame(game_cycle);
}
