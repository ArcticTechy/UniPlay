<!-- Does not refresh on id change -->
<template :key="query">
  <div class="song" v-for="(item) in playlistData.value.items">
    <h1 @click="playPlaylist(item.track.id)">{{ item.track.name }}</h1>
    <template v-for="(artistItem, index) in item.track.artists">
      <NuxtLink  class="artist" :to="`/spotify/artist?id=${artistItem.id}`" v-if="index == artistItem.length - 1">
        {{
          artistItem.name
        }} </NuxtLink>
      <NuxtLink class="artist" :to="`/spotify/artist?id=${artistItem.id}`" v-if="index != artistItem.length - 1">
        {{
          artistItem.name
        }}, </NuxtLink>
    </template>
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
</script>

<style>
.PageView p {
  padding-left: 1em;
  color: white;
}
</style>