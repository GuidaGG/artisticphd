<template>
      <div  class="featured-category overflow-x" :class="view">
        <div class="category-header">
            <nuxt-link v-if="view != 'list'" :to="{ name: 'events-categories-category', params: { category: category }}" class="nav__link" >
                <h3> {{ category }}s</h3>
            </nuxt-link>
            <div v-if="view != 'list'" class="arrow arrowscroll" v-on:click="scroll">
                    →
            </div>
        </div>
        <div ref="scroll" v-if="events.length" class="row overflow-x scroll">
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
    props: ["category", "view"],
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
                parent.style.scrollSnapType = "none"

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

                setTimeout(function(){
                    parent.style.scrollSnapType = "x mandatory"}
                , 600)
     
            }
        }
        
}
</script>

<style lang="sass" >
.featured-category 
    width: 100%
    .row 
        display: flex
        height: 35vh
        max-height: 220px
        flex-flow: row nowrap
        overflow-x: scroll
        scroll-snap-type: x mandatory
        border-bottom: 2px solid black   
        .spacer
            width: 55%
            flex: 0 0 auto
    .category-header
        top: 0
        padding: 0px 10px
        display: flex 
        justify-content: space-between
        flex-wrap: nowrap
        border-bottom: 2px solid black
        h3
            font-size: 16px
            line-height: 39px
        .arrow 
            line-height: 39px
            font-size: 24px
            cursor: pointer

    .featured-event
        width: 45%
        flex: 0 0 auto
        position: relative
        scroll-snap-align: start
        box-sizing: content-box
        a 
            color: white

        .image-container 
            width: 100%
            height: 35vh
        img
            width: 100%
            height: 100%
            object-fit: cover       
        .hover
            display: none
            top: 0px
            padding: 0 10px
            position: absolute
            z-index: 1

        &:hover 
            .hover 
                display: block
            img 
                filter: brightness(10%)

    
@media only screen and (max-width: 1200px)
    .featured-category 

        .featured-event
            width: 65%

@media only screen and (max-width: 769px)
    .featured-category 
        a 
            
        .featured-event
            width: 85%

            .date-arquive
                font-size: 14px
                line-height: 18px

            .hover
                display: block
            img 
                filter: brightness(50%)

@media only screen and (max-width: 500px)
    .featured-category 
        font-size: 12px
        background: #5E5E5E

       

.list
   .row
        margin-top: 39px
        flex-direction: column
        height: unset
        min-height: unset
        max-height: unset
        border-bottom: none

        .featured-event 
            width: 100%
            height: 35vh
            max-height: 220px
            border-bottom: 2px solid black
            
            a 
                display: flex
                align-items: stretch
               
            .image-container 
                width: 45%
                height: 35vh
                max-height: 220px
                flex: 0 0 auto
                
            img
                width: 100%
                object-fit: cover
            .hover 
                width: 100%
                display: block
                position: relative
            &:hover 
                img 
                    filter: none

@media only screen and (max-width: 769px)  
    .list
        .row
            margin-top: 0px   
            .featured-event  
                .image-container 
                    width: 35%
                img 
                    filter: none

        .category-header
            border: none

@media only screen and (max-width: 500px)  
    .list
        .row
            .featured-event 
                height: 22vh
                min-height: 180px
                .image-container 
                    height: 22vh
                    min-height: 180px
</style>