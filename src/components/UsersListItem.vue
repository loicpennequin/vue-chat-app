<template>
    <li>
        <button
            v-bind:class="{ active: isActive }"
            type="button"
            v-on:click="changeWindow(user)"
        >
            {{ user }}
            <span class="notification" v-if="unreadMessagesByUser(user) > 0">
                {{ unreadMessagesByUser(user) }}
            </span>
        </button>
    </li>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { CHANGE_WINDOW } from '@/store/mutations.types';

export default {
    name: 'UsersList',

    props: {
        user: String,
        isActive: Boolean
    },

    computed: {
        ...mapGetters(['unreadMessagesByUser'])
    },

    methods: mapActions([CHANGE_WINDOW])
};
</script>

<style scoped lang="scss">
li button {
    position: relative;
    padding: var(--spacing-sm);
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-size: 1.1em;
    color: var(--color-text);
    &.active,
    &:hover,
    &:focus {
        color: var(--color-primary);
        outline: none;
    }
}

.notification {
    position: absolute;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background-color: var(--color-secondary);
    color: white;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    animation: notification-appear 0.5s ease-out;
    font-size: 0.75em;
    top: 0;
    left: 125%;
}

@keyframes notification-appear {
    from {
        transform: scale(0);
        opacity: 0;
    }
    75% {
        transform: scale(1.15);
        opacity: 1;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
