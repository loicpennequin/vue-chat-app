<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import websockets from '@/services/websocketsService.js';
import constants from '../shared/constants';
const socket = websockets();

export default {
    name: 'Home',

    computed: mapState(['authenticated']),

    watch: {
        authenticated(newVal) {
            if (newVal === true) {
                this.$router.push('/chat');
            } else if (newVal === false) {
                this.$router.push('/');
            }
        }
    },

    mounted() {
        if (this.authenticated === false) {
            this.$router.push('/');
        }

        socket.connect();
        socket.on(constants.SOCKET_EVENTS.CONNECTION_SUCCESS, () => {
            console.log('Websocket connection successful.');
        });
    }
};
</script>

<style lang="scss">
$primary: hsl(30, 60%, 60%);
$secondary: hsl(330, 60%, 50%);
$grey: #9999a2;

$font-primary: Helvetica;

:root {
    --color-primary: #{$primary};
    --color-primary-light: #{lighten($primary, 15%)};
    --color-primary-dark: #{darken($primary, 15%)};
    --color-secondary: #{$secondary};
    --color-secondary-light: #{lighten($secondary, 15%)};
    --color-secondary-dark: #{darken($secondary, 15%)};
    --color-grey-1: #{darken($grey, 40%)};
    --color-grey-2: #{darken($grey, 32%)};
    --color-grey-3: #{$grey};
    --color-grey-4: #{lighten($grey, 15%)};
    --color-grey-5: #{lighten($grey, 30%)};
    --color-background: var(--color-grey-1);
    --color-surface: var(--color-grey-2);
    --color-text: var(--color-grey-5);
    --spacing-xs: 0.25em;
    --spacing-sm: 0.5em;
    --spacing-md: 1em;
    --spacing-lg: 1.55em;
    --spacing-xl: 2.25em;
    --spacing-xxs: 3.5em;
    --spacing-fixed-xs: 0.25rem;
    --spacing-fixed-sm: 0.5rem;
    --spacing-fixed-md: 1rem;
    --spacing-fixed-lg: 1.55rem;
    --spacing-fixed-xl: 2.25rem;
    --spacing-fixed-xxs: 3.5rem;
}

body {
    margin: 0;
    padding: 0;
    background-color: var(--color-background);
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
}

* {
    box-sizing: border-box;
}

#app {
    font-family: $font-primary;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--color-text);
    height: 100vh;
    max-width: 980px;
    margin: 0 auto;
}
</style>
