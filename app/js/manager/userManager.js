function userFactory(id, fullName, userName, pass, mail, createAt){
	return{
		id:id,
		fullName:fullName,
		userName:userName,
		pass:pass,
		mail:mail,
		createAt:createAt,
		updateAt:''
	};
}

var list_user = [];

// User  Manager
var addUser = (fullName, userName , pass, mail)=>{
	let id = list_user.length + 1;
	var user = userFactory(id,fullName,userName, pass, mail, new Date());
	list_user.push(user);
	return user;
};

var getUser = (userName, pass)=>{
	var $user = "";
	$.each(list_user, function(index, user){
		if(user.userName == userName && user.pass == pass){
		 $user = user;
		}
	});


	return $user;
}

//Check if a user name already exist
var exist = (userName) =>{
	var found = false;
	$.each(list_user, function(index, user){
		if(user.userName == userName){
			found = true;
		}
	});

	return found ;
};