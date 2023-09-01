<template>
     <nuxt-link :to="{ name: 'events-slug', params: { slug: event.slug}}" class="nav__link" >
      <div class="image-container">
        <img :src="api_url + event.featuredImage.url"/>
      </div>
        <div class="hover">
            <div class="wrapper"> 
                <div class="crossout"></div>
                <span class="date-arquive" v-if="event.date">
                    <div v-if="event.showDate==true">
                    <span v-if="getDateD(event.endDate) != getDateD(event.date)">{{getDateD(event.date)}} - {{getDateD(event.endDate)}}
                    </span>
                    <span v-else>{{getDate(event.date)}}</span>
                    </div>
                </span>
                <div class="title-arquive uppercase">
                {{event.title}}
                </div>
                <div class="subtitle-arquive">
                {{event.subtitle}}
                </div>
            </div>
        </div>  
    </nuxt-link> 
</template> 
<script>

export default {
  props: ["event"],

data() {
  return {
    api_url: process.env.strapiBaseUri
  };
  },
  computed: {
    cssVars() {
      return {
        '--bg-image': `url("${this.api_url}${this.event?.featuredImage?.url}")`,
      }
    }
  },
  methods: {
    //date/start date and time
    getDate(datetime) {
        let d = new Date(datetime)
        var date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()
        date = date 

        return date
     },
    //end date
    getDateD(datetime) {
        var d = new Date(datetime)
        var date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()
        return date
     },
  }
}
</script>

<style lang="sass" scoped>
@media only screen and (max-width: 769px)
  .date-arquive
    font-size: 14px
    line-height: 18px
</style>