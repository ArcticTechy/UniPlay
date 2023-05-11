<template>
  <div class="sidebar">
    <div class="SearchInput">
      <input v-model="SearchText" type="search" placeholder="Search..." @click="isSearching = true;"
        @input="typeTimer(SearchText, 'track', platform)">
      <button @click="pressingXOnInput">
        <!-- <font-awesome-icon icon="fa-solid fa-magnifying-glass" v-if="!isSearching" /> -->
        <font-awesome-icon icon="fa-solid fa-xmark" v-if="isSearching" />
      </button>
    </div>
    <div class="ChooseService" v-if="isSearching">
      <button @click=" platform = 'Spotify';"> Spotify </button>
      <button @click=" platform = 'Audius';"> Audius </button>
    </div>
    <div class="SearchResult" v-if="isSearching && SearchResults?.length > 0">
      <h1>songs</h1>
      <template v-if="platform == 'Spotify'" v-for="track in SearchResults" :key="SearchText.value">
        <div @click="playSongOnClick(track.id)">
          <p style="color: aliceblue;">{{ track.name }}</p>
        </div>
      </template>
      <template v-if="platform == 'Audius'" v-for="track in SearchResults" :key="SearchText.value">
        <div @click="playSongOnClick(track.id)">
          <p style="color: aliceblue;">{{ track.title }}</p>
        </div>
      </template>
    </div>
    <div class="userContent" v-if="!isSearching">
      <h1>Spotify</h1>
      <template v-for="(item) in playlists">
        <NuxtLink :to="`/spotify/playlist?id=${item.id}`">{{ item.name }}</NuxtLink>
      </template>

      <h1>Audius</h1>
    </div>
  </div>
</template>

<script setup lang="ts">

//import PlatformPlugin from '~/plugins/PlatformPlugin';

const { $AudiusPlayer, $deviceID, $PlatformPlugin, $spotifyPlayer } = useNuxtApp();
const accessToken = useCookie('spotify_access_token')
const device_id = useCookie('spotifyDeviceID');
let typingTimer: any;
const doneTypingInterval = 1000;
const SearchText = ref();
const SearchResults = ref();
const isSearching = ref(false);
const platform = ref("Spotify");

const host = await $fetch('/api/audius/host/', {
  method: 'POST'
})

function typeTimer(sq: string, st: string, pf: string) {
  clearTimeout(typingTimer)
  if (sq)
    typingTimer = setTimeout(() => { SearchFromInput(sq, st, pf) }, doneTypingInterval);
}
async function SearchFromInput(searchQuery: string, searchType: string, platform: string) {
  switch (platform) {
    case "Spotify":
      const { data } = await useFetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        },
        key: SearchText.value,
      });
      SearchResults.value = data.value?.tracks?.items ?? [];
      break;

    case "Audius":

      const { data: notdata } = await useFetch(host + '/v1/tracks/search?query=' + searchQuery + ' b2b&app_name=UniPlay', {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        },
        key: SearchText.value,
      });
      SearchResults.value = notdata.value?.data ?? [];
      break;
    default:
      break;
  }

}

function playSongOnClick(id: string) {
  switch (platform.value) {
    case "Spotify":
      if (!$AudiusPlayer.isPlaying.value) {
        $AudiusPlayer.togglePlay();
      }
      playSongOnSpotify(id)
      $PlatformPlugin.platform = platform.value;
      break;

    case "Audius":
      if (!$spotifyPlayer.paused.value) {
        $spotifyPlayer.togglePlay();
      }
      $AudiusPlayer.StreamSong(id)
      $PlatformPlugin.platform = platform.value;
      break;
    default:
      break;
  }
}

async function playSongOnSpotify(id: string) {
  const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${$deviceID.value}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uris: [`spotify:track:${id}`],
      position_ms: 0
    })
  });
}
function pressingXOnInput() {
  isSearching.value = false;
  SearchText.value = "";
}

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
  position: relative;
}

.SearchInput {
  display: flex;
  position: relative;
  z-index: 4;
  flex-direction: row;
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

.ChooseService {
  margin-top: -50px;

}

.userContent {
  padding-top: 3.2em;
  display: true;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 1;
  top: 0;
  left: 0;
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
}

.SearchResult {
  display: block;
  /* show and hide with block or none */
  background-color: transparent;
  position: absolute;
  margin-top: 30px;
  margin-left: 1em;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100%;
  width: 100%;
}

.SearchResult h1 {
  color: white;
}
</style>