<template>
    <div class="featured-events fullheight list">
      <div class="featured-title-categories ">
        <h2 class="padding">Latest Events:</h2>
        <nav class="category-list padding"> 
                 <nuxt-link v-for="(cat, index) in categories" :to="{ name: 'events-categories-category', params: { category: cat }}" v-bind:key="index">
                    {{ cat }}s
                </nuxt-link> 
        </nav>
     
    </div>
      <FeaturedByCategory :category="category" view="list"/>
    </div>
</template>

<script>

import FeaturedByCategory from "~/components/FeaturedByCategory.vue";
export default {
  components: {
    FeaturedByCategory
  },
  data() {
    return {
        categories: ["Exhibition", "Lecture", "Workshop", "Symposium"],
        category: this.$route.params.category,
    };
  },
}
</script>

<style lang="sass">
.list 
  .featured-title-categories
    position: fixed
    top: 106px
    left: 25%
    width: 50%
    background: #5E5E5E
    z-index: 10
  h2 
    border-bottom: 2px solid black
    height: 39px
    font-size: 16px
    line-height: 39px
  .category-list
    width: 100%
    list-style: none
    display: flex 
    flex-wrap: wrap
    justify-content: space-between
    margin: 0
    line-height: 39px 
    font-size: 0.8em
    height: auto
    border-bottom: 2px solid black
    a
        text-transform: uppercase


@media only screen and (max-width: 769px)
  .list

    .featured-title-categories
      position: relative
      top: unset
      left: unset
      width: 100%

      h2 
        background: black
  
  </style>