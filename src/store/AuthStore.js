import { defineStore } from "pinia";
import { AuthService } from "../api/Auth";

export const authStore = defineStore('auth', {
    state: () => ({ isAuth: false }),

    actions: {
        async register(username, password) {
            try {
                const { data } = await AuthService.register({username, password, fingerprint: 'fingerprint'})
                localStorage.setItem('token', data.accessToken)
                localStorage.setItem('refresh', data.refreshToken)
                this.isAuth = true
            } catch {
                throw Error('Ошибка регистрации')
            }
        },
        
        async login(username, password) {
            try {
                const { data } = await AuthService.login({username, password, fingerprint: 'fingerprint'})
                localStorage.setItem('token', data.accessToken)
                localStorage.setItem('refresh', data.refreshToken)
                this.isAuth = true
            } catch {
                throw Error('Ошибка авторизации')
            }
        },

        logout() {
            localStorage.removeItem('token')
            localStorage.removeItem('refresh')
            this.isAuth = false
        },
    }
})