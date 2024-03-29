

export default defineNuxtPlugin(async nuxtApp => {
    var curr_track = document.createElement('audio');
    const streamUrl = ref("");
    const duration = ref(0)
    const posistion = ref(0)
    const albumImage = ref("")
    const title = ref("")
    const artist = ref([])
    const host = await $fetch('/api/audius/host/', {
        method: 'POST'
    })
    async function StreamSong(songID, songName) {
        const { data: notdata } = await useFetch(
            // Pass the URL as a string or a ref
            host + '/v1/tracks/' + songID + '?app_name=UniPlay',
            // Pass any additional options
            {
              method: 'GET', // The request method
              headers: { 'Content-Type': 'application/json' }, // The request headers
              // Any other options supported by unjs/ofetch
            }
          )
        albumImage.value = notdata.value.data.artwork['150x150'];
        artist.value = [notdata.value.data.user.name];
    streamUrl.value = host + '/v1/tracks/' + songID + '/stream?app_name=UniPlay';
    curr_track.src = streamUrl.value;
    title.value = songName;
    curr_track.load();
    curr_track.play();
    paused.value = true;
}
curr_track.addEventListener('loadedmetadata', function() {
    duration.value = Math.trunc(curr_track.duration);
});

curr_track.addEventListener('timeupdate', function () {
    posistion.value = Math.trunc(curr_track.currentTime);
});

function togglePlay() {
    paused.value = curr_track.paused
    if (curr_track.paused)
        curr_track.play();
    else curr_track.pause();
}
const paused = ref(curr_track.paused)

return {
    provide: {
        AudiusPlayer: {
            StreamSong: (songID, songName) => StreamSong(songID, songName),
            togglePlay: () => togglePlay(),
            isPlaying: computed(() => !paused.value),
            setVolume: (volume) => curr_track.volume = volume,
            position: computed(() => posistion.value),
            duration: computed(() => duration.value),
            seek: (seekposition) => curr_track.currentTime = seekposition,
            name: computed(() => title.value),
            albumImage: computed(() => albumImage.value),
            artists: computed(()=> artist.value)
        }
    }
}
})