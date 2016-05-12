function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1].replace(/\+/g, ' '));
		}
	}

	return undefined;
}

function moveUA(token) {
	window.location.href = '../api/users?token=' + token;
}

function moveEJ(token, id) {
	window.location.href = '../api/jobs/' + id + '?token=' + token;
}

function moveAJ(token, id) {
	window.location.href = '../api/jobs/add' + '?token=' + token;
}

function moveAU(token, id) {
	window.location.href = '../api/users/add' + '?token=' + token;
}

function moveEU(token, id) {
	window.location.href = '../api/users/' + id + '?token=' + token;
}
