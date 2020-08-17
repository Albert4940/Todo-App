
var taskRef = firebase.database().ref('tasks/');


//Function that makes a task 
function taskFactory(id, nameTask, username, createAt){
	return {
	id:id,
	userName:username,
	name:nameTask,
	numberOfSubtask:0,
	numberOfSubtaskRealized:0,
	percentComplete:0,
	complete:false,
	edit:false,
	createAt:createAt,
	updateAt:''
	};
}

var list_task = [];

// Task Manager
var addTask = (nameTask, username)=>{
	
	var id_task = firebase.database().ref().child('tasks/').push().key;
	var task = taskFactory(id_task,nameTask,username, new Date());
	
	return taskRef.child(id_task).set(task).then(function(){
		return task;
	});
};

var getTask = (id)=>{

	return taskRef.child(id).once('value').then(function(response){
		var task ='';
		task = response.val();
		return task;
	});
};

var getAllTasks = (username)=>{

	return taskRef.once('value').then(function(response){
		var list_task = [];
		response.forEach(function(res) {
			var task = res.val();
			if(username == task.userName){
				list_task.push(task);
			}
	    });
	    return list_task;
	});
}

var updateTask = (newTask) => {

	return taskRef.child(newTask.id).set(newTask).then(function(){});
}

var removeTask = (id)=>{	
    //Remove all task's subtask
    
    	return removeSubtaskByIdTask(id).then(function(){
    		return taskRef.child(id).remove().then(function(){});
    	});
};