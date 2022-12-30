<template>
  <div>
      <div ref="barleft" class="bar bar-left"></div>
      <div class="bar bar-right"></div>
    <slot />
    <Footer /> 
  </div>
 
</template>


<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default {

   components: {
    Header,
    Footer,
  
  }

}
</script>


<style lang="sass">


</style>
