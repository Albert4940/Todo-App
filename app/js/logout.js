(function($){
	$('#logout').on('click', function(e){
		deleteCookie("username");
		//location.href = "http://localhost/jquery/Todo-App/app/html/login.html";
		$('#log').click();
	});
})(jQuery)