import SpotifyPlaybackSDKClient from "./plugins/SpotifyPlaybackSDK.client";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
        spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        spotifyRedirect: process.env.SPOTIFY_REDIRECT
    },
    nitro: {
        routeRules: {
            'api/spotify/login' : { cors: true, headers: { 'access-control-allow-methods': 'GET' } },
            
        }
      }
})