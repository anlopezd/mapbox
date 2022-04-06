import axios from 'axios'

const searchApi = axios.create({
    baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
    params: {
        limit: 4,
        language: "es",
        access_token: "pk.eyJ1IjoiYW5sb3BlemQiLCJhIjoiY2t6dWhwcjAxM2pkMTJ3bnhxa3dzMGIyaSJ9.K-aKNVswGa4_RGOSrLAGtg"
    }

})

export default searchApi