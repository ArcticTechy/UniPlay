

<script setup lang="ts">


const { data: host } = await useFetch('/api/audius/host', {
    method: 'POST',
})


const headers = {
    'Accept': 'application/json'
};
VIRK();

const songID = ref();
const streamUrl = ref()
async function VIRK() {
// Search query skal kunne ændres med en search bar. Hello darling er test værdi.
    const searchQuery = "Hello darling";
    await fetch(host.value + '/v1/tracks/search?query=' + searchQuery + ' b2b&app_name=UniPlay',
        {
            method: 'GET',
    
            headers: headers
        })
        .then(function (res) {
            return res.json();
        }).then(function (body) {
            console.log(body);
            songID.value = body.data[0].id
            console.log(songID.value);
            console.log(host.value + '/v1/tracks/' + songID.value + '/stream?app_name=UniPlay');
            streamUrl.value = host.value + '/v1/tracks/' + songID.value + '/stream?app_name=UniPlay';
            streamTrack()
        });
    }



async function streamTrack() {
  // Track info
  const trackInfo = await fetch(host.value + '/v1/tracks/'+songID.value+'?app_name=UniPlay').then(res => res.json());
  // Check at det rigtige track er fundet
  console.log(trackInfo)
  // Nyt Audio element
  const audio = new Audio(streamUrl.value);
  // Play track
  audio.play();
}

</script>