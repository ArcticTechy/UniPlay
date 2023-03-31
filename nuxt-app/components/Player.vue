<template>
    <div class="temp">
        <div class="Player-container">
            <div class="left">
                <img v-bind:src="$spotifyPlayer.current_track.value.album.images[0].url">
                <div class="grid-stack">
                    <h1 id="Song-title">{{ songTitle }}</h1>
                    <div class="artits">
                        <!-- prints names of the artites that are in the song uses class artists to design -->
                        <template v-for="(item, index) in $spotifyPlayer.current_track.value.artists">
                            <NuxtLink class="artist" v-if="index == $spotifyPlayer.current_track.value.artists.length - 1"
                                to="/">
                                {{
                                    item.name
                                }} </NuxtLink>
                            <NuxtLink class="artist" v-if="index != $spotifyPlayer.current_track.value.artists.length - 1"
                                to="/">
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
                    <button id="prevSong">
                        <font-awesome-icon icon="fa-solid fa-forward-step"
                            style="color: #ffffff; font-size: 25px; transform: rotate(180deg);" />
                    </button>
                    <button id="pause-play" @click="$spotifyPlayer.togglePlay()">
                        <font-awesome-icon v-if="$spotifyPlayer.paused.value" icon="fa-solid fa-play"
                            style=" font-size: 30px;" />
                        <font-awesome-icon v-else icon="fa-solid fa-pause" style=" font-size: 30px;" />
                    </button>
                    <button id="nextSong">
                        <font-awesome-icon icon="fa-solid fa-forward-step" style="color: #ffffff; font-size: 25px;" />
                    </button>
                    <button id="repeat">
                        <font-awesome-icon icon="fa-solid fa-repeat" style="color: #ffffff; font-size: 20px;" />
                    </button>
                </div>
                <div>
                    <p class="durationTime">{{ position.positionOnlyMin }}:{{ position.positionOnlySec }}</p>
                    <input v-model="playerProgressProcent" :style="rangeStyle" id="playerProgress"
                        type="range">
                    <p class="durationTime">{{ duration.durationOnlyMin }}:{{ duration.durationOnlySec }}</p>
                </div>
            </div>
            <div class="right">
                <button id="platform"></button>
                <div id="platforms">
                    <button id="spotify"></button>
                    <button id="Audition"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Input } from 'postcss';
import { InputObject } from 'untyped';

//const used to display information from the player
const songTitle = ref("temp")

const { $spotifyPlayer } = useNuxtApp();
// Laver et interval på 1s vi bruger det til at updatere process linjen
setInterval(() => {
    PlayerProgressProcent()
}, 1000)

// Progresbar code
// Updates the postion of the process bar to reflect the postion from spotify when changed
watch($spotifyPlayer.current_track, () => {
    songTitle.value = $spotifyPlayer.current_track.value.name;
})

watch($spotifyPlayer.position, () => {
    UpdaingPositionValue.value = $spotifyPlayer.position.value;
})

const rangeStyle = computed(() => ({
  background: `linear-gradient(to right, #3940E9 0%, #3940E9 ${playerProgressProcent.value}%, white ${playerProgressProcent.value}%, white 100%)`
}));
// const used to change the position of the Progress Bar
const playerProgressProcent = ref()
// updates the position of our playerProgressProcent once a secound using the interval
function PlayerProgressProcent() {
    UpdaingPositionValue.value += $spotifyPlayer.paused.value ? 0 : 1000, 1000
    playerProgressProcent.value = (Number(UpdaingPositionValue.value) / Number($spotifyPlayer.duration.value)) * 100
}
// Gives us a readble time stamp for spotify (forNow)
const duration = ref({
    durationMs: $spotifyPlayer.duration.value,
    durationOnlySec: computed(() => Math.floor((Number($spotifyPlayer.duration.value) / 1000) % 60) < 10 ? "0" + Math.floor((Number($spotifyPlayer.duration.value) / 1000) % 60) : Math.floor((Number($spotifyPlayer.duration.value) / 1000) % 60)),
    durationOnlyMin: computed(() => Math.floor((Number($spotifyPlayer.duration.value) / 1000) / 60) < 10 ? "0" + Math.floor((Number($spotifyPlayer.duration.value) / 1000) / 60) : Math.floor((Number($spotifyPlayer.duration.value) / 1000) / 60)),
})
// same but for position and we use a differnt value for holding the live updating position
const UpdaingPositionValue = ref();
const position = ref({
    positionOnlySec: computed(() => Math.floor((UpdaingPositionValue.value / 1000) % 60) < 10 ? "0" + Math.floor((UpdaingPositionValue.value / 1000) % 60) : Math.floor((UpdaingPositionValue.value / 1000) % 60)),
    positionOnlyMin: computed(() => Math.floor((UpdaingPositionValue.value / 1000) / 60) < 10 ? "0" + Math.floor((UpdaingPositionValue.value / 1000) / 60) : Math.floor((UpdaingPositionValue.value / 1000) / 60)),
})



</script>

<style>
/* Background */
.temp {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: rebeccapurple;
    background-image: url("https://images.freecreatives.com/wp-content/uploads/2016/04/Calm-Mountain-Lake-Landscape-Wallpaper.jpg");
}

.Player-container {
    background-color: #000000b0;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 6em;
    display: flex;
    flex-basis: 100%;
    overflow: hidden;
    align-items: center;
    justify-content: 'space-between';
    backdrop-filter: blur(15px);
}

.Player-container>* {
    flex-basis: 100%;
    width: 100%;
    height: 6em;
}

/* Style for left element */
.left {
    display: flex;
    align-items: center;
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

.artists:hover {
    text-decoration: underline;
}

.Player-container .left img {
    height: 6em
}

/* style for middle element */
.middle {
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
}</style>