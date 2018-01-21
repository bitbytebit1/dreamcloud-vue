<template>
    <v-flex xs4 class="mt-3">
      <v-flex v-if="loading">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-flex>
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
                      :height="hai(props.item.source)"
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
    loading: false,
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: -1
    },
    items: []
  }),
  methods: {
    play (index){
      console.log({songs: this.current, current: index, path: this.$route.path})
      // this.$store.commit.setNPlay(index, this.items)
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
      song: 'current_song',
      current: 'current_Playlist'
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
</style>
