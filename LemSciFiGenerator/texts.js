
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var selection = 1, sequence = 2

var years = [2094, 2082, 2136, 2451, 3827, 40102, 2235, 2053, 2052]

var earthTexts = [sequence, 
	[selection, 
		'Однажды', 
		'В далеком будущем', 
		'Случилось так, что', 
		'В начале эры всеобщего благоденствия', 
		'40000 лет спустя',
		'В ' + years[getRandomInt(0, years.length)] + ' году',
		[sequence,
			[selection, 
				'В ' + years[getRandomInt(0, years.length - 1)] + ' году', 
				'Через несколько веков после того, как', 
				'Наступил ' + years[getRandomInt(0, years.length - 1)] + ' год,',
				'Прошло не так много времени, сех пор как',
			],
			[selection, ' человечество объединилось,', ' люди оправились от очередной мировой войны,', ' было освоено космическое пространство,']
		]
	], 
	[selection,' на Земле ', ' на нашей планете ', ' на третьей планете от Солнца ', ' на планете Земля '],
	[selection,
		'происходит нечто совершенно загадочное',
		'случается то, что станет темой нашего рассказа',
		[sequence,
			[selection, 'происходят', 'творятся', 'начинают происходить'], 
			[selection, ' невероятные', ' грандиозные', ' поистине фантастические', ' удивительные', ' непостижимые'], 
			[selection, ' события', ' происшествия', ' вещи', ' явления']
		]
	],
	'.\n'
]
