<template>
  <div class="no-footer fullheight">
    <div ref="barleft" class="bar bar-left"></div>
    <div class="bar bar-right"></div>
    <slot />

  </div>
 
</template>


<script>
import Header from "@/components/Header"


export default {

   components: {
    Header,

  }

}
</script>


<style lang="sass">

.no-footer 

  overflow: hidden

  .pageContent
    position: relative
    padding-left: 0
    overflow: visible
    width: 50%
    margin: 0 auto
    
  .overflow
    overflow-x: hidden
    overflow-y: scroll
    -webkit-overflow-scrolling: touch
    scrollbar-width: none  

  .overflow::-webkit-scrollbar 
    width: 0 !important
    
  .fullheight
    height: calc(100vh - 106px)
 

</style>
