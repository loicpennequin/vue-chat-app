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
            commit(LOGIN, username);
        },

        [LOGOUT]({ commit }) {
            commit(LOGOUT);
        },

        [CHANGE_WINDOW]({ commit }, windowId) {
            commit(CHANGE_WINDOW, windowId);
        },

        [SET_MESSAGES]({ commit }, messages = []) {
            commit(SET_MESSAGES, messages);
        },

        [SET_USERS]({ commit }, users) {
            commit(SET_USERS, users);
        },

        [NEW_MESSAGE]({ commit }, message) {
            commit(NEW_MESSAGE, message);
        }
    },

    modules: {}
});
