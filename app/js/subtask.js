//(function($){
	var id_task ;
	var id_subtask;
	var lis = [];
	var i;
	//function for create a li element and add it to ul element list of task
	function liSubtaskFactory(subtask, index){		
		
		let del = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">';
		del += '<path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>';
		del += '</svg>';
		let update = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">';
  		update += '<path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>';
  		update += '<path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>';
		update += '</svg>';
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
		liElt += '<span id="'+index+'">';
		liElt += subtask.name;
		liElt += '</span>';
		//liElt += '<span class="action">';
		liElt += '<a href="#" style="color:red;" class="delete_subtask" >'+del+'</a>';
		liElt += '<a href="#" style="color:black;" class="update_subtask" >'+update+'</a><br/>';
		//liElt += '</span>';
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
				liSubtaskFactory(subtask, index);
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
		 id_task = $('h1').attr('id');
		let nameSubtask = $('#subtaskName').val();

		addSubtask(id_task,nameSubtask).then(function(data){
			var span_id = Number($('#subtaskList span:last').attr('id')) + 1;
			liSubtaskFactory(data, span_id);
		});

		getAllSubtasks(id_task).then(function(data){

			displayNumberSubtaskComplet(data);
		});
		
		getTask(id_task).then(function(data){
			percentage_cal(data);
		});
		$('#subtaskName').val('');
	});

	//Show update modal and subtaskname
	$('#subtaskList').on('click', '.update_subtask', function(e){
		e.preventDefault();
		var $this = $(this);

		//Get task Id
		id_task = $('h1').attr('id');
	    id_subtask = $this.parents()[0].id;

	    //Get span id, span's subtask name
	    i = $('#'+id_subtask+' span')[0].id;
	    $('#subtaskList>#'+id_subtask+'>'+i).text('ll');
	    var text = $('#'+id_subtask+' span')[0].innerHTML;
	    
	    console.log('i=>'+i+' text=>'+$('#'+id_subtask+' span').text());
	   //var i = $('#'+id_subtask).children('span').id;
	   		$('#change_subtask_input').val(text);
	   		//console.log('i=>'+i);
	    	$('#change-subtask-modal').modal('show');
	});
	
	//Update task name
	$('#change_subtask_button').on('click', function(e){
		e.preventDefault();
		var newSubtaskName = $('#change_subtask_input').val();
		id_task = $('h1').attr('id');
		//$('#change-subtask-modal').modal('hide');
		getSubtask(id_task, id_subtask).then(function(data){
			data.name = newSubtaskName;
			updateSubtask(data).then(function(){
				$('#'+id_subtask+' span').text(newSubtaskName);
				$('#change-subtask-modal').modal('hide');
			});
		});
	});


	//Show Delete Modal a subtask
	var $this;
	$('#subtaskList').on('click', '.delete_subtask', function(e){
		e.preventDefault();
		 $this = $(this);
		id_subtask = $this.parents()[0].id;
			$('#delete-subtask-modal').modal('show');	
	});

	//Delete a task
	$('#delete_subtask_button').on('click', function(e){
		 id_task = $('h1').attr('id');
		 
		 console.log('id1=>'+id_task+' id2=>'+id_subtask)
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
				$this.parents()[0].remove();
				$('#delete-subtask-modal').modal('hide');
			});
		});

		getAllSubtasks(id_task).then(function(data){
			displayNumberSubtaskComplet(data);
		});
		e.stopPropagation();
	});

	//Check and uncheck a subtask
	$('#subtaskList').on('change', 'input', function(){
		var $this = $(this);
		 id_task = $('h1').attr('id');
		$this.parent().toggleClass('task-done');
	   id_subtask = $this.parent()[0].id;
	    
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