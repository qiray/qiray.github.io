
function Object(type, x, y, params) {
	switch (type) {
		case objectTypes.fireball:
			this.type = type;
			this.x = x;
			this.y = y;
			this.dir = params.dir;
			this.img = params.img
			this.speed = params.speed;
			break;
		default:
			break;
	}
}

Object.prototype.process = function() {
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
			break;
		default:
			break;
	}
}
