<template>
   <client-only>
    <div class="pageContent">

      <div v-for="sub in subpage" :key="sub.id" class='event-container fullheight' v-on:scroll="progressBar">
        <div class="archive-section mobile"> <nuxt-link to="/seminars" class="nav__link" >← All Seminars</nuxt-link></div>
        <div class="event-date padding">
            <!-- datetime display for news on
             category seminar -->
            <div>{{sub.category}}</div>
            <div v-if="sub.showDate">
              <div v-if="sub.category == 'Seminar'">
                {{getDateD(sub.date)}} - {{getDateD(sub.endDate)}} 
                <div class="seminarday">
                {{getWeekDay(sub.date)}}, 
                {{getTime(sub.date)}} <span v-if="sub.endTime"> -  {{getEndTime(sub.endTime)}} </span>
                </div>
              </div>
              <!-- datetime display for news on other category -->
              <div v-else>
                <div v-if="getDateD(sub.date) != getDateD(sub.endDate)">
                  {{getDateD(sub.date)}} - {{getDateD(sub.endDate)}}<span v-if="sub.category != 'LectureSeries'">, {{getTime(sub.date)}}</span> <span v-if="sub.endTime"> - {{getEndTime(sub.endTime)}}</span> 
                </div>
                <div v-else>
                  {{getDate(sub.date)}}<span v-if="sub.endTime"> - {{getEndTime(sub.endTime)}}</span> 
                </div>
              </div>
            </div>
            <div v-if="sub.extra">{{sub.extra}}</div>
        </div>
        <!--  news content -->
        <h1 class="event-title padding">{{sub.title}}</h1>
        <h2 class="event-subtitle padding">{{sub.subtitle}}</h2>
        <Dynamic :subpage="sub.eventPage"/>
      </div>
    </div>
  </client-only>
</template>

<script>

import Dynamic from "~/components/Dynamic"
import { SeminarQuery } from "~/graphql/queries/content"


export default {
  
  components: {
    Dynamic
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
      query: SeminarQuery,
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
    padding-top: 10px
    
    &::-webkit-scrollbar 
        width: 0 !important

    -ms-overflow-style:
    scrollbar-width: none

    .mobile
      display: none
   
    h1
      font-family: "GT-Sectra-Regular"
      font-size: 1.4em
      line-height: 1em
    .event-date
      
      font-size: 0.7em
      line-height: 1.2em
      div
        text-transform: uppercase
      
      .seminarday
        text-transform: none

    
      
</style>