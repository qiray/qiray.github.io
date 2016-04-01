
function Object(type, x, y, params) {
	this.type = type;
	this.x = x;
	this.y = y;
	switch (type) {
		case objectTypes.fireball:
			this.dir = params.dir;
			this.img = params.img
			this.speed = params.speed;
			break;
		case objectTypes.background:
			this.img = params.img
			break;
		default:
			break;
	}
	setObjectSize(this);
}

Object.prototype.process = function(game) {
	switch (this.type) {
		case objectTypes.fireball:
			switch (this.dir) {
				case dirs.left:
					this.x -= this.speed;
					break;
				case dirs.right:
					this.x += this.speed;
					break;
				case dirs.up:
					this.y -= this.speed;
					break;
				case dirs.down:
					this.y += this.speed;
					break;
			}
			var boxes = game.levels[game.player.currentLevel].walls;
			for (var i = 0; i < game.walls.length; i++) { //TODO: damage to enemies
				var dir = colCheck(this, game.walls[i]);
				if (dir) {
					console.log(game.walls[i]);
					game.objects[this.index] = undefined;
					return;
				}
			}
			break;
		default:
			break;
	}
}
