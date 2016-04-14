
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
	return deepText(this.texts)
}

Node.prototype.getNextNode = function() {
	return this.next ? nodes[this.next[getRandomInt(0, this.next.length - 1)]] : nodes[this.next]
}

var nodes = {}

function initNodes() {
	nodes['Earth'] = new Node(earthTexts, ['naturalCataclysm', 'scientists', 'alienInvasion', 'comet'])
	
	nodes['naturalCataclysm'] = new Node(naturalCataclysmTexts, ['naturalCataclysmEveryoneDies', 'naturalCataclysmNotEveryoneDies'])
	nodes['scientists'] = new Node(scientistTexts, ['scientistsCreate', 'scientistsOpen'])
	nodes['alienInvasion'] = new Node(alienInvasionTexts, ['smallMartians', 'bigMartians'])
	nodes['comet'] = new Node(cometTexts, ['cometDestroy', 'cometNotDestroy', 'cometNotDestroyBut'])
	
	nodes['naturalCataclysmEveryoneDies'] = new Node(naturalCataclysmEveryoneDiesTexts, undefined)
	nodes['naturalCataclysmNotEveryoneDies'] = new Node(naturalCataclysmNotEveryoneDiesTexts, undefined)
	nodes['scientistsCreate'] = new Node(scientistsCreateTexts, ['small', 'big'])
	nodes['scientistsOpen'] = new Node(scientistsOpenTexts, ['small', 'big'])
	nodes['smallMartians'] = new Node(smallMartiansTexts, ['Martians'])
	nodes['bigMartians'] = new Node(bigMartiansTexts, ['Martians'])
	nodes['cometDestroy'] = new Node(cometDestroyTexts, undefined)
	nodes['cometNotDestroy'] = new Node(cometNotDestroyTexts, undefined)
	nodes['cometNotDestroyBut'] = new Node(cometNotDestroyTextsBut, ['naturalCataclysmEveryoneDies', 'naturalCataclysmNotEveryoneDies'])
	
	nodes['small'] = new Node(smallMartiansTexts, ['insects', 'reptiles', 'robots', 'aliens', 'strangeThings'])
	nodes['big'] = new Node(bigMartiansTexts, ['insects', 'reptiles', 'robots', 'aliens', 'strangeThings'])
	nodes['Martians'] = new Node(MartiansTexts, ['which'])
	
	nodes['insects'] = new Node(insectsTexts, ['which'])
	nodes['reptiles'] = new Node(reptilesTexts, ['which'])
	nodes['robots'] = new Node(robotsTexts, ['which'])
	nodes['aliens'] = new Node(aliensTexts, ['which'])
	nodes['strangeThings'] = new Node(strangeThingsTexts, ['which'])
	
	nodes['which'] = new Node(whichTexts, ['wantWomen', 'friends', 'friendsButDontUnderstand', 'dontUnderstand', 'understand', 'food'])
	
	nodes['wantWomen'] = new Node(wantWomenTexts, ['stealWomen', 'radioactive', 'notRadioactive'])
	nodes['friends'] = new Node(friendsTexts, [undefined, 'radioactive', 'notRadioactive'])
	nodes['friendsButDontUnderstand'] = new Node(friendsButDontUnderstandTexts, ['radioactive', 'notRadioactive'])
	nodes['dontUnderstand'] = new Node(dontUnderstandTexts, ['radioactive', 'notRadioactive'])
	nodes['understand'] = new Node(understandTexts, ['radioactive', 'notRadioactive'])
	nodes['food'] = new Node(foodTexts, ['eatUs', 'radioactive', 'notRadioactive'])
	
	nodes['stealWomen'] = new Node(stealWomenTexts, undefined)
	nodes['radioactive'] = new Node(radioactiveTexts, ['canBeDestroyed', 'cannotBeDestroyed'])
	nodes['notRadioactive'] = new Node(notRadioactiveTexts, ['canBeDestroyed', 'cannotBeDestroyed'])
	nodes['eatUs'] = new Node(eatUsTexts, undefined)
	
	nodes['canBeDestroyed'] = new Node(canBeDestroyedTexts, ['GuysCrowd', 'Army', 'AtomicBomb'])
	nodes['cannotBeDestroyed'] = new Node(cannotBeDestroyedTexts, ['noGuysCrowd', 'noArmy', 'noAtomicBomb'])
	
	nodes['GuysCrowd'] = new Node(GuysCrowdTexts, undefined)
	nodes['Army'] = new Node(ArmyTexts, undefined)
	nodes['AtomicBomb'] = new Node(AtomicBombTexts, undefined)
	nodes['noGuysCrowd'] = new Node(GuysCrowdTexts, ['newWeapon', 'but', 'smallpox', 'theyKillUs', 'dictatorship', 'soTheyEatUs'])
	nodes['noArmy'] = new Node(ArmyTexts, ['newWeapon', 'but', 'smallpox', 'theyKillUs', 'dictatorship', 'soTheyEatUs'])
	nodes['noAtomicBomb'] = new Node(AtomicBombTexts, ['newWeapon', 'but', 'smallpox', 'theyKillUs', 'dictatorship', 'soTheyEatUs'])
	
	nodes['newWeapon'] = new Node(newWeaponTexts, ['weaponFail', 'weaponWinDestroy', 'weaponWinTransform'])
	nodes['but'] = new Node(butTexts, ['cleverGuy', 'priest', 'prettyGirl'])
	
	nodes['weaponFail'] = new Node(weaponFailTexts, ['smallpox', 'theyKillUs', 'dictatorship', 'soTheyEatUs'])
	nodes['weaponWinDestroy'] = new Node(weaponWinDestroyTexts, undefined)
	nodes['weaponWinTransform'] = new Node(weaponWinTransformTexts, undefined)
	nodes['cleverGuy'] = new Node(cleverGuyTexts, ['theyDie', 'flyAway' ,'nastyLumps'])
	nodes['priest'] = new Node(priestTexts, ['theyDie', 'flyAway' ,'nastyLumps'])
	nodes['prettyGirl'] = new Node(prettyGirlTexts, ['theyDie', 'flyAway' ,'nastyLumps', 'marriage'])
	
	nodes['smallpox'] = new Node(smallpoxTexts, undefined)
	nodes['theyKillUs'] = new Node(theyKillUsTexts, undefined)
	nodes['dictatorship'] = new Node(dictatorshipTexts, undefined)
	nodes['soTheyEatUs'] = new Node(soTheyEatUsTexts, undefined)
	nodes['theyDie'] = new Node(theyDieTexts, undefined)
	nodes['flyAway'] = new Node(flyAwayTexts, undefined)
	nodes['nastyLumps'] = new Node(nastyLumpsTexts, undefined)
	nodes['marriage'] = new Node(marriageTexts, undefined)
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
	text = '<p>' + text.replace(/\n([ \t]*\n)+/g, '</p><p>') + '</p>';
	document.getElementById('generatedText').innerHTML = text
}
