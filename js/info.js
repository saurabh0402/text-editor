(function(){

	var info = document.getElementsByClassName("info")[0],
		crossButton = document.getElementsByClassName("crossButton")[0],
		infoHead = document.getElementsByClassName("infoHead")[0],
		allInfo = document.getElementsByClassName("allInfo")[0];

	document.getElementsByClassName("infoButton")[0].addEventListener("click", function(){
		info.className = "info visible";
		setTimeout(function(){
			crossButton.className = "crossButton visible";
			infoHead.className = "infoHead visible";
			allInfo.className = "allInfo visible";
		}, 400);
	});

	crossButton.addEventListener("click", function(){
		this.className = "crossButton hidden";
		infoHead.className = "infoHead hidden";
		allInfo.className = "allInfo hidden";
		setTimeout(function(){
			info.className = "info hidden";	
		}, 300);
	});
})();