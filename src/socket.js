import io from 'socket.io-client';

export const socket = io(process.env.REACT_APP_API_URL);
export const ensureSocketConnected = () => {
    const connected = socket.connected && socket.id;
    console.log(`[?] WS: Connected: ${socket.connected}. ID: ${socket.id}`);
    return connected ? new Promise((resolve) => resolve()) : new Promise((resolve) => socket.on('connect', () => resolve()));
};
