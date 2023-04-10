import $api from "../client"

const AuthService = {
    register(payload) {
        const url = 'auth/register'
        return $api.post(url, payload)
    },

    login(payload) {
        const url = 'auth/login'
        return $api.post(url, payload)
    },
}

export default AuthService;