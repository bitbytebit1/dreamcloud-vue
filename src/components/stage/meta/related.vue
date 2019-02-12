<template>
  <v-flex 
    xs12 
    lg4 
    class="mt-3"
  >
    <!-- Loading -->
    <v-flex 
      v-if="loading"
      xs2
      offset-xs5 
    >
      <orbit/>
    </v-flex>
    <!-- v-data-iterator -->
    <v-data-iterator
      :items='items'
      :rows-per-page-items='rowsPerPageItems'
      :pagination.sync='pagination'
      :id='String(song.trackID)'
      hide-actions
      content-tag='v-layout'
      row
      wrap
    >
      <!-- blank no data -->
      <v-flex slot="no-data"/>

      <!-- related song -->
      <v-flex 
        slot='item'
        slot-scope='props'
        xs12
        @click="play(props.index)"
      >
        <v-card 
          class="mb-2 pointer" 
          color=""
        >
          <v-layout row>
            <v-flex xs5>
              <!-- image -->
              <v-img
                :aspect-ratio="props.item.source === 'YouTube' ? 16/9 : '1'"
                :src="props.item.posterLarge"
                :lazy-src="props.item.posterLarge"
                class="fillPlace"
              >
                <v-layout
                  slot="placeholder"
                  fill-height
                  align-center
                  justify-center
                  ma-0
                >
                  <!-- <v-progress-circular 
                    indeterminate 
                    color="grey lighten-5"
                  /> -->
                </v-layout>
              </v-img>
            </v-flex>
            <v-flex 
              xs7 
              class="ma-2"
            >
              <div>
                <!-- title -->
                <div class="subheading text-xs-left wordbreak">{{ props.item.title }}</div>
                <!-- artist -->
                <div 
                  class="text-xs-left grey--text" 
                  @click.stop="$router.push({name: 'artist', params: {source: props.item.source, artist: props.item.artist, artistID: props.item.artistID}})"
                >{{ props.item.artist }}</div>
                <!-- duration -->
                <div class="text-xs-left grey--text">{{ props.item.duration }}</div>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-flex>      
  <!-- </v-container> -->
</template>
<script>
import orbit from '@/components/misc/orbit'
import { mapGetters } from 'vuex'

// /* eslint-disable */
export default {
  name: 'StageRelated',
  components: {
    'orbit': orbit
  },
  watch: {
    index: {
      immediate: true,
      handler: 'getRelated'
    }
  },
  data: () => ({
    loading: true,
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: -1
    },
    items: []
  }),
  computed: {
    ...mapGetters({
      isYT: 'isYT',
      song: 'current_song',
      trackID: 'current_trackID',
      index: 'index'
    })
  },
  methods: {
    play (index) {
      // this.$store.commit.setNPlay(index, this.items)
      window.scrollTo(0, 0)
      // Event.observe(window, 'load', () =>{
      //   window.scrollTo(x,x)
      // })
      this.$store.commit('setNPlay', {songs: this.items, current: index, path: this.$route.path})
      return this.$DCPlayer.setNPlay(this.items, index)
    },
    getRelated () {
      this.loading = true
      // console.log('calling')
      this.items = []
      this.$DCAPI.searchInt('', 0, [this.song.source], this.trackID, (d) => {
        this.loading = false
        if (d.length) {
          if (d[0].trackID === this.trackID) {
            d.shift()
          }
          this.items = d
        }
      }, true, 50)
    },
    hai (source) {
      if (this.$vuetify.breakpoint.name === 'xs') {
        return source === 'YouTube' ? '119px' : '140px'
      } else {
        return source === 'YouTube' ? '119px' : '209px'
      }
    }
  }
}
</script>

<style> 
.abr15 {
  position: absolute;
  bottom: 5px;
  right:15px;
}
.artist{
  color: grey;
  float: left;
}

</style>
