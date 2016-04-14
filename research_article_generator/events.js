
window.addEventListener("load", function(){
	initNodes();
	document.getElementById('articleTheme').value = '';
});

document.getElementById('generateButton').addEventListener("click",function() {
	generateArticle();
});
