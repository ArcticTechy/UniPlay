//load the spotify playbacksdk by adding it to the headtag
const script = document.createElement("script");
script.src = "https://sdk.scdn.co/spotify-player.js";
script.async = true;
document.body.appendChild(script);
// uses the defineNuxtPlugin funktion from Nuxt to create the plugin and allow us to control it using useNuxtApp();
export default defineNuxtPlugin(nuxtApp => {
  //making values outside the of the onSpotifyWebPlaybackSDKReady to export values from it
  const token = useCookie('spotify_access_token')
  const refreshToken = useCookie('spotify_refresh_token').value;
  const expiresIn = useCookie('spotify_expires_in').value;
 let deviceID


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
  const Position = ref("")
  const Duration = ref("")
  const Paused = ref("")
  
    // code in this tag runs when the spotify playback sdk is fully loaded
  window.onSpotifyWebPlaybackSDKReady = () => {
    // Get spotify_access_token cookie that we made in /callback/[platform](Spotify)

    // Check if cookie exists and creates a spotify player if that is the case
    if (token.value) {
      spotifyPlayer.value = new Spotify.Player({
        name: 'UniPlay',
        getOAuthToken: async cb => { 
          // sets the token using a javascript callback function (My head hurts)
          const { data: newAccessToken } = await useFetch('/api/spotify/refresh', {
            method: 'POST',
            body: {
              refreshToken: refreshToken,
            }
          })
          token.value = newAccessToken.value.access_token;
          cb(newAccessToken.value.access_token); 
        },
        volume: 0.5
      });
      // Add event listeners
      // logs in the that the playback device is ready when it is togther with its id
      spotifyPlayer.value.addListener('ready', async ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        // useCookie("deviceID", {
        //   paths: "/"
        // }).value = device_id;
        // nuxtApp.useCookie('deviceID', device_id)
        deviceID = device_id;
      });
      /* Gives us values for Paused, posistion, duration, and track info when the play changes state
         changing state mean volume, play/pause, new track and so on  */
      spotifyPlayer.value.addListener('player_state_changed', ({
        paused,
        position,
        duration,
        track_window: { current_track }
      }) => {
        /* pass the info from the state change to us trough the values we made earlier since we are otherwish unable to
           get the values out */
        Paused.value = paused;
        currentTrack.value = current_track;
        Position.value = position;
        Duration.value = duration;
      });

      // TODO: Add more event listeners !!!

      // Connect player
      spotifyPlayer.value.connect();
    };
  }
  // creates functions that runs once we call the provided values since we cant call it directly in the object
  const togglePlay = () => { spotifyPlayer.value.togglePlay() }
  const previousTrack = () => { spotifyPlayer.value.previousTrack() }
  const nextTrack = () => { spotifyPlayer.value.nextTrack() }
  const setVolume = (volume) => { spotifyPlayer.value.setVolume(volume) }
  const getVolume = () => spotifyPlayer.value.getVolume().then(volume => {return volume})
  const seek = (position) => { spotifyPlayer.value.seek(position) }

  // Return all the exposed funktions and values, we use computed on values that need to be update
  // like position as otherwish they wont update in the app.
  return {
    provide: {
      spotifyPlayer: {
        togglePlay: () => togglePlay(),
        nextTrack: () => nextTrack(),
        previousTrack: () => previousTrack(),
        refreshTokenIn: (time) => refreshTokenIn(time),
        setVolume: (volume) => setVolume(volume),
        getVolume: () => getVolume(),
        seek: (position) => seek(position),
        current_track: computed(() => currentTrack.value),
        position: computed(() => Position.value),
        duration: computed(() => Duration.value),
        paused: computed(() => Paused.value),
      },
      deviceID: computed(() => deviceID)
    }
  }
})