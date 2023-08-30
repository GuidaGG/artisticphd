<template>
    <div class="featured-events fullheight">
      <FeaturedByCategory category="Exhibition"/>
      <FeaturedByCategory category="Lectures"/>
      <FeaturedByCategory category="Symposiums"/>
      <FeaturedByCategory category="Workshop"/>
      <FeaturedByCategory category="Lecture"/>
    </div>
</template>

<script>
//default empty layout when no news is selected
import { FeaturedEvents } from "~/graphql/queries/content"
import FeaturedByCategory from "~/components/FeaturedByCategory.vue";
export default {
  components: {
    FeaturedByCategory
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
          category: "Exhibition"
        }
      },
    },
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

@media only screen and (max-width: 769px)
  .featured-events
    width: 100%
    border-top: 2px solid black

</style>