const socketIO = require('socket.io');

// Initialize socket.io server
const initSocketIO = (server) => {
  const io = socketIO(server);

  // Handle socket.io events
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle custom events
    socket.on('chatMessage', (message) => {
      // Broadcast the received message to all connected clients
      io.emit('chatMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });

    // Handle new discussion event
    socket.on('newDiscussion', (newDiscussion) => {
      // Broadcast the new discussion to all connected clients
      io.emit('newDiscussion', newDiscussion);
    });
  });

  return io;
};

module.exports = initSocketIO;
