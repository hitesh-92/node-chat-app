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



});



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
});
