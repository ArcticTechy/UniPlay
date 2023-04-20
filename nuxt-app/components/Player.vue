<template>
    <ClientOnly>
        <div class="bg-container">
            <div class="temp" :style="{ backgroundImage: `url('${MainPlayer.currentTrackImage}')` }">
            </div>
        </div>
        <div class="Player-container">
            <div class="left">
                <img v-bind:src="MainPlayer.currentTrackImage">
                <div class="grid-stack">
                    <h1 id="Song-title">{{ MainPlayer.songTitle }}</h1>
                    <div class="artits">
                        <!-- prints names of the artites that are in the song uses class artists to design -->
                        <template v-for="(item, index) in MainPlayer.artists">
                            <NuxtLink class="artist" v-if="index == MainPlayer.artists.length - 1"
                                :to="`/spotify/artist?id=${item.id.value}`">
                                {{
                                    item.name
                                }} </NuxtLink>
                            <NuxtLink class="artist" v-if="index != MainPlayer.artists.length - 1"
                                :to="`/spotify/artist?id=${item.id.value}`">
                                {{
                                    item.name
                                }}, </NuxtLink>
                        </template>
                    </div>
                </div>
            </div>
            <div class="middle">
                <div>
                    <button id="shuffle">
                        <font-awesome-icon icon="fa-solid fa-shuffle" style="color: #ffffff; font-size: 20px;" />
                    </button>
                    <button id="prevSong" @click="MainPlayer.prevSong()">
                        <font-awesome-icon icon="fa-solid fa-forward-step"
                            style="color: #ffffff; font-size: 25px; transform: rotate(180deg);" />
                    </button>
                    <button id="pause-play" @click="MainPlayer.togglePlay()">
                        <font-awesome-icon v-if="$spotifyPlayer.paused.value" icon="fa-solid fa-play"
                            style=" font-size: 30px;" />
                        <font-awesome-icon v-else icon="fa-solid fa-pause" style=" font-size: 30px;" />
                    </button>
                    <button id="nextSong" @click="MainPlayer.nextSong()">
                        <font-awesome-icon icon="fa-solid fa-forward-step" style="color: #ffffff; font-size: 25px;" />
                    </button>
                    <button id="repeat">
                        <font-awesome-icon icon="fa-solid fa-repeat" style="color: #ffffff; font-size: 20px;" />
                    </button>
                </div>
                <div>
                    <p class="durationTime">{{ MainPlayer.position.hours.value }}:{{ MainPlayer.position.minutes.value }}:{{
                        MainPlayer.position.seconds.value }}</p>
                    <input v-model="progressBar" @input="moveGraditentOnInput" @change="MainPlayer.seekPosition"
                        :style="rangeStyle" id="playerProgress" type="range" min="0" :max="MainPlayer.duration.value.value">
                    <p class="durationTime">{{ MainPlayer.duration.hours.value }}:{{ MainPlayer.duration.minutes.value }}:{{
                        MainPlayer.duration.seconds.value }}</p>
                </div>
            </div>
            <div class="right">
                <div class="volumeControl pressed">
                    <button>
                        <font-awesome-icon icon="fa-solid fa-volume-low" style="font-size: 1.4em; color: #ffffff;" />
                    </button>
                    <input type="range" @input="MainPlayer.setVolume">
                    <button>
                        <font-awesome-icon icon="fa-solid fa-volume-high" style="font-size: 1.4em; color: #ffffff;" />
                    </button>
                </div>
                <!-- Add class pressed to show all buttons at once -->
                <div class="platforms">
                    <button id="Spotify" :class="{ activePlatform: MainPlayer.GetMusicService == 'Spotify' }">
                        <font-awesome-icon icon="fa-brands fa-spotify" style="font-size: 2.8em; color: #1DB954;" />
                    </button>
                    <button id="Audius" :class="{ activePlatform: MainPlayer.GetMusicService == 'Audius' }">
                        <img src="~/assets/audius/Glyph_White.svg">
                    </button>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { ChangeEvent } from 'rollup';
import { InputObject } from 'untyped';
const { $spotifyPlayer } = useNuxtApp();

//Update spotify vol once a sec to stay in sync
const spotifyVolume = ref(0)

// universal player code
// a player class that makes it super easy to change the entire player to a new music service in one command
class Player {
    cms: string;
    volume: number = 0;
    constructor(currentMusicService: string) {
        this.cms = currentMusicService;
    }
    set SetMusicService(currentMusicService: string) {
        this.cms = currentMusicService;
    }
    get GetMusicService() {
        return this.cms;
    }
    get songTitle(): string {
        switch (this.cms) {
            case "Spotify":
                return $spotifyPlayer.current_track.value.name;
                break;
            case "Audius":
                // togglePlay Function here
                return "Not implemented";
                break;
            case "none":
                return "Nothings playing";
                break;
            default:
                return "Nothings playing";
        }
    }
    get currentTrackImage() {
        switch (this.cms) {
            case "Spotify":
                return $spotifyPlayer.current_track.value.album.images[0].url;
                break;
            case "Audius":
                // togglePlay Function here
                return "Not implemented";
                break;
            case "none":
                return "https://cdn3.iconfinder.com/data/icons/pyconic-icons-3-1/512/cd-512.png";
                break;
            default:
                return "https://cdn3.iconfinder.com/data/icons/pyconic-icons-3-1/512/cd-512.png";
        }
    }
    get artists() {
        let artist: { name: string; uri: string; id: any; }[] = []
        switch (this.cms) {
            case "Spotify":
                $spotifyPlayer.current_track.value.artists.forEach(element => {
                    artist.push({
                        name: element.name,
                        uri: element.uri,
                        id: computed(() => {
                            return element.uri.slice(element.uri.lastIndexOf(":") + 1);
                        })
                    })
                })
                return artist
                break;
            case "Audius":
                // togglePlay Function here
                return artist
                break;
            case "none":
                return artist
                break;
            default:
                return artist
        }
    }
    get position() {
        switch (this.cms) {
            case 'Spotify':
                return {
                    value: computed(() => Number(spotifyUpdaingPos.value)),
                    hours: computed(() => {
                        const hours = Math.floor((spotifyUpdaingPos.value / 1000) / 3600);
                        return hours < 10 ? '0' + hours : hours.toString();
                    }),
                    minutes: computed(() => {
                        const minutes = Math.floor(((spotifyUpdaingPos.value / 1000) % 3600) / 60);
                        return minutes < 10 ? '0' + minutes : minutes.toString();
                    }),
                    seconds: computed(() => {
                        const seconds = Math.floor((spotifyUpdaingPos.value / 1000) % 60);
                        return seconds < 10 ? '0' + seconds : seconds.toString();
                    })
                };
            case 'Audius':
                // togglePlay Function here
                return {
                    value: computed(() => 0),
                    hours: computed(() => 0),
                    minutes: computed(() => 0),
                    seconds: computed(() => 0)
                };
            case 'none':
                return {
                    value: computed(() => 0),
                    hours: computed(() => 0),
                    minutes: computed(() => 0),
                    seconds: computed(() => 0)
                };
            default:
                return {
                    value: computed(() => 0),
                    hours: computed(() => 0),
                    minutes: computed(() => 0),
                    seconds: computed(() => 0)
                };
        }
    }
    get duration() {
        switch (this.cms) {
            case 'Spotify':
                return {
                    value: computed(() => Number($spotifyPlayer.duration.value)),
                    hours: computed(() => {
                        const hours = Math.floor((Number($spotifyPlayer.duration.value) / 1000) / 3600);
                        return hours < 10 ? '0' + hours : hours.toString();
                    }),
                    minutes: computed(() => {
                        const minutes = Math.floor(((Number($spotifyPlayer.duration.value) / 1000) % 3600) / 60);
                        return minutes < 10 ? '0' + minutes : minutes.toString();
                    }),
                    seconds: computed(() => {
                        const seconds = Math.floor((Number($spotifyPlayer.duration.value) / 1000) % 60);
                        return seconds < 10 ? '0' + seconds : seconds.toString();
                    })
                };
            case 'Audius':
                // togglePlay Function here
                return {
                    value: computed(() => 0),
                    hours: computed(() => 0),
                    minutes: computed(() => 0),
                    seconds: computed(() => 0)
                };
            case 'none':
                return {
                    value: computed(() => 0),
                    hours: computed(() => 0),
                    minutes: computed(() => 0),
                    seconds: computed(() => 0)
                };
            default:
                return {
                    value: computed(() => 0),
                    hours: computed(() => 0),
                    minutes: computed(() => 0),
                    seconds: computed(() => 0)
                };
        }
    }
    get currentVolume(): number {
        switch (this.cms) {
            case "Spotify":
                return spotifyVolume.value;
                break;
            case "Audius":
                // togglePlay Function here
                return 0;
                break;
            case "none":
                return 0;
                break;
            default:
                return 0;
        }
    }


    togglePlay() {
        switch (this.cms) {
            case "Spotify":
                $spotifyPlayer.togglePlay()
                break;
            case "Audius":
                // togglePlay Function here
                break;
            case "none":
                console.log("No service playing")
                break;
        }
    }
    nextSong() {
        switch (this.cms) {
            case "Spotify":
                $spotifyPlayer.nextTrack()
                break;
            case "Audius":
                // togglePlay Function here
                break;
            case "none":
                console.log("No service playing")
                break;
        }
    }
    prevSong() {
        switch (this.cms) {
            case "Spotify":
                $spotifyPlayer.previousTrack()
                break;
            case "Audius":
                // togglePlay Function here
                break;
            case "none":
                console.log("No service playing")
                break;
        }
    }
    seekPosition(e: Event) {
        switch (this.cms) {
            case "Spotify":
                $spotifyPlayer.seek((e.target as HTMLInputElement).value)
                break;
            case "Audius":
                // togglePlay Function here
                break;
            case "none":
                console.log("No service playing")
                break;
        }
    }
    setVolume(e: Event) {
        $spotifyPlayer.setVolume((Number((e.target as HTMLInputElement).value) / 100))
    }

}

const MainPlayer = new Player("Spotify")

// Laver et interval på 1s vi bruger det til at updatere process linjen & spotifys postion without called the sdk all the time
setInterval(() => {
    updateSpotifyPosition()
    PlayerProgressInProcent()
    $spotifyPlayer.getVolume().then((v: any) => {
        spotifyVolume.value = v;
    })
}, 1000)

// update spotify postion on update from spotify playback sdk
const spotifyUpdaingPos = ref(0);
watch($spotifyPlayer.position, () => {
    spotifyUpdaingPos.value = Number($spotifyPlayer.position.value);
})
// update the spotify position once a sec
function updateSpotifyPosition() {
    spotifyUpdaingPos.value += $spotifyPlayer.paused.value ? 0 : 1000, 1000
}

// Progresbar code
// const used to change the position of the Progress Bar
const playerProgressInProcent = ref()
const progressBar = ref()

function moveGraditentOnInput(e: Event) {
    playerProgressInProcent.value = (Number((e.target as HTMLInputElement).value) / MainPlayer.duration.value.value) * 100;
}

function PlayerProgressInProcent() {
    playerProgressInProcent.value = (MainPlayer.position.value.value / MainPlayer.duration.value.value) * 100;
    progressBar.value = MainPlayer.position.value.value;
}
const rangeStyle = computed(() => ({
    background: `linear-gradient(to right, #3940E9 0%, #3940E9 ${playerProgressInProcent.value}%,
    white ${playerProgressInProcent.value}%, white 100%)`
}));
</script>

<style>
/* Background */
.bg-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;
}

.temp {
    width: 120%;
    height: 120%;
    margin-top: -120px;
    margin-left: -120px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(10px);
    -webkit-filter: blur(10px);
    background-color: rebeccapurple;
}

.Player-container {
    background-color: #000000b0;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    display: flex;
    flex-basis: 100%;
    align-items: center;
    justify-content: 'space-between';
    backdrop-filter: blur(15px);
}

.Player-container>* {
    flex-basis: 100%;
    width: 100%;
}

/* Style for left element */
.left {
    display: flex;
    align-items: center;
    height: 6em;
    overflow: hidden;
}

.grid-stack {
    position: relative;
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-rows: repeat(2, 50%);
    overflow: hidden;
}

.grid-stack>* {
    padding-left: 10px;
}

.grid-stack h1 {
    grid-column: 1 / 2;
    color: white;
    font-family: 'lora', sans-serif;
    font-size: 20px;
    text-overflow: clip;
    white-space: nowrap;
}

.grid-stack a {
    grid-column: 2 / 3;
    color: white;
    text-decoration: none;
    font-family: 'lora', sans-serif;
    font-size: 16px;
}

.grid-stack a:hover {
    text-decoration: underline;
}

.Player-container .left img {
    height: 100%;
}

/* style for middle element */
.middle {
    height: 6em;
    overflow: hidden;
    display: grid;
    grid-template-rows: 2fr 1fr;
    width: 100%;
}

.middle div:first-child {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 7px;
}

.middle div:first-child button {
    padding: 15px;
    background-color: transparent;
    border: none;
    width: 4.5em;
    height: 4.5em;
}

.middle div:last-child {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: -7px;
}

.middle div:last-child p {
    font-size: 0.8em;
    color: white;
}

.middle div:last-child input {
    width: 100%;
}

/* Customizing the input range */
#playerProgress {
    background: white;
    border: solid 1px black;
    border-radius: 8px;
    height: 7px;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
}

#playerProgress::-webkit-slider-thumb {
    appearance: none;
}

#playerProgress:hover::-webkit-slider-thumb {
    appearance: auto;
}

#playerProgress::-moz-range-thumb {
    display: none;
}

#playerProgress:hover::-moz-range-thumb {
    display: block;
}

/* Icons for buttons */
.middle div button:nth-child(3) {
    border-radius: 100%;
    background: white;
}

.middle div button:nth-child(3) .playerIcons {
    size: 10px;
}

/* Style for the right side of the player */
.right {
    display: flex;
    justify-content: right;
    margin-left: auto;
}

.right .volumeControl {
    padding-right: 6em;
}

.right .volumeControl button {
    padding: 15px;
    background-color: transparent;
    border-radius: 10px;
    border: none;
    width: 5em;
    height: 5em;
}


.right .platforms button {
    display: none;
    background-color: #000000dc;
    padding: 15px;
    border: none;
    width: 5em;
    height: 5em;
}

.right .platforms.pressed button:first-child {
    border-radius: 0 0 10px 10px;
}

.right .platforms.pressed button:last-child {
    border-radius: 10px 10px 0 0;
}

.right .platforms button:first-child {
    border-radius: 10px;
}

.right .platforms.pressed button {
    display: inline-block;
}

.right .platforms button:is(.activePlatform) {
    right: 2em;
    order: 10;
    display: inline-block;
}

.platforms {
    position: absolute;
    justify-content: end;
    order: 0;
    transform: translateY(-100%);
    top: 85%;
    display: flex;
    flex-direction: column;
    width: 5em;
    z-index: -1;
}</style>