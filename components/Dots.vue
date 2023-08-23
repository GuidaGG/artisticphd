<template>
    <div ref="dots" id="dots"  class="dot-navigation">
        <div class="dot" v-on:click="scrolldots" v-for="(d, index) in totalPages" :key="index" :class="{'current': index === 0}"></div>
    </div>
   
</template>

<script>

export default {
    props: ["totalPages", "scrollElement", "extra"],
    data(){
        return{
            total: 0
        }
    },
    mounted: function(){

        this.$root.$on('Restart', () => {
            var index = 1
            var elements = this.$props.scrollElement.children;

                if(elements[index]){
                    elements[index].click()
                }
            
        })

    },
    methods: {
        scrolldots: function(event){
            var navparent = this.$refs.dots

            var current = event.target
            var index = Array.prototype.indexOf.call(navparent.children, current) + 1
            var elements = this.$props.scrollElement.children;
    
                if(elements[index]){
                    elements[index].click()
                }
            },
    }
}

</script>