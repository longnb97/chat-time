const http = require('http');
const express = require('express'),
  app = module.exports.app = express();

const PORT = process.env.PORT || 5000;
let server = http.createServer(app);

const io = require('socket.io').listen(server);  //pass a http.Server instance

const path = require('path');
const INDEX = path.join(__dirname, 'index.html');

const cors = require('cors');

app.use(cors());

server.listen(PORT, console.log(`Server listening at ${PORT}`));
// WARNING: app.listen(80) will NOT work here!

io.on('connection', function (socket) {
  console.log(`${socket.id}:  Đã kết nối`)
  socket.on('disconnect', () => console.log(`Hủy kế nối :  ${socket.id}`))
  socket.on('userMessage', (data) => {
    socket.broadcast.emit('message-sender', data)
  });
  setInterval(function(){
    socket.emit('sleepy', "doSomeThingFunny!")
  },1000*60*60)
  socket.on('stayWithMe', (data) => console.log(data))
});

app.get('/', home);

function home(req, res) {
  res.sendFile(INDEX);
}


// const express = require('express');
// const socketIO = require('socket.io');
// const path = require('path');

// const PORT = process.env.PORT || 3000;
// const INDEX = path.join(__dirname, 'index.html');

// const server = express()
//   .use((req, res) => res.sendFile(INDEX) )
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// const io = socketIO(server);

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));
// })