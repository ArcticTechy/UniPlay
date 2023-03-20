<template>
    <head>
    </head>
    
    <div>
      <button @click="LoginSpotify"></button>
      <ClientOnly>

        <SpotifyPlayback/>
      </ClientOnly>
    </div>
</template>


<script setup lang="ts">
    console.log(useCookie('spotify_access_token'))
    const nuxt = useNuxtApp()
    const router = useRouter();
    const LoginSpotify = () => window.location.href = "/api/spotify/login";
    const spotifyToken = useCookie('spotify_access_token')
</script>
  