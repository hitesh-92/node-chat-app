var socket = io();

socket.on('connect', function() {
  console.log(`connected to server`);
  document.getElementById('status').innerHTML = 'connected';

  // example - logs to terminal
  // socket.emit('createEmail', {
  //   to: 'user@email.com',
  //   text: 'new email from the client'
  // });

  //vid108 emitting and listening to events
  // socket.emit('createMessage', {
  //   from: 'CLIENT browser',
  //   text: 'this is from index.js!'
  // });

});//connect



socket.on('disconnect', function() {
  console.log(`disconnected from server`);
  document.getElementById('status').innerHTML = 'disconnected';
});

//example - log newEmail from server
// socket.on('newEmail', function(email) {
//   console.log(`new Email`, email);
// });

//vid108 emitting and listening to events
socket.on('newMessage', function(message){
  msg = `From: ${message.from} | ${message.text} | At: ${message.createdAt}`;
  document.getElementById('test').innerHTML = msg;
  console.log(msg);

  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

//vid110
socket.on('newUser', function(msg) {
  // console.log(`from: ${msg.from} | ${msg.text} | sentAt: ${msg.createdAt}`);
  console.log(msg);
});

//vid112 - event acknowledgments
 socket.emit('createMessage', {
   from: 'Frank',
   text: 'Hello'
 }, function(data){
   console.log('Got it', data);
});


jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    from:'User',
    text: jQuery('[name=message]').val()
  }, function() {

  });
});
