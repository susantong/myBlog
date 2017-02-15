var rand = '';

window.onload = function () {

	var globals = {
		eventUtil: {
			addEvent: function (element, type, handler) {
				if (element.addEventListener) {
					element.addEventListener(type, handler, false);
				} else if (element.attachEvent) {
					element.attachEvent('on' + type, handler);
				} else {
					element['on' + type] = handler;
				}
			},

			removeEvent: function (element, type, handler) {
				if (element.removeEventListener) {
					element.removeEventListener(type, handler, false);
				} else if (element.detachEvent) {
					element.detachEvent('on' + type, handler);
				} else {
					element['on' + type] = null;
				}
			}
		},

		regex: {
			userReg: /^[a-zA-Z][a-zA-Z0-9]*$/g,
			passwordReg: /[0-9a-zA-Z]/g
		}
	};

	//触发事件
	globals.eventUtil.addEvent(get('username'), 'focus', userFocus);
	globals.eventUtil.addEvent(get('username'), 'blur', userBlur);

	globals.eventUtil.addEvent(get('password'), 'focus', pwFocus);
	globals.eventUtil.addEvent(get('password'), 'blur', pwBlur);
	globals.eventUtil.addEvent(get('pwaga'), 'focus', pwagaFocus);
	globals.eventUtil.addEvent(get('pwaga'), 'blur', pwagaBlur);
	globals.eventUtil.addEvent(get('message'), 'focus', messageFocus);
	globals.eventUtil.addEvent(get('check'), 'click', changeCheck);
	globals.eventUtil.addEvent(get('submit'), 'click', submitRes);

	//事件处理
	function userFocus() {
		//console.log(get('passwordname-tip').className);
		var user = get('username-tip');
		var className = user.className.split(' ');
		user.className = deleteClass(className, 'hide');
		user.innerHTML = '请输入你的用户名,不超过10位,只能是以字母开头,可以为数字、字母、下划线';
	}

	function userBlur() {
		var value = get('username').value;
		var user = get('username-tip');

		if (value.length > 10) {
			user.innerHTML = '不能超过10位';
		} else if (!value.length) {
			user.innerHTML = '不能为空';
		} else if (!globals.regex.userReg.test(value)) {
			user.innerHTML = '必须为以字母开头，且只能为数字、字母或者下划线'
		}else {
			user.innerHTML = '正确';
		}		
	}

	function pwFocus() {
		var password = get('password-tip');
		var className = password.className.split(' ');
		password.className = deleteClass(className, 'hide');
		password.innerHTML = '请输入你的密码，不超过10位,只能为数字、字母、下划线';
	}

	function pwBlur() {
		var value = get('password').value;
		var password = get('password-tip');

		if (value.length > 10) {
			password.innerHTML = '不能超过10位';
		} else if (!value.length) {
			password.innerHTML = '不能为空';
		} else if (!globals.regex.passwordReg.test(value)) {
			password.innerHTML = '只能为数字、字母或者下划线'
		}else {
			password.innerHTML = '正确';
		}		
	}

	function pwagaFocus() {
		var pwaga = get('pwaga-tip');
		var className = pwaga.className.split(' ');
		pwaga.className = deleteClass(className, 'hide');
		pwaga.innerHTML = '请再次确认密码';
	}

	function pwagaBlur() {
		var value = get('pwaga').value;
		var pwaga = get('pwaga-tip');

		if (value === get('password').value) {
			pwaga.innerHTML = '正确';
		} else if (!value) {
			pwaga.innerHTML = '不能为空';
		} else {
			pwaga.innerHTML = '密码不一致';
		}
	}

	function messageFocus() {
		var check = get('check');
		var check_tip = get('check-tip');
		var className = check_tip.className.split(' ');
		check_tip.className = deleteClass(className, 'hide');

		var juage = function () {
			var userValue = get('username-tip').innerHTML;
			var pwValue = get('password-tip').innerHTML;
			var pwagaValue = get('pwaga-tip').innerHTML;;

			if (userValue === '正确' && pwValue === '正确' && pwagaValue === '正确') {			
				return true;
			} else {
				return false;
			}
		}
	
		//console.log(juage());
		if (juage()) {
			check_tip.innerHTML = '请输入验证码，点击图片进行切换';
			var check_name = check.className.split(' ');
			check.className = deleteClass(check_name, 'hide');
			canvas(check);
		} else {
			check_tip.innerHTML = '请检查前面的输入是否正确';
		}
	}

	function changeCheck() {
		canvas(check);
	}

	function submitRes() {
		if (get('message').value !== rand) {
			//console.log(get('message').value);
			//console.log(rand);
			get('check-tip').innerHTML = '验证码不正确';
			return;
		} 

		//console.log(get('sex').checked);
		// console.log(get('image').value);
		// console.log(get('text').value);
		// console.log((get('sex').checked) ? 'm' : 'f');
		
		$.ajax({
			type: 'POST',
			url: '/reg',
			dataType: 'text',
			//jsonpCallback: 'success_jsopCallback',
			cache: false,
			data: {
				username: get('username').value,
				password: get('password').value,
				headurl: get('image').value,
				description: get('text').value,
				sex: (get('sex').checked) ? 'm' : 'f'
			},
			success: function (data) {
				if (data === 'ok'){
					window.location.href = '/home';
				} else if (data == 'repeat') {
					get('username-tip').innerHTML = '你的用户名重复，请重新输入';
				}
				//console.log(data);
			},
			error: function (xmlRes) {
				console.log(xmlRes.status);
			}

		});
	}
	
}

//删除某一个class类
function deleteClass(arr, attr) {

	var i = 0;
	var len = arr.length;

	//console.log(arr[0]);
	for(; (i < len) && (arr[i] !== attr); i++);
	
	if (i < len) {
		arr.splice(i, 1);
	}

	return arr.join(' ');
}

//增加某一个class类
function addClass(arr, attr) {
	arr.push(attr);

	return arr.join(' ');
} 

//canvas验证码
function canvas(check) {
	//获取画布2D上下文
	var context = check.getContext('2d');
	var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	//获取随机数字
	var rand1 = arr[Math.floor(Math.random() * arr.length)];
	var rand2 = arr[Math.floor(Math.random() * arr.length)];
	var rand3 = arr[Math.floor(Math.random() * arr.length)];
	var rand4 = arr[Math.floor(Math.random() * arr.length)];

	rand = '';
	rand += rand1 + rand2 + rand3 + rand4 ;

	//console.log(rand);

	context.beginPath();

	//设置填充色
	context.fillStyle = '#ccc';
	//填充画布
	context.fillRect(0, 0, check.width, check.height);
	//设置文本

	context.fillStyle = "#FF0000";    //设置填充色  
	context.font = "25px Arial";      //设置字体  
	context.fillText(rand1, 10, 20);  
	//设置第一个随机码显示的位置，并显示。下面同理  
	context.fillText(rand2, 30, 20);  
	context.fillText(rand3, 50, 20);  
	context.fillText(rand4, 70, 20); 

	//随机划线
	var i;
	for (i = 0; i < 4; i++) {
		drawLine(check, context);
	}

	//画随机点，画点就是画1px的线
	for (i = 0; i < 30; i++) {
		drawDot(check, context);
	}

	context.closePath();

}

function drawLine(check, context) {
	//随机线的起点坐标
	context.moveTo(0, Math.floor(Math.random()*check.height));
	//随机线的终止目标
	context.lineTo(check.width, Math.floor(Math.random()*check.height));
	//设置线宽
	context.lineWidth = 0.5;
	//设置随机线描边属性
	context.strokeStyle = 'rgb(50,50,50)';
	//结束
	context.stroke();
}

function drawDot(check, context) {
	var px = Math.floor(Math.random()*check.width);
	var py = Math.floor(Math.random()*check.height);

	context.moveTo(px, py);
	context.lineTo(px+1, py+1);
	context.lineWidth = 0.2;
	context.stroke();
}


