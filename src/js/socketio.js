import openSocket from 'socket.io-client';

const Socket = () => {
    let socket;
    return {
        connect: (token) => {
            socket = openSocket('http://localhost:5000', {
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
