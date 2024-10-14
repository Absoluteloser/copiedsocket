// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const chatRoutes = require('./routes/chat');
// const path = require('path');

// require('dotenv').config();

// // Connect to MongoDB
// connectDB();

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(cors());
// app.use(express.json());
// app.use('/api/chat', chatRoutes);
// app.use(express.static(path.resolve(__dirname, 'public')));
// // app.use(express.static('public'));
// // Socket.IO configuration
// io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('sendMessage', (message) => {
//         io.emit('receiveMessage', message);
//     });

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


// const express = require('express');
// const app = express();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// const path = require('path');

// app.use(express.static(path.resolve(__dirname, 'public')));

// server.listen(5000, () => {
//   console.log('Server listening on port 5000');
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle incoming messages from the client
//   socket.on('message', (data) => {
//     console.log('Received message:', data);

//     // Broadcast the message to all connected clients
//     io.emit('message', data);
//   });

//   // Handle disconnections
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });


const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

let users = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User  joined room ${roomId}`);
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`User  left room ${roomId}`);
  });

  socket.on('chatMessage', (message) => {
    console.log(`Received message: ${message}`);
    io.emit('newMessage', message);
  });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});