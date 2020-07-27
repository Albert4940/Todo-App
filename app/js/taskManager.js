
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

function subtaskFactory(id,nameSubtask){
	return {
	id:id,
	name:nameSubtask,
	done:false
	};
}

var list_task = [];

var addTask = (nameTask)=>{
	
	let idTask = list_task.length + 1;
	var task = taskFactory(idTask,nameTask,new Date())
	list_task.push(task);
	return task;

};

var getTask = (id)=>{
	var task = null;
	/*for(let i = 0; i < list_task.length; i++){
		if(id == list_task[i].id){
			task = list_task[i];
		}
	}*/

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

//
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