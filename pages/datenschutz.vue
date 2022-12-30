<template>
 <no-footer>
  <div>
    <div class="pageContent datenschutz overflow fullheight">
       <Richtext :zone="pages.richText" />
    </div>
    
  </div>
  </no-footer>
</template>

<script>
import Richtext from '~/components/Richtext.vue';
import { DatenschutzQuery } from "~/graphql/queries/content"
import NoFooter from '~/layouts/NoFooter.vue';
export default {
  components: {
    NoFooter,
    Richtext,
  },
  data() {
    return {
      pages:[], //query result
    };
  },
  head() {
    return {
      title: "Datenschutz - Artistic-PhD HFK Bremen"
    };
  },
  apollo: {
    pages: {
      query: DatenschutzQuery,
      prefetch: true
    }
  },
  mounted(){
    this.$root.$emit("HideLine")
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
</script>

<style lang="sass">

.no-footer .impressum, .no-footer .datenschutz

  margin: 0
  padding: 10px calc(25% + 10px)
  width: 100%


.block-scroll
  width: 50vw
  padding: 10px
  scrollbar-width: 0

</style>
