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
    const scope = 'user-read-private user-read-email';
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