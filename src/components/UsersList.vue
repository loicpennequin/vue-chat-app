<template>
    <ul class="wrapper">
        <li>
            <button
                v-bind:class="{ active: currentWindow === 'public' }"
                v-on:click="changeWindow('public')"
            >Public</button>
        </li>
        <li v-for="user in connectedUsers" v-bind:key="user">
            <button
                v-bind:class="{ active: currentWindow === user }"
                type="button"
                v-on:click="changeWindow(user)"
            >{{ user }}</button>
        </li>
    </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { CHANGE_WINDOW } from '@/store/mutations.types';

export default {
    name: 'UsersList',

    computed: mapState(['connectedUsers', 'currentWindow']),

    methods: mapActions([CHANGE_WINDOW])
};
</script>

<style scoped lang="scss">
.wrapper {
    border-left: solid 1px var(--color-primary);
    display: block;
    li button {
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
}
</style>
