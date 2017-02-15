$(document).ready(function () {
	$("#ok").click(function () {
		$.ajax({
			type: 'POST',
			url: '/edit:store',
			dataType: 'text',
			data: {
				title: get('title').value,
				content: get('content').value
			},
			success: function (data) {
				if (data == 'ok') {
					window.location.href = '/manager';
				}
			}
		})
	});
})