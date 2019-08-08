<template>
  <span style="display: inline-block;">
    <v-menu 
      v-if="isYT && ytUseVideo"
      v-model="showMenu"
      open-on-hover
      top
      nudge-top="25"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          small
          v-on="on"
        >
          <v-icon>settings</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-tile
          v-for="(item, i) in qualities"
          :key="i"
          :class="item == cQual && 'primary'"
          @click="setQuality(item), cQual = item"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item | capitalize }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action/>
        </v-list-tile>
      </v-list>
    </v-menu>
  </span>
</template>
<script>
/* eslint-disable */
// player.getAvailableQualityLevels():Array
// player.setPlaybackQuality(suggestedQuality:String):Void
// player.getPlaybackQuality():String
import deleteButton from '@/components/buttons/delete-button'
import { mapGetters } from 'vuex'
import { unwatchFile } from 'fs';

export default {
  name: 'quality-button',
  components: {
    'delete-button': deleteButton
  },
  filters: {
    capitalize: function (value) {
      if (value.indexOf('hd') > -1) return value.toUpperCase()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  data () {
    return {
      showMenu: false,
      qualities: [],
      cQual: '',
      oldID: ''
    }
  },
  methods: {
    setQuality (qual) {
      console.log('setting quality', qual)
      this.$store.getters.ytObject.setPlaybackQuality(qual)
    },
  },
  watch: {
    ytIsPlaying: {
      immediate: true,
      handler: function(isP) {
        if (this.oldID != this.trackID && isP) {
          this.qualities = this.$store.getters.ytObject.getAvailableQualityLevels()
          const q = this.$store.getters.ytObject.getPlaybackQuality()
          // on first load
          if (!this.cQual) {
            this.cQual = q
          }
          // if current quality doesn't equal current
          if (q != 'unknown' && q != this.cQual && this.qualities.some(e => e == this.cQual)) {
            console.log('forcing quality', this.cQual, q)
            this.cQual = q
            this.setQuality(this.cQual)
            return
          }
          this.cQual = q
        }
        this.oldID = this.trackID
      }
    }
  },
  computed: {
    ...mapGetters({
      trackID: 'current_trackID',
      isYT: 'isYT',
      ytIsPlaying: 'ytIsPlaying',
      ytUseVideo: 'ytUseVideo',
      ytIsLoading: 'ytIsLoading',
      // song: 'current_song',
    })
  }
}
</script>

<style>
</style>
