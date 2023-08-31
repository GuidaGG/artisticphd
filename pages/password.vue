<template>
    <div class="pass-container">
        <div v-if="isAuthorised">
            <h1>Looks like you're already logged in</h1>
    
            <a @click="removeAuthorisation" class="button--pink">Log out</a>
            <a class="button--pink" href="/">Go to password protected area</a>
        </div>
        <div v-else>

            <div class="section">
            <h2>Login to see staging area</h2>
            <form  @submit.prevent="loginUser()" >
                <input v-model="methodLoginValue" type="password" placeholder="">
    
                <a @click="loginUser()" class="padding">Login</a>
            </form>
            <div class="info" v-if="isWrong">
                <span>wrong password</span>
            </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>

import NoLayout from '~/layouts/NoLayout.vue';

  export default {
    layout: "NoLayout",
    components: {
        NoLayout
    },
    data: function() {
      return {
        methodLoginValue: '',
        isAuthorised: false,
        isWrong: false
      }
    },
  
    computed: {
      redirectPath() {
        const path = this.$route.query.previousPath
  
        return path || "/";
      }
    },
  
    mounted() {
      this.isAuthorised = this.$passwordProtect.simpleIsAuthorised()
    },
  
    methods: {
      loginUser() {   
        if(this.$passwordProtect.simpleAuthorise(this.methodLoginValue)){
            this.isAuthorised = this.$passwordProtect.simpleIsAuthorised()
            this.$router.push(this.redirectPath) 
            this.isWrong = false;
        }
        else{
            this.isWrong = true;
        }
      },
      removeAuthorisation() {
        this.$passwordProtect.removeAuthorisation()
        this.isAuthorised = this.$passwordProtect.simpleIsAuthorised()
      }
    }
  }
  </script>
  
  <style lang="sass">
  .pass-container
    padding: 20px
    width: 50%
    margin: 0 auto
    text-align: center

    form 
        display: flex
        flex-flow: row wrap
        justify-content: center
        margin-top: 20px
        gap: 10px
        
    input 
        height: 40px
        line-height: 40px
    a 
        border: 2px solid black
        cursor: pointer
        line-height: 40px

    .info
        padding-top: 20px
        span 
            border-top: solid 2px #b998ff
  </style>