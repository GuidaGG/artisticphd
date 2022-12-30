<template>
  <with-footer>
    <div class="program">
      
      <Sidebar :pages="pages"/>
      
        <nuxt-child/>

    </div>
  </with-footer>
</template>

<script>

import Sidebar from "@/components/Sidebar"
import { pagesQuery } from "~/graphql/queries/content"
import WithFooter from '~/layouts/WithFooter.vue';

export default {

  components: {
    Sidebar,  
    WithFooter,
  },
  data() {
    return {
      pages: {}, //query result

    };
  },
  mounted() {
   
    this.$nextTick(function () {
      this.$root.$emit('Header') //like this
    });
  },
  apollo: {
    pages: {
      query: pagesQuery,
      prefetch: true
    },
  }

  
}
</script>


