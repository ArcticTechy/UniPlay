// ahh yeah our callback api also know as getting our access token
// first of all an eventhandler that passes our event to the funktion
export default eventHandler(async (event) => {
    // read the acesscode from our adress bar that we got from spotify in login api
    // and the state that we crated so that we can check that they match // not yet implemented ooops User safty
    const  { acesscode, state }  = await readBody(event);
    // Get out ClientID, ClientSecret, Redirect link from our .env file (Again if you don't have one you have to make one for this to work)
    // Also that again asume that you read the login api first lol
    const { spotifyClientID, spotifyClientSecret, spotifyRedirect } = useRuntimeConfig();
    // makes a constant that holds the spotify token api link
    const spotifyTokenApiUrl = 'https://accounts.spotify.com/api/token'
    // creates a constant the holds the information that we give to spotify from the user to login like there acess code and our ClientSecret
    const authOptions = {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(spotifyClientID + ':' + spotifyClientSecret).toString('base64')),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: acesscode,
          redirect_uri: spotifyRedirect,
          scope: 'app-remote-control playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public streaming user-follow-modify user-follow-read user-library-read user-library-modify user-read-email user-read-private user-top-read ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played'
        })
      };
      // husk tilføj state tjek så brugere ikke kan logge ind på andens konto ved en fejl.
      // crates a GetToken const funktion that runs async to fetch (getting) our tokens in this case Refresj and access tokens
   const GetToken = async() =>{
    return fetch(spotifyTokenApiUrl, authOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data.access_token)
            return data
        }).catch(error => {
    console.error(error);
  });
}    
  //Return the Tokens to the user logging in
  return GetToken()
  })