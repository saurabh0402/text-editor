
(function(){
	function showLinksInText(){
		// This regular expression catches any a tag. href attribute is compulsory
		var detectA = /<a(\s*(?:href\s*=\s*['"]?([a-zA-Z\-0-9:./]+)['"]?))?[^>]*>([\w\W]+?)<\/a>/ig;
		var a = document.getElementsByClassName("editorCont")[0].innerText;

		var links = document.getElementsByClassName("links")[0];
		var count = 0;
		links.innerHTML = "";

		// Show all the elements to the user!
		while((p = detectA.exec(a)) !== null){
			++count;
			var anchor = document.createElement("a");

			if(count%2 == 0){
				anchor.className = "red";
			}

			anchor.href = p[2] || "#";
			anchor.target = "__blank";
			anchor.innerText = p[3];
			links.appendChild(anchor);
			links.className = "links shownMe";
		}
	}

	document.getElementsByClassName("done")[0].addEventListener("click", showLinksInText);

})();