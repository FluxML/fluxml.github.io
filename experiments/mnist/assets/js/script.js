var editor, result;

// initial setup
function __init__(){
	editor = new Editor(document.querySelector("#editor"));
	editor.setUp();

	result = new Result(document.querySelector("#result"));
	result.setUp();

	document.querySelector("#clearEditor").addEventListener('click', function(){
		editor.clear();
	});

	model = new Model(editor, result, model);
}
