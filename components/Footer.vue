<template>
    <footer class="footer">
        <div ref="langen" class="lang lang-en link_active" v-on:click="en">ENGLISH</div>
        <nuxt-link class="nav__link" to="/impressum">Impressum</nuxt-link>
        <nuxt-link class="nav__link" to="/datenschutz">Datenschutz</nuxt-link>
        <div ref="langde" class="lang lang-de" v-on:click="de" >DEUTSCH</div>

    </footer>
</template>

<script>
export default {
    data() {
        return {
        
        }
    },
    mounted() {

        this.moveLine(this.$refs.langen)
       
        this.$nextTick(function () {

            if(this.isMobile()){
                let elementde = this.$refs.langde
                if(elementde){
                    elementde.innerHTML = "DE"  
                }
                let elementen = this.$refs.langen
                if(elementen){
                    elementen.innerHTML = "EN"  
                }

            }
            this.$root.$on('Footer_De', () => {
                    let element = this.$refs.langde
                    if(element){
                    this.moveLine(this.$refs.langde)     
                    }
                
            
            })
            this.$root.$on('Footer_En', () => {
                    let element = this.$refs.langen

                    if(element){
                  
                    this.moveLine(this.$refs.langen)     
                    }
                    
                
            
            })
            this.$root.$on("defaultLanguage", () => {
                let element = this.$refs.langen
                element.click()
            })
        })

        
               
                   
    },
    methods: {
        isMobile() {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth<769)  {
            return true
        } else {
            return false
        }
        },
        
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
           
                if(!this.isMobile()){
 
                    var options = {
                        offset: -(active.offsetWidth/2),
                        duration: 1200,
                        easing: "ease-in-out",
                    }
                }else{
                    var options = {
                        offset: 0,
                        duration: 1200,
                        easing: "ease-in-out",
                    }
                }

                VueScrollTo.scrollTo(active, options)
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
                    
                 if(!this.isMobile()){
 
                    var options = {
                        offset: -(active.offsetWidth/2),
                        duration: 1200,
                        easing: "ease-in-out",
                    }
                }else{
                    var options = {
                        offset: 0,
                        duration: 1200,
                        easing: "ease-in-out",
                    }
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
          
            var lang = document.getElementsByClassName("lang")
            for(var i = 0; i < lang.length; i ++){
                 lang[i].classList.remove("active")
            }
            element.classList.add("active")
               
      },

        

    }
}
</script>

<style lang='sass'>
.footer
    position: fixed
    bottom: 0
    width: 100%
    height: 60px
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
    
        width: 25%
        text-align: center
        float: left
        padding: 17px
        cursor: pointer
        position: relative

    .lang.active
        background: black

    a, .lang
        align-self: flex-end
    a 
        font-size: 14px
        text-transform: uppercase
        padding-bottom: 17px



</style>