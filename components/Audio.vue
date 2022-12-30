<template>
  <client-only>
    <div class="audio-player">
      <div class="audio-title">{{audio.displayText}}<div ref="time" class="audio-time"></div></div>
      <div class="controls">
        <div v-on:click="pause" class="pause">
          <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="6" height="12" stroke="white" stroke-width="2"/>
            <rect x="12" y="1" width="6" height="12" stroke="white" stroke-width="2"/>
          </svg>

        </div>
        <div v-on:click="play" class="play">
            <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.25 1.60569L16.2636 7.5L1.25 13.3943V1.60569Z" stroke="white" stroke-width="2"/>
            </svg>
        </div>
      </div>
      <audio v-on:loadedmetadata="update" ref="player" v-on:timeupdate="update">
        <source ref="source" :src="api_url + audio.audioFile.url" :type="audio.audioFile.mime">
      </audio>
    </div>
  </client-only>	  
</template>
<script>

export default {
  props: ["audio"],
  data() {
    return {
      api_url: process.env.strapiBaseUri,
      totaltime: 0
    }
  },
  methods: {
    play: function(){
      
      this.$refs.player.play()
      
    },
    pause: function(){
      this.$refs.player.pause()
    },
  
    calculatetotalvalue: function(length) {
      var minutes = Math.floor(length / 60),
      seconds_int = length - minutes * 60,
      seconds_str = seconds_int.toString(),
      seconds = seconds_str.substr(0, 2),
      time = minutes + ':' + seconds
  
      return time;
    },
    calculatecurrentvalue: function(currentTime) {
        var current_hour = parseInt(currentTime / 3600) % 24,
        current_minute = parseInt(currentTime / 60) % 60,
        current_seconds_long = currentTime % 60,
        current_seconds = current_seconds_long.toFixed(),
        current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);
    
        return current_time;
    },
    update: function(){
    
      let player = this.$refs.player

      this.$refs.time.innerHTML = this.calculatecurrentvalue(player.currentTime) + "/" + this.calculatetotalvalue(player.duration); 
    },

  },
  
}
</script>

<style lang="sass">
.audio-player
  padding-bottom: 30px
  .audio-title
    width: 100%
    background: #b998ff
    padding: 5px 10px
    color: black
    font-family: "GT-Sectra-Regular"
    .audio-time
      float: right
  .controls
    width: 100%
    padding: 5px 10px
    background: black
    text-align: center
    div 
      display: inline-block
      padding: 0 30px
      cursor: pointer
      &:hover
        svg 
          path, rect
            stroke: #b998ff
</style>