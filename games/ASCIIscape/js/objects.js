
function Object(type, x, y, params) {
	this.type = type;
	this.x = x;
	this.y = y;
	for (i in params)
		this[i] = params[i];
	switch (type) {
		case objectTypes.enemy:
			/*this.img = params.img;
			this.dir = params.dir;
			this.speed = params.speed;
			this.hp = params.hp;
			this.damage = params.damage;
			this.range = params.range;
			this.status = params.status;
			this.target = params.target;*/
			this.velX = this.velY = 0;
			this.way = [];
			this.wayIndex = 0;
			break;
		case objectTypes.fireball: //img, speed, dir, damage
		case objectTypes.background: //img
		default:
			break;
	}
	setObjectSize(this);
}

Object.prototype.move = function() {
	if (this.wayIndex < this.way.length) {
		//TODO:move!
	}
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
			for (var i = 0; i < game.walls.length; i++) {
				var dir = colCheck(this, game.walls[i]);
				if (dir) {
					game.objects[this.index] = undefined;
					return;
				}
			}
			for (var i in game.objects)
				if (game.objects[i] && 
						game.objects[i].type == objectTypes.enemy && 
						colCheck(this, game.objects[i])) { //damage to enemy
					game.objects[i].hp -= this.damage;
					game.objects[this.index] = undefined;
					return;
				}
			break;
		case objectTypes.enemy:
			if (this.hp <= 0) {
				game.objects[this.index] = undefined;
				return;
			}
			physicsSim(game, this);
			if (this.status & statuses.moving) {
				this.move();
			}
			if (this.status & statuses.attacking) {
				
			}
			if (this.status & statuses.none) {
				
			}
			break;
		default:
			break;
	}
}
