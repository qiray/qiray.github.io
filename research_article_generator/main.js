
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

var nodes = {}

function initNodes() {
	nodes['theme'] = new Node(themeTexts, undefined);
}

function generateArticle() {
	var node = nodes['theme'];
	var text = '';
	while (node) {
		text += node.getText();
		node = node.getNextNode();
	}
	var theme = document.getElementById('articleTheme').value;
	text = text.replace('%theme', theme);
	text = '<p>' + text.replace(/\n([ \t]*\n)+/g, '</p><p>') + '</p>';
	document.getElementById('generatedText').innerHTML = text;
}
