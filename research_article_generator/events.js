
window.addEventListener("load", function(){
	initGenerator();
	document.getElementById('articleTheme').value = '';
});

document.getElementById('generateButton').addEventListener("click",function() {
	generateArticle();
});
