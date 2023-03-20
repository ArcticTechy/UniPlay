<template>
    <img v-bind:src="$spotifyPlayer.current_track.value.album.images[0].url">
    <h1> {{ $spotifyPlayer.current_track.value.name }}</h1>
    <p>by</p>
    <p v-for="name in $spotifyPlayer.current_track.value.artists"> {{ name.name }}</p>
    <p> {{ position.positionOnlyMin }}:{{ position.positionOnlySec }}</p>
    <p>{{ duration.durationOnlyMin }}:{{ duration.durationOnlySec }}</p>
    <input type="range" v-model="seekPosition" @click="ChangePostion()" min="0" :max="$spotifyPlayer.duration.value" />
    <button @click="pause">pause</button>
    <button @click="$spotifyPlayer.nextTrack()">Next Track</button>
    <input type="range" v-model="volumeValue" @change="volumeChange()" min="0" max="100" />
</template>

<script setup lang="ts">
    // gets our plugins public values that allows us to control the spotify player everywhere in the app even though its client only
    const { $spotifyPlayer } = useNuxtApp();
    // values used for setting volume and position on the progress bar
    const volumeValue = ref(50)
    const seekPosition = ref()
    // gets the duration of the song from spotify and make it easier to read and splits it in secound and minuties
    const duration = ref({
      durationMs: $spotifyPlayer.duration.value,
      durationOnlySec: computed(() => Math.floor(($spotifyPlayer.duration.value/1000)%60) < 10 ? "0" + Math.floor(($spotifyPlayer.duration.value/1000)%60) : Math.floor(($spotifyPlayer.duration.value/1000)%60)),
      durationOnlyMin: computed(() => Math.floor(($spotifyPlayer.duration.value/1000)/60) < 10 ? "0" + Math.floor(($spotifyPlayer.duration.value/1000)/60) : Math.floor(($spotifyPlayer.duration.value/1000)/60)),
    })
    // same but for position and we use a differnt value for holding the live updating position
    const position = ref({
      positionOnlySec: computed(() => Math.floor((UpdaingPositionValue.value/1000)%60) < 10 ? "0" + Math.floor((UpdaingPositionValue.value/1000)%60) : Math.floor((UpdaingPositionValue.value/1000)%60)),
      positionOnlyMin: computed(() => Math.floor((UpdaingPositionValue.value/1000)/60) < 10 ? "0" + Math.floor((UpdaingPositionValue.value/1000)/60) : Math.floor((UpdaingPositionValue.value/1000)/60)),
    })
    // function that runs everytime the volunme bar is changed
    function volumeChange() {
      $spotifyPlayer.setVolume(volumeValue.value/100)
    }
    //chnage the positions in the song based on the progess bar
    function ChangePostion() {
      $spotifyPlayer.seek(seekPosition.value);
    }
    // watches if the postion changes its value and then moves the seek bar to the right location
    watch($spotifyPlayer.position, () => {
      seekPosition.value = $spotifyPlayer.position.value;
      UpdaingPositionValue.value = $spotifyPlayer.position.value;
    })
    //value that is updated once a sec to move the progress bar
    const UpdaingPositionValue = ref();
    // an interval that runs once a secound if the music is not paused and there by making the progress time and bar go up
    // without calling the api every secound
    setInterval(()=>{
      UpdaingPositionValue.value += $spotifyPlayer.paused.value ? 0 : 1000, 1000
      seekPosition.value = UpdaingPositionValue.value
    }, 1000)
    // run when the user presses pause to play/pause
    function pause() {
      $spotifyPlayer.togglePlay()
    }

</script>