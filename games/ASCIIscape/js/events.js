
document.body.addEventListener("keydown", function(e) {
	game.keys[e.keyCode] = true;
});
 
document.body.addEventListener("keyup", function(e) {
	game.keys[e.keyCode] = false;
});
 
window.addEventListener("load",function(){
	init();
	game_cycle();
});
