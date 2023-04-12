<template>
    <div class="sidebar">
        <input type="search" placeholder="Search...">
        <div class="SearchResult">

        </div>
        <div class="userContent">
            <button @click="changesong" style="background-color: yellow;">test</button>
            <template v-for="(item) in playlists" >
                <p>{{ item.name }}</p>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
const accessToken = useCookie('spotify_access_token')

async function getUserPlaylists(accessToken) {
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

  async function changesong() {
  const device_id = '8b5acc3fd127d91dc1f6b60a0cafa7f1fadedb42';
  const track_uri = 'spotify:track:1cDeP3HOdeIQXtBdWCjI4T';

  await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken.value}`
    },
    body: JSON.stringify({ uris: [track_uri] })
  });
}


</script>

<style scoped>
.sidebar {
    width: 25%;
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