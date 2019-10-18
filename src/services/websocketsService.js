import io from 'socket.io-client';
import constants from '../../shared/constants';

let socket = io(constants.APP_URL, {
    transports: ['websocket'],
    autoConnect: false
});

const isConnected = () => socket.connected;

export default function websocketService() {
    let subscriptions = [];

    return {
        isConnected,

        connect() {
            if (!socket?.connected) {
                socket.open();
            }
        },

        disconnect() {
            if (isConnected) {
                socket.disconnect();
            }
        },

        cleanup() {
            if (subscriptions.length > 0) {
                if (isConnected) {
                    subscriptions.forEach(subscription => {
                        socket.off(...subscription);
                    });
                }
                subscriptions = [];
            }
        },

        off(...args) {
            socket.off(...args);
            subscriptions = subscriptions.filter(sub => sub[1] !== args[1]);
        },

        emit(...args) {
            socket?.emit(...args);
        },

        on(...args) {
            subscriptions.push([...args]);
            socket.on(...args);
        }
    };
}
