const socketio = require('socket.io');
const constants = require('../shared/constants.js');

const { SOCKET_EVENTS, ROLES } = constants;

module.exports = server => {
    const io = socketio.listen(server);

    const connectedUsers = {};
    const messages = [];

    const usernameExists = username =>
        ~Object.values(connectedUsers).indexOf(username);
    const socketIdExists = socketId =>
        ~Object.keys(connectedUsers).indexOf(socketId);

    const findSocketIdByUsername = username => {
        const index = Object.values(connectedUsers).findIndex(
            u => u === username
        );

        return Object.keys(connectedUsers)[index];
    };

    io.on(SOCKET_EVENTS.CONNECTION, socket => {
        socket.emit(SOCKET_EVENTS.CONNECTION_SUCCESS);

        socket.on(SOCKET_EVENTS.LOGIN, username => {
            if (usernameExists(username)) {
                socket.emit(SOCKET_EVENTS.USERNAME_UNAVAILABLE);
            } else {
                connectedUsers[socket.id] = username;
                socket.emit(SOCKET_EVENTS.LOGIN_SUCCESS, username);
                socket.broadcast.emit(
                    SOCKET_EVENTS.GET_USERS,
                    Object.values(connectedUsers)
                );

                socket.broadcast.emit(SOCKET_EVENTS.NEW_PUBLIC_MESSAGE, {
                    from: ROLES.SYSTEM,
                    public: true,
                    message: `${username} joined the channel.`
                });
            }
        });

        socket.on(SOCKET_EVENTS.DISCONNECTION, () => {
            if (socketIdExists(socket.id)) {
                socket.broadcast.emit(SOCKET_EVENTS.NEW_PUBLIC_MESSAGE, {
                    from: 'System',
                    public: true,
                    message: `${connectedUsers[socket.id]} left the channel.`
                });
                delete connectedUsers[socket.id];

                socket.broadcast.emit(
                    SOCKET_EVENTS.GET_USERS,
                    Object.values(connectedUsers)
                );
            }
        });

        socket.on(SOCKET_EVENTS.GET_USERS, () => {
            io.emit(SOCKET_EVENTS.GET_USERS, Object.values(connectedUsers));
        });

        socket.on(SOCKET_EVENTS.NEW_PUBLIC_MESSAGE, message => {
            const messageObject = {
                message,
                from: connectedUsers[socket.id],
                public: true
            };
            messages.push(messageObject);
            io.emit(SOCKET_EVENTS.NEW_PUBLIC_MESSAGE, messageObject);
        });

        socket.on(SOCKET_EVENTS.NEW_PRIVATE_MESSAGE, message => {
            const socketId = findSocketIdByUsername(message.to);
            const messageObject = {
                ...message,
                from: connectedUsers[socket.id],
                public: false
            };
            messages.push(messageObject);
            io.to(`${socketId}`).emit(
                SOCKET_EVENTS.NEW_PRIVATE_MESSAGE,
                messageObject
            );
            if (socketId !== socket.id) {
                socket.emit(SOCKET_EVENTS.NEW_PRIVATE_MESSAGE, messageObject);
            }
        });

        socket.on(SOCKET_EVENTS.GET_PUBLIC_MESSAGES, () => {
            socket.emit(
                SOCKET_EVENTS.GET_PUBLIC_MESSAGES,
                messages.filter(m => m.public)
            );
        });

        socket.on(SOCKET_EVENTS.GET_PRIVATE_MESSAGES, from => {
            socket.emit(
                SOCKET_EVENTS.GET_PRIVATE_MESSAGES,
                messages.filter(
                    m =>
                        (m.from === from &&
                            m.to === connectedUsers[socket.id]) ||
                        (m.to === from && m.from === connectedUsers[socket.id])
                )
            );
        });
    });
};
