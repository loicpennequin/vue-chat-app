<template>
    <form v-on:submit="login($event)">
        <label for="name-input">Choose Your Username</label>
        <input type="text" id="name-input" v-model="username" />
        <button type="submit">Enter</button>
        <div class="error" v-if="error">You need an username !😉</div>
    </form>
</template>

<script>
export default {
    name: 'LoginForm',

    props: {
        onSubmit: Function
    },

    data() {
        return {
            username: '',
            submitted: false,
            error: false
        };
    },

    methods: {
        login(e) {
            this.$data.submitted = true;
            e.preventDefault();
            if (this.$data.username.length > 0) {
                this.onSubmit(this.$data.username);
            } else {
                this.$data.error = true;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
form {
    background: var(--color-surface);
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    font-size: 1.25em;
}

label,
button,
input {
    margin-bottom: var(--spacing-md);
}

label {
    text-align: center;
}

input {
    flex-grow: 1;
    padding: var(--spacing-sm);
    font-size: inherit;
    &:focus {
        border-color: var(--color-primary);
        outline: none;
    }
}

button {
    background-color: var(--color-primary);
    border: none;
    color: white;
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: inherit;
    cursor: pointer;
    &:hover,
    &:focus {
        background-color: var(--color-primary-dark);
        outline: none;
    }
}

.error {
    position: relative;
    padding: var(--spacing-sm);
    background-color: var(--color-secondary);
    animation: error-appear 0.25s;
    &::after {
        content: '';
        position: absolute;
        left: 1em;
        top: -18px;
        border: solid 9px transparent;
        border-bottom-color: var(--color-secondary);
    }
}

@keyframes error-appear {
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
