//(function($){
	
	//function for create a li element and add it to ul element list of task
	function liSubtaskFactory(subtask){		
		let del = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">';
		del += '<path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>';
		del += '</svg>';
        var liElt, check;
        
		if(subtask.done){
			 liElt = '<li id="'+ subtask.id+'" class="task-done">';
			 check = '<input class="form-check-input " type="checkbox" checked >';
		}else{
			 liElt = '<li id="'+ subtask.id+'">';
			 check = '<input class="form-check-input " type="checkbox" >';
		}	
		
		//liElt += '<span class="name">';
		liElt += check;
		liElt += subtask.name;
		liElt += '<a href="#">'+del+'</a><br/>';
		liElt += '</li>';

		$('ul').append(liElt);
	}

	//to display a subtask list from task
	function subtaskHtmlContent(task){
		$('ul').html('');
		$('#back').show();
		//$('ul').attr('id','subtaskList');
		$('h1').text(task.name);
		$('h1').attr('id',task.id);

		$('#formTask').hide();
		$('#formSubtask').show();

		$('#taskList').hide();
		$('#subtaskList').show();

		if(task.subtask.length > 0){
			$.each(task.subtask, function(index,subtask){
				liSubtaskFactory(subtask);
			});
		}
	}

	function percentage_cal(id_task){
		let task = getTask(id_task);
		if(task != null){
			let percent = (task.numberSubtaskRealize * 100)/task.numberSubtask;
			task.percentComplete = percent;
			if(task.percentComplete == 100){
				task.complete = true;
			}else{
				task.complete = false;
			}
		}
	}

	function numberSubtaskRealizeCal(id_task){
		var task = getTask(id_task);
		task.numberSubtaskRealize = 0;
		$.each(task.subtask, function(index,task_result){
			if(task_result.done == true){				
				task.numberSubtaskRealize ++;
			}
		});
		console.log(task);
	}

	$('#formSubtask').on('submit', function(e){
		e.preventDefault();
		let id_task = $('h1').attr('id');
		let nameSubtask = $('#subtaskName').val();
		let subtask = addSubtask(id_task,nameSubtask);
		liSubtaskFactory(subtask);
		$('#subtaskName').val('');
	});

	$('#subtaskList').on('click', 'a', function(e){
		e.preventDefault();
		var $this = $(this);
			
			alert('ok');
		
	});

	$('#subtaskList').on('change', 'input', function(){
		var $this = $(this);
		var id_task = $('h1').attr('id');
		$this.parent().toggleClass('task-done');
		var id_subtask = $this.parent()[0].id;
	    
	    var subtask = getSubtask(id_task,id_subtask);
	    
	    if(subtask.done){
	    	subtask.done = false;
	    }else{
	    	subtask.done = true;
	    }	    
	    numberSubtaskRealizeCal(id_task);
		percentage_cal(id_task);
	});
	
//})(jQuery)