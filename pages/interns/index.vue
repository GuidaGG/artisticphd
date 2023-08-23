<template>
    <no-footer>
      <div class="candidates overflow fullheight" v-on:scroll="progressBar">
        <h1 v-on:click="setRoute" v-for="int in interna" :key="int.id">
  
          <nuxt-link :to="{ name: 'interns-slug', params: { slug: int.slug }}" class="nav__link" >{{int.title}}</nuxt-link> 
  
        </h1>
      </div>
    </no-footer>
  </template>
  
  <script>
  import { InternaQuery } from "~/graphql/queries/content"
  import NoFooter from '~/layouts/NoFooter.vue';
  
  
  export default {
    components: {
      NoFooter,
  
    },
  
  
    head() {
      return {
        title: "Interna - Artistic-PhD HFK Bremen"
      };
    },
    data() {
      return {
        interna:[], //query result
      };
    },
    methods: {
      setRoute(event){
        console.log(event)
  
      },
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
      interna: {
        query: InternaQuery,
        prefetch: true
      },
    },
  
  
  
  }
  </script>
  