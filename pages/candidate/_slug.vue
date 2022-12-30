<template>
  <no-footer-lines>
    <div ref="nav" class="sidebar sidebar-candidates">
         <div class="link-parent">
       
            <nuxt-link :to="{ name: 'candidate-slug-about', params: { slug: params }}" class="nav__link" >About</nuxt-link> 
        </div>
        <div class="link-parent">
            <nuxt-link :to="{ name: 'candidate-slug-research', params: { slug: params }}" class="nav__link" >Research</nuxt-link> 
        </div>
        <div class="link-parent">
            <nuxt-link :to="{ name: 'candidate-slug-feed', params: { slug: params }}" class="nav__link" >Feed</nuxt-link> 
        </div>
     

         <div class="link-parent back">
       
            <nuxt-link to="/candidates" class="nav__link" >Back to List</nuxt-link> 
        </div>
         <div ref="line" class="line-vertical"></div> 
    </div>
    <div ref="container" class="container">
    <nuxt-child/>
    
    <div ref="sidebarFeed" class="sidebar fullheight sidebar-feed overflow">
     
        <div v-for="feed in feeds" :key="feed.id" class="link-parent">
                
            <nuxt-link :to="{ name: 'candidate-slug-feed-subslug', params: { slug: params, subslug: feed.slug}}" class="nav__link" >
                  <span class="date-arquive" v-if="feed.published_at">
                     {{getDate(feed.published_at)}} 
                  </span>
                   {{feed.title}}
              </nuxt-link> 
           
          </div> 
           <div ref="lineFeed" class="line-vertical line-feed"></div>   
      </div>
      </div>
  </no-footer-lines>
</template>

<script>
import { CandidatesQuery } from "~/graphql/queries/content"
import NoFooterLines from '~/layouts/NoFooterLines.vue';
import { FeedQuery } from "~/graphql/queries/content"

export default {
  components: {
    NoFooterLines,
 
  },
  head() {
    return {
      title: this.params+ " - Artistic-PhD HFK Bremen"
    };
  },

  data() {
    return {
      candidates:[], //query result
      params: this.$route.params.slug,
      feeds:[],
      firstLoad: true,
    };
  },
  methods: {
     getDate(datetime) {
        let d = new Date(datetime)
        var date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()

        let h = d.getHours();
        h = ("0" + h).slice(-2); 
        let m = d.getMinutes()   
        m = ("0" + m).slice(-2); 

        date = date + " " + h + ":" + m

        return date
     },

      moveLine: function(){
           this.$nextTick(function () {
          
          var nav = this.$refs.nav
        
            if(nav){
                var active = (nav.getElementsByClassName("nuxt-link-active"))
             
                    if(active.length>0){
                        
                        var w = nav.clientWidth;
                       
                        var h = active[0].offsetHeight+15;
                        console.log(h)

                        var hi = Math.hypot(h, w)
                        var sin = h/hi
                        var line = this.$refs.line

                        var ang = Math.asin(sin) * 180/Math.PI
                        line.style.width =hi + 5 + "px"
                        console.log(active[0].parentNode.offsetTop)
                        line.style.top = active[0].parentNode.offsetTop + 20 + "px"
                        line.style.transform = "rotate("+ang+"deg)";
                }
            }
           })

        

      },
      moveLineFeed: function(){
        
           this.$nextTick(function () {
             
          var nav = this.$refs.sidebarFeed
            if(nav){
                var active = (nav.getElementsByClassName("nuxt-link-active"))
             
                    if(active.length>0){
                        
                        var w = nav.offsetWidth;
                       
                        var h = active[0].parentNode.offsetHeight;
                     
                        var hi = Math.hypot(h, w)
                        var sin = h/hi
                        var line = this.$refs.lineFeed

                        var ang = Math.asin(sin) * 180/Math.PI
                        line.style.width =hi + 5 + "px"
                        if(this.firstLoad == true){
                          line.style.top = "0"
                        }
                        else{

                       
                        line.style.top = active[0].parentNode.offsetTop + h/2+ "px"
                         }
                        console.log(active[0].parentNode.offsetTop)
                       line.style.transform = "rotate("+ang+"deg)";
                }
            }
           })

        

      }

  },
  mounted: function(){
      this.$root.$on('Child', () => {
      
            var container = this.$refs.container
    
        if(container){
          
              container.classList.add("child")
            
        }
      })
       this.$root.$on('removeChild', () => {
      
            var container = this.$refs.container
    
        if(container){
          
              container.classList.remove("child")
            
        }
      })



        this.$root.$on('SidebarCandidates', () => {
          
            this.moveLine()
            var line = this.$refs.line
          
            if(line){
              setTimeout(function(){line.style.display = "block"}, 100)
            }
            
        })
        this.$root.$on('SidebarFeed', () => {
   
            this.moveLineFeed()
            var line = this.$refs.lineFeed
            if(line){
              setTimeout(function(){line.style.display = "block"}, 100)
            }
            
        })

          this.$root.$on('Feed', () => {
          
            var feed = this.$refs.sidebarFeed
            if(feed){
              feed.style.display = "block";
            }
            
        })
         this.$root.$on('HideFeed', () => {
          
            var feed = this.$refs.sidebarFeed
            if(feed){
              feed.style.display = "none";
            }
            
        })

        this.firstLoad = false
  },


  apollo: {
    feeds: {
      variables () {
        return { slug: this.$route.params.slug }
      },
      query: FeedQuery,
      prefetch: true
    },
    candidates: {
      query: CandidatesQuery,
      prefetch: true
    }
  }
}
</script>


<style lang="sass">
.no-footer-lines
  .sidebar-candidates
    border-bottom: none
    scrollbar-width: none

  .candidate-name
    position: absolute
    width: calc(50% - 4px) 
    padding: 8px 10px 
    margin: 0
    left: calc(25% + 2px)
    background: #5E5E5E
    z-index: 10
    border-bottom: 2px solid black
    h1
      font-family: GT-Sectra-Regular
      
      line-height: 22px


  .back
    padding-top: 20px
    border-top: 2px solid black
  
  .sidebar-feed
    position: fixed
    top: 106px
    right: 0
    z-index: 10
    float: right
    width: 25%
    text-align: left
    padding-left: 20px
    height: calc(100vh - 106px)

    
  .line-feed
    display: block
    left: -5px
    width: 389.413px
    top: 22px
    transform: rotate(6.42249deg)
</style>
