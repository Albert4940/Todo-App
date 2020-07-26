const task = {
	id:0,
	id_user:0,
	name:'',
	subtask:[],
	numberSubtask:0,
	percentComplete:0,
	complete:false,
	edit:false,
	createAt:'',
	updateAt:''
};

var subtask = {
	id:0,
	name:'',
	done:false
};

var list_task = [];

var addTask = (nameTask)=>{
	let idTask = list_task.length + 1;
	task.id = idTask;
	task.name = nameTask;
	task.createAt = new Date();
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

var addSubtask = (nameTask, id_task)=>{
	let task = getTask(id_task);
	let id = task.subtask.length + 1;
	subtask.id = id;
	subtask.name = nameTask;
	task.subtask.push(subtask);

	return subtask;
};