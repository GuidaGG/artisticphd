<template>
  <no-footer>
    <div class="candidates overflow fullheight" v-on:scroll="progressBar">
      <h1 class="candidatesSep" >PhD Candidates</h1>
      <h3 v-for="candidate in candidates" :key="candidate.id">
        <nuxt-link :to="{ name: 'candidate-slug-about', params: { slug: candidate.slug }}" class="nav__link" >{{candidate.name}}</nuxt-link> 
      </h3>
      <h1 class="candidatesSep divider">Forthcoming</h1>
      <h3 v-for="candidate in ftcandidates" :key="candidate.id">
        <nuxt-link :to="{ name: 'candidate-slug-about', params: { slug: candidate.slug }}" class="nav__link" >{{candidate.name}}</nuxt-link> 
      </h3>
    </div>
  </no-footer>
</template>

<script>
import { CandidatesQuery } from "~/graphql/queries/content"
import { FtCandidatesQuery } from "~/graphql/queries/content"
import NoFooter from '~/layouts/NoFooter.vue';


export default {
  components: {
    NoFooter,
 
  },
  head() {
    return {
      title: "Candidates - Artistic-PhD HFK Bremen"
    };
  },
  data() {
    return {
      candidates:[], //query result
      ftcandidates: [],
      
    };
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
  },
  apollo: {
    candidates: {
      query: CandidatesQuery,
      prefetch: true
    },
     ftcandidates: {
      query: FtCandidatesQuery,
      prefetch: true
    }
  },

  mounted() {
    this.$nextTick(function () {
      this.$root.$emit('Header') 
    });
  },
 
}
</script>

<style lang="sass">

.candidates
  width: 50vw
  margin: 0 auto
  padding-top: 10px

  
  h3, h1 
    padding: 8px 12px
    padding-top: 0
    font-size: 32px

    a
      font-family: GT-Sectra-Regular
      text-transform: uppercase
      line-height: 37px

    a:hover
      border-bottom: 2px solid #B998FF

  .candidatesSep
    font-size: 0.85em
    line-height: 1em
  .divider
    margin-top: 40px
    
  
</style>