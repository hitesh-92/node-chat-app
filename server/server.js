const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 5050;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));


// publicPath. the path to the dir is cleaner and cross-os friendly
// console.log(__dirname + '/../public');
// C:\Users\Hitesh\Desktop\Code\webDev\Back-end\NodeJs\Udemy-course\socketIO\node-chat-app\server/../public
console.log(publicPath);
// C:\Users\Hitesh\Desktop\Code\webDev\Back-end\NodeJs\Udemy-course\socketIO\node-chat-app\public

app.listen(port, () => {
  console.log(`\nRunning Express - port:${port}\n`);
});
