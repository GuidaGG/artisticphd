<template>
    <client-only>
        <div ref="nav" class="sidebar">
    
            <div v-for="(page, index) in pages" :key="page.id" class="link-parent">
              
                    <nuxt-link :to="{ name: 'program-slug', params: { slug: page.slug }}" class="nav__link" > {{submenu[index]}} </nuxt-link> 
            
            </div>  
             
            
             <div ref="line" class="line-vertical"></div> 
        </div>
    </client-only>
</template>

<script>
export default {
  // content is query data from parent page
  // title is the page title of parent page
  props: ["pages"],
  data() {
    return {
        subtitlesEn: [],
        subtitlesDe: [],
     }
    },
  beforeCreate: function() {
    this.$nextTick(function () {
    
    var total =  Object.keys(this.pages).length
    console.log(total)
    for(var i = 0; i < total; i++){     
        this.subtitlesEn[i] = this.pages[i].pageTitle
    }
    for(var i = 0; i < total; i++){
         this.subtitlesDe[i] = this.pages[i].pageTitleDe
    }
    
    if(total>0){
    
        this.$store.commit('CHANGE_EN_TITLES', this.subtitlesEn)
        this.$store.commit('CHANGE_DE_TITLES', this.subtitlesDe)
    }
    })

  
  },
    mounted: function(){

        this.$root.$on('Sidebar', () => {

            this.moveLine()
            let line = this.$refs.line
            if(line){
                setTimeout(function(){line.style.display = "block"}, 100)
            }
           
        })

  },
/*
  updated: function() {
    
     this.$store.commit('CHANGE_SUBNAV_TITLES', this.subtitlesDe)  
  }, */
  computed: {
     
     submenu() {
         return this.$store.state.submenus;
     }
   
  },
   methods: {
      moveLine: function(){
           this.$nextTick(function () {
             
          var nav = this.$refs.nav
            if(nav){
                var active = (nav.getElementsByClassName("nuxt-link-active"))
                    if(active.length>0){
                        
                        var w = nav.clientWidth;
                       
                        var h = active[0].offsetHeight+20;
                      
                        var hi = Math.hypot(h, w)
                        var sin = h/hi
                        var line = this.$refs.line

                        var ang = Math.asin(sin) * 180/Math.PI
                        line.style.width =hi + 5 + "px"
                        line.style.top = active[0].parentNode.offsetTop + 22 + "px"
                        line.style.transform = "rotate("+ang+"deg)";
                }
            }
           })

        

      }
  }
};
</script>

<style lang="sass">

.sidebar
    position: absolute
    z-index: 10
    background: #5E5E5E
    width: 25%
    text-align: center
    text-transform: uppercase
    border-bottom: solid 2px black
    height: auto
    overflow-y: scroll   
    overflow-x: hidden
    max-height: calc(100vh - 104px)
    scrollbar-width: none
    padding-bottom: 5px    
    &::-webkit-scrollbar 
        width: 0 !important

    -ms-overflow-style:
    scrollbar-width: none

    a
        line-height: 40px
        text-transform: uppercase
    
  
.line-vertical
    display: none
    position: absolute
    z-index: 10
    height: 2px
    background: black
    left: -2px
    width: 389.413px
    top: 22px
    transform: rotate(6.42249deg)
    transition: top ease-in-out 0.8s, width ease-in-out 0.6s, transform ease-in-out 0.8s,



.program
    .sidebar
     
        height: auto
</style>

