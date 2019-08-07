<template>
  <v-tooltip top>
    <v-btn 
      slot="activator"
      icon
      @click="toggle"
    >
      <v-icon :color="color">shuffle</v-icon>
    </v-btn>
    <span> {{ bShuffle ? 'Unshuffle' : 'Shuffle' }}</span>
  </v-tooltip>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShuffleButton',
  props: {
    songs: {
      type: [Array],
      required: true
    }
  },
  watch: {
    songs: {
      handler: 'songsChanged'
    }
  },
  data : function() {
    return {
      aShuffled: [],
      aUnshuffled: []
    };
  },
  computed: {
    ...mapGetters({
      bShuffle: 'bShuffled'
    }),
    color () {
      return this.bShuffle ? 'primary' : ''
    }
  },
  methods: {
    songsChanged (newVal) {
      if (this.aShuffled.length > 0 && newVal[0].trackID !== this.aShuffled[0].trackID) {
        // this.bShuffle = false
        this.$store.commit('bShuffled', false)

      } else {
        this.aUnshuffled = this.aShuffled
      }
    },
    toggle () {
      this.$store.commit('bShuffled', !this.bShuffle)
      if (this.bShuffle) {
        this.aShuffled = this.$UTILS.shuffle(this.songs)
        this.$store.commit('aShuffled', this.aShuffled)
        this.$emit('shuffleOn', this.aShuffled)
      } else {
        // console.log('shuffleOff')
        this.$emit('shuffleOff')
      }
    }
  }
}
</script>

<style>
</style>
