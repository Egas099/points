import io, { Socket } from 'socket.io-client';
import { SERVER_URL } from '../data/constants';
let socket: Socket | undefined;

export const init = () => {
    socket = io(SERVER_URL);
    console.log('инициализирован');

    socket.on('connect', () => {
        console.log('подключился');
    });
    socket.on('disconnect', () => {
        console.log('отключился');
    });
    return socket;
};
export const emit = (event: string, data: any) => {
    socket && socket.emit(event, data);
};

export default socket;
