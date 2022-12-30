<template>
    <client-only>
        <div class="sidebar">
            <div v-for="page in pages" :key="page.id" class="link-parent">

                    <nuxt-link :to="{ name: 'program-slug', params: { slug: page.slug }}" class="nav__link" >{{page.pageTitle}}</nuxt-link>

            </div>
        </div>
    </client-only>
</template>

<script>
export default {
  // content is query data from parent page
  // title is the page title of parent page
  props: ["pages"]
};
</script>

<style lang="sass">

.sidebar
    position: absolute
    z-index: 10
    background: #5E5E5E
    width: 25%
    text-align: center
    text-transform: uppercase
    border-bottom: solid 2px black
    height: auto
    overflow-y: scroll
    overflow-x: hidden
    &::-webkit-scrollbar
        width: 0 !important

    -ms-overflow-style:
    scrollbar-width: none

    a
        line-height: 2em
        font-size: 1.4em
        text-transform: uppercase

    a::after
        position: absolute
        display: none
        content: ''
        width: calc(100% + 4px)
        height: 2px
        background: black
        transform: rotate(8deg)
        top: 25px
        left: -2px

    a.nuxt-link-active::after
        display: block

.program
    .sidebar
        height: auto
</style>
