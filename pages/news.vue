<template>
  <no-footer>
    <div ref="news" class="news">
  
      <Arquive :pages="currentevents" />
      <nuxt-child/>
       <ArquiveUpcoming :pages="pages" />
    </div>

  </no-footer>
</template>

<script>
import NoFooter from '~/layouts/NoFooter.vue';
import Arquive from '~/components/Arquive.vue';
import ArquiveUpcoming from '~/components/ArquiveUpcoming.vue';
import { EventsQuery, CurrentEventsQuery } from "~/graphql/queries/content"

export default {
  components: {
    NoFooter,
    Arquive,
    ArquiveUpcoming
  },
  head() {
    return {
      title: "News - Artistic-PhD HFK Bremen"
    };
  },
  data() {
    return {
      pages: {}, //query result
      currentevents: {}, //query result
      today_date: new Date().toJSON().slice(0,10).replace(/-/g,'-')
    };
  },
  apollo: {
    pages: {
      query: EventsQuery,
      prefetch: true,
      variables () {
        return {
          date: this.today_date
        }
      },
    },
    currentevents: {
      query: CurrentEventsQuery,
      prefetch: true,
      variables () {
        return {
          date: this.today_date
        }
      },
    }
  },
  updated(){
     var container = this.$refs.news
        if(container){
          container.classList.remove("child")
      }
  },
  mounted() {

    this.$nextTick(function () {
      this.$root.$emit('Header') //like this

      this.$root.$on('Child', () => {
      
        var container = this.$refs.news
        if(container){
          container.classList.add("child")
        }
      })

    });
  },




}


</script>
