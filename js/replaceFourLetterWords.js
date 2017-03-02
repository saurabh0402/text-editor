
// JSONP callback needs to be gloabl
var aWordLoaded;

(function(){
	var countWordsReplaced;
	let wordsToReplace;
	function loadAWord(){
		var p = document.createElement('script');
		p.src = 'http://www.setgetgo.com/randomword/get.php?callback=aWordLoaded';
		document.getElementsByTagName("head")[0].appendChild(p);
	}

	// Create callbacks that send requests to link n times
	// to generate n random words
	function createCallack(n){
		var count = 0;
		return function(word){
			wordsToReplace.push(word.Word);
			++count;
			if(count < n){
				loadAWord();
			}
			else {
				countWordsReplaced = 0;
				replaceWords(document.getElementsByClassName("editorCont")[0]);
				var temp = document.getElementsByClassName("done")[0];
				temp.className = "done";
				temp.disabled = false;
				document.getElementsByClassName("loader")[0].className = "loader hidden";
			}
		}
	}

	function replaceWords(elem){
		elem = elem.firstChild;
		while(elem){
			if(elem.nodeType == 3){
				var text = elem.textContent
				var res = text.replace(/\b\w\w\w\w\b/ig, function(){
					return wordsToReplace[countWordsReplaced++];
				});
				elem.textContent = res;
			}

			else if(elem.nodeType == 1){
				replaceWords(elem);
			}

			elem = elem.nextSibling;
		}
	}

	function replaceFourLetterWords(){
		var text = document.getElementsByClassName("editorCont")[0].innerText;
		var regexFourLetterWord = /\b\w\w\w\w\b/ig;
 
		// Count the number of 4 letter words
		let aWord, count = 0; 
		while((aWord = regexFourLetterWord.exec(text)) !== null){
			++count;
		}

		if(count != 0){
			wordsToReplace = [];
			document.getElementsByClassName("done")[0].className = "done disabled";
			document.getElementsByClassName("done")[0].disabled = true;
			document.getElementsByClassName("loader")[0].className = "loader visible";
			aWordLoaded = createCallack(count);
			loadAWord();
		}
	}

	document.getElementsByClassName("done")[0].addEventListener("click", function(){
		if(document.getElementById("replaceCheck").checked){
			replaceFourLetterWords();
		}
	});
})();


