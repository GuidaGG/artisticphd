<template>
      <div v-if="events.length" class="featured-category overflow-x">
        <div class="category-header">
            <nuxt-link :to="{ name: 'events-category', params: { category: category }}" class="nav__link" >
                <h3> {{ category }}</h3>
            </nuxt-link>
            <div class="arrow arrowscroll" v-on:click="scroll">
                    →
            </div>
        </div>
        <div class="row overflow-x scroll">
            <div :class="{'featured-event': true, 'current': index === 0}" v-for="(event, index) in events" :key=event.id>
               <FeaturedEvent :event="event" /> 
            </div>  
            <div class="spacer"></div> 
        </div>
      </div>
  </template>
<script>


import { FeaturedEvents } from "~/graphql/queries/content"
import FeaturedEvent from "./FeaturedEvent.vue";

export default {
    props: ["category"],
    components: {
        FeaturedEvent
    },
    data() {
        return {
        events:[], //query result
        };
        },
        apollo: {
            events: {
            query: FeaturedEvents,
            prefetch: true,
            variables () {
                return {
                category: this.category
                }
            },
            },
        },
        methods: {
            scroll: function(event){
                var VueScrollTo = require('vue-scrollto');
                var parent = event.target.parentNode.nextElementSibling
                var active = parent.getElementsByClassName("current")

                var options = {
                    container: parent,
                    offset: 0,
                    duration: 600,
                    easing: "ease-in-out",
                }
                if(active.length>0){       
                    var index = Array.prototype.indexOf.call(parent.children, active[0]) 
                    if(index<parent.children.length-2){
                        active[0].classList.remove("current")
                    
                        var elements = parent.children
                    
                        var options = {
                            container: parent,
                            offset: 0,
                            duration: 600,
                            easing: "ease-in-out",
                            }

                        VueScrollTo.scrollTo(elements[index+1], options)
                        elements[index+1].classList.add("current")
                        }
                    else{
                        active[0].classList.remove("current")
                        var elements = parent.children
                        VueScrollTo.scrollTo(elements[0], options)
                        elements[0].classList.add("current")


                    }
                }
     
            }
        }
        
}
</script>

<style lang="sass">
.featured-category 
    width: 100%
    border-bottom: 2px solid black
    .row 
        display: flex
        min-height: 200px
        max-height: 400px
        height: 35vh
        width: 100%
        scroll-snap-align: start
        .spacer
            width: 55%
            flex: 0 0 auto
    .category-header
        top: 0
        height: 39px
        padding: 0px 10px
        border-bottom: 2px solid black   
        display: flex 
        justify-content: space-between
        h3
            font-size: 16px
            line-height: 39px
        .arrow 
            line-height: 39px
            cursor: pointer


    .featured-event
        width: 45%
        flex: 0 0 auto
        position: relative

    
@media only screen and (max-width: 1200px)
    .featured-category 
        
        .featured-event
            width: 65%

@media only screen and (max-width: 769px)
    .featured-category 
        
        .featured-event
            width: 85%

</style>