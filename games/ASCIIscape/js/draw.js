
function drawText(ctx, fontSize, lineHeight, text, x ,y) {
	ctx.font = fontSize + 'px Monospace';
	ctx.textAlign = 'left';
	var lines = text.split('\n');
	for (var k = 0; k < lines.length; k++)
		ctx.fillText(lines[k], x, y + k*lineHeight);
}

function drawObject(obj) {
	drawText(game.ctx, fontSize, lineHeight, obj.img, obj.x, obj.y);
}

function redraw() {
	game.ctx.clearRect(0, 0, canvas.width, canvas.height);
	var boxes = game.levels[game.player.currentLevel];
	for (var i in boxes)
		drawText(game.ctx, fontSize, lineHeight, boxes[i].img, boxes[i].x, boxes[i].y);
	drawObject(game.player);
}
