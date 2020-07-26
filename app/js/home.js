//(function($){

	//function for create a li element and add it to ul element
	function liTaskFactory(name,task){		
		let del = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">';
		del += '<path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>';
		del += '</svg>';
		let liElt = '<li id="'+ task.id+'">';
		let input = '<input class="form-check-input" type="checkbox">';
		liElt += '<span class="name">';
		liElt += name;
		liElt += '</span>';
		liElt += '<a href="#">'+del+'</a><br/>';
		liElt += '<span>';
		liElt += task.numberSubtask +' Task';
		liElt += '&nbsp&nbsp&nbsp' + task.percentComplete +'% Complete';
		liElt += '</span>';
		liElt += '</li>';
		$('ul').append(liElt);
	}

	//For display list of task and hide a subtask form
	function homeContent(task){
		
		$('#formTask').show();
		$('#formSubtask').hide();

		liTaskFactory(task.name, task);
	}

	//add task at list
	$('#formTask').on('submit', function(e){
		e.preventDefault();
		let name = $('#taskName').val();
		let task = addTask(name);
		liTaskFactory(name,task);
		$('#taskName').val('');
	});
	$('#formSubTask').on('submit', function(e){
		e.preventDefault();
		alert('ok');
	});

	//Delete a task
	$('#list').on('click', 'a', function(e){
		e.preventDefault();
		var $this = $(this);
		$this.parent().remove();
	});
	
	$('#list').on('change', 'input', function(){
		var $this = $(this);
		//alert('ok');
		$this.parent().toggleClass('task-done');
	});

	//
	function htmlContent(task){
		$('h1').text(task.name);
		$('h1').attr('id',task.id);
		$('form').attr('id','formSubtask');
		$('ul').html('');
		$('ul').attr('id','subtaskList');
		//alert(task.id);
		//for(let i = 0; i < task.subtask.length; i++){
			//$('#subtaskList').append('<li');
		//}
	}

	$('#list').on('click','li', function(e){
		e.preventDefault();
		//$('#app').load('http://localhost/jquery/todo/html/task.html #task');
		let $this = $(this);
		let id = $this.attr('id');

		var task = getTask(id);
		//alert(task.name);
		htmlContent(task);
	});
//})(jQuery)