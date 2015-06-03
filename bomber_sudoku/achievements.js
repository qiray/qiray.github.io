
var playerInfo = {
	statistics: {
		victories: 0,
		totalTime: 0,
	},
	bestTime: {
		trivial: 0,
		easy: 0,
		medium: 0,
		hard: 0,
	},
	achievements: []
}

var achievements = [
	{id: 0, name: 'Певая битва', description: 'Выиграть первый матч', condition: function() {return playerInfo > 0} },
]
