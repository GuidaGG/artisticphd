<template>
    <div>
        <div v-for="(contents, index) in pages.pageZoneEn" :key="contents.id" :class="{'en':true, 'block':true, 'last': index==1, 'middle': index === 0, 'right': index === 1  }">
              <div class="layer"></div>
              <div  class="richtext" v-if="contents.__typename === 'ComponentLayoutsTextBlock'">
                <Richtext :zone="contents.richText" />
              </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "pages"
    ],
}
</script>
