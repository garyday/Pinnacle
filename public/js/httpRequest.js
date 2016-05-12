function sendDeleteRequest(token, jobId) {
	console.log('IN REQUEST');
	var http = new XMLHttpRequest();
	var url = "./jobs/" + jobId + "?token=" + token;
	//var params = JSON.stringify({ token: token });
	http.open("DELETE", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() { //Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}
	http.send();
}

function sendUserDeleteRequest(token, jobId) {
	var http = new XMLHttpRequest();
	var url = "./users/" + jobId + "?token=" + token;
	//var params = JSON.stringify({ token: token });
	http.open("DELETE", url, true);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	http.onreadystatechange = function() { //Call a function when the state changes.
		if (http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}
	http.send();
}