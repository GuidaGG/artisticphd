<template>
    <div>
      
    <Content :content="subpage" />
    </div>
</template>

<script>


import Content from "@/components/Content"
import { pagesQuery, pageQuery } from "~/graphql/queries/content"
import WithFooter from '~/layouts/WithFooter.vue';
export default {

  components: {
    WithFooter,
    Content
  },
  data() {
    return {
      slug: this.$route.params.slug,
      subpage: [],
    };
  },
  apollo: {
   
    subpage: {
      prefetch: true,
      query: pageQuery,
      variables () {
        return { slug: this.$route.params.slug}
      }
    }
  }
}
</script>
