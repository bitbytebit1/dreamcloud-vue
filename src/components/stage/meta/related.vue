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
      <orbit></orbit>
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

      <!-- related song -->
      <v-flex 
        slot='item'
        slot-scope='props'
        xs12
        @click="play(props.index)"
      >
        <v-card class="mb-2 pointer" color="" >
          <v-layout row>
            <v-flex xs5>
              <!-- image -->
              <v-card-media
                :src="props.item.poster"
                :height="hai(props.item.source)"
              >
                <!-- <span class="abr15" v-text="props.item.duration"/> -->
              </v-card-media>
            </v-flex>
            <v-flex xs7 class="ml-2">
              <div>
                <!-- title -->
                <div class="subheading text-xs-left wordbreak">{{ props.item.title }}</div>
                <!-- artist -->
                <div @click.stop="$router.push({name: 'artist', params: {source: props.item.source, artist: props.item.artist, artistID: props.item.artistID}})" class="text-xs-left grey--text">{{ props.item.artist }}</div>
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
  name: 'stage-related',
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
        if (d[0].trackID === this.trackID) {
          // alert('removing dupe first')
          d.shift()
        }
        this.items = d
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
