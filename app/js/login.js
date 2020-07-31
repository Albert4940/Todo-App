(function($){

	function htmlSingUpContent(){
		$('h1').text('SIGN UP');

		$('#signin-form').hide();
		$('#signup-form').show();

		$('#signin-link').show();
		$('#signup-link').hide();

	}

	function htmlSingInContent(){
		$('h1').text('SIGN IN');

		$('#signin-form').show();
		$('#signup-form').hide();

		$('#signin-link').hide();
		$('#signup-link').show();

	}

	$('#signin-link').on('click', function(e){
		e.preventDefault();
		htmlSingInContent();
	});
	$('#signup-link').on('click', function(e){
		e.preventDefault();
		htmlSingUpContent();
	});

	$('#signin-form').on('submit', function(e){
		e.preventDefault();
		alert('IN');
	});
	$('#signup-form').on('submit', function(e){
		e.preventDefault();
		alert("UP");
	});

})(jQuery)