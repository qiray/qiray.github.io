
function Node(texts, next) {
	this.texts = texts;
	this.next = next;
}

function deepText(obj) {
	var txt = '', mode = 0;
	if (obj instanceof Array)
		mode = obj[0];
	switch (mode) {
		case 0: //not array
			txt += obj;
			break;
		case selection:
			txt += deepText(obj[getRandomInt(1, obj.length - 1)]);
			break;
		case sequence:
			for (var i = 1; i < obj.length; i++)
				txt += deepText(obj[i]);
			break;
	}
	return txt;
}

Node.prototype.getText = function() {
	return deepText(this.texts);
}

Node.prototype.getNextNode = function() {
	return this.next ? nodes[this.next[getRandomInt(0, this.next.length - 1)]] : nodes[this.next];
}

var nodes = {}, words = {};

function randomProperty(obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]][0];
}

function initGenerator() {
	nodes['theme'] = new Node(themeTexts, undefined); //init nodes
	
	//longtext = longtext.replace(/[,:;]/g, ''); //init words array
	var tmp = longtext.split(' ');
	var len = tmp.length - 1;
	for (var i = 0; i < len; i++) {
		if (!words[tmp[i]])
			words[tmp[i]] = [];
		words[tmp[i]].push(tmp[i + 1]);
	} //TODO: correct sentences
}

function generateTitle(theme) {
	var node = nodes['theme'];
	var text = '';
	while (node) {
		text += node.getText();
		node = node.getNextNode();
	}
	text = text.replace('%theme', theme);
	text = text.replace(' :', ':');
	text = '<p>' + text.replace(/\n([ \t]*\n)+/g, '</p><p>') + '</p>';	
	return text;
}

function generateSentence() { //TODO: use
	var result = "";
	while (true) {
		var word = randomProperty(words);
		result = word;
		var count = 1;
		while (true) {
			word = words[word][getRandomInt(0, words[word].length - 1)];
			result += ' ' + word;
			count++;
			if (word.search(/[.!?]/) != -1 || count > 20)
				break;
		}
		if (count > 6 && count <= 20)
			break;
	}
	return result;
}

function generateArticle() {
	document.getElementById('generatedText').innerHTML = '';
	for (var i = 0; i < 1; i++) {
		document.getElementById('generatedText').innerHTML += generateTitle(document.getElementById('articleTheme').value);
	}
}
