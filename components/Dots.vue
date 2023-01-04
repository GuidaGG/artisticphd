<template>
    <div ref="dots" id="dots" v-on:click="scrolldots" class="dot-navigation">
        <div class="dot" v-for="index in totalPages" :key="index" :class="{'current': index === 0}"></div>
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