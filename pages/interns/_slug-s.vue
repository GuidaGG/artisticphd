<template>
    <no-footer>
      <div class="interna fullheight">
      <div  v-if="isAuthorised" ref="nav" class="sidebar sidebar-candidates">
            <div class="link-parent back">
              <nuxt-link to="/interna" class="nav__link" >Back to List</nuxt-link>
          </div>
    </div>
        <div v-if="isAuthorised" class="internaPage fullheight overflow">

            <div v-for="p in subpage" :key="p.id"  class="zone">
              <h1 class="title">{{p.title}}</h1>

                   <div v-for="zone in p.pageZone" :key="zone.id" class='zone' >

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

        <div ref="password" v-else class="password hidden">
        <form v-on:submit="loginUser">
          You need a password to see this page:
          <div v-if="wrong" class="wrong">The code is not correct</div>
          <input v-model="methodLoginValue" type="password" placeholder="CODE">
          <div class="button">
            <a class="button--pink" v-on:click="loginUser">SUBMIT</a>
          </div>
        </form>
          </div>


        </div>
    </no-footer>
</template>

<script>
import NoFooter from '~/layouts/NoFooter.vue';
import { InternPageQuery } from "~/graphql/queries/content"
import Richtext from '~/components/Richtext.vue';
import Gallery from '~/components/Gallery.vue';
import Vimeo from '~/components/Vimeo.vue';
import Youtube from '~/components/Youtube.vue';
import Audio from '~/components/Audio.vue';
import { Embed } from 'v-video-embed'
export default {
  components: {
    NoFooter,
    Embed

  },
  head() {
    return {
      title: this.slug + " - Artistic-PhD HFK Bremen"

    };
  },
  watch: {
    subpage: function(){

      this.pass = this.subpage[0].code
      this.$passwordProtect.newPass(this.pass)

      this.isAuthorised = this.$passwordProtect.isAuthorised(this.slug)
      if(!this.istAuthorised){
        this.$refs.password.classList.remove("hidden")
      }
    }
  },

  methods: {
    loginUser(e) {
      e.preventDefault()
      this.$passwordProtect.authorise(this.methodLoginValue, this.slug)
      this.isAuthorised = this.$passwordProtect.isAuthorised(this.slug)

      if(this.isAuthorised == false){

        this.wrong=true
      }
    },
    removeAuthorisation() {
      this.$passwordProtect.removeAuthorisation()
      this.isAuthorised = this.$passwordProtect.isAuthorised(this.slug)
    }
  },
  data() {
    return {
      isAuthorised: false,
      methodLoginValue: '',
      slug: this.$route.params.slug,
      subpage: [],
      api_url: process.env.strapiBaseUri,
      pass: "",
      wrong: false
    };
  },


 apollo: {

    subpage: {
      prefetch: true,
      query: InternPageQuery,
      variables () {
        return { slug: this.$route.params.slug}
      }
    }
  },


}
</script>

<style lang="sass">
.interna
  width: 100%
  .sidebar
    padding: 10px
  .password
    padding: 10px
    width: 50%
    margin: 0 auto
    input
      width: 100%
      font-size: 2em

    div.button
      cursor: pointer
      width: 100%
      background: black
      padding: 10px
      a:hover
        color: #b998ff
        width: 100%

  .hidden
    display: none

  .internaPage
    width: 50%
    margin: 0 auto
    h1.title
      font-size: 2em
      line-height: 1.5em
      padding: 0 10px
      margin-bottom: 20px
    .text
      padding: 0 10px


</style>
