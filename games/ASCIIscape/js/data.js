
var fontSize = 12, lineHeight = 14;
var onecharwidth;
var game;

var statuses = {
	none : 1,
	jumping : 2,
	grounded : 4,
	moving : 8,
	attacking : 16
}

var dirs = {
	up : 1,
	right : 2,
	down : 3,
	left : 4
}

var objectTypes = {
	fireball : 1,
	npc : 2,
	enemy : 3,
	background : 4
}
