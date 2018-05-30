
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:5000/test');

export const subscribeToNotifications = () => {
    window.socket = socket;
    socket.on('response', (msg) => console.log(msg));
};