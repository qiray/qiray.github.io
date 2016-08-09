
var signs = {
	x : {img : 'x', val : 1},
	o : {img : 'o', val : 10}
}

var playerTypes = {
	human : 1,
	computer : 2,
	remote : 3 //TODO: maybe
}

var gameStatuses = {
	run : 1,
	stop : 2,
	minigame : 3
}

var game = new Game();

function Player(name, sign, type) {
	this.name = name;
	this.sign = sign;
	this.type = type;
}

function Game() {
	this.mainGameField = new Array(9);
	this.player1 = new Player('Player 1', signs.x, playerTypes.human); //default values
	this.player2 = new Player('Player 2', signs.o, playerTypes.computer);
	this.currentPlayer = this.player1;
	this.status = gameStatuses.run;
	this.currentRound = 0;
}

Game.prototype.init = function() {
	createMainField();
	this.clearField();
}

Game.prototype.clearField = function() {
	for (var i = 0; i < 9; i++) {
		this.mainGameField[i] = 0;
		elm('maintd' + i).innerHTML = '';
	}
}

Game.prototype.newGame = function() { //TODO: names, stats, achievements
	this.clearField();
	this.player1.sign = signs.x;
	this.player2.sign = signs.o;
	this.status = gameStatuses.run;
	this.currentRound = 0;
}

Game.prototype.newRound = function() {
	this.clearField();
	if (++this.currentRound &1)
		this.currentPlayer = this.player2;
	this.status = gameStatuses.run;
	if (this.currentPlayer.type == playerTypes.computer)
		this.mainGameField = this.AI(1, this.mainGameField); //first computer move
}

Game.prototype.anotherPlayer = function(player) {
	return player == this.player1 ? this.player2 : this.player1;
}

Game.prototype.switchPlayer = function() {
	this.currentPlayer = this.anotherPlayer(this.currentPlayer);
}

Game.prototype.handleMainTdClick = function(id) {
	if (this.status == gameStatuses.run && this.currentPlayer.type == playerTypes.human && this.mainGameField[id] == 0) {
		this.mainGameField[id] = this.currentPlayer.sign.val;
		elm('maintd' + id).innerHTML = this.currentPlayer.sign.img;
		this.checkGameStatus(this.currentPlayer);
		var anotherPlayer = this.anotherPlayer(this.currentPlayer)
		this.switchPlayer();
		if (anotherPlayer.type == playerTypes.computer) {
			this.mainGameField = this.AI(1, this.mainGameField);
			this.checkGameStatus(anotherPlayer);
			this.switchPlayer();
		}
	}
}

Game.prototype.checkGameStatus = function(player) {
	var sums = [0, 0, 0, 0, 0, 0, 0, 0];
	for (var i = 0; i < 3; i++) {
		sums[6] += this.mainGameField[i + 3*i];
		sums[7] += this.mainGameField[i + 3*(3 - 1 - i)];
		for (var j = 0; j < 3; j++) {
			sums[i] += this.mainGameField[i*3 + j];
			sums[i + 3] += this.mainGameField[i + j*3];
		}
	}
	for (var i = 0; i < 8; i++)
		if (sums[i] == 3*player.sign.val) {
			alert(player.name + ' win!');
			this.status = gameStatuses.stop;
			break;
		}
}

Game.prototype.calcCost = function(field) {
	var result = 0;
	var val = this.anotherPlayer(this.currentPlayer).sign.val;
	var sums = [0, 0, 0, 0, 0, 0, 0, 0];
	for (var i = 0; i < 3; i++) {
		sums[6] += field[i + 3*i];
		sums[7] += field[i + 3*(3 - 1 - i)];
		for (var j = 0; j < 3; j++) {
			sums[i] += field[i*3 + j];
			sums[i + 3] += field[i + j*3];
		}
	}
	for (var i = 0; i < 8; i++) {
		if (sums[i] == 3*this.currentPlayer.sign.val)
			return 1000; //victory
		if (sums[i] == 2*val)
			result -= 1000; //defeat
		if (sums[i] == 2*this.currentPlayer.sign.val)
			result += 50;
	}
	return result;
}

Game.prototype.AI = function(depth, inputField) {
	if (depth-- <= 0 || this.status == gameStatuses.stop)
		return inputField;
	var field = inputField.slice(0);
	var costs = new Array(9);
	for (var i = 0; i < 9; i++) {
		if (field[i] == 0) {
			var tmpField = field.slice(0); //copy field
			field[i] = this.currentPlayer.sign.val; //make a move
			this.switchPlayer();
			field = this.AI(depth, field); //TODO: test depth
			this.switchPlayer();
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
	if (index < 0) //field is already filled
		console.log("EPIC FAIL! Wrong index!");
	else {
		field[index] = this.currentPlayer.sign.val;
		elm('maintd' + index).innerHTML = this.currentPlayer.sign.img;
	}
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
