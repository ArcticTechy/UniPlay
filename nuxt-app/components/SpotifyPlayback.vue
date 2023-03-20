<template>
    <h1> {{ currentTrack }}</h1>
    <button @click="connectSpotifyPlayer">Connect Player</button>
    <button @click="previousSong">Previous</button>
    <button @click="pause">Pause</button>
    <button @click="nextSong">next</button>
</template>

<script setup lang="ts">
    import index from '../pages/index.vue'
    const spotifyToken = useCookie('spotify_access_token')
    const nuxt = useNuxtApp();
    const currentTrack = ref("")

    const spotify_player = ref<Spotify.Player | null>(null);

    const connectSpotifyPlayer = () => {
      if (!nuxt.$spotify) {
        console.error("Spotify Web Playback SDK not loaded");
        return;
      }
    
      const spotifyPlayer = new nuxt.$spotify.Player({
        name: "UniPlay",
        getOAuthToken: (cb) => {
          cb(spotifyToken.value);
        },
        volume: 0.5,
      });
    
      spotify_player.value = spotifyPlayer;
    
      spotifyPlayer.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });
    
      spotifyPlayer.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      spotifyPlayer.addListener('player_state_changed', ({
    paused,
    position,
    duration,
    track_window: { current_track }
    }) => {
    console.log('Is paused', paused)
    console.log('Currently Playing', current_track);
    current_track.name
    console.log('Position in Song', position);
    console.log('Duration of Song', duration);
    });
    
      spotifyPlayer.connect();
    };


    const pause = () => {
      spotify_player.value.togglePlay()
    }
    const previousSong = () => {
      spotify_player.value.previousTrack()
    }
    const nextSong = () => {
      spotify_player.value.nextTrack()
    }
</script>