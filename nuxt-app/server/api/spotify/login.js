function getRandomString(length) {
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += charset[Math.floor(Math.random() * charset.length)];
    }
    return result;
  }
  
export default defineEventHandler(async (event) => {
    const { spotifyClientID, spotifyRedirect } = useRuntimeConfig();
    const state = getRandomString(16);
    const scope = 'app-remote-control playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public streaming user-follow-modify user-follow-read user-library-read user-library-modify user-read-email user-read-private user-top-read ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played';
    const returnUrl = ('https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: spotifyClientID,
      scope: scope,
      redirect_uri: spotifyRedirect,
      state: state
    }))
    console.log("hi")    
    return sendRedirect(event, returnUrl, 307);

})