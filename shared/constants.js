module.exports = {
    APP_URL:
        process.env.NODE_ENV === 'production'
            ? 'https://quick-vue-chat-app.herokuapp.com/'
            : 'http://localhost:3000',
    ROLES: {
        SYSTEM: 'System'
    },
    SOCKET_EVENTS: {
        CONNECTION: 'connection',
        CONNECTION_SUCCESS: 'connect',
        DISCONNECTION: 'disconnect',

        LOGIN: 'add user',
        LOGIN_SUCCESS: 'login success',

        NEW_USER_LOGGED_IN: 'new user loggedin',
        USER_LOGGED_OUT: 'user logged out',

        GET_USERS: 'get users',
        USERNAME_UNAVAILABLE: 'username unavailable',

        NEW_PUBLIC_MESSAGE: 'new public message',
        GET_PUBLIC_MESSAGES: 'get public messages',

        NEW_PRIVATE_MESSAGE: 'new private message',
        GET_PRIVATE_MESSAGES: 'get private messages'
    }
};
