(function($){
	var username = localStorage.getItem('username');
	$('#dropdownMenu2').text(username);

	getAllTasks(username).then(function(list_task){
		//console.log(list_task);
		homeHtmlContent(list_task);
	});
	$('#back').on('click', function(e){
		getAllTasks(username).then(function(list_task){
		//console.log(list_task);
		homeHtmlContent(list_task);
		});
	});
})(jQuery)