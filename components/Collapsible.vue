
<template>
<div>
     <details>
              <summary>
                <span>{{collapsible.title}}</span>
            </summary>
              <div class="details-content">
                <Richtext :zone="collapsible.content" />
                <div v-if="collapsible.email">{{collapsible.email}}</div>
                <a v-if="collapsible.website" target="_blank" :href="collapsible.website">website</a>
              </div>
              
    </details>
    <div v-if="description">
        adasdas
        extra ionformationag 
        asasdhasdhioa
    </div>
</div>

</template>
<script>
export default {
  props: ["collapsible", "description"],

}
</script>

<style lang="sass">
details 
    padding-bottom: 5px
    
summary 
    font-size: 32px
    cursor: pointer
    padding: 8px 0
summary span:hover, details[open] span
        border-bottom: 2px solid #B998FF
summary::-webkit-details-marker 
  display: none

details > summary 
  list-style: none

details .details-content
    font-size: 16px
    line-height: 20px
    padding: 8px 0
    padding-bottom: 20px

</style>
