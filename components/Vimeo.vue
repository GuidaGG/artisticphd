<template>
    <client-only>
        <vimeo-player ref="player" :video-id="videoID"/>
    </client-only>	
</template>
<script>
import { vueVimeoPlayer } from 'vue-vimeo-player'
export default {
props: ["id"],
components: { vueVimeoPlayer },
data() {
    return {
        videoID: this.id,
        height: 600,
        options: {
            color: "#fff",
            portrait: false
        },
        playerReady: false,
    }
},
methods: {
    onReady() {
        this.playerReady = true
    },
    play () {
        this.$refs.player.play()
    },
    stop () {
        this.$refs.player.stop()
    }
}
}
</script>

<style lang="sass">
.video

    position:relative

    div:first-of-type
  
        position: relative
        overflow: hidden
        width: 100%
        padding-top: 56.25%
        iframe
            position: absolute
            top: 0
            left: 0
            bottom: 0
            right: 0
            width: 100%
            height: 100%
</style>