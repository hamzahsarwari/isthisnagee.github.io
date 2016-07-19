var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
function loadJSON(path, success, error) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.status === 200) {
			if (success) 
				success(JSON.parse(request.responseText));
		} 
		else {
			if (error) 
				error(request);
		}
	};
	request.open("GET", path, true);
	request.send();
}

loadJSON('http://jsonplaceholder.typicode.com/posts/1', 
		function(data) {
		}
		);
