<template>
    <div class="form">
        <span>Регистрация</span>
        <input type="text" placeholder="username" v-model="username">
        <input type="text" placeholder="password" v-model="password">
        <button @click="signUp">Зарегистрироваться</button>
        <span>или</span>
        <RouterLink to="./auth">Войти</RouterLink>
    </div>
</template>
<script>
import { authStore } from '../store/AuthStore'
import { mapActions } from 'pinia';
export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    
    methods: {
        ...mapActions(authStore, ['register']),
        signUp() {
            this.register(this.username, this.password)
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