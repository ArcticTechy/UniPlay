<!-- Does not refresh on id change -->
<template>
    <p> hello world</p>
    <template v-for="(item, index) in playlistData.items" >
        <p @click="playSong(item.track.id)">{{item.track.name}}</p>
    </template>
</template>

<script setup lang="ts">
const route = useRoute()
const accessToken = useCookie('spotify_access_token')
const device_id = useCookie('spotifyDeviceID');
async function getUserPlaylist(id) {
  const {data} = await useFetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`
    },
    key: id,
  });
  console.log(data)
  return data;
}
const playlistData = ref(await getUserPlaylist(route.query.id));
async function playSong(songId) {
  const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id.value}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uris: [`spotify:track:${songId}`]
    })
  });

}
</script>

<style>

</style>