<!-- Normally vuejs/Nuxt does not reload a already loaded page even if we change the query of the page by giving it a key we can force
it to update the ui -->
<template :key="query">
    <div id="CoverImage">
        <img v-bind:src="artistData.value.images[0].url">
        <div class="artistText">
            <h1>{{ artistData.value.name }}</h1>
            <p> Followers: {{ artistData.value.followers.total }}</p>
        </div>
    </div>
    <div class="titles">
    <div>
      <p>Titel</p>
    </div>
    <div>
      <p>Duration</p>
    </div>
  </div>
    <div class="song" @click="playArtistTopSongs(item.id, artistTopSongs.value)"
        v-for="(item) in artistTopSongs.value.tracks">
        <div class="image">
            <img v-bind:src="item.album.images[2].url">
        </div>
        <div class="names">
            <h1>{{ item.name }}</h1>
            <div @click.stop v-for="(artistItem, indexArtities) in item.artists">
                <NuxtLink class="artist" :to="`/spotify/artist?id=${artistItem.id}`"
                    v-if="indexArtities == item.artists.length - 1">
                    {{
                        artistItem.name
                    }}</NuxtLink>
                <NuxtLink class="artist" :to="`/spotify/artist?id=${artistItem.id}`"
                    v-if="indexArtities != item.artists.length - 1">
                    {{
                        artistItem.name
                    }}, </NuxtLink>
            </div>
        </div>
        <div class="duration">
            <p>{{ formatDuration(item.duration_ms) }}</p>
        </div>
    </div>
</template>
  
<script setup lang="ts">
// makes a route value wich allows us to modifie and observice the url bar
const route = useRoute()
// Gets the acess token
const accessToken = useCookie('spotify_access_token')
// gets the spotify plugin
const { $deviceID, $AudiusPlayer, $spotifyPlayer, $PlatformPlugin } = useNuxtApp();
const artistData = ref();
const artistTopSongs = ref();
const query = ref(route.query.id)

watch(route, async () => {
    query.value = route.query.id;
    artistData.value = await getArtist(query.value);
    artistTopSongs.value = await getArtistTopSongs(query.value);
    console.log("deviceID:" + $deviceID.value)
})

async function getArtist(id: any) {
    const { data: notdata } = await useFetch(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken.value}`
        },
    });
    console.log(notdata);
    return notdata;
}

async function getArtistTopSongs(id: any) {
    const { data } = await useFetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=DK`, {
        headers: {
            Authorization: `Bearer ${accessToken.value}`
        },
    });
    console.log(data)
    return data;
}
artistData.value = await getArtist(query.value);

artistTopSongs.value = await getArtistTopSongs(query.value);

async function playArtistTopSongs(songId: string, topSongsArray) {
    let ids = [];
    topSongsArray.tracks.forEach((element: string) => {
        ids.push(`spotify:track:${element.id}`)
    });
    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${$deviceID.value}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken.value}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: ids,
            offset: {
                uri: `spotify:track:${songId}`
            }
        })
    });
    $PlatformPlugin.platform = "Spotify";
    if(!$AudiusPlayer.isPlaying.value) {
        $AudiusPlayer.togglePlay();
    }
}



function formatDuration(durationMs: number) {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
</script>
  
<style>
#CoverImage {
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
    background-size: cover;
    background: rgb(40, 40, 40);
    background: linear-gradient(360deg, rgba(40, 40, 40, 1) 0%, rgba(114, 114, 114, 0.45702030812324934) 18%, rgba(147, 147, 147, 0) 36%, rgba(255, 255, 255, 0) 100%);
}

#CoverImage img {
    position: relative;
    top: -50%;
    width: 100%;
    height: auto;
    z-index: -1;

}

.artistText {
    z-index: 2;
    position: absolute;
    margin-top: 300px;
    margin-left: 20px;
    top: 20px;
}


.artistText h1 {
    color: white;
    font-size: 80px;
    margin: auto;
}

.artistText p {
    color: white;
    font-size: 25px;
    margin: auto;
}
</style>