
function playerPlay() {
	var player = document.getElementById('player');
	var src = '';
	if (document.getElementById('audioRadioButton').checked)
		src = document.getElementById('audioSrc').value;
	else
		src = 'http://ic2.101.ru:8000/c1_4';
	if (src != player.getAttribute('src'))
		player.setAttribute('src', src);
	if (src != player.getAttribute('src') || player.paused)
		player.play();
}
