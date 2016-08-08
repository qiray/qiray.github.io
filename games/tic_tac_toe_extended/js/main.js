
var signs = {
	x : {img : 'x', val : 1},
	o : {img : 'o', val : 10}
}

var modes = {
	mode1player : 1,
	mode2players : 2,
	modeNetwork : 3 //TODO: maybe
}

var game = new Game();

function Game() {
	this.mainGameField = new Array(9);
	this.mode = modes.mode1player; //default
	this.player1Sign = signs.x;
	this.player2Sign = signs.o;
	this.currentPlayerSign = this.player1Sign; //default
}

Game.prototype.init = function() {
	createMainField();
	for (var i = 0; i < 9; i++) {
		this.mainGameField[i] = 0;
		elm('maintd' + i).innerHTML = '';
	}
}

Game.prototype.switchPlayer = function() {
	this.currentPlayerSign = this.currentPlayerSign == this.player1Sign ? this.player2Sign : this.player1Sign;
}

Game.prototype.handleMainTdClick = function(id) {
	if (this.mainGameField[id] == 0) {
		this.mainGameField[id] = this.currentPlayerSign.val;
		elm('maintd' + id).innerHTML = this.currentPlayerSign.img;
		this.checkGameStatus();
		if (this.mode == modes.mode1player)
			this.mainGameField = this.AI(1, this.mainGameField);
		else if (this.mode == modes.mode2players)
			this.switchPlayer();
	}
}

Game.prototype.checkGameStatus = function() {
	var diag1 = 0, diag2 = 0;
	for (var i = 0; i < 3; i++) {
		diag1 += this.mainGameField[i + 3*i];
		diag2 += this.mainGameField[i + 3*(3 - 1 - i)];
		var sum1 = 0, sum2 = 0;
		for (var j = 0; j < 3; j++) {
			sum1 += this.mainGameField[i*3 + j];
			sum2 += this.mainGameField[i + j*3];
		}
		if (sum1 == 3*this.currentPlayerSign.val || sum2 == 3*this.currentPlayerSign.val) {
			alert('Player ' + (this.currentPlayerSign.val == this.player1Sign.val ? '1' : '2') + ' win');
			break;
		}
	}
	if (diag1 == 3*this.currentPlayerSign.val || diag2 == 3*this.currentPlayerSign.val) {
		alert('!Player 1 win');
	}
}

Game.prototype.calcCost = function(field) { //TODO: make it work!
	var result = 0;
	var val = this.currentPlayerSign.val == signs.x.val ? signs.x.val : signs.o.val;
	var diag1 = 0, diag2 = 0;
	for (var i = 0; i < 3; i++) {
		diag1 += field[i + 3*i];
		diag2 += field[i + 3*(3 - 1 - i)];
		var sum1 = 0, sum2 = 0;
		for (var j = 0; j < 3; j++) {
			sum1 += field[i*3 + j];
			sum2 += field[i + j*3];
		}
		if (sum1 == 2*val || sum2 == 2*val) {
			return 10;
		}
	}
	if (diag1 == 2*val || diag2 == 2*val) {
		return 10;
	}
	return 1;
}

Game.prototype.AI = function(depth, inputField) { //TODO: make AI work!
	if (depth-- <= 0)
		return inputField;
	this.switchPlayer();
	var field = inputField.slice(0);
	var costs = new Array(9);
	for (var i = 0; i < 9; i++) {
		if (field[i] == 0) {
			var tmpField = field.slice(0); //copy field
			field[i] = this.currentPlayerSign.val; //make a move
			field = this.AI(depth, field); //TODO: add depth
			costs[i] = this.calcCost(field);
			field = tmpField;//reset copy
		}
	}
	var index = -1, max = -2147483647;
	for (var i = 0; i < 9; i++)
		if (costs[i] !== undefined && costs[i] > max) {
			max = costs[i];
			index = i;
		}
	if (index < 0)
		console.log("EPIC FAIL! Wrong index!");
	else {
		field[index] = this.currentPlayerSign.val;
		elm('maintd' + index).innerHTML = this.currentPlayerSign.img;
	}
	this.checkGameStatus();
	this.switchPlayer();
	return field;
}

function elm(id) {
	return document.getElementById(id);
}

function createMainField() {
	var tableElement = elm('gameDiv');
	var txt = '<table class = "gameTable">\n'
	for (var i = 0; i < 3; i++) {
		txt += '<tr>'
		for (var j = 0; j < 3; j++) {
			var id = i*3 + j;
			txt += '<td class = "mainGameTd" id = "maintd' + id + '" onclick = "game.handleMainTdClick(' + id + ')"></td>'
		}
		txt += '</tr>\n'
	}
	tableElement.innerHTML = txt;
}
