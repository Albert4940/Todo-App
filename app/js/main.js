(function($){
	alert(getCookie('username'))
	$('#dropdownMenu2').text(getCookie('username'));
	homeHtmlContent(list_task);
	$('#back').on('click', function(e){
		//e.preventDefault();
		homeHtmlContent(list_task);
	});
})(jQuery)