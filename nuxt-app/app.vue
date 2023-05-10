<template>
  <div>
    <div v-if="!loggedIn && path != '/callback/spotify'">
      <section>
        <div class='air air1'></div>
        <div class='air air2'></div>
        <div class='air air3'></div>
        <div class='air air4'></div>
      </section>
      <div id="Welcome">
        <h1>Welcome to UniPlay</h1>
        <p>Login to start listening </p>
      </div>
      <div class="loginOptions">
        <div id="LoginSpotify">
          <p @click="LoginSpotify">Login With </p>
          <font-awesome-icon icon="fa-brands fa-spotify" style="font-size: 2.8em; color: #1DB954;" />
        </div>
      </div>
    </div>

    <NuxtLayout name="player" v-if="loggedIn || path === '/callback/spotify'">
      <div class="PageView">
        <ClientOnly>
          <NuxtPage />
        </ClientOnly>
      </div>
    </NuxtLayout>
  </div>
</template>


<script setup lang="ts">
const route = useRoute();
const path = route.path;
const LoginSpotify = () => window.location.href = "/api/spotify/login";
const accessToken = useCookie('spotify_access_token')
const loggedIn = ref(false)

if (accessToken.value != null && accessToken.value != undefined) {
  loggedIn.value = true;
} else
  loggedIn.value = false;


</script>
<style>
/* background */
section {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #4d1585;
  overflow: hidden;
}

section .air {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('./assets/loginscreen/wave.png');
  background-size: 1000px 100px;
}

section .air.air1 {
  animation: wave 30s linear infinite;
  z-index: 1000;
  opacity: 1;
  animation-delay: 0s;
  bottom: 0;
}

section .air.air2 {
  animation: wave2 15s linear infinite;
  z-index: 999;
  opacity: 0.5;
  animation-delay: -5s;
  bottom: 10px;
}

section .air.air3 {
  animation: wave 30s linear infinite;
  z-index: 998;
  opacity: 0.2;
  animation-delay: -2s;
  bottom: 15px;
}

section .air.air4 {
  animation: wave2 5s linear infinite;
  z-index: 997;
  opacity: 0.7;
  animation-delay: -5s;
  bottom: 20px;
}

@keyframes wave {
  0% {
    background-position-x: 0px;
  }

  100% {
    background-position-x: 1000px;
  }
}

@keyframes wave2 {
  0% {
    background-position-x: 0px;
  }

  100% {
    background-position-x: -1000px;
  }
}




body {
  margin: 0;
  background-color: #383838;
}

.PageView {
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
    height: 100%;
  background-color: #05000070;
}

.loginOptions {
  width: 100%;
  display: flex;
  justify-content: center;
}

#LoginSpotify {
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5e5e5;
  margin: 0 auto;
  padding: 10px;
  width: 150px;
  height: 50px;
  border-radius: 10px;
}

#LoginSpotify p {
  padding-right: 10px;
}

#Welcome {
  position: absolute;
  text-align: center;
  top: 35%;
  width: 100%;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}</style>