
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

var list_user = [];

// User  Manager
var addUser = (fullName, userName , pass, mail)=>{
	
	//create a user object
	var user = userFactory(fullName,userName, pass, mail, new Date());
	
	//Get a reference to the database service
	//var database = firebase.database();
	//var newUserKey = firebase.database().ref().child('users').push().key;
	// database.child("text").set("newUserKey");
	//var userId = firebase.database().ref().child('users').push().key;
		//var userRef = database.ref('users/'+user.userName);

 		userRef.child(user.userName).set(user).then(function(){
       	location.href = "http://localhost/jquery/Todo-App/app/html/app.html";
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
       	  sessionStorage.setItem("username",user.userName);
		  sessionStorage.setItem("pass",user.pass);
       });
};

//Check if a user name already exist
var exist =  (userName) =>{
	return firebase.database().ref('users/'+userName).once("value").then(function(data){
       	return  data;
       });
        //let user = await firebase.database().ref('users/'+userName).once("value");
};