<template>
    <client-only>
        <div>
            <div v-if="pages" ref="nav" :class="['sidebar', 'sidebar-events', classname]">

                <div class="archive-section">{{name}}</div>
                <div  v-for="event in pages" :key="event.id" :class="['link-parent', event.category, event.special]">

                        <div v-if="event.break" v-on:click="toggleClass" class="semester-title">
                           {{event.break}}
                        </div>
                        <nuxt-link  v-else :to="{ name: type+'-slug', params: { slug: event.slug }}" :class="['nav__link', removeWhite(event.semester.semesterTitle)]" >
                            
                            <div class="wrapper">
                           
                                <div class="crossout"></div>
                                <span class="date-arquive" v-if="event.date">
                                    <div>{{event.category}}</div>
                                    <div v-if="event.series">from series {{event.series.title}}</div>
                                    <div v-if="event.showDate==true">
                                    <span v-if="getDateD(event.endDate) != getDateD(event.date)">{{getDateD(event.date)}} - {{getDateD(event.endDate)}}
                                    </span>
                                    <span v-else>{{getDate(event.date)}}</span>
                                    </div>
                                    <div v-if="event.extra">{{event.extra}}</div>
                                </span>
                                <div class="title-arquive">
                                {{event.title}}
                                </div>
                                <div class="subtitle-arquive">
                                {{event.subtitle}}
                                </div>
                            </div>
                        </nuxt-link>
                </div>
            <div ref="line" class="line-vertical"></div>
            <nuxt-link v-if="classname=='ongoing'" to="/archive">
                <div class="archive-section bottom">
                    Archive
                </div>
            </nuxt-link>
            </div>
            <div v-else ref="nav" :class="['sidebar', 'sidebar-events', classname]">
                  <div class="archive-section">{{name}}</div>
                  <div class="link-parent noevents">There are no {{type}} to display</div>
            </div>
        </div>
    </client-only>
</template>

<script>
export default {
//pages = events of type (ongoing, Upcoming)
//name = defines type and class of sidebar

  props: ["pages", "name", "side", "type"],
  data(){
    return{
      classname: this.side
    }
  },
//event listener from Child - When the news content is loaded
  mounted: function(){
    this.$root.$on('ArquivePast', () => {

        //this.moveLine()
    })
    this.$root.$on('HideLineArquive', () => {

        this.hideLine()
    })
  },

  methods: {
    toggleClass(e){
        console.log(e.target)
        let classname = this.removeWhite(e.target.innerText)
        let els = document.getElementsByClassName(classname)
        e.target.parentNode.classList.toggle("open");   
        Array.prototype.forEach.call(els, function(el) {
            el.parentNode.classList.toggle("show");
        });
    },
    removeWhite(text){
        return text.replace(/ /g,'')
        

    },
    //computate datimes for display
    //time/start time
    getTime(datetime) {
        let  d = new Date(datetime)
        let h = d.getHours();
        h = ("0" + h).slice(-2);
        let m = d.getMinutes()
        m = ("0" + m).slice(-2);
        let date = h + ":" + m
        return date;
    },
    //end time
    getEndTime(datetime){
        return datetime.slice(0, 5);
    },

    //date/start date and time
    getDate(datetime) {
        let d = new Date(datetime)
        var date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()
        date = date 

        return date
     },
    //end date
    getDateD(datetime) {
        var d = new Date(datetime)
        var date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()
        return date
     },

    //moveLine
     moveLine: function(){
         //waits until dom is rendered
        this.$nextTick(function () {

          var nav = this.$refs.nav
            if(nav){
                var active = (nav.getElementsByClassName("nuxt-link-active"))
                     if(active.length>0){
                        //calculates size, angle and position of line
                        //bouding rectangle
                        var h = active[0].parentNode.offsetHeight;
                        var w = active[0].parentNode.offsetWidth;

                        //angle
                        var hi = Math.hypot(h, w)
                        var sin = h/hi
                        var line = this.$refs.line
                        var ang = Math.asin(sin) * 180/Math.PI

                        //changes position, rotation and width
                        line.style.width = hi + (h*0.2) + "px"

                        line.style.top = active[0].parentNode.offsetTop + (h/2)  +"px"
                        line.style.transform = "rotate("+ang+"deg) translateX("+-(ang*0.05)*(h*0.06)+"px)"

                          //line.style.left = (h*-0.1) + "px"
                         if(active[0].parentNode.classList.contains("childLecture")){
                          //line.style.left = "-9%"
                        }
                        else{

                        }
                        //displays in case it was hidden
                        setTimeout(function(){
                                    line.style.display = "block"
                            }, 100
                        )

                }
                else{
                    let line = this.$refs.line
                    if(line){
                        line.style.display= "none"
                    }

                }
            }
           })



      },
    hideLine: function(){
            var line = this.$refs.line
            line.style.display = "none"
      }


  },






};
</script>

<style lang="sass">
    .sidebar-events
        a
            font-size: 1em
    .archive-section
        position: fixed
        z-index: 10
        top: 104.5px
        width: 25%
        font-size: 16px
        line-height: 22px
        background: black
        padding: 10px
        border-bottom: black 2px solid
        border-top: solid 2px #5E5E5E
        height: 40px
    a
        line-height: unset
        font-size: 1em


    .archive-section.bottom
        background: #5E5E5E
      
        font-size: 1em
        text-transform: uppercase
        padding: 17px
        height: unset
        cursor: pointer
        top: unset
        bottom: 0
        left: 0
        vertical-align: middle


    .archive-section.bottom:hover, .archive-section.bottom.active
        background: black
        color: white
    .archive-section:hover
        color: white
    .sidebar.left
        top: 104px
        padding-top: 39px
        left: 0
        z-index: 2

        .link-parent
            padding-left: 10%
            padding-right: 10%
            text-align: left


    .date-arquive
        font-size: 0.7em
        display: block
        line-height: 1.2em
        font-weight: lighter
        padding-top: 20px


    .title-arquive
        font-family: "GT-Sectra-Regular"
        line-height: 1.2em

    .subtitle-arquive
        font-family: "GT-Sectra-Regular"
        text-transform: none
        padding-bottom: 30px
        font-size: 0.8em
        line-height: 1em
        padding-bottom: 20px

    .link-parent
        position: relative
        

    a::after
        position: absolute
        display: none
        content: ''
        width: calc(100% + 4px)
        height: 2px
        background: black
        transform: rotate(8deg)
        top: 0px
        left: -2px
    
    .link-parent .crossout
        display: none
        width: 10px
        position: absolute
        display: block
        height: 2px
        background: black
        right: -15px

    .link-parent.childLecture
        .wrapper
            
            border-left: 2px solid black
            padding-left: 10%

    .link-parent.break
        padding: 0 !important

        .semester-title
            width: 100%
            margin-top: 1px
            padding: 10px
            font-size: 0.7em
            line-height: 22px
            border-collapse: collapse
            width: 100%

            &::after
                content: "→"
                display: inline-block
                transform: rotate(90deg)
                float: right
                font-size: 1.5em
        
   
    
    .link-parent.break.open
        border-bottom: 2px solid black
        .semester-title
            &::after
                transform: rotate(-90deg)
            
    div.left
        a.nuxt-link-active::after
            display: none
        a.nuxt-link-active .crossout
            display: block !important

        .line-vertical
            display: none
            width: 416.846px
            top: 115px
            left: -20px
            //transform: rotate(20.1275deg)

        .archive-section
            //top: 102.5px

    .sidebar.right
        padding-top: 39px
        right: 0
        top: 104px
        scrollbar-width: none
        z-index: 1
        border-bottom: none

        .archive-section
            background: black
            border-top: 2px solid black
      
        .link-parent
            display: none
            padding-left: 10%
            text-align: left
            padding-right: 10%
            border-bottom: 2px solid black

        .break 
            display: block
            border-bottom: 2px solid black
        .line-vertical
            display: none
            left: -20px
            top: 130px
            transform: rotate(23.4876deg)

        .link-parent.show
            display: block
    .noevents
        padding-top: 10px
        padding-bottom: 10px

    @media only screen and (max-width: 500px)
        .link-parent.break .semester-title
            font-size: 1em
</style>
