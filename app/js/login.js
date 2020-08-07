(function($){
	var user = '';
	// Some functions in dorder to control registrer form

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
		let username = $('#signin-form input:eq(0)');
		let pass = $('#signin-form input:eq(1)');
		if(!verify(username) && !verify(pass)){	
			$error.hide();		
			user = getUser(username.val(),pass.val());
			if(user != ""){
				setCookie('username',user.userName);
			}else{
				$error.text("Your account or password is incorrect!");
				$error.show();
			}
		}else{
			$error.text("You have not filled in the form fields correctly!");
				$error.show();
		}

	});

	$('#signup-form').on('submit', function(e){
		e.preventDefault();
		//check2();
		if(!check()){
			if(!check2()){
				let fullName = $('#signup-form input:eq(0)').val();
				let username = $('#signup-form input:eq(1)').val();
				let pass = $('#signup-form input:eq(2)').val();
				let mail = $('#signup-form input:eq(4)').val();
				user = addUser(fullName,username,pass, mail);
				setCookie("username", user.userName, 365);
				alert(user.mail);
			}
		}
	});

})(jQuery)