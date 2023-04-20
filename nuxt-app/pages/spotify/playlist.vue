<!-- Does not refresh on id change -->
<template :key="query">
  <div class="titles">
    <div>
      <p>Titel</p>
    </div>
    <div>
      <p>Duration</p>
    </div>
  </div>
  <div class="song" @click="playPlaylist(item.track.id)" v-for="(item) in playlistData.value.items">
    <div class="image">
      <img v-bind:src="item.track.album.images[2].url">
    </div>
    <div class="names">
      <h1>{{ item.track.name }}</h1>
      <div @click.stop v-for="(artistItem, indexArtities) in item.track.artists">
        <NuxtLink class="artist" :to="`/spotify/artist?id=${artistItem.id}`"
          v-if="indexArtities == item.track.artists.length - 1">
          {{
            artistItem.name
          }}</NuxtLink>
        <NuxtLink class="artist" :to="`/spotify/artist?id=${artistItem.id}`"
          v-if="indexArtities != item.track.artists.length - 1">
          {{
            artistItem.name
          }}, </NuxtLink>
      </div>
    </div>
    <div class="duration">
      <p>{{ formatDuration(item.track.duration_ms) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// makes a route value wich allows us to modifie and observice the url bar
const route = useRoute()
// Gets the acess token
const accessToken = useCookie('spotify_access_token')
// gets the spotify plugin
const { $deviceID } = useNuxtApp();
const playlistData = ref();
const query = ref(route.query.id)

watch(route, async () => {
  query.value = route.query.id;
  playlistData.value = await getUserPlaylist(query.value);
  console.log("deviceID:" + $deviceID.value)
})

async function getUserPlaylist(id: any) {
  const { data } = await useFetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`
    },
    key: id,
  });
  console.log(data)
  return data;
}
playlistData.value = await getUserPlaylist(query.value);
async function playPlaylist(songId: string) {
  const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${$deviceID.value}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      context_uri: `spotify:playlist:${query.value}`,
      offset: {
        uri: `spotify:track:${songId}`,
      },
      position_ms: 0
    })
  });

}



function formatDuration(durationMs: number) {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = ((durationMs % 60000) / 1000).toFixed(0);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
</script>

<style>
.titles {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  display: grid;
  grid-template-columns: auto 100px;
  margin: auto;
  -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
}
.titles:first-child p {
  text-align: left;
  padding-left: 1em;
}
.titles p {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.song {
  display: grid;
  grid-template-columns: 96px auto 80px;
  justify-items: stretch;
  align-items: center;
  height: 6em;
  width: 100%;
  padding: 0.25em 0 0.25em 0.5em;
}
/* .song:nth-child(2) {
  margin-top: 50px;
} */

.song:hover {
  background-color: #0000007a;
}

.image img {
  width: 100%;
}

.duration {
  flex-flow: end;
  margin: auto;
}

.duration p {
  color: white;
}

.names div a {
  color: white;
  padding-right: 5px;
  text-decoration: none;
}

.names div a:hover {
  text-decoration: underline;
}

.song h1 {
  color: white;
  font-size: 20px;
}

.names {
  width: 100%;
  height: 100%;
  padding-left: 1em;
}

.names div {
  display: flex;
  float: left;

}</style>