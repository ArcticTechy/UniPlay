// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
        spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        spotifyRedirect: process.env.SPOTIFY_REDIRECT
    },
    plugins: [
        '~/plugins/SpotifyPlaybackSDK.client.js'
    ],
    nitro: {
        routeRules: {
            'api/spotify/login' : { cors: true, headers: { 'access-control-allow-methods': 'GET' } },
        }
      },
    googleFonts: {
        families: {
            lora: true,
            display: 'swap', }
    },
    head: {
        script: [
          { src: 'https://sdk.scdn.co/spotify-player.js' } // load script in your static folder
        ]
      },
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css'
      ]
})