const express = require('express');
const socketIO = require('socket.io');
//const io = require('socket.io')(server); //FROM npm DOCS
const path = require('path');
const http = require('http');

const port = process.env.PORT || 5050;
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
// publicPath. the path to the dir is cleaner and cross-os friendly
// console.log(__dirname + '/../public');
// C:\Users\Hitesh\Desktop\Code\webDev\Back-end\NodeJs\Udemy-course\socketIO\node-chat-app\server/../public
// console.log(publicPath);
// C:\Users\Hitesh\Desktop\Code\webDev\Back-end\NodeJs\Udemy-course\socketIO\node-chat-app\public

const app = express();
const server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`new user connected`);

  //example - logs on browser console
  // socket.emit('newEmail', {
  //   from: 'test@email.com',
  //   text: 'email content',
  //   createdAt: 123
  // });

  //vid108 emitting and listening to events
  // socket.emit('newMessage', {
  //   author:'server',
  //   message:'you are now connected',
  //   date: new Date().getTime()
  // });

  //example
  // socket.on('createEmail', (createdEmail) => {
  //   console.log('createEmail', createdEmail);
  // });

  //vid110
  /*
  socket.emit('newUser', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit('newUser', {
    from: 'Admin',
    text: 'New User joined',
    createdAt: new Date().getTime()
  });
  */

  //vid111 generateMessage & test
  socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat App'));
  socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

  //vid108 emitting and listening to events
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    //vid111
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('this is from the server');
    // //send message to everyone, including yourself
    // //from browser console, run: socket.emit('createMessage', {from:'someone', text:'lorem ipsom'})
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

    // // broadcast message. sends message to all everyone connected but yourself
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });





  });//createMessage

  socket.on('disconnect', () => {
    console.log(`user disconnected`);
  });

});




server.listen(port, () => {
  console.log(`\nRunning Express - port:${port}\n`);
});

// socket.io.js available at
// localhost:5050/socket.io/socket.io.js
