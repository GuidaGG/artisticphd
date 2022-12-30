<template>
    <div class="proposal-container ">
        <div v-if="proposal.length>0">
         <div v-for="p in proposal" :key="p.id" class="proposal">
            <div class="proposal-center fullheight overflow" v-on:scroll="progressBar">
              
                 <div  class="candidate-name">
                    <h1>{{p.candidate.name}}</h1>
                </div>
                <div class="candidate-proposal">
                 
                  <h1>{{p.title}}</h1>
                  <h2 v-if="p.subTitle">{{p.subTitle}}</h2>
                  <div v-for="zone in p.pageZone" :key="zone.id">
                      <div class="block-content" v-if="zone.__typename === 'ComponentLayoutsTextBlock'">
                         <Richtext :zone="zone.richText" />
                      </div>
                      <div class="block-content image" v-if="zone.__typename === 'ComponentLayoutsImageField'">
                        <img :src="api_url + zone.imageField.url" />
                      </div>  
                  </div>
                </div> 
            </div>
           <div class="side-text fullheight overflow" v-if="p.sideText">
               <Richtext :zone="p.sideText" />
            </div>
        </div>
        </div>
        <div class="borders fullheight" v-else>more info coming soon</div>
        
    </div>
</template>

<script>
import { ProposalQuery } from "~/graphql/queries/content"
import NoFooter from '~/layouts/NoFooter.vue';
import Richtext from '~/components/Richtext.vue';

export default {
  components: {
    NoFooter,
    Richtext,
  },

  data() {
    return {
      proposal:[], //query result
      params: this.$route.params.slug,
      api_url: process.env.strapiBaseUri
    };
  },
  mounted() {
 
    this.$nextTick(function () {
      this.$root.$emit('SidebarCandidates') //like this
      this.$root.$emit('HideFeed')
      this.$root.$emit('removeChild')
    });
  },
  head() {
    if(this.proposal.length>0){
      return {
        title: this.proposal[0].candidate.name + " - Artistic-PhD HFK Bremen"
      };
    }
  
  },
  apollo: {
    proposal: {
    variables () {
        return { slug: this.$route.params.slug }
      },
      query: ProposalQuery,
      prefetch: true
    }
  },
  methods: {
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
.proposal-container
  width: 100%
  font-size: 20px
  line-height: 24px

  .richText
    font-family: GT-Sectra-Regular

  .proposal-center
    width: 50%
    float: left
    margin-left: 25%
    border-left: 2px solid black
    border-right: 2px solid black
   
  .candidate-proposal
    padding-top: 40px

    h1
      font-size: 46px
      line-height: 44px
      font-family: GT-Sectra-Regular

    h2
      font-size: 26px
      line-height: 27px


  .candidate-proposal h1, .candidate-proposal .block-content
    padding: 10px
  
  .candidate-proposal h2 
    padding: 0 10px

  .side-text
    float: right
    font-size: 16px
    line-height: 22px
    width: 25%
    padding: 10px
      
  .borders
    padding: 10px
    width: 50%
    margin: 0 auto
    border-left: 2px solid black
    border-right: 2px solid black

</style>