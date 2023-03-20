export default eventHandler(async (event) => {
    
    const  { acesscode, state }  = await readBody(event);
    const { spotifyClientID, spotifyClientSecret, spotifyRedirect } = useRuntimeConfig();
    const spotifyTokenApiUrl = 'https://accounts.spotify.com/api/token'
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

   const GetToken = async() =>{
    return fetch('https://accounts.spotify.com/api/token', authOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data.access_token)
            return data
        }).catch(error => {
    console.error(error);
  });
}    

  console.log("date " +GetToken())
  return GetToken()
  })