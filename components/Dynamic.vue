<template>
    <client-only>
        <div class='dynamic-zone'>
          
            <div v-for="zone in subpage" :key="zone.id" class="dynamic-block"  >
                 
                    <div class="block-content text" v-if="zone.__typename === 'ComponentLayoutsTextBlock'">
                        <Richtext :zone="zone.richText" />
                    </div>
                    <div class="block-content image" v-if="zone.__typename === 'ComponentLayoutsImage'">
                        <img :src="api_url + zone.imageField.url" />
                    </div>  
                    <div class="gallery" v-if="zone.__typename === 'ComponentLayoutsGallery'">
                        <Gallery :images="zone.galleryImages"/>
                    </div>  

                    <div class="video" v-if="zone.__typename === 'ComponentLayoutsVideo'">
                
                        <Video  :url="zone.videoUrl"/>
            
                    </div>  
                     <div class="image" v-if="zone.__typename === 'ComponentLayoutsImageField'">
            
                        <ImageField :source="zone.imageField.url"/>
                   
                    </div>  
                    <div class="audio" v-if="zone.__typename === 'ComponentLayoutsAudio'">
                        <Audio :audio="zone.audioFile"/>
                    
                    </div>  

                    <div class="download" v-if="zone.__typename === 'ComponentLayoutsDownload'">
                        <a :href="api_url + zone.downloadFile.url" download><span class="arrow">↓</span> {{ zone.displayName}}</a>
                    </div> 
            
            </div>
        </div>
     </client-only>
</template>
<script>
import Richtext from '~/components/Richtext.vue';
import Gallery from '~/components/Gallery.vue';
import Youtube from '~/components/Youtube.vue';
import Audio from '~/components/Audio.vue';
import Video from '~/components/Video.vue';
import ImageField from '~/components/ImageField.vue';
export default {

  props: ["subpage"],
  
  components: {
    Richtext,
    Gallery,
    Youtube,
    Audio,
    Video,
    ImageField
  },
  data() {
    return {
      slug: this.$route.params.slug,
      api_url: process.env.strapiBaseUri
    };
  },
}
</script>

<style lang="sass">
.dynamic-zone
  
    .dynamic-block
        width: 100%
        margin: 0
        height: auto
        padding-left: 5px
        font-family: "GT-Sectra-Regular"
        padding: 0px
        padding-top: 20px
       
        .block-content.text, .block-content.download
            padding: 0 10px

  

    .block:first-of-type
      padding-top: 30px

 
</style>