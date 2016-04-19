
function drawText(ctx, fontSize, lineHeight, text, x ,y) {
	ctx.font = fontSize + 'px Monospace';
	ctx.textAlign = 'left';
	var lines = text.split('\n');
	for (var k = 0; k < lines.length; k++)
		ctx.fillText(lines[k], x, y + k*lineHeight);
}

function onScreen(screen, box) {
	return (screen.x < box.x + box.width &&
		screen.x + screen.width > box.x &&
		screen.y < box.y + box.height &&
		screen.height + screen.y > box.y);
}

Game.prototype.drawObject = function(obj) {
	drawText(this.ctx, fontSize, lineHeight, obj.img, obj.x - this.screen.x, obj.y - this.screen.y);
}

Game.prototype.drawObjects = function() {
	for (var i in this.objects) {
		if (this.objects[i])
			this.drawObject(this.objects[i]);
	}	
}

Game.prototype.redraw = function() {
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	for (var i in this.walls) {
		if (onScreen(this.screen, this.walls[i]))
			this.drawObject(this.walls[i]);
	}
	this.drawObjects();
	this.drawObject(this.player);
	this.ctx.strokeRect(0, 0, this.screen.width, this.screen.height); //draw screen borders
	document.getElementById('playersHP').innerHTML = this.player.hp;
	document.getElementById('playersMana').innerHTML = this.player.mana;
}
