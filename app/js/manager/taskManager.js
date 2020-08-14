
var taskRef = firebase.database().ref('tasks/');
var subtaskRef = firebase.database().ref('subtasks/');

//Function that makes a task 
function taskFactory(id, nameTask, username, createAt){
	return {
	id:id,
	userName:username,
	name:nameTask,
	numberSubtask:0,
	numberSubtaskRealize:0,
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
			//var childTask = taskFactory(task.id, task.nameTask, task.userName, task.createAt);
			//console.log(username);
			if(username == task.userName){
				//console.log(task);
				list_task.push(task);
			}
	    });
	    return list_task;
	});
}

var removeTask = (id)=>{	
    //Remove all task's subtask
    
    	return removeSubtaskByIdTask(id).then(function(){
    		return taskRef.child(id).remove().then(function(){});
    	});
};

//Subtask Manager

function subtaskFactory(id, id_task, nameSubtask){
	return {
	id:id,
	id_task:id_task,
	name:nameSubtask,
	done:false
	};
}

var addSubtask = (id_task, nameSubtask)=>{
	//var task = getTask(id_task);
	var subtask = null;
var id_subtask = firebase.database().ref().child('subtasks/').push().key;
		subtask = subtaskFactory(id_subtask, id_task, nameSubtask);
	if(id_task != null){
		console.log(subtask.name)
		return subtaskRef.child(id_subtask).set(subtask).then(function(){
			return subtask;
	});
		
		//task.numberSubtask = task.subtask.length;
	}
	
};

function getSubtask(id_task, id_subtask){
	/*var task = getTask(id_task);
	var subtask = null;

	if(task != null){
		$.each(task.subtask, function(index, subtask_result){
			if(id_subtask == subtask_result.id){
				subtask = subtask_result;
			}
		});
	}

	return subtask;*/
	return subtaskRef.child(id_subtask).once('value').then(function(data){
		var subtask = '';
		if(data.val().id_task == id_task){
			subtask = response.val();
		}
		return subtask;
	});
}

function getAllSubtasks(id_task){
	return subtaskRef.once('value').then(function(response){
		var list_subtask = [];
		response.forEach(function(data){
			var subtask = data.val();
			if(subtask.id_task == id_task){
				list_subtask.push(subtask);
			}
		});
		return list_subtask;
	});	
}

function removeSubtask(id_task, id_subtask){
	return firebase.database().ref('subtasks/'+id_subtask).remove();
}

function removeSubtaskByIdTask(id_task){
	return subtaskRef.once('value').then(function(response){
		//var list_subtask = [];
		response.forEach(function(data){
			var subtask = data.val();
			if(subtask.id_task == id_task){
				subtaskRef.child(subtask.id).remove().then(function(){});
			}
		});
		//return list_subtask;
	});	
}