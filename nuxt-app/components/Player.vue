<template>
    <div class="temp">
        <div class="Player-box">
            <div class="No-Overflow">
                <div class="current-song-img-container">
                    <img :src="$spotifyPlayer.current_track.value.album.images[0].url" />
                </div>
                <div class="Control">
                    <h1 Id="Title">{{ $spotifyPlayer.current_track.value.name }}</h1>
                    <div class="Song-Info">
                        <div>
                            <template v-for="(item, index) in $spotifyPlayer.current_track.value.artists">
                                <NuxtLink class="artists"
                                    v-if="index == $spotifyPlayer.current_track.value.artists.length - 1" to="/">{{
                                        item.name
                                    }} </NuxtLink>
                                <NuxtLink class="artists"
                                    v-if="index != $spotifyPlayer.current_track.value.artists.length - 1" to="/">{{
                                        item.name
                                    }}, </NuxtLink>
                            </template>
                        </div>
                    </div>
                    <div class="controls">
                        <button id="Prev" @click="$spotifyPlayer.previousTrack"></button>
                        <button id="PlayPause" @click="$spotifyPlayer.togglePlay"></button>
                        <button id="Next" @click="$spotifyPlayer.nextTrack"></button>
                    </div>
                </div>
                <div id="progressAmount" class="Progressbar" v-bind:style="{ width: playerProgressProcent + '%' }"></div>
            </div>
            <div class="Progressbar" @mouseover="processBarHover('on')" @mouseleave="processBarHover('off')">
                <input type="range" @mouseup="" @input="rangeChange" v-model="playerProgressProcent" min="0" max="100" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { InputObject } from 'untyped';

const { $spotifyPlayer } = useNuxtApp();
// Laver et interval på 1s vi bruger det til at updatere process linjen
setInterval(() => {
    PlayerProgressProcent()
}, 1000)


// Progresbar code
// Updates the postion of the process bar to reflect the postion from spotify when changed
watch($spotifyPlayer.position, () => {
    UpdaingPositionValue.value = $spotifyPlayer.position.value;
})
// funktion der gør så vores processbar bliver helt hvid når vi holder musen over
const processBarHover = (t: string) => {
    const doc = document.getElementById('progressAmount');
    if (t == "on" && doc != null) doc.style.backgroundColor = "white";
    else if (doc != null) doc.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
}

const rangeChange = (e: InputObject) => {
    if (e.target != null) {
        e.target.value
    }
}

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

.Player-box {
    position: absolute;
    backdrop-filter: blur(15px);
    background-color: rgba(34, 34, 34, 0.75);
    width: 620px;
    height: 140px;
    left: 10px;
    bottom: 10px;
    border-radius: 20px;
}

.Control {
    grid-area: Control;
}

.current-song-img-container {
    grid-area: Image;
}

.current-song-img-container img {
    grid-area: Image;
    width: auto;
    height: 140px;
    object-fit: fill;
    overflow: hidden;
}

.No-Overflow {
    overflow: hidden;
    position: relative;
    border-radius: 20px;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 140px 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas:
        "Image Control";

}

/* Title and artist */
#Title {
    font-size: 20px;
    color: white;
    padding-left: 20px;
}

.Song-Info {
    margin-left: 20px;
    overflow: hidden;
    width: 200px;
    height: 20px;
    display: inline-block;
    white-space: nowrap;
}


.artists {
    padding-right: 10px;
    color: white;
    text-decoration: none;
}

.artists:hover {
    text-decoration: underline;
}


/* css for progressbar */
.Progressbar input[type="range"]::-webkit-slider-thumb {
    position: relative;
    margin-left: 0px;
}


/* removes the default look of the input type range */
.Progressbar input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: 15rem;
}

/***** Track Styles *****/
/***** Chrome, Safari, Opera, and Edge Chromium *****/
.Progressbar input[type="range"]::-webkit-slider-runnable-track {
    position: absolute;
    bottom: 0px;
    left: -5px;
    height: 10px;
    width: 630px;
    background: none;
    height: 0.7rem;
}

/******** Firefox ********/
.Progressbar input[type="range"]::-moz-range-track {
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 10px;
    width: 630px;
    background: none;
    height: 0.7rem;
}

/***** Thumb Styles *****/
/***** Chrome, Safari, Opera, and Edge Chromium *****/
.Progressbar input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* Override default look */
    appearance: none;
    margin-top: -2px;
    /* Centers thumb on the track */
    background-color: #1f1f1f;
    height: 0;
    width: 0;
    border-radius: 100%;
}

.Progressbar:hover input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    /* Override default look */
    appearance: none;
    margin-top: -2px;
    /* Centers thumb on the track */
    background-color: #1f1f1f;
    height: 1rem;
    width: 1rem;
    border-radius: 100%;
}

.No-Overflow #progressAmount {
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    height: 0.6rem;
    width: 100%;
    bottom: 0px;
    left: 0px;
}
</style>