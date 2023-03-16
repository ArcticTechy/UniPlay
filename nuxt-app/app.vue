<template>
  <div>
    <button @click="LoginSpotify"></button>
  </div>
</template>

<script setup>

function LoginSpotify()
{
  useFetch('api/spotify/login',"get")
}

</script>
