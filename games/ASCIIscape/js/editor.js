
window.addEventListener("load",function(){
	document.getElementById('inputASCII').value = '';
	document.getElementById('outputBoxes').value = '';
});

document.getElementById('generateButton').addEventListener('click', function() {
	var text = document.getElementById('inputASCII').value;
	var lines = text.split('\n');
	var boxes = [];
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');
	for (var i in lines) {
		if (lines[i].length == 0)
			continue;
		var arr = lines[i].split(' ');
		for (var j in arr) {
			boxes.push({
				x : 0, 
				y : i*lineHeight, 
				img : arr[j],
				width : ctx.measureText(arr[j]).width,
				height : lineHeight
			});
		}
	}
	document.getElementById('outputBoxes').value = JSON.stringify(boxes);
})
