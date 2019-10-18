<template>
    <div class="layout">
        <h1>Welcome back, {{ currentUser }} !</h1>
        <MessagesList />
        <UsersList />
        <MessageForm v-bind:onSubmit="sendMessage" />
    </div>
</template>

<script>
import MessageForm from '@/components/MessageForm.vue';
import MessagesList from '@/components/MessagesList.vue';
import UsersList from '@/components/UsersList.vue';
import websockets from '@/services/websocketsService';
import constants from '../../shared/constants';
import { SET_MESSAGES, SET_USERS, NEW_MESSAGE } from '@/store/mutations.types';

const { on, emit, cleanup } = websockets();

export default {
    name: 'chat',

    mounted() {
        emit(constants.SOCKET_EVENTS.GET_USERS);
        emit(constants.SOCKET_EVENTS.GET_PUBLIC_MESSAGES);

        on(constants.SOCKET_EVENTS.GET_USERS, users => {
            this.$store.dispatch(SET_USERS, users);
        });

        on(constants.SOCKET_EVENTS.GET_PUBLIC_MESSAGES, messages => {
            this.$store.dispatch(SET_MESSAGES, messages);
        });

        on(constants.SOCKET_EVENTS.GET_PRIVATE_MESSAGES, messages => {
            this.$store.dispatch(SET_MESSAGES, messages);
        });

        on(constants.SOCKET_EVENTS.NEW_PUBLIC_MESSAGE, message => {
            this.$store.dispatch(NEW_MESSAGE, message);
        });

        on(constants.SOCKET_EVENTS.NEW_PRIVATE_MESSAGE, message => {
            this.$store.dispatch(NEW_MESSAGE, message);
        });
    },

    destroyed() {
        cleanup();
    },

    computed: {
        currentUser() {
            return this.$store.state.currentUser;
        },

        currentWindow() {
            return this.$store.state.currentWindow;
        }
    },

    methods: {
        sendMessage(message) {
            if (this.currentWindow === 'public') {
                emit(constants.SOCKET_EVENTS.NEW_PUBLIC_MESSAGE, message);
            } else {
                emit(constants.SOCKET_EVENTS.NEW_PRIVATE_MESSAGE, {
                    message,
                    to: this.currentWindow
                });
            }
        }
    },

    watch: {
        currentWindow(newVal) {
            if (newVal === 'public') {
                emit(constants.SOCKET_EVENTS.GET_PUBLIC_MESSAGES);
            } else {
                emit(constants.SOCKET_EVENTS.GET_PRIVATE_MESSAGES, newVal);
            }
        }
    },

    components: {
        MessageForm,
        MessagesList,
        UsersList
    }
};
</script>

<style scoped lang="scss">
.layout {
    height: 100%;
    display: grid;
    grid-template-rows: max-content 1fr max-content;
    grid-template-columns: 1fr 200px;
    background: var(--color-surface);
    & > * {
        padding: var(--spacing-fixed-md) var(--spacing-fixed-md);
    }
    & > *:nth-child(1),
    & > *:nth-child(4) {
        grid-column: span 2;
    }
}

h1 {
    color: var(--color-primary);
    border-bottom: solid 1px var(--color-primary);
    margin-bottom: 0;
}
</style>
