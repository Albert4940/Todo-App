(function($){
	$('#logout').on('click', function(e){
		localStorage.removeItem("username");
		localStorage.removeItem("pass");
		//location.href = "http://localhost/jquery/Todo-App/app/html/login.html";
		location.href = "https://albert4940.github.io/Todo-App/app/html/login.html";
		$('#log').click();
	});
})(jQuery)