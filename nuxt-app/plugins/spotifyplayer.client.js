export default ({ app }, inject) => {
  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;
  document.body.appendChild(script);

  window.onSpotifyWebPlaybackSDKReady = () => {
    inject("spotify", window.Spotify);
  };
};