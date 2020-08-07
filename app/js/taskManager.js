
//Function that makes a task 
function taskFactory(id, nameTask, createAt){
	return {
	id:id,
	id_user:0,
	name:nameTask,
	subtask:[],
	numberSubtask:0,
	numberSubtaskRealize:0,
	percentComplete:0,
	complete:false,
	edit:false,
	createAt:createAt,
	updateAt:''
	};
}

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
var list_task = [];

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

// Task Manager
var addTask = (nameTask)=>{
	
	let idTask = list_task.length + 1;
	var task = taskFactory(idTask,nameTask,new Date());
	list_task.push(task);
	return task;
};

var getTask = (id)=>{
	var task = null;
	$.each(list_task, function(index,task_result){
		if(id == task_result.id){
			task = task_result;
		}
	});
	return task;
};

var removeTask = (id)=>{
	var task_del = getTask(id);
	if(task_del != null){
		list_task = list_task.filter(function(task){
			return task_del.id != task.id;
		});
	}
};

//Subtask Manager

function subtaskFactory(id,nameSubtask){
	return {
	id:id,
	name:nameSubtask,
	done:false
	};
}

var addSubtask = (id_task, nameSubtask)=>{
	var task = getTask(id_task);
	var subtask = null;
	if(task != null){
		let id = task.subtask.length + 1;
		subtask = subtaskFactory(id,nameSubtask);
		task.subtask.push(subtask);
		task.numberSubtask = task.subtask.length;
	}
	return subtask;
};

function getSubtask(id_task, id_subtask){
	var task = getTask(id_task);
	var subtask = null;

	if(task != null){
		$.each(task.subtask, function(index, subtask_result){
			if(id_subtask == subtask_result.id){
				subtask = subtask_result;
			}
		});
	}

	return subtask;
}

function removeSubtask(id_task, id_subtask){
	var task = getTask(id_task);
	
	if(task != null){
		task.subtask = task.subtask.filter(function(subtask_result){
			return id_subtask != subtask_result.id;
		});
		task.numberSubtask --;
	}
}