<template>
    <div id="pageContent" v-on:scroll="progressBar" ref="scroll" class="pageContent">
        <slot></slot>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                scrollElement: {},
                progressbar: {}
            }
        },
        mounted() {

        this.progressbar = document.getElementById("progressbar")
        progressbar.style.background = "linear-gradient(90deg, rgba(255,255,255,1) -50%, rgba(185,152,255,1) 0%, rgba(255,255,255,1) 50%)"
        
        this.scrollElement = this.$refs.scroll
        this.$emit("scroll-element", this.scrollElement);

        },
        methods: {
            isMobile() {
                if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth<769) {
                    return true
                } else {
                    return false
                }
            },
            changelangen: function(){
                document.getElementsByClassName("lang")[0].classList.add('link_active')
                document.getElementsByClassName("lang")[1].classList.remove('link_active')
                var menus = ['program', 'candidates', 'Events', 'Seminars', 'Contact']
                // this.$store.commit('CHANGE_NAV_LAYOUT','en')
                this.$store.commit('CHANGE_EN_TITLES')
                this.$store.commit('CHANGE_NAV_TITLES', menus)
                this.$root.$emit('Footer_En') //like this
                },
            changelangde: function(){

                document.getElementsByClassName("lang")[1].classList.add('link_active')
                document.getElementsByClassName("lang")[0].classList.remove('link_active')
                var menus = ['Programm', 'Kandidatinnen', 'Veranstaltungen', 'Seminare', 'Kontakt']
                // this.$store.commit('CHANGE_NAV_LAYOUT','de')
                this.$store.commit('CHANGE_DE_TITLES')
                this.$store.commit('CHANGE_NAV_TITLES', menus)
                this.$root.$emit('Footer_De') //like this
            },
            changedots: function(active, parent){
               
            var index = Array.prototype.indexOf.call(parent.children, active) - 1
                
            let dotNavigation = document.getElementById("dots")

            if(dotNavigation){
                let dots = dotNavigation.children;

                let currentdot = dotNavigation.getElementsByClassName("current")
                if(currentdot.length) {
                    currentdot[0].classList.remove("current")
                }
           
                dots[index].classList.add("current")

                }
            },
            progressBar: function(event) {
                let element = event.srcElement
                let width = element.scrollWidth - element.offsetWidth
                let current = element.scrollLeft
                let percent = current * 100 / width

                this.progressbar.style.background = `linear-gradient(90deg, rgba(255,255,255,1) ${percent-50}%, rgba(185,152,255,1) ${percent}%, rgba(255,255,255,1) ${percent+50}%)`

                let beginDe = document.getElementsByClassName("first")[0]
                let beginEn = document.getElementsByClassName("last")[0]

                if(beginDe && beginEn){
                    if(beginDe.getBoundingClientRect().left <= beginDe.offsetWidth/1.5){
                        this.changelangde()
                    }
                    if(beginEn.getBoundingClientRect().left <= beginEn.offsetWidth/1.8 && beginDe.getBoundingClientRect().left >= beginDe.offsetWidth/1.5 ){
                        this.changelangen()
                    }
                }
                else{
                    this.changelangen()
                }
                if( this.scrollElement){
                    let elements =  this.scrollElement.children
                   for(var i = 1; i <elements.length-1; i++){
                        if(elements[i].getBoundingClientRect().left > 0 && elements[i].getBoundingClientRect().left < window.innerWidth/2){  
                            this.changedots(elements[i], this.scrollElement )
                        }
                      
                    }
                }

                },
            }
            }
</script>