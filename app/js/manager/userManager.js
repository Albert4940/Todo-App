
var userRef = firebase.database().ref('users/');

function userFactory( fullName, userName, pass, mail, createAt){
	return{
		createAt:createAt,
		fullName:fullName,
		userName:userName,
		pass:pass,
		mail:mail,		
		updateAt:''
	};
}

//var list_user = [];

// User  Manager
var addUser = (fullName, userName , pass, mail)=>{
	
	//create a user object
	var user = userFactory(fullName,userName, pass, mail, new Date());
 		userRef.child(user.userName).set(user).then(function(){
       	//location.href = "http://localhost/jquery/Todo-App/app/html/app.html";
       	location.href = "https://albert4940.github.io/Todo-App/app/html/app.html";
       }).catch(function(error){
       	user = "";
       	console.log("error : " + error);
       });

      /* */
	return user;
};

var getUser = (userName, pass)=>{

	 firebase.database().ref('users/'+userName).once("value").then(function(data){
       	  let user ="";
       	  var myVar;
       	  user = data.val();
       	  localStorage.setItem("username",user.userName);
		  localStorage.setItem("pass",user.pass);
       });
};

//Check if a user name already exist
var exist =  (userName) =>{
	return firebase.database().ref('users/'+userName).once("value").then(function(data){
       	return  data;
       });
        //let user = await firebase.database().ref('users/'+userName).once("value");
};