
window.addEventListener("load",function(){
	document.getElementById('ASCIItext').value = '';
	document.getElementById('boxesText').value = '';
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

document.getElementById('generateBoxesButton').addEventListener('click', function() {
	var text = document.getElementById('ASCIItext').value;
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
	document.getElementById('boxesText').value = JSON.stringify(boxes).replace(/},/g, "},\n");
})

document.getElementById('generateASCIIButton').addEventListener('click', function() {
	try {
		var boxes = JSON.parse(document.getElementById('boxesText').value);
		var result = '';
		var x = 0, y = 0;
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext('2d');
		ctx.font = fontSize + 'px Monospace';
		ctx.textAlign = 'left';
		var onecharwidth = ctx.measureText('#').width;
		for (var i in boxes) {
			if (y*lineHeight != boxes[i].y) { //new line
				x = 0;
				y = Math.floor(boxes[i].y/lineHeight);
				result += '\n';
			}
			result += Array(Math.floor(boxes[i].x/onecharwidth) - x  + 1).join(" ");
			result += boxes[i].img;
			x = Math.floor((boxes[i].x + boxes[i].width)/onecharwidth);
		}
		document.getElementById('ASCIItext').value = result;
	} catch (err) {
		alert('Error: ' + err.message);
	}
})
