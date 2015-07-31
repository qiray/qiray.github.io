
function Node(texts, next) {
	this.texts = texts
	this.next = next
}

function deepText(obj) {
	var txt = '', mode = 0
	if (obj instanceof Array)
		mode = obj[0]
	switch (mode) {
		case 0: //not array
			txt += obj
			break
		case selection:
			txt += deepText(obj[getRandomInt(1, obj.length - 1)])
			break
		case sequence:
			for (var i = 1; i < obj.length; i++)
				txt += deepText(obj[i])
			break
	}
	return txt
}

Node.prototype.getText = function() {
	var txt = ''
	return deepText(this.texts)
	for (var i = 0; i < this.texts.length; i++) {
		if (this.texts[i] instanceof Array)
			txt += this.texts[i][getRandomInt(0, this.texts[i].length - 1)]
		else
			txt += this.texts[i]
	}
	return txt
}

Node.prototype.getNextNode = function() {
	return this.next ? nodes[this.next[getRandomInt(0, this.next.length - 1)]] : nodes[this.next]
}

var nodes = {}

function initNodes() {
	document.getElementById('generatedText').value = ''
	
	nodes['Earth'] = new Node(earthTexts, ['naturalCataclysm', 'scientists', 'alienInvasion', 'comet'])
	
	nodes['naturalCataclysm'] = new Node(naturalCataclysmTexts, ['naturalCataclysmEveryoneDies', 'naturalCataclysmNotEveryoneDies'])
	nodes['scientists'] = new Node([selection, '. Ученые'], ['scientistsCreate', 'scientistsOpen'])
	nodes['alienInvasion'] = new Node([selection, ' подвергается нашествию '], ['smallMartians', 'bigMartians'])
	nodes['comet'] = new Node([selection, ' сталкивается с огромной кометой '], ['cometDestroy', 'cometNotDestroy', 'cometNotDestroyBut'])
	
	nodes['naturalCataclysmEveryoneDies'] = new Node([selection, ' Все гибнут.'], undefined)
	nodes['naturalCataclysmNotEveryoneDies'] = new Node([selection, ' Почти все гибнут.'], undefined)
	nodes['scientistsCreate'] = new Node([selection, ' создают '], ['small', 'big'])
	nodes['scientistsOpen'] = new Node([selection, ' открывают '], ['small', 'big'])
	nodes['smallMartians'] = new Node([selection, 'маленьких '], ['Martians'])
	nodes['bigMartians'] = new Node([selection, 'больших '], ['Martians'])
	nodes['cometDestroy'] = new Node([selection, 'и разрушается.'], undefined)
	nodes['cometNotDestroy'] = new Node([selection, 'и не разрушается.'], undefined)
	nodes['cometNotDestroyBut'] = new Node([selection, 'и не разрушается, но...'], ['naturalCataclysmEveryoneDies', 'naturalCataclysmNotEveryoneDies'])
	
	nodes['small'] = new Node([selection, 'маленьких '], ['insects', 'reptiles', 'robots', 'aliens', 'strangeThings'])
	nodes['big'] = new Node([selection, 'больших '], ['insects', 'reptiles', 'robots', 'aliens', 'strangeThings'])
	nodes['Martians'] = new Node([selection, 'марсиан', 'селенитов', 'внегалактических чудовищ'], ['which'])
	
	nodes['insects'] = new Node([selection, 'насекомых'], ['which'])
	nodes['reptiles'] = new Node([selection, 'пресмыкающихся'], ['which'])
	nodes['robots'] = new Node([selection, 'роботов'], ['which'])
	nodes['aliens'] = new Node([selection, 'внеземных существ'], ['which'])
	nodes['strangeThings'] = new Node([selection, 'различных странных предметов'], ['which'])
	
	nodes['which'] = new Node([selection, ', которые'], ['wantWomen', 'friends', 'friendsButDontUnderstand', 'dontUnderstand', 'understand', 'food'])
	
	nodes['wantWomen'] = new Node([selection, ' желают наших женщин.'], ['stealWomen', 'radioactive', 'notRadioactive'])
	nodes['friends'] = new Node([selection, ' ведут себя дружелюбно.'], [undefined, 'radioactive', 'notRadioactive'])
	nodes['friendsButDontUnderstand'] = new Node([selection, ' ведут себя дружелюбно, но их никто не понимает.'], ['radioactive', 'notRadioactive'])
	nodes['dontUnderstand'] = new Node([selection, ' не понимают нас.'], ['radioactive', 'notRadioactive'])
	nodes['understand'] = new Node([selection, ' отлично понимают нас.'], ['radioactive', 'notRadioactive'])
	nodes['food'] = new Node([selection, ' воспринимают нас только как пищу.'], ['eatUs', 'radioactive', 'notRadioactive'])
	
	nodes['stealWomen'] = new Node([selection, ' Они похищают их и исчезают.'], undefined)
	nodes['radioactive'] = new Node([selection, ' Они являются радиоактивными '], ['canBeDestroyed', 'cannotBeDestroyed'])
	nodes['notRadioactive'] = new Node([selection, ' Они являются не радиоактивными '], ['canBeDestroyed', 'cannotBeDestroyed'])
	nodes['eatUs'] = new Node([selection, ' Они съедают нас.'], undefined)
	
	nodes['canBeDestroyed'] = new Node([selection, 'и могут быть уничтожены '], ['GuysCrowd', 'Army', 'AtomicBomb'])
	nodes['cannotBeDestroyed'] = new Node([selection, 'и не могут быть уничтожены '], ['noGuysCrowd', 'noArmy', 'noAtomicBomb'])
	
	nodes['GuysCrowd'] = new Node([selection, 'толпой парней с факелами.'], undefined)
	nodes['Army'] = new Node([selection, 'сухопутной армией.', 'морским флотом.', 'авиацией.', 'морской пехотой и войсками береговой охраны.'], undefined)
	nodes['AtomicBomb'] = new Node([selection, 'атомной бомбой.'], undefined)
	nodes['noGuysCrowd'] = new Node([selection, 'толпой парней с факелами.'], ['newWeapon', 'but', 'smallpox', 'theyKillUs', 'dictatorship', 'soTheyEatUs'])
	nodes['noArmy'] = new Node([selection, 'сухопутной армией.', 'морским флотом.', 'авиацией.', 'морской пехотой и войсками береговой охраны.'], ['newWeapon', 'but', 'smallpox', 'theyKillUs', 'dictatorship', 'soTheyEatUs'])
	nodes['noAtomicBomb'] = new Node([selection, 'атомной бомбой.'], ['newWeapon', 'but', 'smallpox', 'theyKillUs', 'dictatorship', 'soTheyEatUs'])
	
	nodes['newWeapon'] = new Node([selection, ' Но ученые изобретают новое оружие'], ['weaponFail', 'weaponWinDestroy', 'weaponWinTransform'])
	nodes['but'] = new Node([selection, ' Но'], ['cleverGuy', 'priest', 'prettyGirl'])
	
	nodes['weaponFail'] = new Node([selection, ', которое отказывает.'], ['smallpox', 'theyKillUs', 'dictatorship', 'soTheyEatUs'])
	nodes['weaponWinDestroy'] = new Node([selection, ', которое их убивает.'], undefined)
	nodes['weaponWinTransform'] = new Node([selection, ', которое превращает их в мерзкие глыбы.'], undefined)
	nodes['cleverGuy'] = new Node([selection, ' один хитрый парень убеждает их, что люди "ОК"'], ['theyDie', 'flyAway' ,'nastyLumps'])
	nodes['priest'] = new Node([selection, ' священник рассказывает им о Боге'], ['theyDie', 'flyAway' ,'nastyLumps'])
	nodes['prettyGirl'] = new Node([selection, ' они влюбляются в красивую девушку'], ['theyDie', 'flyAway' ,'nastyLumps', 'marriage'])
	
	nodes['smallpox'] = new Node([selection, ' Но они умирают от черной оспы.'], undefined)
	nodes['theyKillUs'] = new Node([selection, ' И поэтому они убивают нас.'], undefined)
	nodes['dictatorship'] = new Node([selection, ' И поэтому они устанавливают систему доброжелательной диктатуры.'], undefined)
	nodes['soTheyEatUs'] = new Node([selection, ' И поэтому они съедают нас.'], undefined)
	nodes['theyDie'] = new Node([selection, ' и они умирают.'], undefined)
	nodes['flyAway'] = new Node([selection, ' и они улетают.'], undefined)
	nodes['nastyLumps'] = new Node([selection, ' и они превращаются в мерзкие глыбы.'], undefined)
	nodes['marriage'] = new Node([selection, ', женятся и живут долго и счастливо.'], undefined)
}

function generateSciFiText(start) {
	var node = nodes[start]
	var text = ''
	while (node) {
		text += node.getText()
		node = node.getNextNode()
	}
	var year = years[getRandomInt(0, years.length - 1)]
	text = text.replace('%year', year)
	document.getElementById('generatedText').value = text
}
