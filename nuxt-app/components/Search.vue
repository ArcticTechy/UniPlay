<template>

<input type="text" v-model="input" v-on:change="VIRK()" placeholder="Search...">
  <template v-for="(item, index) in songArr">
      <NuxtLink class="multiline" v-if="index < 10" to="/" @click ="$AudiusPlayer.StreamSong(songArr[index].id)">
<pre>
{{
item.title
}}
</pre>          
        </NuxtLink>
  </template>
  <button @click="$AudiusPlayer.togglePlay()">pause</button>
</template>


<style>
.multiline
{
word-wrap: break-word;
   white-space: pre-wrap;
}

</style>


<script setup lang="ts">

let input = ref("");
const { $AudiusPlayer } = useNuxtApp();



const host = await $fetch('/api/audius/host/', {
    method: 'POST'
  })
const songArr = ref(await TopSong())
let curr_track = document.createElement('audio');

const headers = {
    'Accept': 'application/json'
};

const top10Songs = ref();
const songID = ref();
const streamUrl = ref("");
const searchQuery = ref();
async function VIRK() {
    searchQuery.value = input.value;
    await fetch(host + '/v1/tracks/search?query=' + searchQuery.value + ' b2b&app_name=UniPlay',
    {
        method: 'GET',
        
        headers: headers
    })
    .then(function (res) {
        top10Songs.value = res.json();
        return top10Songs.value;
    }).then(function (body) {
        songArr.value = body.data;
    });
}

async function TopSong() {
    const res = await fetch(host + '/v1/tracks/trending?limit=1&timeRange=week')
    const json = await res.json()
    return json.data;
}
</script>