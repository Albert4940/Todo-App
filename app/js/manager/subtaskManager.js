
var subtaskRef = firebase.database().ref('subtasks/');

function subtaskFactory(id, id_task, nameSubtask){
	return {
	id:id,
	id_task:id_task,
	name:nameSubtask,
	done:false
	};
}

var addSubtask = (id_task, nameSubtask)=>{
	
	var subtask = null;
	var id_subtask = firebase.database().ref().child('subtasks/').push().key;
		subtask = subtaskFactory(id_subtask, id_task, nameSubtask);
	if(id_task != null){
		return subtaskRef.child(id_subtask).set(subtask).then(function(){
			getAllSubtasks(id_task).then(function(data){
				var number = data.length;
				taskRef.child(id_task).update({numberOfSubtask:number}).then(function(){});
			})
			return subtask;
		});
	}
	
};

function getSubtask(id_task, id_subtask){
	
	return subtaskRef.child(id_subtask).once('value').then(function(response){
		var subtask = '';
		if(response.val().id_task == id_task){
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

function updateSubtask(newSubtask){
	return subtaskRef.child(newSubtask.id).set(newSubtask).then(function(){});
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