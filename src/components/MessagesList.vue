<template>
    <div>
        <div class="channel-title">
            <span v-if="currentWindow === 'public'">Public Channel</span>
            <span v-else>Your conversation with {{ currentWindow }}</span>
        </div>
        <ul>
            <li
                class="message"
                v-for="(message, index) in currentMessages"
                v-bind:key="index"
                v-bind:class="{
                    system: message.from === 'System',
                    self: message.from === currentUser
                }"
            >
                <strong>{{ message.from }} :</strong>
                <span>{{ message.message }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { MARK_AS_READ } from '@/store/mutations.types';

export default {
    name: 'MessagesList',

    computed: mapState(['currentWindow', 'currentMessages', 'currentUser']),

    watch: {
        currentMessages() {
            this.$store.dispatch(MARK_AS_READ);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.channel-title {
    font-size: 1.1em;
    color: var(--color-grey-3);
    margin-bottom: var(--spacing-sm);
}

.message {
    margin-bottom: var(--spacing-md);
    &.system {
        color: var(--color-grey-3);
        strong {
            color: inherit;
        }
    }
    strong {
        color: var(--color-primary);
    }
    &.self strong {
        color: var(--color-primary-light);
    }
}
</style>
