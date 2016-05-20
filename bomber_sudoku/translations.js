
var languages = {
	eng : 'en',
	rus : 'ru',
}

function setLanguage(lang) { //TODO: add translation button
	for (var i in languages)
		if (languages[i] == lang) { //change current language
			playerInfo.currentLanguage = lang;
			getElement('mainMenuButton').value = translations[playerInfo.currentLanguage].mainMenu;
			getElement('pauseButton').value = translations[playerInfo.currentLanguage].pause;
			getElement('hint').value = translations[playerInfo.currentLanguage].tips;
			
			getElement('newGameButton').value = translations[playerInfo.currentLanguage].newGame;
			getElement('achievementsButton').value = translations[playerInfo.currentLanguage].achievements;
			getElement('settingsButton').value = translations[playerInfo.currentLanguage].settings;
			getElement('rulesButton').value = translations[playerInfo.currentLanguage].rules;
			getElement('aboutButton').value = translations[playerInfo.currentLanguage].about;
			getElement('tellFriendsButton').value = translations[playerInfo.currentLanguage].share;
			
			return;
		}
}

var translations = {
	'en' : {
		easiest: 'Easy-peasy',
		easy: 'Easier than you think',
		norm: 'It\'s OK!',
		master: 'Master',
		nohurry: 'No hurry',
		blitzkrieg: 'Blitzkrieg',
		fasterThanSound: 'Faster than sound',
		fighter: 'Fighter',
		veteran: 'Veteran',
		iamlegend: 'I Am Legend',
		gotcha: 'Gotcha!',
		sniper: 'Sniper',
		nobombs: 'Verified, no bombs',
		recursion: 'Recursion',
		completeLevel: 'Complete level',
		completeLevel10: 'Complete level in 10 minutes',
		completeLevel5: 'Complete level in 5 minutes',
		completeLevel3: 'Complete level in 3 minutes',
		complete10levels: 'Complete 10 levels',
		complete30levels: 'Complete 30 levels',
		complete50levels: 'Complete 50 levels',
		lockBomber: 'Lock Bomberman with 25 walls or less',
		completeNoErrors: 'Complete level with no errors',
		completeNoBombs: 'Complete level with no bombs placed',
		allAchievements: 'Get all of the achievements',
		newAchievement: 'New achievement',
		shareText: "#Bombersudoku is a combination of classic Sudoku and Bomberman games. I'm already playing, join! vk.com/app5120532",
		
		deleteText: 'Delete',
		cancel: 'Cancel',
		mainMenu: 'Main menu',
		pause: 'Pause',
		tips: 'Tips',
		newGame: 'New game',
		achievements: 'Achievements',
		settings: 'Settings',
		rules: 'Rules',
		about: 'About',
		share: 'Share',
		
		youwon: 'You won!',
		time: 'Time',
		
		wrongDigit: 'Wrong number!',
		trivial: 'Elementary',
		easy: 'Easy',
		normal: 'Normal',
		hard: 'Hard',
		ultra: 'Ultra',
		unknown: 'Unknown',
		highscore: 'Highscore',
		notCompleted: 'Not completed',
		difficulty: 'Difficulty:',
		cellSize: 'Cell size',
		chooseDifficulty: 'Choose difficulty',
		gameDescription1: 'The goal is to solve a classic sudoku: fill a 9x9 grid with digits so that each column, each row, and each of the nine 3x3 squares that compose the grid contain all of the digits from 1 to 9.',
		gameDescription2: 'However, you have an enemy: Bomberman. He places bombs that destroy nearest numbers thus breaking your game strategy.',
		gameDescription3: 'When a row, a column or a 3x3 square is filled, the walls that can stop Bomberman and the blast waves appear. Also, you have several types of tips.',
		gameDescription4: 'Ready? Go now!',
		author: 'Idea',
		authorName: 'Mikhaylov Danil',
		developer: 'Developer',
		developerName: 'Zotov Yaroslav',
		tester: 'Testing',
		testerName: 'Mikhaylov Danil',
		images: 'Sprites & images',
		noMoreTips: 'No more tips',
		tip: 'Tip',
		solvable: 'Solvable',
		unsolvable: 'Unsolvable',
		show1digit: 'Show 1 number',
		stopBomber: 'Stop Bomber for 10 sec',
		checkSolvability: 'Check the solvability'
	},
	'ru' : {
		easiest: 'Одной левой',
		easy: 'Проще, чем кажется',
		norm: 'Это норма',
		master: 'Мастер',
		nohurry: 'Некуда спешить',
		blitzkrieg: 'Блицкриг',
		fasterThanSound: 'Быстрее мысли',
		fighter: 'Боец',
		veteran: 'Ветеран',
		iamlegend: 'Я легенда',
		gotcha: 'Попался!',
		sniper: 'Снайпер',
		nobombs: 'Проверено, бомб нет',
		recursion: 'Рекурсия',
		completeLevel: 'Пройти уровень',
		completeLevel10: 'Пройти уровень быстрее, чем за 10 минут',
		completeLevel5: 'Пройти уровень быстрее, чем за 5 минут',
		completeLevel3: 'Пройти уровень быстрее, чем за 3 минуты',
		complete10levels: 'Пройти 10 уровней',
		complete30levels: 'Пройти 30 уровней',
		complete50levels: 'Пройти 50 уровней',
		lockBomber: 'Запереть бомбермена меньше чем 25-ю стенами',
		completeNoErrors: 'Пройти уровень без единой ошибки',
		completeNoBombs: 'Пройти уровень, не дав бомбермену поставить бомбы',
		allAchievements: 'Получить все достижения',
		newAchievement: 'Новое достижение',
		shareText: '#Bombersudoku - объединение классического судоку и Bomberman. Я уже играю, присоединяйся: vk.com/app5120532',
		
		deleteText: 'Сброс',
		cancel: 'Отмена',
		mainMenu: 'В главное меню',
		pause: 'Пауза',
		tips: 'Подсказки',
		newGame: 'Новая игра',
		achievements: 'Достижения',
		settings: 'Настройки',
		rules: 'Правила',
		about: 'Об игре',
		share: 'Рассказать друзьям',
		
		youwon: 'Вы выиграли!',
		time: 'Ваше время',
		
		wrongDigit: 'Неверная цифра!',
		trivial: 'Элементарно',
		easy: 'Легко',
		normal: 'Норма',
		hard: 'Трудно',
		ultra: 'Ультра',
		unknown: 'Неизвестно',
		highscore: 'Лучшее время',
		notCompleted: 'не пройдено',
		difficulty: 'Уровень сложности:',
		cellSize: 'Размер клетки поля',
		chooseDifficulty: 'Выберите сложность:',
		gameDescription1: 'В этой игре вам нужно решить классическую игру судоку: требуется заполнить свободные клетки цифрами от 1 до 9 так, чтобы в каждой строке, в каждом столбце и в каждом малом квадрате 3×3 каждая цифра встречалась бы только один раз.', 
		gameDescription2: 'Однако, ваш противник постарается навредить вам: он ставит бомбы, которые уничтожают ближайшие цифры, и, таким образом, разрушают вашу игровую стратегию.',
		gameDescription3: 'При полном заполнении строки, столбца или квадрата 3×3 вы получаете бонус: стены, которые ограничивают передвижение бомбермена и взрывные волны. Также в вашем распоряжении имеется несколько видов подсказок.',
		gameDescription4: 'Вы готовы? Тогда вперед!',
		author: 'Автор идеи',
		authorName: 'Данил Михайлов',
		developer: 'Разработчик',
		developerName: 'Ярослав Зотов',
		tester: 'Тестирование',
		testerName: 'Данил Михайлов',
		images: 'Спрайты и изображения',
		noMoreTips: 'Больше нет подсказок',
		tip: 'Подсказка:',
		solvable: 'Разрешимо',
		unsolvable: 'Неразрешимо',
		show1digit: 'Показать 1 цифру',
		stopBomber: 'Остановить бомбера на 10 секунд',
		checkSolvability: 'Проверить разрешимость'
	}
}
