<template>
    <footer class="footer">
        <div ref="lang_en" class="lang lang-en link_active" v-on:click="en">ENGLISH</div>
        <nuxt-link class="nav__link" to="/impressum">Impressum</nuxt-link>
        <nuxt-link class="nav__link" to="/datenschutz">Datenschutz</nuxt-link>
        <div ref="lang_de" class="lang lang-de" v-on:click="de" >DEUTSCH</div>
         <div ref="line" class="line-horizontal"></div>
    </footer>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {

        this.moveLine(this.$refs.lang_en)

        let line = this.$refs.line
        setTimeout(function(){line.style.display = "block"}, 100
        )

        this.$root.$on('Footer_De', () => {

            this.moveLine(this.$refs.lang_de)
            let line = this.$refs.line
            if(line){
                  setTimeout(function(){line.style.display = "block"}, 100
        )
            }

        })
          this.$root.$on('Footer_En', () => {

            this.moveLine(this.$refs.lang_en)
            let line = this.$refs.line
            if(line){
                setTimeout(function(){line.style.display = "block"}, 100
        )
            }

        })


    },
    methods: {
        de: function (event) {
            this.$nextTick(function () {
            var active, prev, next

            active = prev = next = document.getElementsByClassName("de")[0]
            if(active){
                var VueScrollTo = require('vue-scrollto');
                var elements = document.getElementsByClassName('block')
                var parent = document.getElementsByClassName("pageContent")[0]
                parent.style.scrollSnapType = "none"
                elements.forEach(element => {
                    element.classList.remove('middle', 'left', 'right')
                });

                active.classList.add('middle')
                do prev = prev.previousSibling; while(prev && prev.nodeType !== 1);
                do next = next.nextSibling;     while(next && next.nodeType !== 1);

                active.classList.add('middle')
                if(prev){
                    prev.classList.add('left')
                }
                if(next){
                    next.classList.add('right')
                }

                var options = {
                    offset: -(active.offsetWidth/2),
                    duration: 1200,
                    easing: "ease-in-out",
                }
                VueScrollTo.scrollTo(active, options)
                console.log(this.$refs)
                var refen = this.$refs.lang_de


                setTimeout(function(){

                    parent.style.scrollSnapType = "x mandatory"
                    // this.moveLine(refen)
                }, 1200)

                }
            })
        },

        en: function (event) {
            this.$nextTick(function () {
            var active, prev, next
            active = prev = next = document.getElementsByClassName("en")[0]

            if(active){

                var parent = document.getElementsByClassName("pageContent")[0]
                    parent.style.scrollSnapType = "none"
                var VueScrollTo = require('vue-scrollto');
                var elements = document.getElementsByClassName('block')

                elements.forEach(element => {
                        element.classList.remove('middle', 'left', 'right')
                    });



                active.classList.add('middle')
                do prev = prev.previousSibling; while(prev && prev.nodeType !== 1);
                    do next = next.nextSibling;     while(next && next.nodeType !== 1);

                    active.classList.add('middle')
                    if(prev){
                        prev.classList.add('left')
                    }
                    if(next){
                        next.classList.add('right')
                    }

                var options = {
                    offset: -(active.offsetWidth/2),
                    duration: 1200,
                    easing: "ease-in-out",
                    }
                VueScrollTo.scrollTo(active, options)

                setTimeout(function(){

                    parent.style.scrollSnapType = "x mandatory"
                   // this.moveLine(this.$refs.lang_en)
                }, 1200)
            }
            })

        },

         moveLine: function(element){
           this.$nextTick(function () {

                var active = element
                    if(active){

                        var h = active.clientHeight + 15;
                        var w = active.offsetWidth;

                        var hi = Math.hypot(h, w)
                        var sin = h/hi
                        var line = this.$refs.line

                        var ang = Math.asin(sin) * 180/Math.PI - 1


                        line.style.width = hi + "px"
                        line.style.left = active.offsetLeft - 3 + "px"
                        line.style.transform = "rotate("+ang+"deg)";
                }

           })



      },



    }
}
</script>

<style lang='sass'>
.footer
    position: fixed
    bottom: 0
    width: 100%
    height: 70px
    border-top: solid 2px black
    display: flex
    flex-flow: row wrap
    justify-content: space-between
    .line-horizontal
        display: none
        position: absolute
        z-index: 10
        height: 2px
        background: black
        bottom: 2px
        left: -2px
        transform: rotate(16.2892deg)
        transition: left ease-in-out 0.6s, width ease-in-out 0.4s, transform ease-in-out 0.6s

    .lang
        font-size: 22px
        width: 25%
        text-align: center
        float: left
        padding: 10px
        cursor: pointer
        position: relative



    a, .lang
        align-self: flex-end
    a
        padding-bottom: 15px
</style>
