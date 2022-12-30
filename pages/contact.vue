<template>
  <with-footer> 
    <div id="pageContent" class="pageContent contact overflow" v-on:scroll="progressBar" ref="scroll" >
      <div v-on:click="scroll" class="en block last" >

        <div v-for="(contents) in pages.pageZoneEn" :key="contents.id" >
          
            <div class="richtext" v-if="contents.__typename === 'ComponentLayoutsTextBlock'">
              <Richtext :zone="contents.richText" />
            </div>
            <div class="richtext" v-if="contents.__typename === 'ComponentContactContacts'">
                <div v-for="(contact, index) in contents.People" :key="contact.id">
                  <span v-if="index === 1">For further information and questions, please contact:</span>
                  <ul>
                     <li class="contact-name">
                      <span v-if="contact.cv" class="link" v-on:click="showCV($event, contact.cv, 'en')">{{contact.name}}</span>
                      <span v-else>{{contact.name}}</span> 
                    </li>
                    <li>{{contact.role}}</li>
                    <li>{{contact.description}}</li>
                    <li>Email: <a :href="`mailto:${contact.email}`">{{contact.email}}</a></li>
                    <li>{{contact.phone}}</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
      <div v-if="cvEnVisible" id="cv-en" class="en block right richtext" v-on:click="scroll"></div>
      <div v-if="pages.pageZoneDe.length" class="en block image" v-on:click="scroll "> 
         <div class="layer"></div>
         <BackgroundProgram />
      </div>
      <div v-on:click="scroll" class="de block first" v-if="pages.pageZoneDe.length" >
        <div v-for="(contents) in pages.pageZoneDe" :key="contents.id">
          <div class="richtext" v-if="contents.__typename === 'ComponentLayoutsTextBlock'">
              <Richtext :zone="contents.richText" />
            </div>
              <div class="richtext" v-if="contents.__typename === 'ComponentContactContacts'">
                <div v-for="contact in contents.People" :key="contact.id">
                  <ul>
                    <li class="contact-name">
                      <span v-if="contact.cv" class="link" v-on:click="showCV($event, contact.cv, 'de')">{{contact.name}}</span>
                      <span v-else>{{contact.name}}</span> 
                    </li>
                    <li>{{contact.role}}</li>
                    <li>{{contact.description}}</li>
                    <li>Email: <a :href="`mailto:${contact.email}`">{{contact.email}}</a></li>
                    <li>{{contact.phone}}</li>
                    </ul>
              </div>
            </div>
        </div>
      </div>
 
      <div v-if="cvDeVisible && pages.pageZoneDe" id="cv-de" class="en block right richtext" v-on:click="scroll"></div>
      <div class="block half-block image"> 
        <div class="layer"></div>
        <BackgroundProgram />
      </div>
      <div ref="dots" v-on:click="scrolldots" class="dot-navigation">
        <div class="dot" v-for="(p, index) in getListPages" :key="index" :class="{'current': index === 0}"></div>
       </div>
    </div>
  </with-footer>
</template>

<script>
import Richtext from '~/components/Richtext.vue';
import { ContactQuery } from "~/graphql/queries/content"
import WithFooter from '~/layouts/WithFooter.vue';
import BackgroundProgram from '~/components/BackgroundProgram.vue';
export default {
  components: {
    WithFooter,
    Richtext,
    BackgroundProgram
  },
  data() {
    return {
      pages:[], //query result
      title: "Contact",
      numPages: [],
      totalPages: 1,
      cvEnVisible: false,
      cvDeVisible: false
    };
  },
  head() {
    return {
      title: "Contact - Artistic-PhD HFK Bremen"
    };
  },
  computed: {
    getListPages: function(){
       
       for(var i = 0; i < this.totalPages; i++){
          this.numPages[i] = i
        }
       return this.numPages
    }
  },
  apollo: {
    pages: {
      query: ContactQuery,
      prefetch: true
    }
  },
   mounted() {
  
    this.$nextTick(function () {
      this.$root.$emit('Header') //like this
       if(this.pages.pageZoneDe.length){
          this.totalPages = 3
        }
    });
  },
  methods: {
     isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth<769) {
        return true
      } else {
        return false
      }
    },
    showCV: function (e, cv, lang ){
      if(lang === "en"){
        if(!this.cvEnVisible){
              this.totalPages += 1
              this.cvEnVisible = true
          }

      }
      else{
         if(!this.cvDeVisible){
              this.totalPages += 1
              this.cvDeVisible = true
          }
      }
      
      e.stopPropagation()  
      this.$nextTick(function () {
        const cvContainer = document.getElementById(`cv-${lang}`)
        cvContainer.innerHTML = cv
      });
    
    },
    scrolldots: function(event){
  
      var navparent = this.$refs.dots
      var current = event.target
      var index = Array.prototype.indexOf.call(navparent.children, current)

      var elements = this.$refs.scroll.children;
      if(elements[index]){
        elements[index].click()
      }
    },
    changedots: function(active, parent){
          var index = Array.prototype.indexOf.call(parent.children, active) 
  
      if(this.$refs.dots){

        var dots = this.$refs.dots.children;
        var currentdot = this.$refs.dots.getElementsByClassName("current")
        if(currentdot.length>0){
           console.log(currentdot[0])
           currentdot[0].classList.remove("current")
          if(dots.length>0){
            dots[index].classList.add("current")

          }
        }


      }
   },
      progressBar: function(event) {
      var element = event.srcElement

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
          
        let active = element.getElementsByClassName("middle");
        this.changedots(active[0],this.$refs.scroll )
      
    },
    scroll: function (event) {

      var VueScrollTo = require('vue-scrollto');
      var parent = this.$refs.scroll
      parent.style.scrollSnapType = "none"
      var width = parent.scrollWidth - parent.offsetWidth
      var elements = this.$refs.scroll.children;
     
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

     VueScrollTo.scrollTo(event.target, options)

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
}

</script>
<style lang="sass">
.contact
  .block:first-child
    margin-left: 25%

  ul 
    list-style: none
    padding: 20px 0

    .contact-name .link
      border-bottom: 2px solid #B998FF
      cursor: pointer
      &:hover
        color: black 

  .right, .right p, .right .richtext, .right div
    cursor: pointer
  .left, .left p,  .left .richtext, .left div
    cursor: pointer

  .richtext p 
    padding-bottom: 30px

  .layer
      cursor: pointer
      position: absolute
      z-index: 2
      top: 0
      height: 100%
      width: 100%
      background: transparent


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
  z-index: 4

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
