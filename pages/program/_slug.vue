<template>
   
    <!--<Content :content="subpage" />-->
    <div ref="programScroll">
    
    <PageContent v-for="(contents, index) in subpage" :key="index" @scroll-element="defineParent">
    

        <Block class="half-block image" :scrollElement="parent"> 
          <div class="layer"></div>
          <h2>{{contents.slug}}</h2>
          <BackgroundProgram />
        </Block>

        <Block v-for="(zone, index) in contents.pageEn" :key="zone.id" :class="{'en':true, 'last':  index === (contents.pageEn.length-1), 'middle': index === 0, 'right': index === 1  }" :scrollElement="parent">
 
          <div class="block-content" v-if="zone.__typename === 'ComponentLayoutsTextBlock'">
            <div class="layer"></div>
            <Richtext :zone="zone.richText" />
          </div>
          <div class="block-content" v-if="zone.__typename === 'ComponentPagesAbout'">
            <div class="layer"></div>
            <ul class="about">
              <li>Academic Title:</li>
              <li>{{ zone.academicTitle }}</li>
              <li>Duration:</li>
              <li>{{ zone.duration }}</li>
              <li>Language:</li>
              <li>{{ zone.language }}</li>
            </ul>
          </div>
          <div class="block-content" v-if="zone.__typename === 'ComponentLayoutsCollpasiblePanel'">
            <div class="layer"></div>
            <div v-for="collapsible in zone.Collapsibles" :key="collapsible.id">
              <Collapsible :collapsible="collapsible" />
            </div>
          </div>    

        </Block>

        <Block v-if="contents.pageDe.length>0" class="block de first image" :scrollElement="parent">
          <div class="layer"></div>
          <BackgroundProgram />
        </Block>

        <Block v-for="(zone, index) in contents.pageDe" :key="zone.id" :class="{'de':true,  'middle': index === 0, 'right': index === 1  }" :scrollElement="parent">

          <div class="block-content" v-if="zone.__typename === 'ComponentLayoutsTextBlock'">
            <div class="layer"></div>
             <Richtext :zone="zone.richText" />
          </div>
          <div class="block-content" v-if="zone.__typename === 'ComponentPagesAbout'">
            <div class="layer"></div>
            <ul class="about">
              <li>Academic Title:</li>s
              <li>{{ zone.academicTitle }}</li>
              <li>Duration:</li>
              <li>{{ zone.duration }}</li>
              <li>Language:</li>
              <li>{{ zone.language }}</li>
            </ul>
          </div>
          <div class="block-content" v-if="zone.__typename === 'ComponentLayoutsCollpasiblePanel'">
            <div class="layer"></div>
            <div v-for="collapsible in zone.Collapsibles" :key="collapsible.id">
              <Collapsible :collapsible="collapsible" />
            </div>
          </div>   
        </Block>

        <Block class="last-block image" :scrollElement="parent" last="true">
            <div class="layer"></div>
            <BackgroundProgram />
        </Block>

        <Dots :totalPages="getListPages" :scrollElement="parent"/>

      </PageContent>
    </div>
</template>

<script>

import PageContent from "@/components/PageContent"
import Richtext from "@/components/Richtext"
import BackgroundProgram from '@/components/BackgroundProgram';
import Block from '@/components/Block';
import Collapsible from '@/components/Collapsible';
import { pagesQuery, pageQuery } from "~/graphql/queries/content"
import WithFooter from '@/layouts/WithFooter';
import Dots from '@/components/Dots';

export default {

  components: {
    WithFooter,
    PageContent,
    Block,
    BackgroundProgram,
    Richtext,
    Dots,
    Collapsible
  },
  data() {
    return {
      slug: this.$route.params.slug,
      subpage: {},
      parent: "",
      numPages: 0
    };
  },
  mounted() {

    this.defineParent(this.$refs.programScroll.children[0])
  },
  methods: {
    defineParent: function(params) {
      this.parent = params
    },
  },
  computed: {
    getListPages: function(){
     
      if(this.subpage[0].pageEn.length){
        const engPages =  Object.keys(this.subpage[0].pageEn).length
        const dePages = Object.keys(this.subpage[0].pageDe).length
        
        dePages ? this.numPages = engPages + dePages + 1 : this.numPages = engPages + dePages

      }
       return this.numPages
    }
  },
  apollo: {
   
    subpage: {
      prefetch: true,
      query: pageQuery,
      variables () {
        return { slug: this.$route.params.slug}
      }
    }
  },
  updated: function() {
  
      var progressbar = document.getElementById("progressbar")
      progressbar.style.background =  "linear-gradient(90deg, rgba(255,255,255,1) -50%, rgba(185,152,255,1) 0%, rgba(255,255,255,1) 50%)"
      this.parent = this.$refs.programScroll.children[0]
      this.$nextTick(function () {

        this.$store.state.layout = "en"
      
        this.$root.$emit('Sidebar') 
        this.$root.$emit('Dots') 
        this.$root.$emit('Footer_En') 

        var menus = ['program', 'candidates', 'Events', 'Seminars', 'Contact']
        this.$store.commit('CHANGE_NAV_TITLES', menus)
        this.$store.commit('CHANGE_EN_TITLES')
        
        let scrollContainer = this.parent
       
        if(scrollContainer){
         
          scrollContainer.style.scrollSnapType = "none"
          scrollContainer.scrollLeft = 0
  
            setTimeout(function(){
              scrollContainer.style.scrollSnapType = "x mandatory"
            }, 600)
        }
      
          
      })
  },
}
</script>

