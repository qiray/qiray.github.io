
function drawText(ctx, fontSize, lineHeight, text, x ,y) {
	ctx.font = fontSize + 'px Monospace';
	ctx.textAlign = 'left';
	var lines = text.split('\n');
	for (var k = 0; k < lines.length; k++)
		ctx.fillText(lines[k], x, y + k*lineHeight);
}

function drawObject(game, obj) {
	drawText(game.ctx, fontSize, lineHeight, obj.img, obj.x - game.screen.x, obj.y - game.screen.y);
}

function onScreen(screen, box) {
	return (screen.x < box.x + box.width &&
		screen.x + screen.width > box.x &&
		screen.y < box.y + box.height &&
		screen.height + screen.y > box.y);
}

function drawObjects(game) {
	for (var i in game.objects) {
		if (game.objects[i])
			drawObject(game, game.objects[i]);
	}	
}

function redraw(game) {
	game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
	var boxes = game.levels[game.player.currentLevel];
	for (var i in boxes) {
		if (onScreen(game.screen, boxes[i]))
			drawObject(game, boxes[i]);
			//drawText(game.ctx, fontSize, lineHeight, boxes[i].img, boxes[i].x, boxes[i].y);
	}
	drawObjects(game);
	drawObject(game, game.player);
game.ctx.strokeRect(0, 0, game.screen.width, game.screen.height);
}
