<template>
    <div class="form">
        <span>Вход</span>
        <input type="text" placeholder="username" v-model="username">
        <input type="text" placeholder="password" v-model="password">
        <button @click="signIn">Войти</button>
        <span>или</span>
        <RouterLink to="./register">Зарегистрироваться</RouterLink>
    </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { authStore } from '../store/AuthStore';

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },

    computed: {
        ...mapState(authStore, ['isAuth'])
    },

    watch: {
        isAuth(val) {
            if(val) this.$router.push('/')
        }
    },  

    methods: {
        ...mapActions(authStore, ['login']),
        signIn() {
            this.login(this.username, this.password)
        }
    },
}
</script>
<style lang="css">
    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>