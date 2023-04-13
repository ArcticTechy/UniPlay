<template>
    <div class="container">
        <div>
            <SideBar class="sidebar"></SideBar>
            <ClientOnly>
                <Player />
            </ClientOnly>
        </div>
        <div>
            <slot class="side" />
        </div>
    </div>
</template>

<style>

.sidebar {
    height: 100%;
    width: 100%;
    background-size: cover;
}
.container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    
}
</style>