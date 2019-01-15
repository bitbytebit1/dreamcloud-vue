<template>
  <v-btn 
    icon
    @click="toggle"
  >
    <v-icon :color="color">shuffle</v-icon>
  </v-btn>
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
        // console.log('shuffleOn')
        // console.log(this.songs[0].trackID, this.shuffle(this.songs)[0].trackID)
        this.aShuffled = this.shuffle(this.songs)
        this.$store.commit('aShuffled', this.aShuffled)
        this.$emit('shuffleOn', this.aShuffled)
      } else {
        // console.log('shuffleOff')
        this.$emit('shuffleOff')
      }
    },
    shuffle(source) {
      let sourceArray = Object.assign([], source)
      for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
      }
      return sourceArray;
    }
  }
}
</script>

<style>
</style>
