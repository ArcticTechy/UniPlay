<template>
    <div class="sidebar">
        <input type="search" placeholder="Search...">
        <div class="SearchResult">

        </div>
        <div class="userContent">
            <template v-for="(item) in playlists" >
                <NuxtLink :to="`/spotify/playlist?id=${item.id}`">{{ item.name }}</NuxtLink>
            </template>
        </div>
    </div>
  </template>

<script setup lang="ts">
const accessToken = useCookie('spotify_access_token')
const device_id = useCookie('spotifyDeviceID');

async function getUserPlaylists(accessToken: any) {
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  return data.items;
}
const playlists = ref();

// Usage:
getUserPlaylists(accessToken.value)
  .then(Playlists => {
    playlists.value = Playlists
  });

</script>

<style scoped>
.sidebar {
    width: 100%;
    height: 100%;
    background-color: green !important;    
}
.sidebar input {
    border: none;
    border-radius: 10px;
    height: 2em;
    width: 100%;
    margin: 10px 0;
}

</style>