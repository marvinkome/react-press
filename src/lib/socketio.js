import openSocket from 'socket.io-client';
import { url } from '../keys/api';

const Socket = () => {
    let socket;
    return {
        connect: (token) => {
            socket = openSocket(url, {
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            Authorization: 'Bearer ' + token
                        }
                    }
                }
            });
        },
        recieve_notification: (cb) => socket.on('notifications', (msg) => cb(msg)),
        read_all_notifications: () => socket.emit('read notifications'),
        disconnect: () => socket.disconnect()
    };
};

export default Socket;
