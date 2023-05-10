

export default defineNuxtPlugin(async nuxtApp => {
    var curr_track = document.createElement('audio');
    const streamUrl = ref("");
    const duration = ref(0)
    const posistion = ref(0)
    const host = await $fetch('/api/audius/host/', {
        method: 'POST'
    })
    async function StreamSong(songID) {
        console.log(songID)
        streamUrl.value = host + '/v1/tracks/' + songID + '/stream?app_name=UniPlay';
        curr_track.src = streamUrl.value;
        curr_track.load();
        curr_track.play();
        paused.value = true;
    }

    curr_track.addEventListener('loadedmetadata', function() {
            duration.value = Math.trunc(curr_track.duration);
            console.log(duration.value);
      });

      curr_track.addEventListener('timeupdate', function() {
        posistion.value = Math.trunc(curr_track.currentTime);
  });

    function togglePlay() {
        paused.value = curr_track.paused
        if (curr_track.paused)
            curr_track.play();
        else curr_track.pause();
    }
    watch(curr_track, () => {
        console.log("Se mor det ikke en fase")
    })
    const paused = ref(curr_track.paused)

    return {
        provide: {
            AudiusPlayer: {
                StreamSong: (songID) => StreamSong(songID),
                togglePlay: () => togglePlay(),
                isPlaying: computed(() => !paused.value),
                setVolume: (volume) => curr_track.volume = volume,
                position: computed(() => posistion.value),
                duration: computed(() => duration.value),
                seek: (seekposition) => curr_track.currentTime = seekposition

            }
        }
    }
})