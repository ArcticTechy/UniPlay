// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
        spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        spotifyRedirect: process.env.SPOTIFY_REDIRECT
    },
    routeRules: {
        'plugins/spotifyplayer': { ssr: false },
        '/index': { ssr: false },
    },
    plugins: [
        { src: '~/plugins/spotify-web-playback.js', mode: 'client' }
      ],
    nitro: {
        routeRules: {
            'api/spotify/login' : { cors: true, headers: { 'access-control-allow-methods': 'GET' } },
            
        }
      }
})