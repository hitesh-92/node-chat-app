var socket = io();

//vid120 autoscrolling
function scrollToBottom(){
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    // console.log('shoudl sroll');
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function() {
  console.log(`connected to server`);
  // document.getElementById('status').innerHTML = 'connected';

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
  // document.getElementById('status').innerHTML = 'disconnected';
});

//example - log newEmail from server
// socket.on('newEmail', function(email) {
//   console.log(`new Email`, email);
// });

//vid108 emitting and listening to events
socket.on('newMessage', function(message){
  // msg = `From: ${message.from} | ${message.text} | At: ${message.createdAt}`;
  // document.getElementById('test').innerHTML = msg;
  // console.log(message);

  //template
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  // var template = '<p>testing</p>'
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });


  jQuery('#messages').append(html);

  //autoscrolling
  scrollToBottom()

  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

//vid110
// socket.on('newUser', function(msg) {
  // console.log(`from: ${msg.from} | ${msg.text} | sentAt: ${msg.createdAt}`);
  // console.log(msg);
// });

//vid112 - event acknowledgments
//  socket.emit('createMessage', {
//    from: 'Frank',
//    text: 'Hello'
//  }, function(data){
//    console.log('Got it', data);
// });


//User input form
jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  const messageBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from:'User',
    text: messageBox.val()
  }, function() {
    messageBox.val('');
  });
});

//Geolocation button
var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by browser');
  }

  //disable button when sending location
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    // console.log(position);

    //enable button once location found
    locationButton.removeAttr('disabled').text('Send location');

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    }, function(){
      alert('unable to fetch location');
      //enable button once location found
      locationButton.removeAttr('disabled').text('Send location');
  });
});


//Geolocation
socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');

  //This method prevents any malicious html injections
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);

  // jQuery('#messages').append(li);

  //template
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });
  jQuery('#messages').append(html);

  //autoscrol
  scrollToBottom();
});
