const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const port = process.env.PORT || 5050;
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

  socket.on('disconnect', () => {
    console.log(`user disconnected`);
  });
});




server.listen(port, () => {
  console.log(`\nRunning Express - port:${port}\n`);
});

// socket.io.js available at
// localhost:5050/socket.io/socket.io.js
