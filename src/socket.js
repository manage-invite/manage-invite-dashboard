import io from 'socket.io-client';

export const socket = io(process.env.REACT_APP_SOCKET_URL);
export const ensureSocketConnected = () => (!socket.connected ? new Promise((resolve) => socket.on('connect', resolve())) : new Promise((resolve) => resolve()));
