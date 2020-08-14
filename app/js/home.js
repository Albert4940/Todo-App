//(function($){

	//function for create a li element and add it to ul element list of task
	function liTaskFactory(task){		
		let del = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">';
		del += '<path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>';
		del += '</svg>';
		let liElt = '<li id="'+ task.id+'" class="'+task.name+'">';
		liElt += '<span class="name">';
		liElt += task.name;
		liElt += '</span>';
		liElt += '<a href="#">'+del+'</a><br/>';
		liElt += '<span>';
		liElt += task.numberSubtask +' Task(s)';
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
		$('p').text(list_task.length + ' Task '+ numberTaskComplete + ' Complete');
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
		addTask(name, sessionStorage.getItem('username')).then(function(task){
			console.log(task);
			liTaskFactory(task);
			displayNumberTaskComplet(list_task);
		});

		$('#taskName').val('');
	});

	//Delete a task
	$('#taskList').on('click', 'a', function(e){
		e.preventDefault();
		var $this = $(this);		
		var li_id = $this.parent()[0].id;
		//getAllSubtasks(li_id).then(function(response){
			removeTask(li_id).then(function(){
				$this.parent().remove();
			});
			//displayNumberTaskComplet(list_task);
			
			
		//});
		
		e.stopPropagation();
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