<template>
    <form v-on:submit="sendMessage($event)" class="form">
        <input type="text" id="name-input" v-model="message" placeholder="Say something !" />
        <button type="submit">Send</button>
    </form>
</template>

<script>
export default {
    name: 'MessageForm',

    props: {
        onSubmit: Function
    },

    data() {
        return {
            message: ''
        };
    },

    methods: {
        sendMessage(e) {
            e.preventDefault();
            this.onSubmit(this.$data.message);
            this.$data.message = '';
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form {
    border-top: solid 1px var(--color-primary);
    display: flex;
    font-size: 1.25em;
}

input {
    flex-grow: 1;
    padding: var(--spacing-sm);
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    border: solid 2 px transparent;
    font-size: inherit;
    &:focus {
        border-color: var(--color-primary);
        outline: none;
    }
}

button {
    background-color: var(--color-primary);
    border: none;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    color: white;
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: inherit;
    cursor: pointer;
    &:hover {
        background-color: var(--color-primary-dark);
    }
}
</style>
