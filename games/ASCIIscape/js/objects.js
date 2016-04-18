
function Object(type, x, y, params) {
	this.type = type;
	this.x = x;
	this.y = y;
	for (i in params)
		this[i] = params[i];
	switch (type) {
		case objectTypes.enemy:
			this.velX = this.velY = this.attackSpeed = 0;
			this.status = statuses.none;
			break;
		case objectTypes.fireball: //img, speed, dir, damage
		case objectTypes.background: //img
		default:
			break;
	}
	setObjectSize(this);
}

Object.prototype.move = function(game) {
	var difx = this.x - game.player.x;
	if (difx <= 0 && Math.abs(difx) < this.width + this.range || difx >= 0 && Math.abs(difx) < game.player.width + this.range) {
		this.velX = 0; //Stop now!
		this.status |= statuses.attacking;
		this.status &= ~statuses.moving;
		return;
	}
	if (this.dir == dirs.right)
		if (this.velX < this.speed)
			this.velX++;
	if (this.dir == dirs.left)
		if (this.velX > -this.speed)
			this.velX--;
}

Object.prototype.searchPlayer = function(game) {
	var difx = this.x - game.player.x;
	var dify = this.y - game.player.y;
	if (Math.abs(difx) < 0.5*game.screen.width) {
		this.dir = difx > 0 ? dirs.left : dirs.right;
		this.status |= statuses.moving;
		this.status &= ~statuses.none;
	}
}

Object.prototype.attack = function(game) {
	if (this.attackSpeed == 0) {
		if (this.range > 0)
			this.createBullet(game);
		else {
			game.player.hp -= this.damage;
			if (game.player.hp <= 0)
				;//TODO: player's death
		}
		this.attackSpeed = this.maxAttackSpeed;
	}
	var difx = this.x - game.player.x;
	if (!(difx <= 0 && Math.abs(difx) < this.width + this.range || difx >= 0 && Math.abs(difx) < game.player.width + this.range)) { //player is too fast, break attack
		this.status |= statuses.none;
		this.status &= ~statuses.attacking;			
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
			if (this.attackSpeed > 0)
				this.attackSpeed--;
			if (this.status & statuses.moving) {
				this.move(game);
			}
			if (this.status & statuses.attacking) {
				this.attack(game);
			}
			if (this.status & statuses.none) {
				this.searchPlayer(game);
			}
			break;
		default:
			break;
	}
}
