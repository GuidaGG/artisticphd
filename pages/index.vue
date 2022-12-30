<template>
    <with-footer class="home">
      <client-only>

        <div id="pageContent" v-on:scroll="progressBar" ref="scroll" class="pageContent home">
          <div class="block half-block image"> <Background /></div>
          <div v-for="(contents, index) in pages.pageZoneEn" :key="contents.id" v-on:click="scroll" :class="{'en':true, 'block':true, 'last': index==1, 'middle': index === 0, 'right': index === 1  }">
              <div class="layer"></div>
              <div  class="richtext" v-if="contents.__typename === 'ComponentLayoutsTextBlock'">
                <Richtext :zone="contents.richText" />
              </div>
          </div>
          <div class="block en first image" v-on:click="scroll" >
            <Background />
            </div>
          <div v-for="(contents, index) in pages.pageZoneDe" :key="contents.id" v-on:click="scroll" :class="{'de':true, 'block':true, 'middle': index === 0, 'right': index === 1  }">
              <div class="layer"></div>
              <div v-if="contents.__typename === 'ComponentLayoutsTextBlock'">
                 <Richtext :zone="contents.richText" />
              </div>
          </div>
          <div class="block half-block image"> <Background /></div>
        </div>
        <div ref="dots" v-on:click="scrolldots" class="dot-navigation">
          <div class="dot" v-for="(p, index) in getListPages" :key="index" :class="{'current': index === 0}"></div>
        </div>




    </client-only>
  </with-footer>
</template>

<script>

import Richtext from '~/components/Richtext.vue';
import Background from '~/components/Background.vue';
import { HomeQuery } from "~/graphql/queries/content"
import WithFooter from '~/layouts/WithFooter.vue';
import Header from  '~/components/Header.vue';
export default {
  components: {
    WithFooter,
    Richtext,
    Background,
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
      numPages: []
    };
  },
  apollo: {
    pages: {
      query: HomeQuery,
      prefetch: true
    }
  },
  mounted() {

      var progressbar = document.getElementById("progressbar")
      progressbar.style.background = "linear-gradient(90deg, rgba(255,255,255,1) -50%, rgba(185,152,255,1) 0%, rgba(255,255,255,1) 50%)"
      var parent = this.$refs.scroll;

      this.$nextTick(function () {
         this.$root.$emit('HideLine') //like this
        this.$store.state.layout = "en"
        if(parent){
              parent.scrollLeft = 0
          }
        this.changelangen()
      })

  },
  computed: {
    getListPages: function(){
      if(this.pages.pageEn){
        var engPages =  Object.keys(this.pages.pageEn).length
        var dePages = Object.keys(this.pages.pageDe).length
        var total = engPages + dePages
        for(var i = 0; i <= total; i++){
          this.numPages[i] = i+1
        }
      }
       return this.numPages
    }
  },
  methods: {
    progressBar: function(event) {
      var element = event.srcElement

      var width = element.scrollWidth - element.offsetWidth
      var current = element.scrollLeft
      var percent = current * 100 / width

      var progressbar = document.getElementById("progressbar")
      progressbar.style.background = "linear-gradient(90deg, rgba(255,255,255,1) "+(percent-50)+"%, rgba(185,152,255,1) "+percent+"%, rgba(255,255,255,1) "+(percent+50)+"%)"

      var beginDe = document.getElementsByClassName("first")[0]
      var beginEn = document.getElementsByClassName("last")[0]
      if(beginDe){

        if(beginDe.getBoundingClientRect().left <= beginDe.offsetWidth/1.5){

            this.changelangde()

        }
      }

       if(beginEn){

        if(beginEn.getBoundingClientRect().left <= beginEn.offsetWidth/1.8 && beginDe.getBoundingClientRect().left >= beginDe.offsetWidth/1.5 ){

            this.changelangen()

        }
      }
      if(this.$refs.scroll){
        var elements = this.$refs.scroll.children
        var space = 0
        var extra = 1
        var start = 0
          if(this.isMobile()){
            space = 20
            extra = 0
            start = 1
          }

        for(var i = start; i <elements.length-1; i++){
          var first = elements[i].getBoundingClientRect().left

          if(i<elements.length-2){
            var second = elements[i+1].getBoundingClientRect().left

            if(first<=0 && second >space){

              this.changedots(elements[i+extra],this.$refs.scroll )
            }

          }
          else{

             var first = elements[i].getBoundingClientRect().left
             var previous = elements[i-1].getBoundingClientRect().left
            if(first>=0 && previous <0 ){

              this.changedots(elements[i],this.$refs.scroll )
            }

          }
        }
      }

    },
   isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth<769) {
        return true
      } else {
        return false
      }
    },
    scrolldots: function(event){
      var VueScrollTo = require('vue-scrollto');

      var navparent = this.$refs.dots
      var current = event.target
      var index = Array.prototype.indexOf.call(navparent.children, current) + 1

      var elements = this.$refs.scroll.children;
      if(elements[index]){
        elements[index].click()
      }





    },
   changedots: function(active, parent){
      var index = Array.prototype.indexOf.call(parent.children, active) -1

      if(this.$refs.dots){

        var dots = this.$refs.dots.children;
        var currentdot = this.$refs.dots.getElementsByClassName("current")
        if(currentdot.length>0){
           currentdot[0].classList.remove("current")
          if(dots.length>0){
            dots[index].classList.add("current")

          }
        }


      }
   },
   scroll: function (event) {

      var VueScrollTo = require('vue-scrollto');

      var parent = this.$refs.scroll
      parent.style.scrollSnapType = "none"
      var elements = this.$refs.scroll.children;
      var width = parent.scrollWidth - parent.offsetWidth

      elements.forEach(element => {
      element.classList.remove('middle', 'left', 'right')
      });

      var active, prev, next
      active = prev = next = event.target.closest(".block")

      do prev = prev.previousSibling; while(prev && prev.nodeType !== 1);
      do next = next.nextSibling;     while(next && next.nodeType !== 1);

      active.classList.add('middle')

      if(prev){
        prev.classList.add('left')
      }
      if(next){
         next.classList.add('right')


      }

      if(this.isMobile()){
         var options = {

          offset: 0,
          duration: 600,
          easing: "ease-in-out",
        }
      }
      else{
        var options = {

          offset: -(active.offsetWidth/2),
          duration: 600,
          easing: "ease-in-out",
        }
      }

      VueScrollTo.scrollTo(active, options)


      var current = parent.scrollLeft
      var percent = current * 100 / width

      var progressbar = document.getElementById("progressbar")
      progressbar.style.background ="linear-gradient(90deg, rgba(255,255,255,1) "+(percent-50)+"%, rgba(185,152,255,1) "+percent+"%, rgba(255,255,255,1) "+(percent+50)+"%)"

      setTimeout(function(){

        parent.style.scrollSnapType = "x mandatory"

      }, 600)

    },
    changelangen: function(){
      document.getElementsByClassName("lang")[0].classList.add('link_active')
      document.getElementsByClassName("lang")[1].classList.remove('link_active')
      var menus = ['program', 'candidates', 'Events', 'Seminars', 'Contact']
     // this.$store.commit('CHANGE_NAV_LAYOUT','en')
      this.$store.commit('CHANGE_NAV_TITLES', menus)
      this.$root.$emit('Footer_En') //like this
    },
    changelangde: function(){

      document.getElementsByClassName("lang")[1].classList.add('link_active')
      document.getElementsByClassName("lang")[0].classList.remove('link_active')
      var menus = ['Programm', 'Kandidatinnen', 'Veranstaltungen', 'Seminare', 'Kontakt']
     // this.$store.commit('CHANGE_NAV_LAYOUT','de')
      this.$store.commit('CHANGE_NAV_TITLES', menus)
      this.$root.$emit('Footer_De') //like this
    }
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
