<template>
    <div ref="container" class="about-container">
         <div v-for="c in candidate" :key="c.id" class="about">
            <div class="about-bio overflow">
                <div v-if="c.name" class="candidate-name">
                    <h1>{{c.name}}</h1>
                </div>
                <div v-if="c.bio" class="candidate-bio">
                        <Richtext :zone="c.bio" />
                </div>
            </div>
            <div v-if="c.cv" class="candidate-cv overflow fullheight scroll">
                    <div class="cv-title about-title">RESUME 
                        <div class="arrowscroll" v-on:click="scrolldown">
                          →
                        </div> 
                    </div>
                   <Richtext :zone="c.cv" />
            </div>
            <div class="portfolio scroll">
              <div class="portfolio-title about-title">PORTFOLIO 
                  <div  class="arrowscroll" v-on:click="scrollleft">
                    →
                  </div>
              
                </div>
                <div v-for="(p, index) in c.portfolio" :key="p.id" :class="{'portfolio-container': true, 'currentp': index === 0}" >
                    <div v-if="p.portfolioEntryMedia" class="portfolio-image">     
                      <ImageField :source="p.portfolioEntryMedia.url"/>
                    </div>
                    <div class="portfolio-text overflow">
                      <div v-if="p.portfolioEntryTitle" class="portfolio-title">{{p.portfolioEntryTitle}}</div>
                      <div v-if="p.portfolioEntrySummary" class="portfolio-summary">
                           <Richtext :zone="p.portfolioEntrySummary" />
                         
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { CandidateQuery } from "~/graphql/queries/content"
import NoFooter from '~/layouts/NoFooter.vue';
import Richtext from '~/components/Richtext.vue';
import ImageField from '~/components/ImageField.vue';
export default {
  components: {
    NoFooter,
    Richtext 
  },

  data() {
    return {
      candidate:[], //query result
      params: this.$route.params.slug,
      api_url: process.env.strapiBaseUri,

    };
  },

  head() {
    if(this.candidate.length>0){
      return {
        title: this.candidate[0].name + " - Artistic-PhD HFK Bremen"
      };
    }
  },
  methods: {
    open: function(event){
      var parent = event.target.parentNode.closest(".scroll")
      if(parent.classList.contains("openAccordion")){
        parent.classList.remove("openAccordion")
         parent.style.height = "40px"
      }
      else{
        parent.classList.add("openAccordion")
        var elements = parent.children;
        var height = 0
       
        for(var i = 0; i<elements.length; i++){
            height += elements[i].offsetHeight
             console.log(elements[i].offsetHeight)
        }
      
        parent.style.height = height + "px"
     
      }
    },
    isMobile: function() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/ && window.innerWidth<769) {
        return true
      } else {
        return false
      }
    },
     scrollleft: function(event){
      
      var options = {
          container: parent,
          offset: 0,
          duration: 600,
          easing: "ease-in-out",
      }

      this.scroll(event)
    },
    scrolldown: function(event){
      if(!this.isMobile()){
        var parent = event.target.parentNode.closest(".scroll") 
        var scrolltop = parent.scrollTop + 400
     
        if(scrolltop<(parent.scrollHeight-400)){
       
        parent.scroll({ top: scrolltop, behavior: 'smooth' });
        }
        else{
          parent.scroll({ top: 0, behavior: 'smooth' });
        }

        
      }
      else{
         this.open(event)
      }

    },
    scroll: function(event){
      if(!this.isMobile()){
        
    
      var VueScrollTo = require('vue-scrollto');
      var parent = event.target.parentNode.closest(".scroll")
      var active = parent.getElementsByClassName("currentp")

      var options = {
          container: parent,
          offset: 0,
          duration: 600,
          easing: "ease-in-out",
      }
      if(active.length>0){       
        var index = Array.prototype.indexOf.call(parent.children, active[0]) 
        if(index<parent.children.length-1){
        active[0].classList.remove("currentp")
       
        var elements = parent.children
     
        var options = {
              container: parent,
              offset: 0,
              duration: 600,
              easing: "ease-in-out",
            }

        VueScrollTo.scrollTo(elements[index+1], options)
        elements[index+1].classList.add("currentp")
        }
        else{
          active[0].classList.remove("currentp")
          var elements = parent.children
          VueScrollTo.scrollTo(elements[1], options)
          elements[1].classList.add("currentp")


        }
      }
     
      }
      else{
     
        this.open(event)
      }
    }
  },

  apollo: {
    candidate: {
    variables () {
        return { slug: this.$route.params.slug }
      },
      query: CandidateQuery,
      prefetch: true
    }
  },

  mounted() {
 
     this.$nextTick(function () {
      this.$root.$emit('SidebarCandidates') //like this
      this.$root.$emit('HideBar')
      this.$root.$emit('HideFeed')
      this.$root.$emit('removeChild')

      if(this.isMobile() == true){
        this.$refs.container.classList.add("mobile")
      }
     });
    
  },
 

}
</script>

<style lang="sass">

.about-container
    font-size: 16px
    line-height: 20px

    .arrowscroll
      cursor: pointer
      position: relative
      margin-right: 5px
      font-size: 24px
      float: right 
      /*border-left: 2px white solid
     /* border-bottom: 2px white solid
    
      /*transform: rotate(-45deg)

      /*.line
        width: 25px
        height: 2px
        background: white
        position: absolute
        transform: rotate(-45deg)
        top: 4px
        left: -4px

     

    .richText
      p
        padding-bottom: 20px
        
    .about-bio
        border-left: 2px solid black
        border-right: 2px solid black
        width: 50%
        height: calc(50vh - 106px)
       
        margin-left: 25%
        float: left 
        font-family: GT-Sectra-Regular

        .candidate-bio
            padding: 10px 10px
            padding-top: 50px
            
    .about-title
      background: black
      position: fixed
      padding: 10px
      font-family: GT-Flexa-Light 

    .candidate-cv
        font-family: GT-Sectra-Regular  
        float: right
        width: 25%
        padding: 10px
        padding-top: 50px 
        
        .cv-title
          top: 106px
          right: 0
          width: 25%

          .arrowscroll
            transform: rotate(90deg)

    .portfolio
        font-family: GT-Sectra-Regular
        height: calc(75vh - 106px)
        float: left
        width: 75%
        height: calc(50vh)
        padding-top: 35px 
        border-top: 2px solid black
        border-right: 2px solid black
        overflow-x: scroll
        overflow-y: hidden
        display: flex
        flex-wrap: nowrap
        position: relative
        scrollbar-width: none
        
        &::-webkit-scrollbar 
          width: 0 !important
          height: 0 !important

        .portfolio-title
         
          width: 75%
          top: calc(50vh)
          left: 0
          z-index: 10

          .arrowscroll
            


        .portfolio-container
      
          display: inline-block
          width: auto
          width: 75%
          flex: 0 0 auto
          margin-right: 10px
          height: calc(50vh - 35px)
          padding-top: 
         
      
          .portfolio-text
            width: auto
            display: inline-block
            float: left
            max-width: 46%
            height: calc(50vh - 35px)
            overflow-y: scroll
            padding-top: 15px
            &::-webkit-scrollbar 
              width: 0 !important
              height: 0 !important

            .portfolio-title
              font-family: GT-Flexa-Light
              text-transform: uppercase

          .portfolio-image
            width: auto
            display: inline-block
            float: left
            height: calc(50vh - 35px)
            width: calc(50% - 10px)
            margin-right: 10px
            overflow: hidden
            position: relative
            img
              min-width: 100%
              min-height: calc(50vh - 35px)
              min-width: 100%
              max-height: 50vh
              height: auto
              width: auto
              position: absolute
              top: 50%
              left: 50%
              transform: translate(-50%, -50%)
        
        .portfolio-container:last-of-type
          width: 100%
          padding-right: calc(100% / 3)

body .no-footer-lines .about-container.mobile
  .scroll, .candidate-cv
    overflow-y: hidden
    height: 42px
    padding: 0
    transition: height 0.5s ease-in-out
  .about-bio
    height: auto
  .portfolio .portfolio-container
    height: auto
  .portfolio-container:last-of-type
    width: 100%
    padding-right: 0

  .arrowscroll
   
    transform: rotate(90deg)

  .scroll.openAccordion
   

    .arrowscroll
      transform: rotate(270deg)

    

</style>