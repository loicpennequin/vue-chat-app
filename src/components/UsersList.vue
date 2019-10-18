<template>
    <ul class="wrapper">
        <UsersListItem
            user="public"
            v-bind:isActive="currentWindow === 'public'"
        />
        <UsersListItem
            v-for="user in connectedUsers"
            v-bind:user="user"
            v-bind:isActive="currentWindow === user"
            v-bind:key="user"
        />
    </ul>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { CHANGE_WINDOW } from '@/store/mutations.types';
import UsersListItem from '@/components/UsersListItem';

export default {
    name: 'UsersList',

    computed: {
        ...mapState(['connectedUsers', 'currentWindow']),
        ...mapGetters(['unreadMessagesByUser'])
    },

    methods: mapActions([CHANGE_WINDOW]),

    components: { UsersListItem }
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
