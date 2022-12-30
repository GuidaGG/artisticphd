<template>
  <client-only>
    <div>
        <iframe width="560" height="315" :src="videosource+id" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
   </client-only>

</template>
<script>


export default {
    props: ["id"],

    data() {
        return {
            videoID: this.id,
            videosource: "https://www.youtube.com/embed/"
        }
    },

}
</script>

<style lang="sass">
.video
    margin-bottom: 30px
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
            width: 100.5%
            height: 100%
</style>
