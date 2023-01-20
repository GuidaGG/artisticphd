<template>
  <client-only>
    <div id="scroll" ref="scroll" >
      <div v-for="contents in content" :key="contents.id" v-on:scroll="progressBar" id="pageContent" class="pageContent"  >
        <div class="block half-block image"> 
          <div class="layer"></div>
          <h2>{{contents.slug}}</h2>
          <BackgroundProgram />
        </div>
        <div v-for="(zone, index) in contents.pageEn" :key="zone.id" v-on:click="scroll" :class="{'en':true, 'block':true, 'last':  index === (contents.pageEn.length-1), 'middle': index === 0, 'right': index === 1  }">
          <div class="block-content" v-if="zone.__typename === 'ComponentLayoutsTextBlock'">
            {{ zone.__typename }}
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
            <div>asdasddadasddas</div>
          </div>
        </div>

        <div v-if="contents.pageDe.length>0" class="block en first image" v-on:click="scroll" >
          <div class="layer"></div>
          <BackgroundProgram />
          </div>
         <div v-for="(zone, index) in contents.pageDe" :key="zone.id" v-on:click="scroll" :class="{'de':true, 'block':true,  'middle': index === 0, 'right': index === 1  }">

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
        </div>
          <div class="block last-block image">
            <div class="layer"></div>
            <BackgroundProgram />
          </div>
          <div ref="dots" class="dot-navigation">
              <div v-on:click="scrolldots" class="dot" v-for="(p, index) in contents.pageEn" :key="'dot'+index" :class="{'current': index === 0}"></div>
              <div v-on:click="scrolldots" class="dot" v-for="(p, index) in contents.pageDe" :key="'doten'+index"></div>
               <div v-if="contents.pageDe.length>0" v-on:click="scrolldots" class="dot"></div>
          </div>
      </div>

    </div>

  </client-only>
</template>

<script>

import Richtext from '~/components/Richtext.vue';
import BackgroundProgram from '~/components/BackgroundProgram.vue';
export default {
  // content is query data from parent page
  // title is the page title of parent page
  props: ["content", "title"],
  components: {
    Richtext,
    BackgroundProgram,

  },
  data(){
    return{
      page: this.content,
      numPages: [],
  
    }

  },
 head() {
    return {
      title: "Program - Artistic-PhD HFK Bremen"
    };
  },



  methods: {
    linktoblock: function(event){
      event.preventDefault()
 
    },
    progressBar: function(event) {
      var element = event.srcElement
      //this.$root.emit('updateProgress');
      var width = element.scrollWidth - element.offsetWidth
      var current = element.scrollLeft
      var percent = current * 100 / width

      var progressbar = document.getElementById("progressbar")
      progressbar.style.background ="linear-gradient(90deg, rgba(255,255,255,1) "+(percent-50)+"%, rgba(185,152,255,1) "+percent+"%, rgba(255,255,255,1) "+(percent+50)+"%)"

      var beginDe = document.getElementsByClassName("first")[0]
      var beginEn = document.getElementsByClassName("last")[0]
      if(beginDe && beginEn){

        if(beginDe.getBoundingClientRect().left <= beginDe.offsetWidth/1.5){

            this.changelangde()


        }
        if(beginEn.getBoundingClientRect().left <= beginEn.offsetWidth/1.8 && beginDe.getBoundingClientRect().left >= beginDe.offsetWidth/1.5 ){

              this.changelangen()

          }
        }

        if(this.$refs.scroll){
          var container = this.$refs.scroll;
          var parent = container.children[0];
          var elements = parent.children
          var space = 0
          var extra = 1
          var start = 0
          var end = 1
          var last = 2
            if(this.isMobile()){
              space = 20
              extra = 0
              start = 1
              end = 2
              last = 3
            }

          for(var i = start; i <elements.length-end; i++){
            var first = elements[i].getBoundingClientRect().left

            if(i<elements.length-last){

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

      var index = Array.prototype.indexOf.call(navparent[0].children, current) +1

      var container = this.$refs.scroll;
      var parent = container.children[0];
      var elements = parent.children;
      if(elements[index]){
        elements[index].click()
      }


    },
   changedots: function(active, parent){

     var parent = parent.children[0]
      var index = Array.prototype.indexOf.call(parent.children, active) -1
      console.log(index)
      if(this.$refs.dots){

        var dots = this.$refs.dots[0].children;
        var currentdot = this.$refs.dots[0].getElementsByClassName("current")
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
      var container = this.$refs.scroll;
      var parent = container.children[0];
      if(parent){
        parent.style.scrollSnapType = "none"
      }
      var elements = parent.children;

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
      progressbar.style.background = "linear-gradient(90deg, rgba(255,255,255,1) "+(percent-50)+"%, rgba(185,152,255,1) "+percent+"%, rgba(255,255,255,1) "+(percent+50)+"%)"

       setTimeout(function(){
        parent.style.scrollSnapType = "x mandatory"
      }, 600)

    },
    changelangen: function(){
      document.getElementsByClassName("lang")[0].classList.add('link_active')
      document.getElementsByClassName("lang")[1].classList.remove('link_active')
      var menus = ['program', 'candidates', 'Events', 'Seminars', 'Contact']

      this.$store.commit('CHANGE_SUBNAV_TITLES', this.$store.state.submenusEn)
      this.$store.commit('CHANGE_NAV_TITLES', menus)
      this.$root.$emit('Footer_En') //like this
    },
    changelangde: function(){

      document.getElementsByClassName("lang")[1].classList.add('link_active')
      document.getElementsByClassName("lang")[0].classList.remove('link_active')
      var menus = ['Programm', 'Kandidatinnen', 'Veranstaltungen', 'Seminare', 'Kontakt']

      this.$store.commit('CHANGE_SUBNAV_TITLES', this.$store.state.submenusDe)
      this.$store.commit('CHANGE_NAV_TITLES', menus)
      this.$root.$emit('Footer_De') //like this
    }
  },

  updated: function() {
      var progressbar = document.getElementById("progressbar")
      progressbar.style.background =  "linear-gradient(90deg, rgba(255,255,255,1) -50%, rgba(185,152,255,1) 0%, rgba(255,255,255,1) 50%)"

      this.$nextTick(function () {
        var container = this.$refs.scroll;
        if(container){
        var parent = container.children[0];
        this.$store.state.layout = "en"

        this.$root.$emit('Sidebar') //like this
        if(parent){

            parent.style.scrollSnapType = "none"
            parent.scrollLeft = 0
            setTimeout(function(){
              parent.style.scrollSnapType = "x mandatory"
            }, 600)
          }
        this.changelangen()
        }

      })
  },

}


</script>

<style lang="sass">
.right, .left
  .layer
    position: absolute
    z-index: 2
    top: 0
    height: 100%
    width: 100%
    background: transparent

ul.about
  list-style: none
  padding: 0px


  li
    &:nth-of-type(odd)
      font-family: "GT-Flexa-Light"
      color: black
      padding-bottom: 10px
      text-transform: uppercase

    &:nth-of-type(even)
      font-family: "GT-Sectra-Regular"
      margin-bottom: 60px

.program, .contact

  .block
    display: inline-block
    position: relative


    a
      border-bottom: 2px solid #B998FF
  .last-block
    width: 50%
    div
      cursor: default
    svg
      width: 200%



</style>
