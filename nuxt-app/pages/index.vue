<template>
    <head>
    </head>
    
    <div>
      <button @click="LoginSpotify"></button>
      <ClientOnly>

        <SpotifyPlayback/>
      </ClientOnly>
      <SidePanel/>
      
    

    </div>
</template>

<script setup lang="ts">

    // const selectHost = () => window.location.href = "/api/audius/host";
    const LoginSpotify = () => window.location.href = "/api/spotify/login";
    const { $spotifyPlayer } = useNuxtApp();
    
</script>
  