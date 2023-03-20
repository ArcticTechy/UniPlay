const script = document.createElement("script");
script.src = "https://sdk.scdn.co/spotify-player.js";
document.body.appendChild(script);

export default defineNuxtPlugin(nuxtApp => {
  const spotifyPlayer = ref();
  const currentTrack = ref({
    uri: "", // Spotify URI
    id: "",                // Spotify ID from URI (can be null)
    type: "",             // Content type: can be "track", "episode" or "ad"
    media_type: "",       // Type of file: can be "audio" or "video"
    name: "",         // Name of content
    is_playable: true,         // Flag indicating whether it can be played
    album: {
      uri: '', // Spotify Album URI
      name: '',
      images: [
        { url: "" }
      ]
    },
    artists: [
      { uri: '', name: "" }
    ]
  });

  window.onSpotifyWebPlaybackSDKReady = () => {
  // Get spotify_access_token cookie
  const token = useCookie('spotify_access_token')

  // Check if cookie exists
  if (token.value) {
    spotifyPlayer.value = new Spotify.Player({
      name: 'UniPlay',
      getOAuthToken: cb => { cb(token.value); },
      volume: 0.5
    });

    // Add event listeners
    spotifyPlayer.value.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    spotifyPlayer.value.addListener('player_state_changed', ({
      position,
      duration,
      track_window: { current_track }
    }) => {
      console.log('Currently Playing', current_track);
      currentTrack.value = current_track,
      console.log('Position in Song', position);
      console.log('Duration of Song', duration);
    });

    // TODO: Add more event listeners

    // Connect player
    spotifyPlayer.value.connect();
  };
}

    const togglePlay = () => {spotifyPlayer.value.togglePlay()}
    const previousTrack = () => {spotifyPlayer.value.previousTrack()}
    const nextTrack = () => {spotifyPlayer.value.nextTrack()}
    // Return player object
    return {
      provide: {
        spotifyPlayer: {
          togglePlay: () => togglePlay(),
          nextTrack: () => nextTrack(),
          previousTrack: () => previousTrack(),
          current_track: computed(() => currentTrack.value)
        }
      }
    }
})