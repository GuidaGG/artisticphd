<template>
  <div ref="feed" class="feed fullheight">
      <div class="feed-content fullheight overflow">

        <div v-if="feeds.length>0">
            <div class="candidate-name">
                      <h1>{{getFirst.candidate.name}}</h1>
            </div>

            <div class="feed-date">{{getDate(getFirst.published_at)}}</div>
            <h1 class="feed-title">{{getFirst.title}}</h1>

            <div v-for="zone in getFirst.pageZone" :key="zone.id" class='zone' >
                    <div class="text" v-if="zone.__typename === 'ComponentLayoutsTextBlock'">
                        <Richtext :zone="zone.richText" />
                    </div>

                    <div class="image" v-if="zone.__typename === 'ComponentLayoutsImageField'">
                        <img :src="api_url + zone.imageField.url" />
                    </div>

                     <div class="gallery" v-if="zone.__typename === 'ComponentLayoutsGallery'">
                     <Gallery :images="zone.galleryImages"/>
                  </div>

                  <div class="video" v-if="zone.__typename === 'ComponentLayoutsVideo'">

                   <video-embed :src="zone.videoUrl"></video-embed>
                  </div>

                   <div class="audio" v-if="zone.__typename === 'ComponentLayoutsAudio'">

                     <Audio :audio="zone"/>

                  </div>
                  <div class="download" v-if="zone.__typename === 'ComponentLayoutsDownload'">
                     <a :href="api_url + zone.downloadFile.url" download><span class="arrow">↓</span> {{ zone.displayName}}</a>
                  </div>


                </div>
            </div>
          </div>


    </div>
</template>

<script>
import moment from 'moment'
import { FeedQuery } from "~/graphql/queries/content"
import NoFooter from '~/layouts/NoFooter.vue';
import Richtext from '~/components/Richtext.vue';
import Gallery from '~/components/Gallery.vue';
import Vimeo from '~/components/Vimeo.vue';
import Youtube from '~/components/Youtube.vue';
import Audio from '~/components/Audio.vue';
import { Embed } from 'v-video-embed'
export default {
  components: {
    NoFooter,
    Richtext,
    Gallery,
    Vimeo,
    Youtube,
    Audio,
    Embed
  },
 computed: {
    getFirst: function(){
      return this.feeds[0]
    }
 },
  data() {
    return {
      api_url: process.env.strapiBaseUri,
      feeds:[], //query result
      params: this.$route.params.slug,


    };
  },
  head() {
    if(this.feeds.length>0){
      return {
        title: this.getFirst.candidate.name + " - Artistic-PhD HFK Bremen"
      };
    }
    else{
      return {
        title: "Feed - Artistic-PhD HFK Bremen"
      };

    }
  },
    methods: {
    // a computed getter
    getDate(datetime) {
    let date = moment(String(datetime)).format('DD.MM.YYYY hh:mm')
    return date
     }
  },
  apollo: {
    feeds: {
      variables () {
        return { slug: this.$route.params.slug }
      },
      query: FeedQuery,
      prefetch: true
    }
  },
  mounted() {

     this.$nextTick(function () {
      this.$root.$emit('removeChild')
      if(this.feeds.length>0){

         this.$root.$emit('Feed')
      }

      this.$root.$emit('SidebarFeed')
      this.$root.$emit('SidebarCandidates')



     });
  },

}
</script>

<style lang="sass">

.feed
  width: 100%

  .feed-title
    font-family: "GT-Sectra-Regular"
    font-size: 46px
    line-height: 44px

  .mobile
    display: none

  .feed-content
    width: 50%
    margin-left: 25%
    padding: 10px 0px
    padding-top: 0px
    float: left
    border-left: solid 2px black
    border-right: solid 2px black

  .feed-date, .feed-title, .richText
    padding: 0 10px


  .feed-date
    padding-top: 50px
    font-size: 0.7em
    line-height: 1.2em
    padding-bottom: 20px




</style>
