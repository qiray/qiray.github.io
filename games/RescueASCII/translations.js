
var languages = {
	eng : 'eng',
	rus : 'rus',
}

var currentLanguage = 'eng'

function setLanguage(lang) {
	currentLanguage = lang
	document.getElementById('attackEnemies').innerHTML = translations[currentLanguage].attackEnemies
	var obj = document.getElementById('setTargetting')
	for (var i in obj.options)
		obj.options[i].innerHTML = translations[currentLanguage].selectattackEnemies[i]	
	document.getElementById('continueGame').innerHTML = translations[currentLanguage].play
	document.getElementById('saveGame').innerHTML = translations[currentLanguage].saveGame
	document.getElementById('loadGame').innerHTML = translations[currentLanguage].loadGame
	switch (player.difficulty) {
		case normal:
			document.getElementById('difficulty').innerHTML = translations[currentLanguage].difficulty.normal
			break
		case hard:
			document.getElementById('difficulty').innerHTML = translations[currentLanguage].difficulty.hard
			break
		case ultra:
			document.getElementById('difficulty').innerHTML = translations[currentLanguage].difficulty.ultra
			break
		case easy:
			document.getElementById('difficulty').innerHTML = translations[currentLanguage].difficulty.easy
			break
	}
	document.getElementById('about').innerHTML = translations[currentLanguage].aboutGame
	document.getElementById('mainMenuButton').innerHTML = translations[currentLanguage].mainMenu
	document.getElementById('descriptionsButton').innerHTML = translations[currentLanguage].descriptions
	document.getElementById('storyButton').innerHTML = translations[currentLanguage].story
	document.getElementById('upgradesButton').innerHTML = translations[currentLanguage].upgrades
	document.getElementById('playerInfoButton').innerHTML = translations[currentLanguage].playerInfo
	document.getElementById('backToMapP').innerHTML = translations[currentLanguage].backToMap
	document.getElementById('pauseText').innerHTML = translations[currentLanguage].pauseText
	document.getElementById('moneyInBattle').innerHTML = translations[currentLanguage].money
	document.getElementById('currentWaveText').innerHTML = translations[currentLanguage].currentWaveText
	document.getElementById('livesText').innerHTML = translations[currentLanguage].livesText
	document.getElementById('gameSpeedText').innerHTML = translations[currentLanguage].gameSpeedText
	document.getElementById('startWave').value = translations[currentLanguage].startWave
	document.getElementById('nextWaveText').innerHTML = translations[currentLanguage].nextWave
	for (var i in battles)
		var obj = document.getElementById('battleText' + i).innerHTML = translations[currentLanguage].battles[i]
	for (var i in levelTexts)
		levelTexts[i] = translations[currentLanguage].levelTexts[i]
	for (var i in achievements) {
		achievements[i].name = translations[currentLanguage].achievements[i].name
		achievements[i].description = translations[currentLanguage].achievements[i].description
	}
	for (var i in upgrades) {
		upgrades[i].name = translations[currentLanguage].upgradesArray[i].name
		upgrades[i].description = translations[currentLanguage].upgradesArray[i].description
	}
	story = translations[currentLanguage].plotArray
	
	//TODO: update all labels if neccessary and save language
}

var translations = {
	'eng' : {
		pauseText : 'pause',
		difficulty : {
			hard : 'Difficulty: hard',
			ultra : 'Difficulty: ultra',
			easy : 'Difficulty: easy',
			normal : 'Difficulty: normal',
		},
		cost : 'Cost',
		range : 'Range',
		damage : 'Damage',
		speed : 'Speed',
		health : 'Health',
		name : 'Name',
		description : 'Description',
		statistics: 'Statistics', 
		killedEnemies : 'Killed enemies',
		builtTowers : 'Built towers',
		upgradedTowers: 'Upgraded towers',
		earnedMoney : 'Earned money',
		wins : 'Wins',
		loses: 'Loses',
		achievementsText : 'Achievements',
		upgrades : 'Upgrades',
		yourMoney : 'Your money: ',
		about : {
			author : 'Author',
			authorInfo : 'Idea, ascii art, source code and the game itself by Yaroslav Zotov. Contact me at zotovyaa@mail.ru with any questions and suggestions.',
			game : 'The game',
			gameInfo: 'It is absolutely free, the source code and the game itself can be downloaded here:' +
				'<a href = "https://sourceforge.net/projects/asciidefence/" target = "_blank">https://sourceforge.net/projects/asciidefence/</a>' +
				'<br>Do you like this game? Try also <a href = "http://www.kongregate.com/games/qiray/2nd-power" target = "_blank">"2nd power"</a>.',
			specialThanks: 'Special thanks',
			specialThanksInfo: 'aniwey - author of candybox 2 (<a href = "http://candybox2.net" target = "_blank">http://candybox2.net</a>) for very good game :-)',
		},
		newEnemy : 'New enemy: ',
		level: 'level', 
		attackSpeed : 'Attack speed: ', 
		ShowHideRange: 'Show/hide range',
		upgradeTower : 'Upgrade tower',
		notAvailable : 'Not available',
		sellTower: 'Sell tower:<br>get ',
		getMoney : ' money',
		locked : 'Locked', 
		attackEnemies : 'Attack enemies:',
		selectattackEnemies : ['close to finish', 'close to start', 'fast', 'slow', 'strong', 'weak', 'cheap', 'expensive', 'random'],	
		play : 'Play',
		saveGame : 'Save game',
		loadGame : 'Load game',
		aboutGame : 'About',
		mainMenu : 'Main menu',
		descriptions : 'Descriptions',
		story : 'Story',
		playerInfo : 'Player info',
		backToMap : 'Back to map (don\'t save progress)',
		money : 'Money: ',
		currentWaveText : ' current wave: ',
		livesText : ' lives: ',
		gameSpeedText : ' game speed: ',
		startWave: 'Start wave',
		nextWave: 'Next wave: ',
		battles : ['Small village', 'Spooky forest', 'Swamp', 'Dangerous dungeon', 'Mountain village', 'Mountain path', 'Coastal road', 'Abandoned road', 'Bridge fight', 'Suburb', 'Burned field', 'The gates', 'Castle defence'],
		levelTexts : [
			['Save the village!', 'Enemy soldier: you are weak!', 'Villager: help us please!'],
			['It\'s dangerous here...', 'Wooooo!'],
			['Enemy: you have no chance!', 'Skeleton: we\'ll bring death to ASCII kingdom.'],
			['It\'s dark here.', 'Orc: U? Fight!'],
			['It\'s nice here but there are some enemies.', 'Villager: protect our village.', 'Ghost: boooooo!'],
			['What a wonderful view!', 'Look out! It\'s dangerous place.'],
			['Look at this sea. It \'s awesome.', 'Crab tries to say something but he can\'t. :-('],
			['Anyone here?', 'Silence flows'],
			['Hey! They are trying to cross the bridge!' , 'Is there a troll under the bridge?'],
			['Where are the inhabitants?', 'Assassin: no one can stop us!'],
			['What is this smell? It\'s not teen spirit'],
			['Standing at the gates of forever...'],
			['Citizen: protect our city!', 'The dark lord: ASCII kingdom will be mine!', 'ASCII king: only you can save our land!'],
		],
		defenseStarted : 'Started defence: "',
		letTheFightBegin : 'Let the fight begin!',
		lastWave : 'Last wave!',
		continueText : 'continue',
		achievements : [
			{name: 'Defence started', description: 'Built 1 tower'},
			{name: 'First kill', description: 'Kill 1 enemy'},
			{name: 'Tastes like victory', description: 'Complete the 1st level'},
			{name: 'Constructor', description: 'Built 10 towers'},
			{name: 'Architect', description: 'Built 100 towers'},
			{name: 'Civilisation creator', description: 'Built 1000 towers'},
			{name: 'Destroyer', description: 'Kill 100 enemies'},
			{name: 'Madness? THIS IS SPARTA!', description: 'Kill 1000 enemies'},
			{name: 'Exterminatus!', description: 'Kill 10000 enemies'},
			{name: 'Far over the misty mountains cold', description: 'Complete "Mountain village"'},
			{name: 'I can see the sea', description: 'Start "Coastal road"'},
			{name: 'Is there a troll?', description: 'Start crossing the bridge'},
			{name: 'Excuse me, can you open the door?', description: 'Start defending the gates'},
			{name: 'Traveller', description: 'Unlock all levels'},
			{name: 'ASCII defender', description: 'Complete the game'},
			{name: 'Improver', description: 'Upgrade a tower to level 2'},	
			{name: 'Trust me, I\'m an engineer', description: 'Upgrade a tower to level 3'},
			{name: 'It can be better', description: 'Upgrade 10 towers'},
			{name: 'Searching perfection', description: 'Upgrade 100 towers'},
			{name: 'Pocket money', description: 'Earn 1000 money'},
			{name: 'Serious business', description: 'Earn 10000 money'},
			{name: 'Capitalism', description: 'Earn 100000 money'},
			{name: 'Good, bad, but I have the gun', description: 'Unlock gun tower'},
			{name: 'We\'ve got heavy artillery', description: 'Unlock heavy gun tower'},
			{name: 'What\'s the time? It\'s magic time.', description: 'Unlock magic crystal'},
			{name: 'You are doing it wrong', description: 'Sell a tower'},
			{name: 'Cashback', description: 'Sell 10 towers'},
			{name: 'What are you doing?', description: 'Sell 100 towers'},
			{name: 'Being a hero', description: 'Complete 5 levels without defeats'},
			{name: 'Stand your ground!', description: 'Complete 10 levels without defeats'},
			{name: 'Legendary', description: 'Complete the whole game without defeats'},
			{name: 'I have an idea', description: 'Buy 1 upgrade'},
			{name: 'Inventor', description: 'Buy 10 upgrades'},
			{name: 'Scientist', description: 'Buy all upgrades'},
			{name: 'Extreme', description: 'Win with 1 live'},
			{name: 'Recursively', description: 'Have all achievements'},
		],
		newAchievement : 'New achievement!',
		upgradesArray : [
			{name: 'Guns ready!', description: 'Unlock gun tower'},
			{name: 'Big guns are better', description: 'Unlock heavy gun tower <br>(can damage all enemies in the cell by single shot)'},
			{name: 'Magic in the air', description: 'Unlock magic crystal <br>(magic bullets can attack enemies<br> near the target with halved damage)'},
			{name: 'Ancient drawings', description: 'Unlock towers level 2'},
			{name: 'Crazy machines', description: 'Unlock towers level 3'},
			{name: 'Wealth', description: 'Start money +50'},
			{name: 'Doing business', description: 'Start money +100'},
			{name: '??? PROFIT!', description: 'Start money +150'},
			{name: 'Money, money, money', description: 'Start money +5%'},
			{name: 'Multimillionaire', description: 'Start money +7%'},
			{name: 'Globalisation', description: 'Start money +10%'},
			{name: 'New bullets', description: 'Towers damage +1'},
			{name: 'Heavy guns', description: 'Towers damage +5'},
			{name: 'Weapon of victory', description: 'Towers damage +10'},
			{name: 'Destroy', description: 'Towers damage +10%'},
			{name: 'Eliminate', description: 'Towers damage +25%'},
			{name: 'Exterminate', description: 'Towers damage +50%'},
			{name: 'Building optimisation', description: 'Towers cost -5%'},
			{name: 'Composite materials', description: 'Towers cost -5%'},
			{name: 'Hightech', description: 'Towers cost -5%'},
			{name: 'Division of labor', description: 'Towers cost -5'},
			{name: 'Logistics', description: 'Towers cost -5'},
			{name: 'ASCII help', description: 'Towers cost -5'},
			{name: 'Binoculars', description: 'Towers range +5%'},
			{name: 'Snipers training', description: 'Towers range +10%'},
			{name: 'In a galaxy far far away', description: 'Towers range +15%'},
			{name: 'Look where you shoot', description: 'Towers range +0.1'},
			{name: 'Ballistic trajectory', description: 'Towers range +0.25'},
			{name: 'Automatic weapons', description: 'Towers attack speed +0.5'},
			{name: 'Machineguns', description: 'Towers attack speed +10%'},
			{name: 'Super speed reloading', description: 'Towers attack speed +20%'},
			{name: 'Ultimate defender', description: 'Towers damage +50%, towers range +15%, towers attack speed +20%'},
		],
		youLose : 'You lose!',
		defenseOf : 'Defence of "',
		defenseFailed: '" failed.',
		youWin : 'You win!',
		youEarned : 'You earned: ',
		defenseCompleted : '" completed.',
		plotArray : [
			'Our story starts here...\nThe glorious ASCII kingdom is now under attack.'+
				'Cruel enemy wants to conquer our land. Stop him, lord.\nLet\'s start our way.'+
				'We saw a little village in the South-West corner. It looks like enemy is already there.'+
				'\nSave villagers now!',
			'OK, you are in place. The weather is fine, water is blue and the villagers are...\nWait,'+
				' the enemy is attacking. Build defense towers at places marked with "' + youCanBuildHere + '".'+
				' Just click there and select a tower to build. You can also start enemies wave earlier by pushing button "Start wave".\nGo now.',
			'Congratulations!\nYou\'ve won your first battle and saved the villagers. To thank you they brought a drawing of gun tower.'+
				' Go to "upgrades" menu and buy it. Don\'t forget to visit "upgrades" shop after each battle, there can be something interesting.'+
				'\nBut now it\'s time to continue our way, an old man said that there is a path through the forest, maybe we can go there...',
			'You can see a big old forest: large trees, spiky bushes, different mushrooms, evil wolves and magical unicorns. Oh, sorry'+
				' there are no unicorns. But there are some suspicious men. Let\'s find out what they are planning',
			'Upf, now we are safe. This enemy squad was destroyed but you noticed that the way led you to a disgusting swamp.\n' +
				'Well, you have to go there. No choice.',
			'Nasty place. Slippery paths, mosquitoes, skeletons, monsters. What??? Look out!',
			'The swamp is behind, finally. But how can you cross these mountains? Some people say that there is a way under one of these mountains.\n' + 
				'It seems like you have to go into that cavern...',
			'Darkness... How many years was this dungeon unoccupied? These old walls keep old secrets.\nSomeone there. To arms!',
			'The light! Yeah! You made it. The way is now on the surface. Let\'s hurry to defend this mountain village.',
			'No time to enjoy the view! Stop enemy attacks or the village will fall.',
			'Yes, our soldiers are good in battle, our towers are strong and our people are happy. But the ASCII kingdom is still under attack.' +
				'\nContinue our way.',
			'The mountains are high and the way is dangerous...',
			'There are two ways here. You think a lot and then tell your soldiers to go near the sea.',
			'What a wonderful view. The sun shines, waves splash, water catches the eyes.\n It can be a paradise after the war.',
			'&@#&$!!! The is no road more. We need to come back to the fork and choose another way.', 
			'This way looks abandoned. No footprints, no tracks, nothing. Only the wind blows.',
			'Victory!\nOur glorious soldiers contained enemy attack and threw him back. Now we stand at the river\'s coast waiting the signal. And we are ready.',
			'The enemy prepares next attack. This bridge can be a good place to defend.\n Don\'t waste your time.',
			'We did it. The bridge is safe. Maybe we should go to that village, it looks strange.',
			'Nobody here... Some trees are burnt, houses are destroyed. Sad picture.',
			'The road leads to the gates through the burned field.\nLet\'s go.',
			'We can see huge enemy squads marching to the gates of our ASCII capital. We must stop them.',
			'OK, now to the gates. Move fast.',
			'Yeah!\nThe city defenders greet your forces. But there is no time for meetings. Large enemy troops assault the walls and the gates.\n' + 
				'Build defense lines till you have enough time.',
			'This entrance is now safe. You keep some forces to protect the gates. And this is it. The last step remains.',
			'Two great armies stand face to face. Countless enemy forces has arrived to the heart of ASCII kingdom. The dark lord wants to enslave our free people. ' +
				'The time has come to protect the kingdom at any cost.',
			'Great!\nIt was hard but you did it. Our land is safe, enemy forces are eliminated. The people are happy, the king himself came out ' + 
				'and appointed you the prime minister.\nTake a cup of coffee and then go working. You have a lot to do.',
		],
	},
	'rus' : {
		pauseText : 'пауза',
		difficulty : {
			hard : 'Сложность: трудно',
			ultra : 'Сложность: ультра',
			easy : 'Сложность: легко',
			normal : 'Сложность: норма',
		},
		cost : 'Стоимость',
		range : 'Радиус',
		damage : 'Атака',
		speed : 'Скорость',
		health : 'Здоровье',
		name : 'Название',
		description : 'Описание',
		statistics: 'Статистика', 
		killedEnemies : 'Убито врагов',
		builtTowers : 'Построено башен',
		upgradedTowers: 'Улучшено башен',
		earnedMoney : 'Заработано денег',
		wins : 'Победы',
		loses: 'Поражения',
		achievementsText : 'Достижения',
		upgrades : 'Улучшения',
		yourMoney : 'Ваши деньги: ',
		about : {
			author : 'Автор',
			authorInfo : 'Идея, ASCII-арт, исходный код и игра целиком - Ярослав Зотов. Вы можете обратиться ко мне по электронной почте zotovyaa@mail.ru с любыми вопросами и предложениями.',
			game : 'Игра',
			gameInfo: 'Абсолютно свободна, исходный код и оффлайн-версия может быть скачана здесь:' +
				'<a href = "https://sourceforge.net/projects/asciidefence/" target = "_blank">https://sourceforge.net/projects/asciidefence/</a>' +
				'<br>Понравилась эта игра? Попробуйте также <a href = "http://www.kongregate.com/games/qiray/2nd-power" target = "_blank">"2nd power"</a>.',
			specialThanks: 'Особые благодарности',
			specialThanksInfo: 'aniwey - автор candybox 2 (<a href = "http://candybox2.net" target = "_blank">http://candybox2.net</a>) за очень хорошую игру :-)',
		},
		newEnemy : 'Новый враг: ',
		level: 'уровень', 
		attackSpeed : 'Скорость атаки: ',
		ShowHideRange: 'Показать/скрыть радиус',
		upgradeTower : 'Улучшить башню',
		notAvailable : 'Недоступно',
		sellTower: 'Продать башню:<br>получить ',
		getMoney : ' $', //TODO: replace
		locked : 'Не открыто',
		attackEnemies : 'Атаковать врагов:',
		selectattackEnemies : ['ближе к финишу', 'ближе к старту', 'быстрых', 'медленных', 'сильных', 'слабых', 'дешевых', 'дорогих', 'случайных'],
		play : 'Играть',
		saveGame : 'Сохранить игру',
		loadGame : 'Загрузить игру',
		aboutGame : 'Об игре',
		mainMenu : 'Главное меню',
		descriptions : 'Описания',
		story : 'История',
		playerInfo : 'Об игроке',
		backToMap : 'К карте (не сохранять прогресс)',
		money : 'Деньги: ',
		currentWaveText : ' текущая волна: ',
		livesText : ' жизней: ',
		gameSpeedText : ' скорость игры: ',
		startWave: 'Начать волну',
		nextWave: 'Следующая волна: ',
		battles : ['Маленькая деревня', 'Жуткий лес', 'Топи', 'Опасное подземелье', 'Горная деревня', 'Путь в горах', 'Прибрежная дорогая', 'Заброшенная дорога', 'Битва у моста', 'Пригород', 'Сожженное поле', 'Врата', 'Защита замка'],
		levelTexts : [
			['Спаси деревню!', 'Вражеский солдат: ты слаб!', 'Житель: пожалуйста, спасите нас!'],
			['Тут опасно...', 'Бууууу!'],
			['Противник: у тебя нет ни единого шанса!', 'Скелет: мы несем смерть в королевство ASCII.'],
			['Здесь темно.', 'Орк: У? Дерись!'],
			['Тут хорошо, но враги все портят.', 'Житель: защитите нашу деревню.', 'Привидение: буууууу!'],
			['Какой потрясающий вид!', 'Осторожно! Это опасное место.'],
			['Взгляни на море. Оно прекрасно.', 'Краб пытается что-то сказать, но не может. :-('],
			['Есть кто-нибудь?', 'Лишь тишина'],
			['Эй! Они пытаются пересечь мост!' , 'А под мостом есть тролль?'],
			['Где же жители?', 'Ассасин: никто не сможет остановить нас!'],
			['Что это за запах? Это не "дух юношества".'],
			['Стоя перед воротами вечности...'],
			['Горожанин: защити наш город!', 'Темный лорд: ASCII-королевство будет моим!', 'Король ASCII: только ты можешь спасти нашу землю!'],
		],
		defenseStarted : 'Начата оборона: "',
		letTheFightBegin : 'Пусть битва начнется!',
		lastWave : 'Последняя волна!',
		continueText : 'продолжить',
		achievements : [
			{name: 'Начало положено', description: 'Построена 1 башня'},
			{name: 'Первое убийство', description: 'Убить 1 врага'},
			{name: 'Вкус победы', description: 'Пройти 1-й уровень'},
			{name: 'Строитель', description: 'Построить 10 башен'},
			{name: 'Архитектор', description: 'Построить 100 башен'},
			{name: 'Создатель цивилизации', description: 'Построить 1000 башен'},
			{name: 'Разрушитель', description: 'Убить 100 врагов'},
			{name: 'Безумие? ЭТО СПАРТА!', description: 'Убить 1000 врагов'},
			{name: 'Экстерминатус!', description: 'Убить 10000 врагов'},
			{name: 'За синие горы, за белый туман', description: 'Пройти "Горную деревню"'},
			{name: 'Я вижу море', description: 'Начать "Прибрежную дорогу"'},
			{name: 'Здесь есть тролль?', description: 'Начать пересекать мост'},
			{name: 'Простите, вы можете открыть дверь?', description: 'Начать защиту ворот'},
			{name: 'Путешественник', description: 'Открыть все уровни'},
			{name: 'Защитник ASCII', description: 'Пройти игру'},
			{name: 'Улучшитель', description: 'Улучшить башню до уровня 2'},
			{name: 'Trust me, I\'m an engineer', description: 'Улучшить башню до уровня 3'},
			{name: 'Это может быть лучше', description: 'Улучшить 10 башен'},
			{name: 'В поисках совершенства', description: 'Улучшить 100 башен'},
			{name: 'Карманные деньги', description: 'Заработать 1000$'},
			{name: 'Серьезный бизнес', description: 'Заработать 10000$'},
			{name: 'Капитализм', description: 'Заработать 100000$'},
			{name: 'Хороший, плохой, но пушка-то у меня', description: 'Открыть орудийную башню'},
			{name: 'У нас тяжелая артиллерия', description: 'Открыть тяжелую орудийную башню'},
			{name: 'Который час? Час магии.', description: 'Открыть магический кристалл'},
			{name: 'You are doing it wrong', description: 'Продать башню'},
			{name: 'Возврат наличных', description: 'Продать 10 башен'},
			{name: 'И что ты делаешь?', description: 'Продать 100 башен'},
			{name: 'Путь героя', description: 'Пройти 5 уровней без поражений'},
			{name: 'Ни шагу назад!', description: 'Пройти 10 уровней без поражений'},
			{name: 'Легендарный', description: 'Пройти свю игру без поражений'},
			{name: 'У меня идея', description: 'Купить 1 улучшение'},
			{name: 'Изобретатель', description: 'Купить 10 улучшений'},
			{name: 'Ученый', description: 'Купить все улучшения'},
			{name: 'Экстрим', description: 'Выиграть с 1 жизнью'},
			{name: 'Рекурсивно', description: 'Получить все достижения'},
		],
		newAchievement : 'Новое достижение!',
		upgradesArray : [
			{name: 'Орудия к бою!', description: 'Открыть орудийную башню'},
			{name: 'Большие пушки лучше', description: 'Открыть тяжелую орудийную башню <br>(наносит урон всем вражеским солдатам<br> в одной клетке одним выстрелом)'},
			{name: 'Магия в воздухе', description: 'Открыть магический кристалл <br>(магические снаряды атакуют врагов<br> рядом с целью упменьшенным вдвое уроном)'},
			{name: 'Древние чертежи', description: 'Открыть башни уровня 2'},
			{name: 'Безумные механизмы', description: 'Открыть башни уровня 3'},
			{name: 'Богатство', description: 'Начальный капитал +50'},
			{name: 'Ведение бизнеса', description: 'Начальный капитал +100'},
			{name: '??? PROFIT!', description: 'Начальный капитал +150'},
			{name: 'Money, money, money', description: 'Начальный капитал +5%'},
			{name: 'Мультимиллионер', description: 'Начальный капитал +7%'},
			{name: 'Глобализация', description: 'Начальный капитал +10%'},
			{name: 'Новые снаряды', description: 'Урон башен +1'},
			{name: 'Большие пушки', description: 'Урон башен +5'},
			{name: 'Оружие победы', description: 'Урон башен +10'},
			{name: 'Уничтожай', description: 'Урон башен +10%'},
			{name: 'Устраняй', description: 'Урон башен +25%'},
			{name: 'Истребляй', description: 'Урон башен +50%'},
			{name: 'Оптимизация строительства', description: 'Цена башен -5%'},
			{name: 'Композитные материалы', description: 'Цена башен -5%'},
			{name: 'Высокие технологии', description: 'Цена башен -5%'},
			{name: 'Разделение труда', description: 'Цена башен -5'},
			{name: 'Логистика', description: 'Цена башен -5'},
			{name: 'Помощь ASCII', description: 'Цена башен -5'},
			{name: 'Бинокли', description: 'Дальность башен +5%'},
			{name: 'Тренировка снайперов', description: 'Дальность башен +10%'},
			{name: 'В далекой-предалекой галактике', description: 'Дальность башен +15%'},
			{name: 'Смотри куда стреляешь', description: 'Дальность башен +0.1'},
			{name: 'Баллистическая траектория', description: 'Дальность башен +0.25'},
			{name: 'Автоматическое оружие', description: 'Скорость атаки башен +0.5'},
			{name: 'Пулеметы', description: 'Скорость атаки башен +10%'},
			{name: 'Сверхскоростная перезарядка', description: 'Скорость атаки башен +20%'},
			{name: 'Абсолютный защитник', description: 'Урон башен +50%, дальность башен +15%, скорость атаки башен +20%'},
		],
		youLose : 'Вы проиграли!',
		defenseOf : 'Уровень "',
		defenseFailed: '" провален.',
		youWin : 'Вы победили!',
		youEarned : 'Вы заработали: ',
		defenseCompleted : '" пройден.',
		plotArray : [ //TODO:!
			'Наш рассказ начинается здесь...\nСлавное королевство ASCII атаковано.'+
				'Коварный врга хочет завоевать наши земли. Останови его, повелитель.\nДавайте начнем.'+
				'Мы заметили маленькую деревню в Юго-Восточном углу. Похоже, то враг уже там.'+
				'\nБыстрее спаси жителей!',
			'Хорошо, вы на месте. Погода прекрасна, вода голубая, а жители...\nПостойте,'+
				' враг атакует. Постройте защитные башни в местах, отмеченных "' + youCanBuildHere + '".'+
				' Просто щелкните туда и выберите башню для постройки. Вы можете начать волну раньше, нажав на кнопку "Начать волну".\nТеперь вперед.',
			'Поздравляем!\nВы выиграли свою первую битву и спасли жителей. В благодарность вам они принесли чертеж орудийной башни.'+
				' Перейдите в меню "Улучшения" и купите ее. Не забывайте посещать магазин "Улучшения" после каждой битвы, там может быть что-нибудь интересное.'+
				'\nНо теперь пора продолжить наш путь, один старик сказал, что через лес есть дорога, возможно, нам удастся пройти там...',
				
			'You can see a big old forest: large trees, spiky bushes, different mushrooms, evil wolves and magical unicorns. Oh, sorry'+
				' there are no unicorns. But there are some suspicious men. Let\'s find out what they are planning',
			'Upf, now we are safe. This enemy squad was destroyed but you noticed that the way led you to a disgusting swamp.\n' +
				'Well, you have to go there. No choice.',
			'Nasty place. Slippery paths, mosquitoes, skeletons, monsters. What??? Look out!',
			'The swamp is behind, finally. But how can you cross these mountains? Some people say that there is a way under one of these mountains.\n' + 
				'It seems like you have to go into that cavern...',
			'Darkness... How many years was this dungeon unoccupied? These old walls keep old secrets.\nSomeone there. To arms!',
			'The light! Yeah! You made it. The way is now on the surface. Let\'s hurry to defend this mountain village.',
			'No time to enjoy the view! Stop enemy attacks or the village will fall.',
			'Yes, our soldiers are good in battle, our towers are strong and our people are happy. But the ASCII kingdom is still under attack.' +
				'\nContinue our way.',
			'The mountains are high and the way is dangerous...',
			'There are two ways here. You think a lot and then tell your soldiers to go near the sea.',
			'What a wonderful view. The sun shines, waves splash, water catches the eyes.\n It can be a paradise after the war.',
			'&@#&$!!! The is no road more. We need to come back to the fork and choose another way.', 
			'This way looks abandoned. No footprints, no tracks, nothing. Only the wind blows.',
			'Victory!\nOur glorious soldiers contained enemy attack and threw him back. Now we stand at the river\'s coast waiting the signal. And we are ready.',
			'The enemy prepares next attack. This bridge can be a good place to defend.\n Don\'t waste your time.',
			'We did it. The bridge is safe. Maybe we should go to that village, it looks strange.',
			'Nobody here... Some trees are burnt, houses are destroyed. Sad picture.',
			'The road leads to the gates through the burned field.\nLet\'s go.',
			'We can see huge enemy squads marching to the gates of our ASCII capital. We must stop them.',
			'OK, now to the gates. Move fast.',
			'Yeah!\nThe city defenders greet your forces. But there is no time for meetings. Large enemy troops assault the walls and the gates.\n' + 
				'Build defense lines till you have enough time.',
			'This entrance is now safe. You keep some forces to protect the gates. And this is it. The last step remains.',
			'Two great armies stand face to face. Countless enemy forces has arrived to the heart of ASCII kingdom. The dark lord wants to enslave our free people. ' +
				'The time has come to protect the kingdom at any cost.',
			'Great!\nIt was hard but you did it. Our land is safe, enemy forces are eliminated. The people are happy, the king himself came out ' + 
				'and appointed you the prime minister.\nTake a cup of coffee and then go working. You have a lot to do.',
		],
	},
}
