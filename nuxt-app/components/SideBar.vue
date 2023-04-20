<template>
  <div class="sidebar">
    <div class="SearchInput">
      <input type="search" placeholder="Search...">
      <button>
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" v-if="false"/>
        <font-awesome-icon icon="fa-solid fa-xmark" v-if="true"/>
      </button>
    </div>
    <div class="SearchResult">

    </div>
    <div class="userContent">
      <h1>Spotify</h1>
      <template v-for="(item) in playlists">
        <NuxtLink :to="`/spotify/playlist?id=${item.id}`">{{ item.name }}</NuxtLink>
      </template>

      <h1>Audius</h1>
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
  padding-top: 5px;
  background-color: rgba(0, 0, 0, 0.8);
}

.SearchInput {
  display: flex;
  flex-direction:row;
  margin: 10px auto;
  border-radius: 0px;
  height: 2em;
  width: calc(100% - 2em);
  background-color: white;
}

.SearchInput input {
  height: 100%;
  width: 90%;
  background-color: transparent;
  border: none;
  outline: none;
}
.SearchInput button {
  width: 10%;
  height: 100%;
  background-color: transparent;
  border: none;
}

.userContent a {
  padding: 2.5px 0px 2.5px 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  display: block;
  color: #aaaaaa;
  text-decoration: none;
  font-size: 18px;
}

.userContent h1 {
  padding-bottom: 10px;
  color: white;
  font-size: 22px;
  margin: auto;
  text-align: center;
}

.userContent a:hover {
  color: #ffffff;
}</style>