
$(document).ready(function () {
	$("#ok").click(function () {
		$.ajax({
			url: '/new:store',
			type: 'POST',
			dataType: 'text',
			data: {
				title: $('#title').val(),
				content: $('#content').val()
			},
			success: function (data) {
				if (data == 'ok') {
					window.open('/home');
					//window.event.returnValue = false;
				}
			},
			error: function (xml) {
				console.log(xml.status);
			}
		})
	});
})