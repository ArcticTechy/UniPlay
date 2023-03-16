// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    routeRules: {
        'api/spotify/login': { cors: true, headers: { 'access-control-allow-methods': 'GET' } },
        'http://localhost:3000': { cors: true, headers: { 'Access-Control-Allow-Origin': 'GET' } },
        'https://localhost:3000/api/spotify/login': { cors: true, headers: { 'access-control-allow-methods': 'GET' } },
    },
    runtimeConfig: {
        spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
        spotifyRedirect: process.env.SPOTIFY_REDIRECT
    }
})