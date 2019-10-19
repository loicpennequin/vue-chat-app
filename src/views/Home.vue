<template>
    <div class="wrapper">
        <h1>The Super Chat App !</h1>
        <h2>... done in an evening to learn Vue 😼</h2>
        <LoginForm v-bind:onSubmit="login" />
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import websockets from '@/services/websocketsService';
import constants from '../../shared/constants';
import { LOGIN } from '@/store/mutations.types';

const { on, emit, cleanup } = websockets();

export default {
    name: 'home',

    mounted() {
        on(constants.SOCKET_EVENTS.LOGIN_SUCCESS, username => {
            this.$store.dispatch(LOGIN, username);
        });
    },

    destroyed() {
        cleanup();
    },

    methods: {
        login(username) {
            emit(constants.SOCKET_EVENTS.LOGIN, username);
        }
    },

    components: {
        LoginForm
    }
};
</script>

<style scope lang="scss">
.wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h1,
h2 {
    color: var(--color-primary);
}

h1 {
    margin-bottom: var(--spacing-sm);
}

h2 {
    margin-bottom: var(--spacing-lg);
}
</style>
