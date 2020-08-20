//(function($){
	var id_task = '';
	var task_name = '';
	//function for create a li element and add it to ul element list of task
	function liTaskFactory(task){		
		let del = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">';
		del += '<path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>';
		del += '</svg>';
		let update = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">';
  update += '<path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>';
  update += '<path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>';
update += '</svg>';
		let liElt = '<li id="'+ task.id+'" class="'+task.name+'">';
		liElt += '<span id="'+ task.id+'1">';
		liElt += task.name;
		liElt += '</span>';
		liElt += '<a href="#" style="color:red;" class="delete" >'+del+'</a>';
		liElt += '<a href="#" style="color:black;" class="update" >'+update+'</a><br/>';
		liElt += '<span>';
		//liElt += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Launch demo modal</button>';
		liElt += task.numberOfSubtask +' Task(s)';
		liElt += '&nbsp&nbsp&nbsp' + task.percentComplete +'% Complete';
		liElt += '</span>';
		liElt += '</li>';
		$('ul').append(liElt);
	}

	function displayNumberTaskComplet(list_task){
		var numberTaskComplete = 0;
		$.each(list_task, function(index,task){
				if(task.complete){
					numberTaskComplete ++;
				}
			});		
		$('p').text(list_task.length + ' Task(s) '+ numberTaskComplete + ' Complete');
	}
	//For display list of task and hide a subtask form
	function homeHtmlContent(list_task){
		$('#back').hide();
		$('h1').attr('id','title');
		$('h1').text('TASK LIST');
		displayNumberTaskComplet(list_task);

		$('#formTask').show();
		$('#formSubtask').hide();

		$('#taskList').show();
		$('#subtaskList').hide();

		//$('ul').css('id','taskList');
		$('#taskList').html('');
		if(list_task.length > 0){
			$.each(list_task, function(index,task){
				liTaskFactory(task);
			});			
		}

		
	}

	//add task at list
	$('#formTask').on('submit', function(e){
		e.preventDefault();
		let name = $('#taskName').val();
		addTask(name, localStorage.getItem('username')).then(function(task){
			liTaskFactory(task);
			getAllTasks(localStorage.getItem('username')).then(function(data){
					displayNumberTaskComplet(data);
				});
		});

		$('#taskName').val('');
	});

	//Update a task
	//Show modal with data
	$('#taskList').on('click', '.update',function(e){
		e.preventDefault();
		var $this = $(this);		
		var li_id = $this.parent()[0].id;
		task_name = $this.attr('class');
		id_task=li_id;
		$('#change_input').val($('#'+li_id+'1').text());
		$('#change-task-modal').modal('show');
		e.stopPropagation();
	});

	//get new data and update 
	$('#change_task_button').on('click', function(e){
		e.preventDefault();
		let newName = $('#change_input').val();
		
		getTask(id_task).then(function(response){
			var newTask = response;
			newTask.name= newName;
			newTask.updateAt = new Date();
			updateTask(newTask).then(function(){
			$('#'+id_task+'1').text(newName);
			$('#'+id_task).attr('class',newName);
			$('#change-task-modal').modal('hide');
		  });
		});
	});

	//Delete a task
	//Show delete modal
	$('#taskList').on('click', '.delete', function(e){
		e.preventDefault();
		var $this = $(this);		
		var li_id = $this.parent()[0].id;
		id_task = li_id;
		//getAllSubtasks(li_id).then(function(response){
			/*removeTask(li_id).then(function(){
				$this.parent().remove();
			});
			//displayNumberTaskComplet(list_task);
			
			
		//});*/
		$('#delete-task-modal').modal('show');
		e.stopPropagation();
	});

	//delete task
	$('#delete_task_button').on('click', function(e){
		e.preventDefault();		
		removeTask(id_task).then(function(){
				$('#'+id_task).remove();
				getAllTasks(localStorage.getItem('username')).then(function(data){
					displayNumberTaskComplet(data);
				});
				$('#delete-task-modal').modal('hide');
			});
			
	});

	// To display a list of subtask from task and show form subtask
	$('#taskList').on('click','li', function(e){
		e.preventDefault();
		let $this = $(this);
		let id = $this.attr('id');
		let taskName = $this.attr('class');
		//console.log(taskName);
		getAllSubtasks(id).then(function(data){
			//console.log(data);
			subtaskHtmlContent(id,taskName,data);
		});
		//subtaskHtmlContent(id,taskName);
		/*getTask(id).then(function(task){
			console.log(task.subtask)
			//subtaskHtmlContent(task);
		});*/
	});
//})(jQuery)