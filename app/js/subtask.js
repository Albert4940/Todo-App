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

	function displayNumberSubtaskComplet(task){
		//var task = getTask(id_task);
		var numberSubtaskComplete = 0;
		//if(task != null){
		$.each(task, function(index,subtask){
				if(subtask.done){
					numberSubtaskComplete ++;
				}
			});		
		//}
		
		$('p').text(task.length + ' Subtask '+ numberSubtaskComplete + ' Complete');
	}

	//to display a subtask list from task
	function subtaskHtmlContent(id_task,taskName, listSubtask){
		$('#subtaskList').html('');
		$('#back').show();
		//$('ul').attr('id','subtaskList');
		$('h1').text(taskName);
		$('h1').attr('id',id_task);

		displayNumberSubtaskComplet(listSubtask);

		$('#formTask').hide();
		$('#formSubtask').show();

		$('#taskList').hide();
		$('#subtaskList').show();

		if(listSubtask.length > 0){
			$.each(listSubtask, function(index,subtask){
				liSubtaskFactory(subtask);
			});
		}
	}


	function percentage_cal(task){
		
		if(task != null){
			let percent = Math.round((task.numberOfSubtaskRealized * 100)/task.numberOfSubtask);
			task.percentComplete = percent;
			if(task.percentComplete == 100){
				task.complete = true;
			}else{
				task.complete = false;
			}
			updateTask(task).then(function(){});
		}
	}

	function numberSubtaskRealizedCal(id_task){
		
		getAllSubtasks(id_task).then(function(data){
			var numberOfSubtaskRealized = 0;
			data.forEach(function(subtask){
			if(subtask.done == true){				
				numberOfSubtaskRealized ++;
			}
			getTask(id_task).then(function(data){
				data.numberOfSubtaskRealized = numberOfSubtaskRealized;
				updateTask(data).then(function(){
					percentage_cal(data);
				});
			})
		});
		})
	}

	// Add Subtask
	$('#formSubtask').on('submit', function(e){
		e.preventDefault();
		let id_task = $('h1').attr('id');
		let nameSubtask = $('#subtaskName').val();

		addSubtask(id_task,nameSubtask).then(function(data){
			liSubtaskFactory(data);
		});

		getAllSubtasks(id_task).then(function(data){

			displayNumberSubtaskComplet(data);
		});
		
		getTask(id_task).then(function(data){
			percentage_cal(data);
		});
		$('#subtaskName').val('');
	});

	
	//Delete a subtask
	$('#subtaskList').on('click', 'a', function(e){
		e.preventDefault();
		var $this = $(this);
		
		var id_subtask = $this.parent()[0].id;
		var id_task = $('h1').attr('id');

		getSubtask(id_task,id_subtask).then(function(data){
			removeSubtask(id_task,id_subtask).then(function(){
				getTask(id_task).then(function(response){
					if(response.numberOfSubtask >= 0){
						response.numberOfSubtask = response.numberOfSubtask - 1;
					}
					if (data.done && response.numberOfSubtaskRealized >= 0) {
						response.numberOfSubtaskRealized = response.numberOfSubtaskRealized - 1;
					}
					updateTask(response).then(function(){
						percentage_cal(response);
					});
				});
				$this.parent().remove();
			});
		});

		/*removeSubtask(id_task, id_subtask).then(function(){
			getSubtask(id_task,id_subtask).then(function(data){
			getTask(id_task).then(function(response){
				if()
				response.numberOfSubtask = data.length;
				updateTask(response).then(function(){});
			});
		});
			$this.parent().remove();			
		});*/



		getAllSubtasks(id_task).then(function(data){
			displayNumberSubtaskComplet(data);
		});
		e.stopPropagation();		
	});

	$('#subtaskList').on('change', 'input', function(){
		var $this = $(this);
		var id_task = $('h1').attr('id');
		$this.parent().toggleClass('task-done');
		var id_subtask = $this.parent()[0].id;
	    
	        getSubtask(id_task,id_subtask).then(function(subtask){
	    	 if(subtask.done){
	    	   subtask.done = false;
	          }else{
	    	   subtask.done = true;
	        }	
	        updateSubtask(subtask).then(function(){
	        	numberSubtaskRealizedCal(subtask.id_task);
	        });

	        getAllSubtasks(id_task).then(function(data){
	        	displayNumberSubtaskComplet(data);
	        })
	    });    
		//displayNumberSubtaskComplet(id_task);
	});
	
//})(jQuery)