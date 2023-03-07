<template>
   <client-only>
    <div class="pageContent">

      <div v-for="sub in subpage" :key="sub.id" class='event-container fullheight' v-on:scroll="progressBar">
        <div class="archive-section mobile"> <nuxt-link to="/news" class="nav__link" >← Back to News</nuxt-link></div>
        <div class="event-date">
            <div>{{sub.Category}}</div>
            <div v-if="sub.Category == 'Seminar'">
              {{getDateD(sub.date)}} - {{getDateD(sub.endDate)}}
              <div class="seminarday">
              {{getWeekDay(sub.date)}},
              {{getTime(sub.date)}} <span v-if="sub.endTime"> -  {{getEndTime(sub.endTime)}} </span>
              </div>
              <div></div>
            </div>
            <div v-else>
             <div v-if="sub.endDate">
               {{getDateD(sub.date)}} - {{getDateD(sub.endDate)}}, {{getTime(sub.date)}}<span v-if="sub.endTime"> - {{getEndTime(sub.endTime)}}</span>
             </div>
             <div v-else>
               {{getDate(sub.date)}}<span v-if="sub.endTime"> - {{getEndTime(sub.endTime)}}</span>
             </div>
           </div>
        </div>
        <h1 class="event-title">{{sub.title}}</h1>
        <h2 class="event-subtitle">{{sub.subtitle}}</h2>
        <div v-for="zone in sub.eventPage" :key="zone.id" class='block event-zone' >
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
                     <video-embed :src="zone.videoUrl"></video-embed>
                </div>

                <div class="audio" v-if="zone.__typename === 'ComponentLayoutsAudio'">

                     <Audio :audio="zone.audioFile"/>

                </div>
                <div class="download" v-if="zone.__typename === 'ComponentLayoutsDownload'">
                    <a :href="api_url + zone.downloadFile.url" download><span class="arrow">↓</span> {{ zone.displayName}}</a>
                </div>

            </div>
        </div>

    </div>
    </client-only>
</template>

<script>

import { EventQuery } from "~/graphql/queries/content"
import Richtext from '~/components/Richtext.vue';
import Gallery from '~/components/Gallery.vue';
import Vimeo from '~/components/Vimeo.vue';
import Youtube from '~/components/Youtube.vue';
import Audio from '~/components/Audio.vue';
import { Embed } from 'v-video-embed'
export default {

  components: {
    Richtext,
    Gallery,
    Vimeo,
    Youtube,
    Audio,
    Embed
  },
  data() {
    return {
      slug: this.$route.params.slug,
      subpage: [],
      api_url: process.env.strapiBaseUri
    };
  },

   updated: function() {

     this.$nextTick(function () {

      this.$root.$emit('ArquivePast') //like this
      this.$root.$emit('Child')


     });
  },


  apollo: {

    subpage: {
      prefetch: true,
      query: EventQuery,
      variables () {
        return { slug: this.$route.params.slug}
      }
    }
  },
  methods: {
    // a computed getter
    // a computed getter

    getWeekDay(datetime){
      var d = new Date(datetime);
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";

      var n = weekday[d.getDay()];
      return n
    },
    getTime(datetime) {
        let  d = new Date(datetime)
        let h = d.getHours();
        h = ("0" + h).slice(-2);
        let m = d.getMinutes()
        m = ("0" + m).slice(-2);
        let date = h + ":" + m
        return date;
    },
    getEndTime(datetime){
        return datetime.slice(0, 5);
    },
    getDate(datetime) {
        let d = new Date(datetime)
        var date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()

        let h = d.getHours();
        h = ("0" + h).slice(-2);
        let m = d.getMinutes()
        m = ("0" + m).slice(-2);

        date = date + " " + h + ":" + m

        return date
     },

    getDateD(datetime) {
        var d = new Date(datetime)
        var date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()
        return date
     },
    progressBar: function(event) {
      var element = event.srcElement

      var width = element.scrollHeight - element.offsetHeight
      var current = element.scrollTop
      var percent = current * 100 / width
      var progressbar = document.getElementById("progressbar")
      progressbar.style.background = "linear-gradient(90deg, rgba(255,255,255,1) "+(percent-50)+"%, rgba(185,152,255,1) "+percent+"%, rgba(255,255,255,1) "+(percent+50)+"%)"
    },


  }
}
</script>


<style lang="sass">
.event-container
    width: 50vw
    overflow-y: scroll
    overflow-x: hidden
    padding: 10px 0px

    .event-date, .event-title, .event-subtitle, .richText
      padding: 0 10px
    &::-webkit-scrollbar
        width: 0 !important

    -ms-overflow-style:
    scrollbar-width: none

    .mobile
      display: none
    img
      width: calc(100%)


    .block
      width: 100%
      height: auto
      padding-left: 5px
      font-family: "GT-Sectra-Regular"
      padding: 0px
      padding-top: 20px


    .block:last-child
      width: auto
      padding: 0px

    .block:first-of-type
      padding-top: 30px
      background: red

    h1
      font-family: "GT-Sectra-Regular"
      font-size: 46px
      line-height: 44px
    .event-date
      font-size: 0.7em
      line-height: 1.2em
      div
        text-transform: uppercase

      .seminarday
        text-transform: none



</style>
