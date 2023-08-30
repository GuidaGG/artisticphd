<template>
  <div>
    <Header />
    <Nuxt />
    
  </div>
 
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default {
   components: {
    Header,
    Footer
  }
}

</script>

<style lang="sass">

@font-face
  font-family: "GT-Flexa-Light"
  src: local("GT-Flexa-Standard-Light")
  src: url(~assets/fonts/GT-Flexa-Standard-Light.otf) format("opentype")

@font-face
  font-family: "GT-Sectra-Regular"
  src: local("GT-Sectra-Regular") 
  src: url(~assets/fonts/GT-Sectra-Regular.otf) format("opentype")


html, body 
  scroll-behavior: smooth
  font-family: "GT-Flexa-Light"
  font-size: 20px
  line-height: 24px
  color: white
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box
  background:#5E5E5E
  margin: 0
  padding: 0 

*,
*::before,
*::after 
  box-sizing: border-box
  margin: 0


.link-parent
   position: relative



a
  text-decoration: none
  color: white
  text-transform: none
 


a:hover, .nuxt-link-exact-active
  color: black

h1, h2, h3
  text-transform: uppercase
  font-family: "GT-Flexa-Light"
  font-weight: normal

img 
  width: 100%

h1, h2, h3
  font-size: 22px

.fullheight
  height: calc(100vh - 106px)


.overflow-x::-webkit-scrollbar , .overflow::-webkit-scrollbar 
    width: 0 !important
    height: 0 !important

.overflow
  overflow-x: hidden
  overflow-y: scroll
  -webkit-overflow-scrolling: touch
  scrollbar-width: none  

.overflow-x
  overflow-x: scroll
  overflow-y: hidden
  -webkit-overflow-scrolling: touch
  scrollbar-width: none  

.uppercase 
  text-transform: uppercase
  
.padding  
  padding: 0 10px  
       

.block.image:last-child svg 
  width: 200%
.download
  width: 100%
  background: black
  padding: 10px
  margin-bottom: 30px
  a:hover
    color: #b998ff
  .arrow
    padding-right: 20px
.zone .image
  padding-bottom: 30px
@media only screen and (min-width: 3000px)
  h1, h2, h3
    font-size: 56px
    line-height: 70px
  body #__nuxt
    font-size: 56px
    line-height: 70px

    .padding
      padding: 0 20px
    header
      height: 277px
      border-width: 4px
    .header-title-container
      padding: 40px
    header nav
      border-width: 4px
      padding: 20px
      border: none
    .progress-bar
      height: 10px

    .bar
      top: 162px
      width: 4px
    .line-horizontal, .line-vertical
      height: 4px
    .fullheight, .sidebar
      height: calc(100vh - 277px)
    footer.footer
      border-width: 4px
      height: auto
      .lang
         padding: 40px
      a
        font-size: 36px
        padding: 40px

    .block
      height: calc(100vh - 430px )
      padding: 20px

    .block.image
      padding: 0

    .home .block 
      font-size: 78px
      line-height: 82px
    .sidebar
      width: 25%
      border-bottom: solid 4px black
      a 
        line-height: 100px

      .archive-section.bottom
        padding: 40px
        height: unset
    .candidates 
      padding: 20px
      h1 
        font-size: 72px
        line-height: 72px
        padding-bottom: 40px

      .candidatesSep
        font-size: 0.85em
        line-height: 1em
   
    .no-footer-lines .candidate-name 
      width: calc(50% - 8px)
      left: calc(25% + 4px)
      top: 272px
      h1
        font-size: 56px
        line-height: 70px
        padding: 10px
    .about-container
        font-size: 42px
        line-height: 47px
    .about-container .about-title
      padding: 20px

    .about-container .about-bio
      height: calc(50vh - 275px)
    .about-container .about-bio .candidate-bio
      padding: 20px
      padding-top: 120px
    .about-container .portfolio
      padding-top: 90px
    .about-container .candidate-cv
      padding: 20px
      padding-top: 100px
      
    .about-container .candidate-cv .cv-title
      top: 274px
    .proposal-container
      font-size: 50px
      line-height: 55px
    .proposal-container .candidate-proposal
      padding: 20px
      padding-top: 120px

    .proposal-container .candidate-proposal h1
      font-size: 66px
      line-height: 80px
    
    .proposal-container .side-text
      padding: 20px
      font-size: 36px
      line-height: 40px

 
    .feed .feed-content
      padding: 20px 
      .feed-date
        padding-top: 130px

    .no-footer-lines .sidebar-feed
        top: 275px

    .archive-section, .semester-title
      font-size: 56px
      line-height: 70px
      height: auto
      top: 275px

    .event-container
      padding: 20px 0px
      
      .block
        padding: 0px
      .event-date
        font-size: 0.8em
      .event-title 
        font-size: 2em
        line-height: 1.4em

      .event-subtitle
        font-size: 1em
        line-height: 1em

      .event-title, .event-subtitle, .event-date
        padding: 0 20px

    .sidebar-events, .sidebar-events-past
      top: 275px
      padding-top: 100px
    .proposal-container .proposal-center, .no-footer-lines .back, .no-footer-lines .candidate-name, .feed .feed-content, .about-container .about-bio
      border-width: 4px
    
    .dot-navigation
      height: 100px
      bottom: 180px
      .dot
        border-width: 4px
        margin: 40px
        width: 40px
        height: 40px
    
    .archive-section.bottom
      height: 110px
      bottom: 0
      top: unset

    .oldevents .oldevent
      padding: 20px

    .galleryContainer .miniatures
      grid-template-columns: 1fr 1fr 1fr 1fr 1f
      
      .images
        height: 200px
        img
          min-height: 200px        
@media only screen and (min-width: 2000px)
  h1, h2, h3
    font-size: 36px
    line-height: 40px
  
  body
    font-size: 36px
    line-height: 40px
    header
      z-index: 2
      height: 139px

    .fullheight, .sidebar
      height: calc(100vh - 139px)

    footer.footer
      height: 73px
      a
        font-size: 20px
    .block
      height: calc(100vh - 210px)
    .home .block 
      font-size: 48px
      line-height: 52px

    .dot-navigation
      height: 60px
      bottom: 70px
      .dot
        width: 25px
        height: 25px
    .sidebar a 
      line-height: 60px
    .candidates h1 
      font-size: 52px
      line-height: 52px
      padding-bottom: 20px

    .no-footer-lines .candidate-name
      top: 136px
      z-index: 1
      border-top: solid black 1px
      h1
        font-size: 36px
        line-height: 40px
    .about-container
        font-size: 22px
        line-height: 27px

    .about-container .about-bio
      height: calc(50vh - 137px)
    .about-container .about-bio .candidate-bio
      padding-top: 65px
    .about-container .portfolio
      padding-top: 40px

    .about-container .candidate-cv .cv-title
      top: 136px
    .proposal-container 
      font-size: 30px
      line-height: 35px
      .candidate-proposal
        padding-top: 60px

    .proposal-container .side-text
      font-size: 22px
      line-height: 27px 
    .feed .feed-date
      padding-top: 70px

    .no-footer-lines .sidebar-feed
        top: 137px
        

    .sidebar-events, .archive-section, .sidebar-events-past

      top: 137px
    .link-parent.break .semester-title
      
    div.left .archive-section
      top: 135px
    .subtitle-arquive
      padding-bottom: 60px

    .date-arquive
      padding-top: 60px
    
    .archive-section, .link-parent.break .semester-title
      height: unset
      font-size: 0.7em
      line-height: 1.6em

    .right
      padding-top: 60px
  
@media only screen and (max-width: 769px)

  body 
    font-size: 22px
    line-height: 26px
    .richText
      h2, h3
        line-height: 32px
    header
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      background: #5E5E5E
      height: 94px

      .header-title-container
        padding: 10px
     
      .header-logo 
        right: 5px
        top: 5px
        svg
          height: 30px
      nav 
        width: 100% 
        padding: 8px 10px
        padding-bottom: 8px
        margin: 0
        border: none
        overflow: hidden
        
     


    .bar-left
      display: none
     
    .bar-right
      display: none
     
    footer.footer
      height: 42px
      background: #5E5E5E

      .lang
        padding: 10px

      a 
        padding: 10px

    .sidebar
      position: fixed
      width: 100%
      display: flex
      flex-flow: row wrap
      justify-content: space-between
      padding: 10px
      a, .link-parent
        line-height: 24px

      .link-parent
    


  
    .no-footer .pageContent, .pageContent
      width: 100%
      padding-left: 0px
      margin-top: 94px
    
    .block, .block:first-child
      width: 100%
      margin: 0
      height: calc(100vh - 134px)
      padding-bottom: 80px


    .program .block
      
      height: calc(100vh - 230px)

    .program
      
      .sidebar
        top: 94px
        position: fixed
        padding: 10px 0px
        display: flex   
        flex-flow: row wrap
        justify-content: space-between
        .link-parent
          padding: 5px 10px
          a
            padding: 0px 5px

      
      .pageContent
        margin-top: 90px + 94px


    .half-block, .program .half-block, .program .last-block
      display: none
    

    .block.image 
      svg 
        height: 100%
        width: auto
    .line-vertical
      display: none !important

    .candidates
      width: 100%
      margin: 0
      margin-top: 94px

    .about-container
      margin-top: calc(45px + 95px)
      font-size: 18px
      line-height: 22px
    
    .fullheight, .no-footer .fullheight
      height: auto

    .no-footer-lines
      .about-container .about-bio, .about-title, .candidate-name, .candidate-cv, .portfolio
        width: 100% !important
        position: relative !important
        display: block
        border: none
        margin: 0
        float: none
        left: unset  !important
        top: unset  !important
        z-index: 9
      

      .about-container .about-bio .candidate-bio
        padding-top: 10px

      .candidate-name
        border-bottom: solid black 2px
        padding: 10px 10px
      

      .candidate-cv
        padding: 0
        .richText
          padding: 10px

      
      .about-container .portfolio .portfolio-container
          width: 100%
          max-width: unset
  
          .portfolio-image, .portfolio-text
            width: 100%
            display: block
            float: none
            max-width: unset
            height: auto

           
          .portfolio-image
           
            img 
              width: 100%
              height: auto
              position: relative
              transform: unset
              top: unset
              left: unset
              max-width: unset
              max-height: unset
              min-width: unset
              min-height: unset


          .portfolio-text
            padding: 10px


    .no-footer-lines .sidebar-candidates
      top: 94px
      border-bottom: 2px solid black

    .no-footer-lines .back
      border: none
      padding: 0

    .proposal-container
      margin-top: calc(45px + 95px)

      .borders
        display: none
      
      .proposal-center
        
        width: 100%
        border: none    
        float: unset
        margin: 0

        .candidate-proposal
          padding-top: 0px  
      .side-text

        position: relative
        width: 100%
        float: unset
    .feed
        margin-top: calc(45px + 95px)

    .date-arquive, .feed .feed-date
        font-size: 16px
        line-height: 20px    

    .no-footer-lines .container.child
 
  
      .candidate-name
        //margin-bottom: 42px
        h1
          display: block

      .sidebar-feed
    
        display: none !important
      .archive-section
   
        display: block
        position: relative
        width: 100%
        top: calc(45px + 95px + 42px) 
        top: unset
        z-index: unset
        margin-top: -2px

      
      .zone, .feed-title, .feed-date
        padding: 10px

    .feed .feed-content
      width: 100%
      margin: 0
      border: none
      padding: 0
      div 
        div, h1
          display: none
        div:first-of-type
          display: block
      
          h1
            display: block

    
    .no-footer-lines .sidebar-feed
      width: 100%
      display: block
      position: relative
      top: unset
      padding: 10px
      z-index: unset
      border: none

      .link-parent
        padding-bottom: 30px
    .news 
      margin-top: 93px
      .sidebar
        display: block
        position: relative
        top: unset
        padding: 0
        border: none

        .date-arquive
          font-size: 16px
          line-height: 20px
        .link-parent
          width: 100%

      .sidebar.upcoming
        padding-bottom: 40px
      .sidebar-events .link-parent, .sidebar-events-past .link-parent
        padding: 10px
      .archive-section
        position: relative
        top: unset
        left: unset
        width: 100%
        text-align: left

      .archive-section.bottom
        position: fixed
        bottom: 0

        padding: 8px 10px
      
      .subtitle-arquive
        font-size: 1em
        line-height: 1.2em

      .title-arquive
        font-size: 1.2em
        line-height: 1.2em

      .oldevents
        margin: 0
        width: 100%

       
    .archive
      .event-container
        width: 100%
        padding: 0px
        padding-top: 50px
        border: none

      .archive-section
        text-align: left
        width: 100%
        display: block
        position: fixed
        z-index: 11
        top: 93px
        left: 0

      .archive-section.bottom
        display: none

      .oldevents
        padding-top: 40px

    .news.child
      .sidebar
        display: none
      .event-container
        padding-top: 50px
      .mobile
        display: block
        position: fixed
        z-index: 11
        top: 93px
        left: 0
        a
          text-transform: uppercase

      .pageContent
        margin-top: 74px
      

    .event-container
      width: 100%
      .event-date
        font-size: 16px
        line-height: 20px


    .contact .block:first-child 
      margin-left: 0

    .dot-navigation
      //width: 100%
      bottom: 40px
      padding: 5px
      height: unset
  
    .no-footer .impressum, .no-footer .datenschutz
      padding: 10px  

    .galleryContainer .miniatures
      grid-template-columns: 1fr 1fr 1fr 1fr 
      
      .images
        height: 50px
        img
          min-height: 50px        

@media only screen and (max-width: 500px)
  body::-webkit-scrollbar 
    width: 0 !important
    height: 0 !important

  h1, h3, h4
    font-size: 18px  

  body 
    font-size: 16px
    line-height: 18px

    .no-footer .pageContent, .pageContent
      margin-top: 76px

    header
      height: 78px
      font-size: 12px
      .header-title
        
      .header-logo 
        right: 5px
        width: 50px
        top: 8px
       
        svg
          width: 50px
          height: 20px
    
    .home .block 
      font-size: 18px
      line-height: 22px

    .sidebar
      
      padding: 7px 10px
      font-size: 12px
      top: 78px
     
    .block, .block:first-child
      width: 100%
      margin: 0
      height: calc(100vh - 114px)
    
    .program 
      .block
        
        height: calc(100vh - 186px)
      .sidebar
        top: 78px
        padding: 7px 0
        .link-parent
          padding: 0 8px
          a 
            padding: 0
      .pageContent
        margin-top: calc(65px + 80px)

    .candidates 
      margin-top: 80px
      h1
        font-size: 22px
        line-height: 22px

    .no-footer-lines .sidebar-candidates
      top: 78px
    .feed
        margin-top: calc(45px + 74px)

    .feed  .feed-title, .event-container h1
      font-size: 1.4em
      line-height: 1.4em 

    .no-footer-lines .container.child .archive-section
      //top: calc(45px + 116px)
    .about-container, .proposal-container
      margin-top: 45px + 74px

    .proposal-container .candidate-proposal
      h1
        font-size: 28px
        line-height: 30px

    


    .news
      margin-top: 76px
      .pageContent
        margin-top: 0

      .subtitle-arquive
        padding-bottom: 20px
      .sidebar .date-arquive
        padding-top: 0px
        font-size: 14px
        line-height: 18px

      .subtitle-arquive
        font-size: 14px
        line-height: 18px

      .title-arquive
        font-size: 1.4em
        line-height: 1.1em

      h2.event-subtitle
        padding-top: 5px
        font-size: 1em
        line-height: 1.2em


    .news.child .mobile, .archive  .archive-section
      top: 75px


    footer.footer
      font-size: 12px
      height: 38px
      a 
        font-size: 12px

      .lang 
        width: auto
        padding: 10px 20px

@media only screen and (max-width: 440px)
    body 
      header 
        height: 95px
        nav 
          gap: 0px 20px
          
      .program .sidebar
        top: 95px

      .program .pageContent
        margin-top: calc(65px + 95px)

      .candidates, .news.child .pageContent, .no-footer .pageContent, .pageContent
        margin-top: 95px
      
      .news
        margin-top: 92px
      .news.child .mobile, body .archive .archive-section,
        top: 90px
      .no-footer-lines .sidebar-candidates
        top: 95px
      .about-container, body .proposal-container,.proposal-container,.feed
        margin-top: 134px

      .news .sidebar
       max-height: unset

@media only screen and (max-width: 380px)
    body footer.footer 
      .lang, a
        //padding: 20px 5px
</style>