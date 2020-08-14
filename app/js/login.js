(function($){
	var user = '';
	// Some functions in dorder to control registrer form
	
	console.log(localStorage.getItem('username'));
	function login(){
		let username = $('#signin-form input:eq(0)');
		let pass = $('#signin-form input:eq(1)');
		if(!verify(username) && !verify(pass)){	
			$error.hide();		
			getUser(username.val(),pass.val());
			//localStorage.removeItem("username");
			//localStorage.removeItem("pass");
			 /*var u = null;
			 while(u == null){
			 	u = sessionStorage.getItem("lastname");
			 }*/
			//console.log(u);
			count ++;
			console.log(count);
			if(count == 5 ){
				count = 0;
					if(sessionStorage.getItem("username") != null){
						
						if(sessionStorage.getItem("pass") == pass.val()){
							
							sessionStorage.setItem("username",username.val())
							location.href = "https://albert4940.github.io/Todo-App/app/html/app.html";
							//location.href = "http://localhost/jquery/Todo-App/app/html/app.html";
						}else{
				$error.text("Your account or password is incorrect!");
				$error.show();
			}
					}
			 clearInterval(myVar);
	       }
			console.log(sessionStorage.getItem("username"));
			 
			/*if(localStorage.getItem("username")!= null){
				$error.hide();
				//setCookie('username',user.userName,365);
				//setCookie('pass',user.pass,365);
				location.href = "http://localhost/jquery/Todo-App/app/html/app.html";
			}else{
				$error.text("Your account or password is incorrect!");
				$error.show();
			}*/
		}else{
			$error.text("You have not filled in the form fields correctly!");
				$error.show();
		}

	}

	var myVar ;
	var count = 0;

	 var $field = $('.field'),
        $username = $('#username'),
        $pass = $('#pass'),
        $confirm = $('#confirm'),
        $mail = $('#mail'),
        $send = $('#signup'),
        $error = $('#error');
    
    
    function verify($champ){
        if($champ.val() == ''){
            $error.show();
            return true;           
        }
        return false;
    }

    function verifyPass(pass){
    	if(pass.length < 4){    
    		$('#pass-info').show();        
        	return true;
        }else{
        	$('#pass-info').hide();
            return false;
        }
    }

    function verifyConfirm(passConfirm){
    	 if(passConfirm != $pass.val()){
           $('#confirm-info').show();
            return true;
       }else{
           $('#confirm-info').hide();
           	return false;
       }
    }

    function verifyMail(mail){
    	$regexMail = /.+@.+\..+/;
        if(!$regexMail.test(mail)){
            $('#mail-info').show();
             return true;
        }else{
        	
            $('#mail-info').hide();
             return false;
        }
    }

    //verify if pass field contains more than 4 character
    $('#pass').on('input',function(){
        verifyPass($(this).val());            
    });
    
    //verify if both pass are equals
    $confirm.on('input', function(){
       verifyConfirm($(this).val());
    });
    
    //verify if email is correct
    $mail.on('input', function(){
       verifyMail($(this).val());
    });

    //Main Check 
    function check(){
    
      	//Check if fields are empty 
        if(verify($username) && verify($pass) && verify($confirm) && verify($mail)){
        	return true;
        }
        return false;
    };

    function check2(){

    	//Check if orther fields are correct 
        if (verifyPass($pass.val()) || verifyMail($mail.val()) || verifyConfirm($confirm.val())) {
        	return true;
        }

        return false
       
    }
    /*------------------*/

	function htmlSingUpContent(){
		$('h1').text('SIGN UP');
		$error.hide();
		$('#signin-form').hide();
		$('#signup-form').show();

		$('#signin-link').show();
		$('#signup-link').hide();

	}

	function htmlSingInContent(){
		$('h1').text('SIGN IN');
		$error.hide();
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
		//login();
		myVar = setInterval(login, 1000);
	});

	$('#signup-form').on('submit', function(e){
		e.preventDefault();
		if(!check()){
			if(!check2()){
				let fullName = $('#signup-form input:eq(0)').val();
				let username = $('#signup-form input:eq(1)').val();
				let pass = $('#signup-form input:eq(2)').val();
				let mail = $('#signup-form input:eq(4)').val();
				
				exist(username).then(function(response){
					let data = response.val();
					console.log(data);
					if(data == null){
					$error.hide();
					user = addUser(fullName,username,pass, mail);

					sessionStorage.setItem('username',user.userName);
					}else{
						$error.text("User Name already exist !");
						$error.show();
					}
				});
				
				
			}
		}
	});

})(jQuery)