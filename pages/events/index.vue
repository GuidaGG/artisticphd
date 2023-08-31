<template>
    <div class="featured-events fullheight galleries">
      <h2 class="featured-title padding"> Featured </h2>
      <FeaturedByCategory category="Exhibition"/>
      <FeaturedByCategory category="Lecture"/>
      <FeaturedByCategory category="Workshop"/>

    </div>
</template>

<script>

import FeaturedByCategory from "~/components/FeaturedByCategory.vue";
export default {
  components: {
    FeaturedByCategory
  },
}
</script>

<style lang="sass">

.featured-events
    position: relative
    padding-left: 0
    width: 50%
    margin: 0 auto
    overflow-y: scroll
    overflow-x: hidden
    

    &::-webkit-scrollbar 
      width: 0 !important
      -ms-overflow-style:
      scrollbar-width: none
    
    .featured-title
      position: fixed
      font-size: 16px
      line-height: 39px
      background: #5E5E5E
      border-bottom: 2px solid black
      height: 39px
      top: 106px
      left: 25%
      width: 50%
      z-index: 10

.galleries
  padding-top: 39px 
@media only screen and (max-width: 769px)
  .featured-events
    width: 100%
    border-top: 2px solid black
    padding-top: 0

    .featured-title
      position: relative
      background: black
      border-bottom: none
      height: 39px
      top: unset
      left: unset
      width: 100%

    .category-list

        .nuxt-link-exact-active,
            color: #b998ff

        a
          &:hover
            color: #b998ff
</style>