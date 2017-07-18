
var displayStory = 1

var story = [
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
]

var buttonText = '\n<div style = "text-align: center"><input style = "width: 20em;  height: 2em;" type = "button" value = "OK" onclick = "hidePopup();"></div>'

function showStory(storyNumber) {
	bigPopupSize()
	var info = document.getElementById('info')
	info.innerHTML = story[storyNumber] + buttonText
	info.style.display = 'inline-block'
	var tmp = (info.parentNode.parentNode.clientWidth - info.clientWidth)/2
	info.style.left = tmp > 0 ? tmp : 0
	if (document.getElementById('global').clientHeight != 0)
		info.style.top = document.getElementById('global').clientHeight/2 - 100	
	else
		info.style.top = document.getElementById('level').clientHeight/2 - 100	
	displayStory = 0
}

function chooseStory() {
	if (displayStory == 0)
		return
	if (globalMapVisible != 3) //not main menu
		showStory(player.currentStory)
}
