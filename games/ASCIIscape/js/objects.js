
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
			this.prevx = this.x;
			break;
		case objectTypes.fireball: //img, speed, dir, damage
		case objectTypes.background: //img
		default:
			break;
	}
	setObjectSize(this);
}

Object.prototype.isOnTheEdge = function() { //return true when object is on the edge (to prevent from falling)
	if (this.dir == dirs.left && this.x - this.standingOn.x < 10 ||
		this.dir == dirs.right && this.standingOn.x + this.standingOn.width - this.x - this.width < 10)
		return true;
	return false;
}

Object.prototype.move = function(game) {
	var difx = this.x - game.player.x;
	var dify = this.y - game.player.y;
	if ((difx <= 0 && Math.abs(difx) < this.width + this.range || difx >= 0 && Math.abs(difx) < game.player.width + this.range)
		&& Math.abs(dify) < 0.5*lineHeight) { //enemy is close to player
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
	if (Math.abs(this.x - this.prevx) < 0.1 || this.isOnTheEdge()) {
		this.status |= statuses.none;
		this.status &= ~statuses.moving;
	}
	this.prevx = this.x;
}

Object.prototype.searchPlayer = function(game) {
	var difx = this.x - game.player.x;
	var dify = this.y - game.player.y;
	if (Math.abs(difx) < 0.5*game.screen.width && Math.abs(dify) < 2*lineHeight) {
		this.dir = difx > 0 ? dirs.left : dirs.right;
		if (!this.isOnTheEdge()) {
			this.status |= statuses.moving;
			this.status &= ~statuses.none;
		}
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
	var dify = this.y - game.player.y;
	if (!(difx <= 0 && Math.abs(difx) < this.width + this.range || difx >= 0 && Math.abs(difx) < game.player.width + this.range)
		|| Math.abs(dify) > 0.5*lineHeight) { //player is too far, break attack
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
			if (this.hp <= 0) { //enemy's death
				game.objects[this.index] = undefined;
				return;
			}
			game.physicsSim(this);
			if (this.attackSpeed > 0)
				this.attackSpeed--;
			if (this.status & statuses.moving) {
				this.searchPlayer(game);//maybe not always
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
