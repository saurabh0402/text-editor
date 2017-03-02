
(function(){
	function showLinksInText(){
		// This regular expression catches any a tag. href attribute is compulsory
		var detectA = /<a(\s*(?:href\s*=\s*['"]?([a-zA-Z0-9:./]+)['"]?))?[^>]*>([\w\W]+?)<\/a>/ig;
		var a = document.getElementsByClassName("editorCont")[0].innerText;

		let links = document.getElementsByClassName("links")[0];
		links.innerHTML = "";

		// Show all the elements to the user!
		while((p = detectA.exec(a)) !== null){
			let qwer = document.createElement("a");
			qwer.href = p[2] || "#";
			qwer.target = "__blank";
			qwer.innerText = p[3];
			links.appendChild(qwer);
			links.className = "links shownMe";
		}
	}

	document.getElementsByClassName("done")[0].addEventListener("click", showLinksInText);

})();