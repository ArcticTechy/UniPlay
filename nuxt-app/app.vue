<template>
  <div>
    <button @click="LoginSpotify">Login</button>
    <NuxtLink to="/spotify/playlist"> test</NuxtLink>
    <NuxtLink to="/">home</NuxtLink>
    <NuxtLayout name="player">
      <div class="PageView">
        <ClientOnly>
          <NuxtPage />
        </ClientOnly>
      </div>

    </NuxtLayout>
    <div>
      Current route: <code>{{ route.path }}</code>
    </div>
  </div>
</template>


<script setup lang="ts">
const route = useRoute();
const LoginSpotify = () => window.location.href = "/api/spotify/login";


</script>
<style>
body {
  margin: 0;
}
.PageView {
  overflow-x: auto;
  overflow-y: scroll;
  height: 88vh;
  width: 100%;
  background-color: #05000070;
}
</style>