<template>
    <div class="block" v-on:click="scroll">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: [
         "scrollElement"
    ],
    
    mounted(){
        this.$nextTick(function() {
            this.parent = this.$props.scrollElement
  
        })
    },
    data() {
        return {
        parent
    };
    },
    methods: {
        isMobile() {
                if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth<769) {
                    return true
                } else {
                    return false
                }
        },
       scroll: function(event){

        let  VueScrollTo = require('vue-scrollto');
        this.parent.style.scrollSnapType = "none"
        
        let elements = this.parent.children;
        let width = parent.scrollWidth - parent.offsetWidth

        elements.forEach(element => {
        element.classList.remove('middle', 'left', 'right')
        });

        let active, prev, next
        active = prev = next = event.target.closest(".block")

        do prev = prev.previousSibling; while(prev && prev.nodeType !== 1);
        do next = next.nextSibling;     while(next && next.nodeType !== 1);

        active.classList.add('middle')

        if(prev){
            prev.classList.add('left')
        }
        if(next){
            next.classList.add('right')
        }

        let options;
        if(this.isMobile()){
            options = {

                offset: 0,
                duration: 600,
                easing: "ease-in-out",
            }
        }
        else{
            options = {

                offset: -(active.offsetWidth/2),
                duration: 600,
                easing: "ease-in-out",
            }
        }

        VueScrollTo.scrollTo(active, options)

        let current = this.parent.scrollLeft
        let percent = current * 100 / width

        let progressbar = document.getElementById("progressbar")
        progressbar.style.background = `linear-gradient(90deg, rgba(255,255,255,1) ${percent-50}%, rgba(185,152,255,1) ${percent}%, rgba(255,255,255,1) ${percent+50}%)`


        setTimeout(function(){
            if(this && this.$props) {this.$props.scrollElement.style.scrollSnapType = "x mandatory"}
            
        }, 600)

        },
    }
}
</script>
