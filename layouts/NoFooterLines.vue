<template>
  <div class="no-footer-lines">
  
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

header
 
  .bar
    display: none

  nav 

   
    border-right: solid 2px black
    border-left: solid 2px black

.no-footer-lines

  .pageContent
    position: relative
    padding-left: 0
    padding: 0 5px
    overflow: unset
    width: 50%
    margin: 0 auto
    
  .overflow
    overflow-x: hidden
    overflow-y: scroll
    scrollbar-width: none

  .overflow::-webkit-scrollbar 
    width: 0 !important  


   
</style>
