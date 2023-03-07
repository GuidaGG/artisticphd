
<template>
<div>
     <details>
              <summary>
                <span>{{collapsible.title}}</span>
            </summary>
              <div class="details-content">
                <Richtext :zone="collapsible.content" />
                <div class="info" v-if="collapsible.email"><a :href="`mailto:${collapsible.email}`">{{collapsible.email}}</a></div>
                <div class="info" v-if="collapsible.website"><a v-if="collapsible.website" target="_blank" :href="collapsible.website">
                → website</a></div>
              </div>
    </details>
</div>

</template>
<script>
export default {
  props: ["collapsible"],

}
</script>

<style lang="sass">
details 
    padding-bottom: 5px
    
summary 
    font-size: 32px
    cursor: pointer
    padding: 8px 0
summary span:hover
        border-bottom: 2px solid #B998FF
        color: black
details[open] span
    color: white  
summary::-webkit-details-marker 
  display: none

details > summary 
  list-style: none

details .details-content
    font-size: 16px
    line-height: 20px
    padding: 8px 0
    padding-bottom: 40px


.info 
  padding-bottom: 5px

</style>
