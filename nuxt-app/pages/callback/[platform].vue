<template lang="">
    <div>
    </div>
</template>

<script setup lang="ts">
    const router = useRouter();
    const route = useRoute();
    const { platform } = route.params;
    const query = route.query;

    const idk = ref({})


    if (platform === "spotify" && query.code !== undefined) {
        const { data: tokens } = await useFetch('/api/spotify/callback', {
        method: 'POST',
        body: {
            acesscode: query.code,
            state: query.state,
        }
    })
    if (tokens.value.access_token)
    {
        const spotify_access_token = useCookie('spotify_access_token', {
            maxAge: tokens.value.expires_in
        });
        const spotify_refresh_token = useCookie('spotify_refresh_token', {
            maxAge: tokens.value.expires_in 
        });
        const spotify_expires_in = useCookie('spotify_expires_in',{
            maxAge: tokens.value.expires_in
        });
        spotify_access_token.value = tokens.value.access_token;
        spotify_refresh_token.value = tokens.value.refresh_token;
        spotify_expires_in.value = tokens.value.expires_in;
        router.push("/");
    }
    }
</script>
<style lang="">
    
</style>