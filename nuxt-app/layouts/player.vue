<template>
    <div class="thisIsStupid">
        <div class="container">
            <div class="SideBar">
                <SideBar></SideBar>
            </div>
            <div class="Slot">
                <slot />
            </div>
            <div class="PlayerControl">
                <ClientOnly>
                    <Player />
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<style>
.container {
    height: 600px;
    display: grid;
    grid-template-columns: 1.25fr 3fr;
    grid-template-rows: calc(100vh - 120px) 120px;
    gap: 0px 0px;
    grid-template-areas:
        "SideBar Slot"
        "PlayerControl PlayerControl";
}

.SideBar {
    grid-area: SideBar;
    position: relative;
}

.Slot {
    grid-area: Slot;
    position: relative;
}

.PlayerControl {
    position: relative;
    grid-area: PlayerControl;
}
</style>