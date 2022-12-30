<template>
    <client-only>
      <div class="galleryContainer">
        <div class="activeImage">
               <img ref="currentImage" :src="api_url + images[0].url" />
            <div class="navigation">
                <div v-on:click="previousImage" class="left">←</div>
                <div v-on:click="nextImage" class="right">→</div>
            </div>
        </div>
        <div class="miniatures">
          <div v-for="(image, index) in images" :key="image.id" :class="{'images':true,'active': index === 0 }">
               <img :src="api_url + image.url" />
          </div>
        </div>    
        
        
       </div>
    </client-only>
</template>
<script>
export default {

  props: ["images"],
  data() {
    return {
      api_url: process.env.strapiBaseUri,  
      current: 0,
      listImages : this.images
    }
  },
  methods: {
    previousImage: function(){
        if(this.current>0){
            this.current--
            let src = this.listImages[this.current].url
            this.$refs.currentImage.src = this.api_url + src
        }
        
    }, 
    nextImage: function(){
        if(this.current<this.listImages.length-1){
            this.current++
            let src = this.listImages[this.current].url
            this.$refs.currentImage.src = this.api_url + src
        }
        
    }
  }
}
</script>


<style lang="sass">
.galleryContainer
    margin-bottom: 30px
    .activeImage
        position: relative
        height: 70vh
 
        img
            position: absolute
            left: 50%
            top: 50%
            transform: translate(-50%, -50%)
            width: auto
            height: auto
            max-height: 70vh
            max-width: 100%
        .navigation
            width: 100%
            top: 50%
            font-size: 1.5em
            color: black
            .left
                cursor: pointer
                position: absolute
                left: 0
            .right
                position: absolute
                right: 0
                cursor: pointer

    .miniatures
        display: grid
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr
        .images
        
            height: 100px
            display: inline-block
            overflow: hidden
            position: relative
            
            img
                cursor: default
                position: absolute
                left: 50%
                top: 50%
                transform: translate(-50%, -50%)
                min-height: 100px
              
        

</style>
  