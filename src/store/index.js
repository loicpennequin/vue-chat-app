import Vue from 'vue';
import Vuex from 'vuex';
import {
    LOGIN,
    LOGOUT,
    CHANGE_WINDOW,
    SET_MESSAGES,
    SET_USERS,
    NEW_MESSAGE
} from '@/store/mutations.types.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authenticated: false,
        currentUser: '',
        currentWindow: 'public',
        currentMessages: [],
        connectedUsers: []
    },

    mutations: {
        [LOGIN](state, username) {
            state.authenticated = true;
            state.currentUser = username;
        },

        [LOGOUT](state) {
            Object.assign(state, {
                authenticated: false,
                currentUser: '',
                currentWindow: 'public',
                currentMessages: [],
                connectedUsers: []
            });
        },

        [CHANGE_WINDOW](state, windowId) {
            state.currentWindow = windowId;
        },

        [SET_MESSAGES](state, messages) {
            state.currentMessages = messages;
        },

        [SET_USERS](state, users) {
            state.connectedUsers = [
                ...new Set([...state.connectedUsers, ...users])
            ];
        },

        [NEW_MESSAGE](state, message) {
            if (message.public && state.currentWindow === 'public') {
                state.currentMessages.push(message);
            } else if (message.from === state.currentWindow) {
                state.currentMessages.push(message);
            }
        }
    },

    actions: {
        [LOGIN]({ commit }, username) {
            console.log('VUEX - ACTION--LOGIN');
            commit(LOGIN, username);
        },

        [LOGOUT]({ commit }) {
            console.log('VUEX - ACTION--LOGOUT');
            commit(LOGOUT);
        },

        [CHANGE_WINDOW]({ commit }, windowId) {
            console.log('VUEX - ACTION--CHANGE_WINDOW');
            commit(CHANGE_WINDOW, windowId);
        },

        [SET_MESSAGES]({ commit }, messages = []) {
            console.log('VUEX - ACTION--SET_MESSAGES');
            commit(SET_MESSAGES, messages);
        },

        [SET_USERS]({ commit }, users) {
            console.log('VUEX - ACTION--SET_USERS');
            commit(SET_USERS, users);
        },

        [NEW_MESSAGE]({ commit }, message) {
            console.log(message);
            console.log('VUEX - ACTION--NEW_MESSAGE');
            commit(NEW_MESSAGE, message);
        }
    },

    modules: {}
});
