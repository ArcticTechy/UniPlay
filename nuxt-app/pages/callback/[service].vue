<template>
    <p>hi</p>
    <ClientOnly>

        <GetNewToken></GetNewToken>
    </ClientOnly>
</template>
<script setup lang="ts">  
    const { $spotifyPlayer } = useNuxtApp();
    const router = useRouter();
    const route = useRoute();
    const { service } = route.params;
    const query = route.query;

    // calls the callback api for spotify if the link is /callback/spotify
    // and provides the callback api for spotify with the acesscode and the state
    // we are also using post as it makes sure that the tokens are never direktly aceesable by the user 
    if (service == "spotify" && query.code !== undefined) {
        const { data: tokens } = await useFetch('/api/spotify/callback', {
        method: 'POST',
        body: {
            acesscode: query.code,
            state: query.state,
        }
    })
    // if tokes where sucessfully gotten then we save the tokens as cookies and set there values
    if (tokens.value.access_token && tokens.value.expires_in)
    {
        const spotify_access_token = useCookie('spotify_access_token', {
            maxAge: tokens.value.expires_in
        });
        const spotify_refresh_token = useCookie('spotify_refresh_token', {
            maxAge: tokens.value.expires_in 
        });
        spotify_access_token.value = tokens.value.access_token;
        spotify_refresh_token.value = tokens.value.refresh_token;
        // pushed the user back to the front page
        router.push("/");
    } else {
        // If we get no token then we just take the user back
        console.log("No token found");
        router.push("/");
    }
}
</script>