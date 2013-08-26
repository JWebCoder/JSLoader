var JSLoader = {
	loadfile: function(items){
		var counter = items.length;
		alert(items);
		var next = 0;
		for(var i = 0; i < items.lenght; i++){
			fileName = items[i].fileName;
			fileType = items[i].fileType;
			alert(fileName);
			alert(fileType);
			if(this.checkIfLoaded(fileName,fileType)){
				var fileRef = undefined;
				if (fileType=="js"){
					var script = undefined;
					script = document.createElement('script');
					script.setAttribute("type","text/javascript");
					script.setAttribute("src", fileName);
					script.onreadystatechange = script.onload = function() {
						alert(counter + " " + next);
						next++;
					};
					fileRef.push(script);
				}
				else if (fileType=="css"){
					var script = undefined;
					script = document.createElement("link");
					script.setAttribute("rel", "stylesheet");
					script.setAttribute("type", "text/css");
					script.setAttribute("href", fileName);
				}
				if (typeof fileRef!="undefined"){
					document.getElementsByTagName("head")[0].appendChild(fileRef);
				}
			}
		}
	},
	checkIfLoaded: function(fileName,fileType){
		if (fileType=="js"){
			var elems = document.getElementsByTagName('script'), i;
			for (i=0; i<elems.length; i++) {
				if ((elems[i].getAttribute("src") + "").indexOf(fileName) > -1) {
				    return false;
				}
			}
		}
		else if (fileType=="css"){
			var elems = document.getElementsByTagName('link'), i;
			for (i=0; i<elems.length; i++) {
				if ((elems[i].getAttribute("href") + "").indexOf(fileName) > -1) {
				    return false;
				}
			}
		}
		return true;
	}
}

var JSLoader = {
	loadfile: function(items,callback){
		var counter = items.length;
		var next = 0;
		for(var i = 0; i < items.length; i++){
			var fileName = items[i].fileName;
			var fileType = items[i].fileType;
			var script = undefined;
			if(this.checkIfLoaded(fileName,fileType)){
				if (fileType=="js"){
					script = document.createElement('script');
					script.setAttribute("type","text/javascript");
					script.setAttribute("src", fileName);
					if(callback){
						script.onreadystatechange = script.onload = function() {
							next++;
							if(counter == next){
								callback();
							}
						};
					}
				}
				else if (fileType=="css"){
					var script = undefined;
					script = document.createElement("link");
					script.setAttribute("rel", "stylesheet");
					script.setAttribute("type", "text/css");
					script.setAttribute("href", fileName);
				}
				if (typeof script!="undefined"){
					document.getElementsByTagName("head")[0].appendChild(script);
				}
			}
		}
	},
	checkIfLoaded: function(fileName,fileType){
		if (fileType=="js"){
			var elems = document.getElementsByTagName('script'), i;
			for (i=0; i<elems.length; i++) {
				if ((elems[i].getAttribute("src") + "").indexOf(fileName) > -1) {
				    return false;
				}
			}
		}
		else if (fileType=="css"){
			var elems = document.getElementsByTagName('link'), i;
			for (i=0; i<elems.length; i++) {
				if ((elems[i].getAttribute("href") + "").indexOf(fileName) > -1) {
				    return false;
				}
			}
		}
		return true;
	},
	onLoad:function(fn){
		if (window.attachEvent) {
		    window.attachEvent('onload', function() { fn(); });
		} else {
		    if (window.onload) {
		        var curronload = window.onload;
		        var newonload = function() {
		            curronload();
		            fn();
		        };
		        window.onload = newonload;
		    } else {
		        window.onload = function() { fn(); };
		    }
		}
	}
}
