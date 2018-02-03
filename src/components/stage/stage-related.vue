<template>
    <v-flex xs12 lg4 class="mt-3">
      <!-- Loading -->
      <v-flex 
        xs2
        offset-xs5
        lg2 
        offset-lg5
        v-if="loading"
      >
        <!-- <v-progress-circular indeterminate color="primary"></v-progress-circular> -->
        <div class="orbit-spinner">
          <div class="orbit"></div>
          <div class="orbit"></div>
          <div class="orbit"></div>
        </div>
      </v-flex>
      <!-- v-data-iterator -->
      <v-data-iterator
        hide-actions
        content-tag='v-layout'
        row
        wrap
        :items='items'
        :rows-per-page-items='rowsPerPageItems'
        :pagination.sync='pagination'
        :id='String(song.trackID)'
      >
        <!-- blank no data -->
        <v-flex slot="no-data"></v-flex>
        <v-flex 
          slot='item'
          slot-scope='props'
          xs12
          @click="play(props.index)"
        >
        
            <v-card class="mb-2" color="" >
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs5>
                    <v-card-media
                      :src="props.item.poster"
                      :height="props.item.source === 'YouTube' ?  '86px' : '125px' "
                      contain
                    ></v-card-media>
                  </v-flex>
                  <v-flex xs7>
                    <div>
                      <div class="subheading text-xs-left">{{ props.item.title }}</div>
                      <div class="artist text-xs-left">{{ props.item.artist }}</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
        </v-flex>
      </v-data-iterator>
    </v-flex>      
    <!-- </v-container> -->
</template>
<script>
import { mapGetters } from 'vuex'

/* eslint-disable */
export default {
  name: 'stage-related',
  watch: {
    '$store.getters.index': function (val) {
      this.getRelated()
    },
  },
  data: () => ({
    loading: true,
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: -1
    },
    items: []
  }),
  methods: {
    play (index){
      // this.$store.commit.setNPlay(index, this.items)
      window.scrollTo(0, 0)
      this.$store.commit('setNPlay', {songs: this.items, current: index, path: this.$route.path})
      return this.$DCPlayer.setNPlay(this.items, index)
    },
    getRelated () { 
      this.loading = true
      // console.log('calling')
      this.items = []
      this.$DCAPI.searchInt('', 0, [this.song.source], this.song.trackID, (d) => {
        this.loading = false
        if (d[0].trackID == this.song.trackID) {
          alert('removing dupe first')
          d.shift()
        }
        this.items = d
      }, true, 20)
    },
    hai (source) {
      return source === 'YouTube' ?  '86px' : '125px' 
    }
  },
  computed: {
    ...mapGetters({
      isYT: 'isYT',
      song: 'current_song'
    })
  },
  mounted () {
    // this.getRelated()
  },
  updated (){
    // this.getRelated()
    // this.items = this.current
  }
}
</script>

<style>
.artist{
  color: grey;
}
.orbit-spinner, .orbit-spinner * {
  box-sizing: border-box;
}

.orbit-spinner {
  height: 55px;
  width: 55px;
  border-radius: 50%;
  perspective: 800px;
}

.orbit-spinner .orbit {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.orbit-spinner .orbit:nth-child(1) {
  left: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
  border-bottom: 3px solid teal;
}

.orbit-spinner .orbit:nth-child(2) {
  right: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
  border-right: 3px solid teal;
}

.orbit-spinner .orbit:nth-child(3) {
  right: 0%;
  bottom: 0%;
  animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
  border-top: 3px solid teal;
}

@keyframes orbit-spinner-orbit-one-animation {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-two-animation {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-three-animation {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
