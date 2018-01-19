<template>
  <v-layout row wrap v-show="!($store.getters.ytUseVideo && $store.getters.isYT)">
    <v-flex d-flex xs12 >
      <v-layout row wrap>
        <!-- Image -->
        <v-flex xs12 id="img-bg" v-show="!($store.getters.ytUseVideo && $store.getters.isYT)">
          <img :src="song.posterLarge" id="stg-pstr">
        </v-flex>
        <v-flex d-flex xs10 offset-xs1>
          <v-layout row wrap id="dc-padding">
            <!-- Title -->
            <v-flex xs11 class="mt-3">
              <div class="title text-xs-left">{{song.title}}</div>
              <v-flex class="mt-3 text-xs-left">
                <span class="subheading" style="white-space: pre-line;" v-html="timeToSeconds(song.description)"></span>
              </v-flex>
            </v-flex> 

            <!-- Buttons -->
            <v-flex xs1>
              <!-- <v-flex xs12> -->
                <v-speed-dial direction="left" open-on-hover>
                  <v-btn slot="activator" class="primary" outline icon  hover fab>
                    <v-icon>fullscreen</v-icon>
                  </v-btn>
                  <div class="slider-wrapper">
                    <v-btn icon fab>
                      <v-icon small>fullscreen</v-icon>
                    </v-btn>
                    <v-btn icon fab>
                      <v-icon>fullscreen</v-icon>
                    </v-btn>
                    <v-btn icon fab>
                      <v-icon large>fullscreen</v-icon>
                    </v-btn>
                  </div>
                </v-speed-dial>
              <!-- </v-flex> -->
              <!-- <v-flex xs12> -->
                <v-speed-dial direction="left" open-on-hover>
                  <v-btn slot="activator" class="primary" outline icon  hover fab>
                    <v-icon>settings</v-icon>
                  </v-btn>
                  <div class="slider-wrapper">
                    <v-btn icon fab>
                      <v-icon>people</v-icon>
                    </v-btn>
                  </div>
                </v-speed-dial>
              <!-- </v-flex> -->
              <!-- <v-flex xs12> -->
                <v-speed-dial direction="left" open-on-hover>
                  <v-btn slot="activator" class="primary" outline icon :nudge-bottom="25" hover fab>
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                  <div class="slider-wrapper">
                    <v-btn icon fab>
                      <v-icon>people</v-icon>
                    </v-btn>
                  </div>
                </v-speed-dial>
              <!-- </v-flex> -->
            </v-flex>
          
            <!-- Description -->
            <v-flex xs12 class="text-xs-left">
              <!-- {{description}} -->
              
            </v-flex>
        </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
  /* eslint-disable */
export default {
  name: 'dc-stage',
  data () {
    return {
    }
  },
  computed: {
    ytUseVideo () {
      return this.$store.getters.ytUseVideo
    },
    song () {
      return this.$store.getters.current_song
    },
    current_trackID () {
      return this.$store.getters.current_trackID ? this.$store.getters.current_trackID : 'player'
    }
  },
  methods: {
    timeToSeconds (value) {
      if (!value) {
        return ''
      } 
      return (value.replace(/\n/g, '<br>').replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g, `
        <span class="underline" onClick="document.getElementById('dc-audio').currentTime = '$&'.split(':').reduce((acc,time) => (60 * acc) + +time)">
          $&
        </span>`))
    }
  }
}
</script>

<style>
#img-bg{
  background-color:black;
}
#stg-pstr{
}
#dc-padding{
  padding: 0 16px;
}
.slider-wrapper{
  /* display: inherit; */
  /* width: '100%'; */
  /* height: 70px; */
  /* padding: 0; */
} 
</style>
