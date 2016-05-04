var socket = io();
var room = getQueryVariable('room');
var name = getQueryVariable('name') || 'Guest';

socket.on('connect', function(){
	console.log('Connected to socket.io server!');
	jQuery('.messages').append('<p><strong>' + name + ' joined ' + room + '</strong></p>');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});

});

jQuery('.room-title').text(room);

socket.on('message', function(message){
	
	var timestampMoment = moment.utc(message.timestamp);
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class ="list-group-item"></li>')


	console.log('New message:');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' + timestampMoment.local().format('h:mma') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message);
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
	event.preventDefault();

	var $message = $form.find('input[name=message]')

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});