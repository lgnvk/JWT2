import $api from "../client"

const ArtistService = {
    getArtists() {
        const url = 'https://internship-front.framework.team/artists'
        return $api.get(url)
    }
}

export default ArtistService;