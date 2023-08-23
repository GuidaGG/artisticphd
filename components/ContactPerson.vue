
<template>
<div class="contact-person">
     <details>
              <summary>
                <span>{{collapsible.name}}</span>
            </summary>
              <div class="details-content">
                <Richtext :zone="collapsible.cv" />
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

.contact-person summary span 
  border-bottom: 2px solid #B998FF

.contact-person summary 
  font-size: 20px
  padding: 0px 0

summary span:hover
  border-bottom: 2px solid #B998FF
  color: black
details > summary 
  list-style: none

</style>
