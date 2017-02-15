
$(document).ready(function () {
	$('#login').click(function () {
		//console.log('ok');
		$.ajax({
			type: 'POST',
			//async:false,
			dataType: 'text',
			url: '/login1',
			data: {
				username: get('name').value,
				password: get('password').value
			},
			success: function (data) {
				//alert(data);
				if (data == 'ok') {
					//alert("asd");
					//window.open('E:/testmongodb/views/home', '_target');
					window.location.href = '/home';
					//window.open('/home', '_target');
				} else if (data == 'err2') {
					get('text').innerHTML = '用户名不存在';
					//return false;
					//console.log('ok');
				} else if (data == 'err1') {
					get('text').innerHTML = '密码错误';
					//return false;
				}
			}
		})
	});
})