(function($){
	$('#dropdownMenu2').text(sessionStorage.getItem('username'));
	homeHtmlContent(list_task);
	$('#back').on('click', function(e){
		//e.preventDefault();
		homeHtmlContent(list_task);
	});
})(jQuery)