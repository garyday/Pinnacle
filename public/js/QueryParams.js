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

//User Admin
function moveUA(token) {
	window.location.href = '../api/users?token=' + token;
}

//User Admin
function moveJob(token) {
	window.location.href = '../api/jobs?token=' + token;
}

//Edit Job
function moveEJ(token, id) {
	window.location.href = '../api/jobs/' + id + '?token=' + token;
}

//Add Job
function moveAJ(token, id) {
	window.location.href = '../api/jobs/add' + '?token=' + token;
}

//Add User
function moveAU(token, id) {
	window.location.href = '../api/users/add' + '?token=' + token;
}

//Edit User
function moveEU(token, id) {
	window.location.href = '../api/users/' + id + '?token=' + token;
}

//Reports
function moveReports(token) {
	window.location.href = '../api/reports?token=' + token;
}
