
/*
 * Source code from http://easywebscripts.net/javascript/slider.php
 * Some modifications were added by Yaroslav Zotov in 2015.
 */

function slider(elemId, sliderWidth, range1, range2, step, funcToImplement) {
	var func = funcToImplement
	var knobWidth = 50;				// ширина и высота бегунка
	var knobHeight = 50;			// изменяются в зависимости от используемых изображений
	var sliderHeight = 50;			// высота slider'а
	
	var offsX,tmp;					// вспомагательные переменные
	var d = document;
	var isIE = d.all || window.opera;	// определяем модель DOM
	var point = (sliderWidth-knobWidth-3)/(range2-range1);
	// point - количество пикселей на единицу значения
	
	var slider = d.createElement('DIV'); // создаем slider
	slider.id = elemId + '_slider';
	slider.className = 'slider';
	d.getElementById(elemId).appendChild(slider);	
	
	var knob = d.createElement('DIV');	// создаем ползунок
	knob.id = elemId + '_knob';
	knob.className = 'knob';
	slider.appendChild(knob); // добавляем его в документ
	
	knob.style.left = 0; // бегунок в нулевое значение
	/*knob.style.width = knobWidth+'px';	
	knob.style.height = knobHeight+'px';
	slider.style.width = sliderWidth+'px';
	slider.style.height = sliderHeight+'px';*/
	
	var sliderOffset = slider.offsetLeft;			// sliderOffset - абсолютное смещение slider'а
	tmp = slider.offsetParent;		// от левого края в пикселях (в IE не работает)
	while(tmp != null && tmp.tagName != 'BODY') {
		sliderOffset += tmp.offsetLeft;		// тут его и находим
		tmp = tmp.offsetParent;
	}

	if(isIE)						// в зависимости от модели DOM
	{							// назначаем слушателей событий
		knob.onmousedown = startCoord;
		slider.onclick = sliderClick;
		knob.onmouseup = endCoord;
		slider.onmouseup = endCoord;
		//slider.onmouseout = endCoord;
	}
	else {
		knob.addEventListener("mousedown", startCoord, true);
		slider.addEventListener("click", sliderClick, true);
		knob.addEventListener("mouseup", endCoord, true);
		slider.addEventListener("mouseup", endCoord, true);
		knob.addEventListener("touchstart", startCoord, true);
		knob.addEventListener("touchend", endCoord, true);
		//slider.addEventListener("mouseout", endCoord, true);
	}


// далее подробно не описываю, кто захочет - разберется
//////////////////// функции установки/получения значения //////////////////////////

	function setValue(x) // установка по пикселям
	{
		if(x < 0) knob.style.left = 0; 
		else if(x > sliderWidth-knobWidth-3) knob.style.left = (sliderWidth-3-knobWidth)+'px';
		else {
			if(step == 0) knob.style.left = x+'px';
			else knob.style.left = Math.round(x/(step*point))*step*point+'px';
		}
		func(getValue())
	}
	function setValue2(x)	// установка по значению
	{
		if(x < range1 || x > range2) 
			alert('Value is not included into a slider range!')
		else 
			setValue((x-range1)*point)
	}

	function getValue() 
	{return Math.round(parseInt(knob.style.left)/point)+range1;}

//////////////////////////////// слушатели событий ////////////////////////////////////

	function sliderClick(e) {	
		var x;
		if(isIE) {
			if(event.srcElement != slider) return; //IE onclick bug
			x = event.offsetX - Math.round(knobWidth/2);
		}	
		else x = e.pageX-sliderOffset-knobWidth/2;
		setValue(x);
	}

	function startCoord(e) {
		if(isIE) {
			offsX = event.clientX - parseInt(knob.style.left);
			slider.onmousemove = mov;
			slider.ontouchmove = touchMov;
		}
		else {
			slider.addEventListener("mousemove", mov, true);
			slider.addEventListener("touchmove", touchMov, true);
		}
	}
	
	function touchMov(e) {
		//alert('x: ' + e.touches[0].pageX + ', y: ' + e.touches[0].pageY)
		var x;
		if(isIE) x = event.clientX-offsX;
		else x = e.touches[0].pageX-sliderOffset-knobWidth/2;
		setValue(x);
	}
		
	function mov(e) {
		var x;
		if(isIE) x = event.clientX-offsX;
		else x = e.pageX-sliderOffset-knobWidth/2;
		setValue(x);
	}

	function endCoord() {
		if(isIE) {
			slider.onmousemove = null;
			slider.ontouchmove = null;
		} else {
			slider.removeEventListener("mousemove", mov, true);
			slider.removeEventListener("touchmove", touchMov, true);
		}
	}

	// объявляем функции setValue2 и getValue как методы класса
	this.setValue = setValue2;
	this.getValue = getValue;
	this.mouseUp = endCoord
} // конец класса
