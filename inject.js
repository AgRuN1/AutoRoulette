(function(d){
	var balance;
	if(balance = d.getElementById("balance-wrapper")){
		var x3 = 0, x2 = 0;
		var x3_i = 0, x2_i = 0;
		var timeout;
		function errorHandle(text){
			$('.autoroulette__error').text(text);
			setTimeout(function(){
				$('.autoroulette__error').text(''); 
			}, 5000);
			return false;
		}
		function log(text){
			$('.autoroulette__log').append("<div>"+text+"</div>");
		}
		function getX(color){
			switch(color){
				case 'rgb(80, 80, 80)': return 'x2';
				case 'rgb(200, 53, 78)': return 'x3';
				case 'rgb(69, 181, 218)': return 'x5';
				case 'rgb(255, 200, 112)': return 'x50';
			}
		}
		function check(){
			var timer = $('#wheel-timer');
			if(!(parseInt(timer.text()) && timer.css('opacity'))){
				setTimeout(check, 5000);
				return;
			}
			$('.autoroulette__log').html('');
			var color = timer.css('color');
			var win = getX(color);
			log("Выиграл: "+win);
			console.log('Выиграл цвет:', win);
			if(win != 'x2'){
				x2 = x2 << 1;
			}else{
				x2 = x2_i;
			}
			if(win != 'x3'){
				x3 = x3 << 1;
			}else{
				x3 = x3_i;
			}
			start();
		}
		function start(){
			if($('#bet-btn-2x').css('display') == 'none' || 
				$('#bet-btn-3x').css('display') == 'none' ||
				parseInt($('#wheel-timer').text()) < 2){
				setTimeout(start, 15000);
				return;
			}
			$('#bet-input').val(x2);
			$('.bet-btn-x2').trigger('click');
			log("Ставка: "+x2+" на x2!");
			console.log('Ставка:', x2, 'на x2');
			$('#bet-input').val(x3);
			$('.bet-btn-x3').trigger('click');
			log("Ставка: "+x3+" на x3!");
			console.log('Ставка:', x3, 'на x3');
			var time = (parseInt($('#wheel-timer').text()) + 12) * 1000;
			timeout = setTimeout(check, time);
		}
		function enable(){
			var x2_v = $('.autoroulette__x2').val();
			if(!x2_v || isNaN(x2_v)){
				return errorHandle("x2 не указана");
			}
			var x3_v = $('.autoroulette__x3').val();
			if(!x3_v || isNaN(x3_v)){
				return errorHandle("x3 не указана");
			}
			x3 = x3_i = x3_v;
			x2 = x2_i = x2_v;
			this.classList.value = this.classList.value.replace("en", "dis");
			this.innerHTML = "Выключить";
			var inputs = this.parentNode.getElementsByTagName("input")
			for(var i = 0, size = inputs.length; i < size; i++){
				inputs[i].style.opacity = "0";
			}
			$('#autoroulette').prepend('<div class="autoroulette__log"></div>');
			this.removeEventListener("click", enable);
			this.addEventListener("click", disable);
			start();
		}

		function disable(){
			clearTimeout(timeout);
			x3 = x2 = 0;
			this.classList.value = this.classList.value.replace("dis", "en");
			this.innerHTML = "Включить";
			var inputs = this.parentNode.getElementsByTagName("input")
			$('.autoroulette__log').remove();
			for(var i = 0, size = inputs.length; i < size; i++){
				inputs[i].style.opacity = "1";
			}
			this.removeEventListener("click", disable);
			this.addEventListener("click", enable);
		}

		var wrap = d.createElement("div");
		wrap.id = "autoroulette";
		var errorH = d.createElement("div");
		errorH.classList.value = "autoroulette__error";
		var inp_x2 = d.createElement("input");
		inp_x2.placeholder = "x2 ставка";
		inp_x2.classList.value = "autoroulette__x2";
		var inp_x3 = d.createElement("input");
		inp_x3.placeholder = "x3 ставка";
		inp_x3.classList.value = "autoroulette__x3";
		var btn = d.createElement("button");
		btn.classList.value = "autoroulette__btn_enable";
		btn.appendChild(d.createTextNode("Включить"));
		btn.addEventListener("click", enable);
		wrap.appendChild(errorH);
		wrap.appendChild(inp_x2);
		wrap.appendChild(inp_x3);
		wrap.appendChild(btn);
		balance.appendChild(wrap);
	}
})(document);