import axios from "axios";
import { router } from '../router/index'

const defaultConfig = {
    baseURL: 'https://internship-front.framework.team',
    withCredentials: true,
}

const $api = axios.create(defaultConfig);

$api.interceptors.request.use(async(config) => {
    const { expRefresh } = JSON.parse(window.atob(localStorage.getItem('refresh').split('.')[1]))

    if(expRefresh < Date.now() / 1000) {
        router.push('auth')
        return
    }

    const { expAccess } = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]))

    if(expAccess < Date.now() / 1000) {
        const { data } = await $api.post('auth/refresh', { refreshToken: localStorage.getItem('refresh'), fingerprint: 'fingerprint' })
        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('refresh', data.refreshToken)
    }

    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}, null, { runWhen: (config) => config.url !== 'auth/login' && config.url !== 'auth/refresh'})

$api.interceptors.response.use(res => res, async error => {
    if(!localStorage.getItem('refresh') || error.response.status !== 401) {
        throw Error('Нужна авторизация')
    }
    
    const { data } = await $api.post('auth/refresh', { refreshToken: localStorage.getItem('refresh'), fingerprint: 'fingerprint' })
    localStorage.setItem('token', data.accessToken)
    localStorage.setItem('refresh', data.refreshToken)
    
    return $api(error.config)
})

export default $api;
