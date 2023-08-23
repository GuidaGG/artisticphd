<template>
  <no-footer>
    <div ref="news" class="news">

      <Arquive v-if="semester[0]" type="seminars" side="left" name="ongoing" :pages="orderedEvents" />
        <nuxt-child/> 
      <Arquive type="seminars" side="right" name="archive" :pages="orderedArchiveByYear" /> 
    </div>
  </no-footer>
</template>

<script>
import NoFooter from '~/layouts/NoFooter.vue';
import Arquive from '~/components/Arquive.vue';
import { SeminarsQuery, CurrentSeminarsQuery, SemesterQuery } from "~/graphql/queries/content"

export default {
  components: {
    NoFooter,
    Arquive,

  },

  data() {
    return {
      currentseminars: {}, //query result
      pages: {}, //query result
      today_date: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
      orderedPages: {},
      semester: {}
    };
  },
  //gets data accordingly to todays date
  apollo: {
      currentseminars: {
      query: CurrentSeminarsQuery, 
      prefetch: true,
      variables () {
        return {
          date: this.today_date
        }
      },
    },
    pages: {
      query: SeminarsQuery,
      prefetch: true,
      variables () {
        return {
          date: this.today_date
        }
      },
    },
    semester: {
      query: SemesterQuery,
      prefetch: true,
    }
 
  },
  updated(){
    var container = this.$refs.news
      if(container){
        //removes class child everytime the page is updated.
        //workaround in case the user leaves the page
        //class child is autimatically added when a news is loaded
        container.classList.remove("child")
      }
  },

  mounted() {
   
    this.$nextTick(function () {
      //changes line in Header Menz
      this.$root.$emit('Header') 
     
      //listens for Child event, when news is loaded adds class "child"
      this.$root.$on('Child', () => {
      
        var container = this.$refs.news
        if(container){
          container.classList.add("child")
        }
      })
      
    });
  },
  computed:{
     orderedEvents: function(){
      let oP = []
      if(this.currentseminars.length>0){
         this.currentseminars.forEach((element) => {
          if(element.category == "LectureSeries" || element.series == null){
            oP.push(element) 
            let seriesTitle = element.slug
             this.currentseminars.forEach((elementChild) => {
               if(elementChild.series && elementChild.series.slug == seriesTitle){
                 elementChild.special = "childLecture"
                 oP.push(elementChild) 
               }
             })     
          }
               
      } )
       return oP
      }
     
    },
    orderedArchiveEvents: function(){
      let oP = []
      let semesters = []
      let object
      if(this.pages.length>0){
         this.pages.forEach((element) => {
           
           let semester =  element.semester.semesterTitle
            if(!semesters.includes(semester)){
              semesters.push(semester)
              object= {break : semester, special: "break"}
    
              oP.push(object) 
              
          }
             oP.push(element)  
      } )
       return oP
      }
     
    },
    orderedArchiveByYear: function(){
      let oP = []
      let years = []
      let object
      if(this.pages.length>0){
         this.pages.forEach((element) => {

          if(!element. date) return
            let date = new Date(element.date);
            let year =  date.getFullYear();
            if(!years.includes(year)){
              years.push(year)
              object= {break : year, special: "break"}

              oP.push(object)

          }
             oP.push(element)
      } )
       return oP
      }
    }

   
  }



  
}


</script>