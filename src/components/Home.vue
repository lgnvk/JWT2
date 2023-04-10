<template>
    <div>
        <button @click="logout">Выйти</button>
        HomePage
        {{ artists }}
    </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { authStore } from '../store/AuthStore';
import { ArtistsStore } from '../store/ArtistsStore'

export default {
    computed: {
        ...mapState(authStore, ['isAuth']),
        ...mapState(ArtistsStore, ['artists'])
    },

    methods: {
        ...mapActions(authStore, ['logout']),
        ...mapActions(ArtistsStore, ['getAllArtists']),
        async getAuth() {
            if(!this.isAuth && !localStorage.getItem('refresh')) {
                this.$router.push('/auth')
            }
            else {
                await this.getAllArtists()
            }
        }
    },

    watch: {
        isAuth(isAuth) {
            if(!isAuth) {
                this.$router.push('/auth')
            }
        }
    },

    created() {
        this.getAuth()
    }
}
</script>
<style lang="">
    
</style>