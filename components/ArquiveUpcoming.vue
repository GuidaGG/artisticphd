<template>
    <client-only>

            <div v-if="pages" ref="nav" :class="['sidebar', 'sidebar-events', classname]">

                <div class="archive-section">{{name}}</div>
                <div  v-for="event in pages" :key="event.id" :class="['link-parent', event.category, event.special]">

                        <div v-if="event.break" class="semester-title">{{event.break}}</div>
                        <nuxt-link v-else :to="{ name: type+'-slug', params: { slug: event.slug }}" class="nav__link" >
                            <div class="wrapper">
                                <div class="crossout"></div>
                                <span class="date-arquive" v-if="event.date">
                                    <div>{{event.category}}</div>
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

        this.moveLine()
    })
    this.$root.$on('HideLineArquive', () => {

        this.hideLine()
    })
  },

  methods: {

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

        let h = d.getHours();
        h = ("0" + h).slice(-2);
        let m = d.getMinutes()
        m = ("0" + m).slice(-2);

        date = date + " " + h + ":" + m

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

