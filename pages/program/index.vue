<template>
   
    <!--<Content :content="subpage" />-->
    <div >
    
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
    Dots
  },
  data() {
    return {
      slug: this.$route.params.slug,
      subpage: {},
      parent: "",
      numPages: 0
    };
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
}
</script>

