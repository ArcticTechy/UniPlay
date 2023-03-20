<template>
    <img v-bind:src="$spotifyPlayer.current_track.value.album.images[0].url">
    <h1> {{ $spotifyPlayer.current_track.value.name }}</h1>
    <p>by</p>
    <p v-for="name in $spotifyPlayer.current_track.value.artists"> {{ name.name }}</p>
    <button @click="pause">pause</button>
    <button @click="$spotifyPlayer.nextTrack()">Next Track</button>
</template>

<script setup lang="ts">
    import { client } from 'process';
import index from '../pages/index.vue'
    const spotifyToken = useCookie('spotify_access_token')
    const { $nuxt , $spotifyPlayer } = useNuxtApp();
    const currentTrack = ref("")

    function pause() {
      $spotifyPlayer.togglePlay()
    }
    if (!$spotifyPlayer.current_track)
    {
      console.log("has no name")
    }

</script>