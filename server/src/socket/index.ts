import { Server, Socket } from "socket.io";
const log = console.log;

export default (httpServer: any) => {
    const io = new Server(httpServer);

    io.on("connection", (socket: Socket) => {
        log('User connected: ', socket.id);
        
        socket.on('playerMove', (msg: any) => {
            log('playerMove:', msg)
        })
        
        socket.on('disconnect', () => {
            log('User disconnected: ', socket.id)
        })
    });
    return io;
}
