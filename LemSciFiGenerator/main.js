
function Node(texts, next) {
	this.texts = texts
	this.next = next
}

Node.prototype.getText = function() {
	return this.texts[getRandomInt(0, this.texts.length - 1)]
}

Node.prototype.getNextNode = function() {
	return this.next ? nodes[this.next[getRandomInt(0, this.next.length - 1)]] : nodes[this.next]
}

var nodes = {}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initNodes() {
	document.getElementById('generatedText').value = ''
	
	nodes['Earth'] = new Node(['Земля'], ['naturalСataclysm', 'scientists', 'alienInvasion', 'comet'])
	
	nodes['naturalСataclysm'] = new Node([' сгорает.', ' замерзает.', ' падает на Солнце.'], ['naturalСataclysmEveryoneDies', 'naturalСataclysmNotEveryoneDies'])
	nodes['scientists'] = new Node(['. Ученые'], ['scientistsCreate', 'scientistsOpen'])
	nodes['alienInvasion'] = new Node([' подвергается нашествию '], ['smallMartians', 'bigMartians'])
	nodes['comet'] = new Node([' сталкивается с огромной кометой '], ['cometDestroy', 'cometNotDestroy', 'cometNotDestroyBut'])
	
	nodes['naturalСataclysmEveryoneDies'] = new Node([' Все гибнут.'], undefined)
	nodes['naturalСataclysmNotEveryoneDies'] = new Node([' Почти все гибнут.'], undefined)
	nodes['scientistsCreate'] = new Node([' создают '], ['small', 'big'])
	nodes['scientistsOpen'] = new Node([' открывают '], ['small', 'big'])
	nodes['smallMartians'] = new Node(['маленьких '], ['Martians'])
	nodes['bigMartians'] = new Node(['больших '], ['Martians'])
	nodes['cometDestroy'] = new Node(['и разрушается.'], undefined)
	nodes['cometNotDestroy'] = new Node(['и не разрушается.'], undefined)
	nodes['cometNotDestroyBut'] = new Node(['и не разрушается, но...'], ['naturalСataclysmEveryoneDies', 'naturalСataclysmNotEveryoneDies'])
	
	nodes['small'] = new Node(['маленьких '], ['insects', 'reptiles', 'robots', 'aliens', 'strangeThings'])
	nodes['big'] = new Node(['больших '], ['insects', 'reptiles', 'robots', 'aliens', 'strangeThings'])
	nodes['Martians'] = new Node(['марсиан', 'селенитов', 'внегалактических чудовищ'], ['which'])
	
	nodes['insects'] = new Node(['насекомых'], ['which'])
	nodes['reptiles'] = new Node(['пресмыкающихся'], ['which'])
	nodes['robots'] = new Node(['роботов'], ['which'])
	nodes['aliens'] = new Node(['внеземных существ'], ['which'])
	nodes['strangeThings'] = new Node(['различных странных предметов'], ['which'])
	
	nodes['which'] = new Node([', которые'], ['wantWomen', 'friends', 'friendsButDontUnderstand', 'dontUnderstand', 'understand', 'food'])
	
	nodes['wantWomen'] = new Node([' желают наших женщин.'], ['stealWomen', 'radioactive', 'notRadioactive'])
	nodes['friends'] = new Node([' ведут себя дружелюбно.'], ['radioactive', 'notRadioactive'])
	nodes['friendsButDontUnderstand'] = new Node([' ведут себя дружелюбно, но их никто не понимает.'], ['radioactive', 'notRadioactive'])
	nodes['dontUnderstand'] = new Node([' не понимают нас.'], ['radioactive', 'notRadioactive'])
	nodes['understand'] = new Node([' отлично понимают нас.'], ['radioactive', 'notRadioactive'])
	nodes['food'] = new Node([' воспринимают нас только как пищу.'], ['eatUs', 'radioactive', 'notRadioactive'])
	
	nodes['stealWomen'] = new Node([' Они похищают их и исчезают.'], undefined)
	nodes['radioactive'] = new Node([' Они являются радиоактивными '], ['canBeDestroyed', 'cannotBeDestroyed'])
	nodes['notRadioactive'] = new Node([' Они являются не радиоактивными '], ['canBeDestroyed', 'cannotBeDestroyed'])
	nodes['eatUs'] = new Node([' Они съедают нас.'], undefined)
	
	nodes['canBeDestroyed'] = new Node(['и могут быть уничтожены '], ['GuysCrowd', 'Army', 'AtomicBomb'])
	nodes['cannotBeDestroyed'] = new Node(['и не могут быть уничтожены '], ['noGuysCrowd', 'noArmy', 'noAtomicBomb'])
	
	nodes['GuysCrowd'] = new Node(['толпой парней с факелами.'], undefined)
	nodes['Army'] = new Node(['сухопутной армией.', 'морским флотом.', 'авиацией.', 'морской пехотой и войсками береговой охраны.'], undefined)
	nodes['AtomicBomb'] = new Node(['атомной бомбой.'], undefined)
	nodes['noGuysCrowd'] = new Node(['толпой парней с факелами.'], ['newWeapon', 'but', 'smallpox', 'theyKillUs', 'dictatorship', 'soTheyEatUs'])
	nodes['noArmy'] = new Node(['сухопутной армией.', 'морским флотом.', 'авиацией.', 'морской пехотой и войсками береговой охраны.'], ['newWeapon', 'but', 'smallpox', 'theyKillUs', 'dictatorship', 'soTheyEatUs'])
	nodes['noAtomicBomb'] = new Node(['атомной бомбой.'], ['newWeapon', 'but', 'smallpox', 'theyKillUs', 'dictatorship', 'soTheyEatUs'])
	
	nodes['newWeapon'] = new Node([' Но ученые изобретают новое оружие'], ['weaponFail', 'weaponWinDestroy', 'weaponWinTransform'])
	nodes['but'] = new Node([' Но'], ['cleverGuy', 'priest', 'prettyGirl'])
	
	nodes['weaponFail'] = new Node([', которое отказывает.'], ['smallpox', 'theyKillUs', 'dictatorship', 'soTheyEatUs'])
	nodes['weaponWinDestroy'] = new Node([', которое их убивает.'], undefined)
	nodes['weaponWinTransform'] = new Node([', которое превращает их в мерзкие глыбы.'], undefined)
	nodes['cleverGuy'] = new Node([' один хитрый парень убеждает их, что люди "ОК"'], ['theyDie', 'flyAway' ,'nastyLumps'])
	nodes['priest'] = new Node([' священник рассказывает им о Боге'], ['theyDie', 'flyAway' ,'nastyLumps'])
	nodes['prettyGirl'] = new Node([' они влюбляются в красивую девушку'], ['theyDie', 'flyAway' ,'nastyLumps', 'marriage'])
	
	nodes['smallpox'] = new Node([' Но они умирают от черной оспы.'], undefined)
	nodes['theyKillUs'] = new Node([' И поэтому они убивают нас.'], undefined)
	nodes['dictatorship'] = new Node([' И поэтому они устанавливают систему доброжелательной диктатуры.'], undefined)
	nodes['soTheyEatUs'] = new Node([' И поэтому они съедают нас.'], undefined)
	nodes['theyDie'] = new Node([' и они умирают.'], undefined)
	nodes['flyAway'] = new Node([' и они улетают.'], undefined)
	nodes['nastyLumps'] = new Node([' и они превращаются в мерзкие глыбы.'], undefined)
	nodes['marriage'] = new Node([', женятся и живут долго и счастливо.'], undefined)
}

function generateSciFiText(start) {
	var node = nodes[start]
	var text = ''
	while (node) {
		text += node.getText()
		node = node.getNextNode()
	}
	document.getElementById('generatedText').value = text
}
