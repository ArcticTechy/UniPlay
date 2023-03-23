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
    const LoginSpotify = () => window.location.href = "/api/spotify/login";
    const { $spotifyPlayer } = useNuxtApp();
    
</script>
  