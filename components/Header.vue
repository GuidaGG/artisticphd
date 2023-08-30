<template>
        <header class="header">
            <!-- add to backend title option -->
            <div class="header-title-container">
                 <nuxt-link class="nav__link header-title" to="/"><h1>BINATIONAL ARTISTIC PhD-PROGRAM</h1></nuxt-link>
                <div class="header-logo"><Logo /></div>
            </div>
            <div class="container">
          
                <div id="progressbar" ref="progressbar" class="progress-bar"></div>
                <nav ref="nav" class="nav-header">
                    <nuxt-link :to="{ name: 'program-slug', params: { slug: subslug }}" class="nav__link" >{{menu[0]}}</nuxt-link>
                    <nuxt-link class="nav__link" to="/candidates">{{menu[1]}}</nuxt-link>
                    <nuxt-link class="nav__link newsmenu"  to="/events">{{menu[2]}}</nuxt-link>
                    <nuxt-link v-if="currentseminars[0]  && !mobile" class="nav__link newsmenu"  :to="{ name: 'seminars-slug', params: { slug: currentseminars[0].slug }}">{{menu[3]}}</nuxt-link>
                    <nuxt-link v-else class="nav__link newsmenu"  :to="{ name: 'seminars'}">{{menu[3]}}</nuxt-link>
                    <nuxt-link class="nav__link" to="/contact">{{menu[4]}}</nuxt-link>
                    <!-- add here the users -->
                    <div ref="line" class="line-horizontal"></div>
                </nav>

            </div>

        </header>
</template>

<script>
import {CurrentEventsQuery, CurrentSeminarsQuery} from "~/graphql/queries/content"

import Logo from "@/components/Logo.vue"
export default {
    components: { Logo },

    data() {
    return {
        subslug: "about",
        currentevents : [],
        currentseminars : [],
        today_date: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        mobile: "false"

    };
  },

  mounted: function(){

     this.moveLine()
     this.mobile = this.isMobile();
     this.$root.$on('Header', () => {
            this.moveLine("")
            var line = this.$refs.line
                setTimeout(function(){line.style.display = "block"}, 100
            )
    })
       this.$root.$on('HeaderNews', () => {

            this.moveLine("newsmenu")
            var line = this.$refs.line
                setTimeout(function(){line.style.display = "block"}, 100
            )
    })

    this.$root.$on('HideLine', () => {
            this.hideLine()
    })
    

  },
  computed: {
     navLayout() {
         return this.$store.state.layout;
     },
     menu() {
         return this.$store.state.menus;
     },



    },
  methods: {
      moveLine: function(section){
        this.$nextTick(function () {

            var nav = this.$refs.nav
            if(nav){
                var active
                if(section==""){
                    active = (nav.getElementsByClassName("nuxt-link-active"))
                }
                else{
                    active = nav.getElementsByClassName(section)
                }
                    if(active.length>0){

                        var h = nav.clientHeight;
                        var w = active[0].offsetWidth+20;

                        var hi = Math.hypot(h, w)
                        var sin = h/hi
                        var line = this.$refs.line

                        var ang = Math.asin(sin) * 180/Math.PI - 1

                        line.style.display = "block"
                        line.style.width = (hi + 10) + "px"
                        line.style.left = active[0].offsetLeft - 15 + "px"
                        line.style.transform = "rotate("+ang+"deg)";
                }
            }
           })



      },
        isMobile: function() {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/ && window.innerWidth<769) {
                return true
            } else {
                return false
            }
        },
      hideLine: function(){
            var line = this.$refs.line
            if(line){
            line.style.display = "none"
            }
      }
  },

   apollo: {
    currentevents: {
      query: CurrentEventsQuery,
      prefetch: true,
      variables () {
        return {
          date: this.today_date
        }
      },
    },
    currentseminars: {
      query: CurrentSeminarsQuery,
      prefetch: true,
      variables () {
        return {
          date: this.today_date
        }
      }
    }
   }
}
</script>

<style lang="sass">
header
    border-bottom: solid 2px black
    height: 106px
    //ADAPT TO MOBILE
    font-size: 0.8em


.header-title-container
    padding: 15px
    background: black
    a
        text-transform: unset
        h1 
            font-size: 1em


.header-logo
    position: absolute
    top: 8px
    right: 50px
    svg
        height: 40px

header a

     text-transform: uppercase

a.header-title:hover, a.header-title.nuxt-link-exact-active
    color: white

nav
    position: relative
    width: 50%
    display: flex
    flex-flow: row wrap
    justify-content: space-between
    margin-left: 25%
    padding: 10px 10px 9px 10px
    margin-top: 1px
    overflow: hidden

    a




.side-left, .side-right
    width: 25%
    display: inline-block

.progress-bar
    width: 100%
    height: 5px
    background: rgb(185,152,255)
    background: linear-gradient(90deg, rgba(255,255,255,1) -50%, rgba(185,152,255,1) 0%, rgba(255,255,255,1) 50%)
.bar
    position: fixed
    top: 60px
    z-index: 11
    width: 2px
    height: calc(100vh - 60px)
    background: #000000

.bar-left
    left: 25%

.bar-right
    right: 25%

.line-horizontal
    display: none
    position: absolute
    z-index: 10
    height: 2px
    background: black
    top: calc(50% - 0px)
    width: 178.146px
    left: -2px
    transform: rotate(16.2892deg)

    transition: left ease-in-out 1s, width ease-in-out 0.8s, transform ease-in-out 1s,


</style>
