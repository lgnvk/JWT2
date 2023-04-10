import { defineStore } from "pinia";
import { ArtistService } from "../api/Artists";

export const ArtistsStore = defineStore('artists', {
    state: () => ({
        artists: [],
    }),

    actions: {
        async getAllArtists() {
            try {
                const { data: { data } } = await ArtistService.getArtists()
                this.artists = data
            } catch {
                throw Error('Не удалось получить список артистов')
            }
        }
    }
})