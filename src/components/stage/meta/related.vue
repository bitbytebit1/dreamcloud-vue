<template>
  <v-flex 
    xs12 
    lg4 
    class="mt-3"
  >
    <!-- UP NEXT COMPONENT -->
    <div v-if="!$store.state.user.drawRight">
      <div class="text-xs-left subheading">
        Up next
      </div>
      <v-flex 
        xs12
        @click="($DCPlayer.next(), $DCFB.historyPush($store.getters.current_song))"
        @contextmenu="$emit('conmen', [$event, upNext])"
      >
        <v-card 
          class="mb-2 pointer" 
          color=""
        >
          <v-layout row>
            <v-flex xs5>
              <!-- image -->
              <v-img
                :aspect-ratio="upNext.source === 'YouTube' ? 16/9 : 1"
                :src="upNext.poster"
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
              class="ma-2 text-xs-left"
            >
              <!-- title -->
              <div class="subheading wordbreak">{{ upNext.title }}</div>
              <!-- artist -->
              <router-link
                :to="{name: 'artist', params: {source: upNext.source, artist: upNext.artist, artistID: upNext.artistID}}"
                class="subheading grey--text artist noDeco"
                @click.native.stop
              >
                {{ upNext.artist }}
              </router-link>
              <!-- duration -->
              <div class="grey--text">{{ upNext.duration }}</div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-divider/>
    </div>
    <div 
      v-if="loading || items.length"
      class="text-xs-left subheading mt-2"
    >
      Related
    </div>
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
        @click.stop="play(props.index)"
        @contextmenu="$emit('conmen', [$event, [props.item]])"
      >
        <v-card 
          class="mb-2 pointer" 
          color=""
        >
          <v-layout row>
            <v-flex xs5>
              <!-- image -->
              <v-img
                :aspect-ratio="props.item.source === 'YouTube' ? 16/9 : 1"
                :src="props.item.poster"
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
              class="ma-2 text-xs-left"
            >
              <!-- title -->
              <div class="subheading wordbreak">{{ props.item.title }}</div>
              <!-- artist -->
              <router-link
                :to="{name: 'artist', params: {source: props.item.source, artist: props.item.artist, artistID: props.item.artistID}}"
                class="subheading grey--text artist noDeco"
                @click.native.stop
              >
                {{ props.item.artist }}
              </router-link>
              <!-- duration -->
              <div class="grey--text">{{ props.item.duration }}</div>
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
  props: {
    trackID: {
      type: [String, Number],
      default: ''
    },
  },
  watch: {
    trackID: {
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
      upNext: 'next_song'
    })
  },
  methods: {
    play (i) {
      window.scrollTo(0, 0)
      this.$DCPlayer.setNPlay({songs: this.items, current: i, path: this.$route.path})

    },
    getRelated () {
      if (this.trackID) {
        this.loading = true
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

      }
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
/* .artist{
  color: grey;
  float: left;
} */

</style>
