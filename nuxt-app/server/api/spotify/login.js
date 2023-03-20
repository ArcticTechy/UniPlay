// laver en string med tilfældige tegn fra charset arrayet i den længde som brugeren vælger. 
function getRandomString(length) {
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += charset[Math.floor(Math.random() * charset.length)];
    }
    return result;
  }
// uses nuxt event handler to run some code once /api/spotify is called in the browser.
export default defineEventHandler(async (event) => {
    // gets our ClientID and spotifyRedirect link from our .env (If you don't have one make one it does not sync with github for safty)
    const { spotifyClientID, spotifyRedirect } = useRuntimeConfig();
    // crates a state values using our string generator this allows us to check that we have the corrent user later in the process
    // in other words safty
    const state = getRandomString(16);
    // crates a scope the scope tells spotify what we want to control and we choose everything because of the nature of the app
    const scope = 'app-remote-control playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public streaming user-follow-modify user-follow-read user-library-read user-library-modify user-read-email user-read-private user-top-read ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played';
    // crate a const that holds the api link togther with with our parameters to create a login link for the user to use
    const returnUrl = ('https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: spotifyClientID,
      scope: scope,
      redirect_uri: spotifyRedirect,
      state: state
    }))
    // sends the user to our new link allowing them to login   
    return sendRedirect(event, returnUrl, 307);

})