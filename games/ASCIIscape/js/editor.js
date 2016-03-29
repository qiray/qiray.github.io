
window.addEventListener("load",function(){
	document.getElementById('inputASCII').value = '';
	document.getElementById('outputBoxes').value = '';
});

function stringSplitSpacesPos(str) {
	var len = str.length, block = -1, i;
	var result = [];
	for (i = 0; i < len; i++) {
		if (str[i] == ' ') {
			if (block >= 0) {
				result.push({index : block, text : str.substring(block, i)});
				block = -1;
			}
			continue;
		}
		if (block < 0)
			block = i;
	}
	if (block >= 0)
		result.push({index : block, text : str.substring(block, i)});
	return result;
}

document.getElementById('generateButton').addEventListener('click', function() {
	var text = document.getElementById('inputASCII').value;
	var lines = text.split('\n');
	var boxes = [];
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext('2d');
	ctx.font = fontSize + 'px Monospace';
	ctx.textAlign = 'left';
	for (var i in lines) {
		if (lines[i].length == 0)
			continue;
		var arr = stringSplitSpacesPos(lines[i]);
		for (var j in arr) {
			boxes.push({
				x : ctx.measureText(Array(arr[j].index + 1).join("a")).width, 
				y : i*lineHeight, 
				img : arr[j].text,
				width : ctx.measureText(arr[j].text).width,
				height : lineHeight
			});
		}
	}
	document.getElementById('outputBoxes').value = JSON.stringify(boxes).replace(/},/g, "},\n");
})
