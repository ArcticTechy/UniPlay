import { faToggleOff } from "@fortawesome/free-solid-svg-icons";

export default defineNuxtPlugin(async nuxtApp => {
    let curr_track = document.createElement('audio');
    const streamUrl = ref("");
    const host = await $fetch('/api/audius/host/', {
        method: 'POST'
      })
    async function StreamSong(songID) {
        streamUrl.value = host + '/v1/tracks/' + songID + '/stream?app_name=UniPlay';
        curr_track.src = streamUrl.value;
        curr_track.load();
        curr_track.play();
    }
    function togglePlay() {
        if (curr_track.paused)
        curr_track.play();
        else curr_track.pause();
    }

    return {
        provide: {
            AudiusPlayer: {
                StreamSong: (songID) => StreamSong(songID),
                togglePlay: () => togglePlay()
            }
        }
    }
})