<template>
  <div class="feed fullheight overflow">
    <div v-for="f in feed" :key="f.id" class="feed-content fullheight overflow">

          <div  class="candidate-name">
                    <h1>{{f.candidate.name}}</h1>
          </div>
          <div class="archive-section mobile"> <nuxt-link :to="{ name: 'candidate-slug-feed', params: { slug: params }}" class="nav__link" > ← Back to Feed</nuxt-link></div>
          <div v-if="f.published_at" class="feed-date">{{getDate(f.published_at)}}</div>
          <h1 class="feed-title">{{f.title}}</h1>
          <div v-for="zone in f.pageZone" :key="zone.id" class='zone' >

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

</template>

<script>
import moment from 'moment'
import { OneFeedQuery, FeedQuery } from "~/graphql/queries/content"
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

  data() {
    return {
      api_url: process.env.strapiBaseUri,
      feed:[], //query result
      feeds: [],
      params: this.$route.params.slug,


    };
  },
    methods: {
    // a computed getter
    getDate(datetime) {
    let date = moment(String(datetime)).format('DD.MM.YYYY hh:mm')
    return date
     }
  },
  apollo: {
    feed: {
      variables () {
        return { slug: this.$route.params.subslug }
      },
      query: OneFeedQuery,
      prefetch: true
    },
    feeds: {
      variables () {
        return { slug: this.$route.params.slug }
      },
      query: FeedQuery,
      prefetch: true
    }
  },
  updated(){
    this.$nextTick(function () {
      this.$root.$emit('SidebarFeed') //like this
      this.$root.$emit('Child')
    })
  },
  mounted(){
    this.$nextTick(function () {
      this.$root.$emit('Child')
      this.$root.$emit('SidebarFeed') //like this
    })

  }
}
</script>

<style lang="sass">



</style>
