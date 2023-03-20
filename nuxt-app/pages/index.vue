<template>
    <head>
    </head>
    
    <div>
      <button @click="LoginSpotify"></button>
      <h2>test: {{ track }} </h2>
      <SpotifyPlayback/>
    </div>
</template>


<script setup lang="ts">
    console.log(useCookie('spotify_access_token'))
    const nuxt = useNuxtApp()
    const track = nuxt.$sfgshg;
    const router = useRouter();
    const LoginSpotify = () => window.location.href = "/api/spotify/login";
    const spotifyToken = useCookie('spotify_access_token')
</script>
  