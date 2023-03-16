<template>
    <head>
        
    </head>
    
    <div>
      <button @click="LoginSpotify"></button>
    </div>
</template>


<script setup lang="ts">
    

    const router = useRouter();
    const LoginSpotify = () => window.location.href = "/api/spotify/login";
    
 
 
  
</script>
  