<template>
    <head>
    </head>
    
    <div>
      <button @click="LoginSpotify"></button>
      <ClientOnly>

        <SpotifyPlayback/>
      </ClientOnly>
      <AudiusAudio/>
      
      <input type="text" placeholder="Search...">

    </div>
</template>

<script setup lang="ts">
import AudiusAudio from '~~/components/AudiusAudio.vue';

    // const selectHost = () => window.location.href = "/api/audius/host";
    const LoginSpotify = () => window.location.href = "/api/spotify/login";
    const { $spotifyPlayer } = useNuxtApp();
    
</script>
  