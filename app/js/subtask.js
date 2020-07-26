//(function($){
	//
	/*function htmlContent(task){
		$('#title').text(task.name);
		//alert(task.id);
		//for(let i = 0; i < task.subtask.length; i++){
			//$('#subtaskList').append('<li');
		//}
	}*/

	$('#formSubtask').on('submit', function(e){
		e.preventDefault();
		let name = $('#taskName').val();
		let id_task = $('h1').attr('id');
		alert(id_task);
	});

	$('#formSubTask').on('submit', function(e){
		e.preventDefault();
		alert('ok');
	});

	$('#list').on('change', 'input', function(){
		var $this = $(this);
		//alert('ok');
		$this.parent().toggleClass('task-done');
	});
	/*$('#list').on('click','li', function(e){
		e.preventDefault();
		$('#app').load('http://localhost/jquery/todo/html/task.html #task');
		alert($('#title').text());
		let $this = $(this);
		let id = $this.attr('id');
		var task = getTask(id);
		//alert(task.name);
		//htmlContent(task);
	});*/
//})(jQuery)