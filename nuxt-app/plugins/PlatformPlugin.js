

export default defineNuxtPlugin(async nuxtApp => {
    let platform = "Spotify"
    return {
        provide: {
            PlatformPlugin: {
                platform: platform,    
            }
        }
    }
})