<template>
  <with-footer>
    <div id="pageContent" ref="scroll" class="pageContent contact overflow">
      <div v-for="(contents, index) in pages.pageZoneEn" :key="contents.id" v-on:click="scroll" :class="{'en':true, 'block':true, 'last': index==1, 'middle': index === 0, 'right': index === 1  }">
          <div class="richtext" v-if="contents.__typename === 'ComponentLayoutsTextBlock'">
            <Richtext :zone="contents.richText" />
          </div>
      </div>
       <div v-for="(contents, index) in pages.pageZoneDe" :key="contents.id" v-on:click="scroll" :class="{'de':true, 'block':true, 'first': index === 0, 'middle': index === 0, 'right': index === 1  }">
          <div class="richtext" v-if="contents.__typename === 'ComponentLayoutsTextBlock'">
            <Richtext :zone="contents.richText" />
          </div>
      </div>
    </div>
    
  </with-footer>
</template>

<script>
import Richtext from '~/components/Richtext.vue';
import { ContactQuery } from "~/graphql/queries/content"
import WithFooter from '~/layouts/WithFooter.vue';
export default {
  components: {
    WithFooter,
    Richtext
  },
  data() {
    return {
      pages:[], //query result
      title: "Contact"
    };
  },
  apollo: {
    pages: {
      query: ContactQuery,
      prefetch: true
    }
  },
  methods: {

    scroll: function (event) {

      var VueScrollTo = require('vue-scrollto');
      var elements = this.$refs.scroll.children;
     
      elements.forEach(element => {
      element.classList.remove('middle', 'left', 'right')
      });
   
      var active, prev, next

      if(event.target.tagName == 'P'){
       
      active = prev = next = event.target.parentNode.parentNode
      }
      else{
      active = prev = next = event.target
      }

      do prev = prev.previousSibling; while(prev && prev.nodeType !== 1);
      do next = next.nextSibling;     while(next && next.nodeType !== 1);

      active.classList.add('middle')
       if(active.classList.contains('first')){

          document.getElementsByClassName("lang")[1].classList.add('link_active')
          document.getElementsByClassName("lang")[0].classList.remove('link_active')
             var menus = ['Programm', 'Kandidatinnen', 'Veranstaltungen', 'Kontakt']
           this.$store.commit('CHANGE_NAV_LAYOUT','de')
            this.$store.commit('CHANGE_NAV_TITLES', menus)
        }

         if(active.classList.contains('last')){

          document.getElementsByClassName("lang")[0].classList.add('link_active')
          document.getElementsByClassName("lang")[1].classList.remove('link_active')
             var menus = ['program', 'candidates', 'Events', 'Contact']
            this.$store.commit('CHANGE_NAV_LAYOUT','en', ['Program', 'Candidates', 'Events', 'Contact'])
            this.$store.commit('CHANGE_NAV_TITLES', menus)
        }

      if(prev){
        prev.classList.add('left')
      }
      if(next){
         next.classList.add('right')

       
      }
     

      var options = {
 
        offset: -(event.target.offsetWidth/2)-10,
      }


     VueScrollTo.scrollTo(event.target, options)

    },
  }

}
</script>

