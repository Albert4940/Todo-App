
//Function that makes a task 
function taskFactory(id, nameTask, createAt){
	return {
	id:id,
	id_user:0,
	name:nameTask,
	subtask:[],
	numberSubtask:0,
	percentComplete:0,
	complete:false,
	edit:false,
	createAt:createAt,
	updateAt:''
	};
}

var subtask = {
	id:0,
	name:'',
	done:false
};

var list_task = [];

var addTask = (nameTask)=>{
	
	let idTask = list_task.length + 1;
	var task = taskFactory(idTask,nameTask,new Date())
	list_task.push(task);
	return task;

};

var getTask = (id)=>{
	var task = null;
	for(let i = 0; i < list_task.length; i++){
		if(id == list_task[i].id){
			task = list_task[i];
		}
	}

	return task;
};

var removeTask = (id)=>{
	var task_del = getTask(id);
	console.log(list_task);
	if(task_del != null){
		list_task = list_task.filter(function(task){
			return task_del.id != task.id;
		});
	}

	console.log(list_task);
};

//
var addSubtask = (nameSubtask, id_task)=>{
	let task = getTask(id_task);
	let id = task.subtask.length + 1;
	subtask.id = id;
	subtask.name = nameSubtask;
	task.subtask.push(subtask);

	return subtask;
};