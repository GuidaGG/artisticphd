<template>
    <div class="featured-events fullheight list">
        <h2 class="featured-title padding"> Featured </h2>
      <FeaturedByCategory :category="category" view="list"/>
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
        category: this.$route.params.category,
    };
  },
}
</script>

<style lang="sass">
.list
        .featured-title
            display: none
@media only screen and (max-width: 769px)
    .list
        .featured-title
            display: block
</style>