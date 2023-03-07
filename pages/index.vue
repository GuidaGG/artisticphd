<template>
    <with-footer class="home">
      <client-only>

        <PageContent @scroll-element="defineParent" class="home">
          
          <Block class="half-block image" :scrollElement="parent"> <Background /></Block>
          <Block v-for="(contents, index) in pages.pageZoneEn" :key="contents.id" :class="{'en':true, 'block':true, 'last': index==1, 'middle': index === 0, 'right': index === 1  }" :scrollElement="parent">
              <div class="layer"></div>
              <div  class="richtext" v-if="contents.__typename === 'ComponentLayoutsTextBlock'">
                <Richtext :zone="contents.richText" />
              </div>
          </Block>
          <Block class="en first image" :scrollElement="parent">
            <Background />
          </Block>
         <Block v-for="(contents, index) in pages.pageZoneDe" :key="contents.id" :class="{'de':true, 'block':true, 'middle': index === 0, 'right': index === 1  }" :scrollElement="parent">
              <div class="layer"></div>
              <div v-if="contents.__typename === 'ComponentLayoutsTextBlock'">
                 <Richtext :zone="contents.richText" />
              </div>
            </Block>
          <Block class="block half-block image" :scrollElement="parent"  last="true"> <Background /></Block>
        </PageContent>    
        <Dots :totalPages="getListPages" :scrollElement="parent"/>
        
    </client-only>
  </with-footer>
</template>

<script>

import Richtext from '~/components/Richtext.vue';
import Background from '~/components/Background.vue';
import { HomeQuery } from "~/graphql/queries/content"
import WithFooter from '~/layouts/WithFooter.vue';
import Block  from '@/components/Block';
import PageContent from '~/components/PageContent.vue';
import Dots from '~/components/Dots.vue';

export default {
  components: {
    WithFooter,
    Richtext,
    Background,
    Block,
    PageContent,
    Dots
  },
  head() {
    return {
      title: "Artistic-PhD HFK Bremen"
    };
  },
  data() {
    return {
      pages:[], //query result
      title: "Home",
      currentScroll : 0,
      timer: 0,
      clickable: true,
      numPages: 0,
      parent: ""
    };
  },
  apollo: {
    pages: {
      query: HomeQuery,
      prefetch: true
    }
  },

  computed: {
    getListPages: function(){
      if(this.pages.pageZoneEn){
        var engPages =  Object.keys(this.pages.pageZoneEn).length
        var dePages = Object.keys(this.pages.pageZoneDe).length
        this.numPages = engPages + dePages + 1
      }
       return this.numPages
    }
  },
  methods: {
    defineParent: function(params) {
     
      this.parent = params
      
    },

  }

}
</script>

<style lang="sass">
.pageContent
    display: flex
    flex-wrap: nowrap
    overflow-y: scroll
    overflow-x: scroll
    -webkit-overflow-scrolling: touch

.pageContent::-webkit-scrollbar
  width: 0 !important

.pageContent
  -ms-overflow-style: none
  scroll-snap-type: x mandatory
  scrollbar-width: none

.circle
  width: 100%
  height: calc(100vh - 164px)

  background-size: 120% auto
  background-position: 50% 50%
  background-repeat: no-repeat
  display: inline-block
  scrollbar-height: 0

.block
  position: relative
  scroll-snap-align: center
  width: 50%
  flex: 0 0 auto
  height: calc(100vh - 164px)
  padding: 10px
  overflow-y: scroll
  word-break: break-word
  scrollbar-width: none
  font-family: "GT-Sectra-Regular"

  a
    word-break: break-word

  &:first-child
    margin-left: -25%
    width: 50%
    cursor: default
  &:last-child
    width: 25%
    cursor: default
    svg
      width: 200%

.block.image
  padding: 0
  position: relative
  overflow: hidden
  svg
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 100%

.block::-webkit-scrollbar
  width: 0 !important
  height: 0 !important

.last-block 
  width: 25% 

.last-block.image svg
  width: 200%

.home .block
  font-size: 26px
  line-height: 32px
  a
 
    font-family: "GT-Flexa-Light"

  &:nth-child(2), &:nth-child(5)
    //text-transform: uppercase


  &:nth-child(3), &:nth-child(6)



.right, .right p, .right .richtext, .right div
  cursor: pointer
.left, .left p,  .left .richtext, .left div
  cursor: pointer

.spacer
    padding-right: 25%
    cursor: default

.navigation

  position: absolute
  bottom: 80px
  left: 50%
  transform: translateX(-50%)
  div
    display: inline-block
    padding: 0 20px
    cursor: pointer


.dot-navigation
  width:
  height: 35px

  left: 50%
  transform: translateX(-50%)
  position: fixed
  bottom: 60px
  text-align: center
  display: -webkit-box
  display: -moz-box
  display: -ms-flexbox
  display: -webkit-flex
  display: flex

  .dot
    width: 15px
    height: 15px
    margin: 10px
    background: #5E5E5E
    float: left
    border-radius: 20px
    cursor: pointer
    border: 2px solid black

  .dot:hover, .dot.current
    background: #B998FF
</style>
