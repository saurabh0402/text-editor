(function(){
	
	var elemBeingDragged;

	function removeParagraphs(e){
		var txt = this.innerText;

		var p = Array.prototype.indexOf.call(document.getElementsByClassName("textIp"), this);
		if(e.keyCode === 8){
			if(!txt.replace('\n', '')){

				// Don't know why but this.previousSibling.focus() was not working
				// So, a way out. This works and passes the focus on to the previous element :)
				document.getElementsByClassName("textIp")[p].focus();
				var that = this;
				setTimeout(function(){
					document.getElementsByClassName("textFieldsCont")[0].removeChild(that.previousElementSibling);
					document.getElementsByClassName("textFieldsCont")[0].removeChild(that);
					getBackToDefaultConfig();
				}, 0);
			}
		}
	}

	function createParagraphOnEnter(){
		// Get text in that paragraph
		var x = this.innerHTML;
		// If the user pressed return key, get it's index
		var indexReturnKey = x.indexOf('<br>');

		// If return key was pressed, indexReturnKey will be some integer other than -1
		if(indexReturnKey != -1){

			// Get text after the enter key.
			var y = x.slice(indexReturnKey + 4);
			// Get text before the enter key.
			x = x.slice(0, indexReturnKey);

			// Remove the text after the enter key from current paragraph
			this.innerHTML = x;

			// Create a new paragraph and put it just after current element.
			// Add appropriate eventListeners to it!
			var div = document.createElement("div");
			div.className = "dragTarget";
			div.addEventListener("drop", paragraphDrop);
			div.addEventListener("dragover", paragraphDragOver);
			div.addEventListener("dragleave", paragraphDragLeave);
			var p = document.createElement("p");
			p.className = "textIp";
			p.contentEditable = true;
			p.draggable = true;
			p.innerHTML = y;
			document.getElementsByClassName("textFieldsCont")[0].insertBefore(p, this.nextSibling);
			document.getElementsByClassName("textFieldsCont")[0].insertBefore(div, p);
			p.focus();
			p.addEventListener("keydown", removeParagraphs);
			p.addEventListener("keydown", keyDownStopP);
			p.addEventListener("dragstart", paragraphDragStart);
		}
	}

	function getBackToDefaultConfig(){
		var x = document.getElementsByClassName("textIp")[0], s = document.getElementsByClassName("textFieldsCont")[0];

		// If outer span does not exist in the editor, create it!
		if(!s){
			s = document.createElement("span");
			s.className = "textFieldsCont";
			s.contentEditable = false;
			this.appendChild(s);
		}
		
		// If the initial paragraph tag does not exist, create it!
		if(!x){
			var div = document.createElement("div");
			div.className = "dragTarget";
			div.addEventListener("drop", paragraphDrop);
			div.addEventListener("dragover", paragraphDragOver);
			div.addEventListener("dragleave", paragraphDragLeave);
			var p = document.createElement("p");
			p.className = "textIp";
			p.contentEditable = true;
			p.draggable = true;
			s.appendChild(div);
			s.appendChild(p);
			p.focus();
			p.addEventListener("keyup", removeParagraphs);
			p.addEventListener("keydown", keyDownStopP);
			p.addEventListener("dragstart", paragraphDragStart);
		}
	}

	function paragraphDragStart(e){
		var crt = document.getElementsByClassName("elementShownWhileDragging")[0];
		crt.innerText = this.innerText;
		e.dataTransfer.setData('elem', this.innerHTML);
		e.dataTransfer.setDragImage(crt, 0, 0);
		elemBeingDragged = this;
	}

	function paragraphDrop(e){
		e.preventDefault();
		this.style.background = "transparent";
		e.dataTransfer.dropEffect = "move";
		var div = document.createElement("div");
		div.className = "dragTarget";
		div.addEventListener("drop", paragraphDrop);
		div.addEventListener("dragover", paragraphDragOver);
		div.addEventListener("dragleave", paragraphDragLeave);
		var p = document.createElement('p');
		p.class = "textIp";
		p.draggable = true;
		p.contentEditable = true;
		p.innerHTML = e.dataTransfer.getData('elem');
		p.addEventListener("dragstart", paragraphDragStart);
		p.addEventListener("keyup", removeParagraphs);
		p.addEventListener("keydown", keyDownStopP);
		document.getElementsByClassName("textFieldsCont")[0].insertBefore(div, e.target);
		document.getElementsByClassName("textFieldsCont")[0].insertBefore(p, e.target);
		document.getElementsByClassName("textFieldsCont")[0].removeChild(elemBeingDragged.previousElementSibling);
		document.getElementsByClassName("textFieldsCont")[0].removeChild(elemBeingDragged);
	}

	function paragraphDragOver(e){
		e.preventDefault();
		this.style.backgroundColor =  '#f2f2f2';
	}

	function paragraphDragLeave(){
		this.style.background = "transparent";
	}

	function keyDownStopP(e){
		if(e.keyCode == 13){
			e.preventDefault();
			document.execCommand('insertHTML', false, '<br>');
			createParagraphOnEnter.call(this);
		}

		else if(e.keyCode == 9){
			e.preventDefault();
			document.execCommand('insertText', false, '\t');
		}

	}

	function init(){
		document.getElementsByClassName("textIp")[0].addEventListener("dragstart", paragraphDragStart);
		document.getElementsByClassName("dragTarget")[0].addEventListener("drop", paragraphDrop);
		document.getElementsByClassName("dragTarget")[0].addEventListener("dragover", paragraphDragOver);
		document.getElementsByClassName("dragTarget")[0].addEventListener("dragleave", paragraphDragLeave);
		document.getElementsByClassName("dragTarget")[1].addEventListener("drop", paragraphDrop);
		document.getElementsByClassName("dragTarget")[1].addEventListener("dragover", paragraphDragOver);
		document.getElementsByClassName("dragTarget")[1].addEventListener("dragleave", paragraphDragLeave);
		document.getElementsByClassName("textIp")[0].addEventListener("keyup", removeParagraphs, false);

		document.getElementsByClassName("editorCont")[0].addEventListener("focus", function(e){
			// Container is also editable. So, when it receives focus, blur it so that user cannot write in it
			this.blur();
		});

		// When enter key is pressed we need to prevent the default behaviour of browser to add <div><br></div>
		// We appned a single <br> tag and call function to create new paragraph!
		document.getElementsByClassName("textIp")[0].addEventListener("keydown", keyDownStopP, false);

		document.getElementsByClassName("editorCont")[0].addEventListener("input", getBackToDefaultConfig, false);
	}

	window.onload = function(){
		document.getElementsByClassName("textIp")[0].focus();
		init();
	}

})();