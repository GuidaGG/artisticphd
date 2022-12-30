<template>
    <client-only>
      <div class="imageContainer">
        <div class="open">
          <div id="line1"></div>
          <div id="line2"></div>
          <div v-on:click="closeImage" class="closing">
          </div>
           <img :src="api_url + source"/>
        </div>
         <img v-on:click="openImage" :src="api_url + source"/>
      </div>
    </client-only>
</template>
<script>
export default {

  props: ["source"],
  data(){
    return{
    api_url: process.env.strapiBaseUri
    }
  },
  methods: {
    openImage: function(event){
      let image = event.srcElement.parentNode
      image.classList.add("slide")
    },
      closeImage: function(event){
      let image = event.srcElement.parentNode.parentNode
      image.classList.remove("slide")
    }
  }
}
</script>


<style lang="sass">


  
img 
  cursor: pointer
.closing
  display: none

.open
  display: none

.slide 
  .open
    display: block
    z-index: 100
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    //height: 70vh
    //width: 70vw 
    border: black 2px solid
    transition: all ease-in-out 0.5s
    //
    // */
  
  
    img
      display: block
      position: relative !important
      width: auto !important
      height: auto !important
      max-height: 70vh !important
      max-width: 70vw !important
      min-height: unset !important
      min-width: unset !important
      top: unset !important
      left: unset !important
      transform: unset !important
      transition: all ease-in-out 0.5s
      cursor: pointer
      
    

    .closing
      display: block
      position: absolute
      top: 0
      right: 0
      width: 50px
      height: 50px
      z-index: 500
      cursor: pointer

    #line1
      position: absolute
      width: 50px
      height: 4px
      top: 25px
      right: 0
      background: black
      transform: rotate(-45deg)
      z-index: 50
     

    #line2
      position: absolute
      width: 50px
      right: 0
      top: 25px
      height: 4px
      background: black
      transform: rotate(45deg) 
      z-index: 50
</style>
  