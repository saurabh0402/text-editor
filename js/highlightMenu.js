var prevSelection = '';

function showMenuMouseUp(){
	//console.log("Here i am!");
	var selectedText = window.getSelection();
	if(selectedText.toString() != prevSelection && selectedText.toString()){
		prevSelection = selectedText.toString();
		var selectionPos = window.getSelection().getRangeAt(0).getBoundingClientRect();
		document.getElementsByClassName("selectMenu")[0].style.top = selectionPos.top - 55 + "px";
		document.getElementsByClassName("selectMenu")[0].style.left = (selectionPos.left + selectionPos.width/2) - 95 + "px";
		document.getElementsByClassName("selectMenu")[0].style.display = "inline-block";
	}

	else {
		prevSelection = '';
		document.getElementsByClassName("selectMenu")[0].style.display = "none";
	}
}

function showMenuKeyUp(){
	//console.log("Here i am!");
	var selectedText = window.getSelection();
	if(selectedText.toString()){
		prevSelection = selectedText.toString();
		document.getElementsByClassName("selectMenu")[0].style.display = "inline-block";
		var selectionPos = window.getSelection().getRangeAt(0).getBoundingClientRect();
		document.getElementsByClassName("selectMenu")[0].style.top = selectionPos.top - 55 + "px";
		document.getElementsByClassName("selectMenu")[0].style.left = (selectionPos.left + selectionPos.width/2) - 95 + "px";
		document.getElementsByClassName("selectMenu")[0].style.display = "inline-block";
	}

	else {
		document.getElementsByClassName("selectMenu")[0].style.display = "none";
		prevSelection = '';
	}
}

document.getElementsByClassName("editorCont")[0].addEventListener("mouseup", showMenuMouseUp);
document.getElementsByClassName("editorCont")[0].addEventListener("keyup", showMenuKeyUp);

document.getElementsByClassName("bold")[0].addEventListener("click", function(){
	document.execCommand('bold');
	this.blur();
});

document.getElementsByClassName("underline")[0].addEventListener("click", function(){
	document.execCommand('underline');
});

document.getElementsByClassName("red")[0].addEventListener("click", function(){
	document.execCommand('forecolor', false, 'red');
});

document.getElementsByClassName("black")[0].addEventListener("click", function(){
	document.execCommand('forecolor', false, 'black');
});