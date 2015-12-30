function enterPress(e) {
	 var keynum;
	 if (window.event) {
		 keynum = e.keyCode;
	 } else {
		 if (e.which) {
			 keynum = e.which;
		 }
	 }
	 if (keynum == 13) {
		 sendText(e);
	 }
}

function sendText(e) {
  var t = document.getElementById("vim").value;
	var a =  document.getElementById("msg");
  if (t == ":help sponsor") {
	  window.open("http://iccf-holland.org");
	  a.innerHTML = "";	
	} else if (t == ":contact") {
	  window.open("http://www.yahoo.com");
	  a.innerHTML = "";	
	} else if (t == ":hire") {
	  window.open("http://isthisnagee.github.io/resume");
	  a.innerHTML = "";	
	} else if (t == ":project") {
    window.open("https://github.com/isthisnagee?tab=repositories");
		a.innerHTML = "";
	} else {
	  a.innerHTML =  t + " is not correct";
	}	
}

function focusPress(e) {
	var keynum;
	 if (window.event) {
		 keynum = e.keyCode;
	 } else {
		 if (e.which) {
			 keynum = e.which;
		 }
	 }
	 if (keynum == 27) {
     document.getElementById("vim").focus();
	 }
}
