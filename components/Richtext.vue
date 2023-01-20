
<template>
    <client-only>
        <div ref="texte" class="richText" v-html="zone"></div>
    </client-only>

</template>
<script>
export default {

  props: ["zone"],

    mounted(){

        this.$nextTick(function () {
            var text = this.$refs.texte
            if(text){
                var links = text.getElementsByTagName("A");

                for (var i = 0; i < links.length; i++) {
                    links[i].target = "_blank";
                }

            }
        })
    }
}

</script>

<style lang="sass">
.richText

    strong
        font-weight: 600

    p
        padding-bottom: 30px


    ul, ol
        margin-bottom: 30px
        padding-left: 0
        li
        list-style-type: none
        padding-bottom: 5px

        li::before
            content: "\2022"
            color: #B998FF
            padding-right: 5px

    a
        border-bottom: 2px solid #B998FF

    h1,h2,h3
        font-size: 1.4em
        line-height: 1.4em
        padding-bottom: 30px
    blockquote 
        font-size: 1em
        font-style: italic
</style>
