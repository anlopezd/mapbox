import axios from "axios"

const directionApi = axios.create({
    baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
    params: {
        alternatives: false,
        geometries: "geojson",
        overview: "simplified",
        steps: false,
        access_token: "pk.eyJ1IjoiYW5sb3BlemQiLCJhIjoiY2t6dWhwcjAxM2pkMTJ3bnhxa3dzMGIyaSJ9.K-aKNVswGa4_RGOSrLAGtg"
    }
})

export default directionApi