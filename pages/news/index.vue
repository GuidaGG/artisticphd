<template>
  <client-only>
    <div class="pageContent">
 
  
    </div>
  </client-only>
</template>

<script>

import moment from 'moment'

import Richtext from '~/components/Richtext.vue';
export default {

  components: {
    Richtext,
  },
  data() {
    return {
      subpage: [],
      api_url: process.env.strapiBaseUri,
      today_date: new Date().toJSON().slice(0,10).replace(/-/g,'-')
    };
  },

  methods: {
    // a computed getter
    getDate(datetime) {
    let date = moment(String(datetime)).format('DD.MM.YYYY hh:mm')
    return date
    },

    getTime(time) {
    let date = moment(String('2020-10-29T'+time+'Z')).format('HH:mm')
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

