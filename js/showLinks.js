
(function(){
	function showLinksInText(){
		// This regular expression catches any a tag. href attribute is compulsory
		var detectA = /<a(\s*(?:href\s*=\s*['"]?([a-zA-Z0-9:./]+)['"]?))?[^>]*>([\w\W]+?)<\/a>/ig;
		var a = document.getElementsByClassName("editorCont")[0].innerText;

		let links = document.getElementsByClassName("links")[0];
		links.innerHTML = "";
		var count = 0;

		// Show all the elements to the user!
		while((p = detectA.exec(a)) !== null){
			++count;
			let a = document.createElement("a");

			if(count % 2 == 0) {
				a.className = "red";
			}

			a.href = p[2] || "#";
			a.target = "__blank";
			a.innerText = p[3];
			links.appendChild(a);
			links.className = "links shownMe";
		}
	}

	document.getElementsByClassName("done")[0].addEventListener("click", showLinksInText);

})();