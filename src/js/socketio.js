import openSocket from 'socket.io-client';

export const Socket = (token) => {
    const socket = openSocket('http://localhost:5000', {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: 'Bearer ' + token
                }
            }
        }
    });

    window.socket = socket;

    return {
        checkForAllNotifications: (cb) => socket.on('notifications', (msg) => cb(msg)),
        onNewNotification: (cb) => socket.on('new notification', (msg) => cb(msg))
    };
};
