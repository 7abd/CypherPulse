import socketIo from 'socket.io';

export default (io: socketIo.Server) => {
  io.on('connection', (socket: socketIo.Socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.emit('welcome', { message: "Secure Connection Established", status: "online" });
  });
};