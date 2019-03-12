<template>
  <v-list-tile 
    v-if="inList" 
    ripple 
    @click.stop="share"
  >
    <v-list-tile-title>{{ btnTxt }}</v-list-tile-title>
  </v-list-tile>

  <v-tooltip 
    v-else 
    top
  >
    <v-btn 
      slot="activator" 
      :color="color" 
      icon 
      @click.stop="share"
    >
      <v-icon>share</v-icon>
    </v-btn>
    <span>{{ btnTxt }}</span>
  </v-tooltip>
</template>
<script>
// /* eslint-disable */
import deleteButton from '@/components/buttons/delete-button'
export default {
  name: 'ShareButton',
  props: {
    url: {
      type: String,
      default: ''
    },
    song: {
      type: [Object, Array],
      default() {
        return []
      }
    },
    inList: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      color: ''
    }
  },
  components: {
    'delete-button': deleteButton
  },
  computed : {
    btnTxt () {
      return this.$vuetify.breakpoint.smAndDown ? 'Share' : 'Copy link to clipboard'
    }
  },
  methods: {
    share () {
      this.$emit('clicked')
      this.color = 'primary'
      let w = this.song.hasOwnProperty('listID') ? 
        `https://dctest.netlify.com/#/p/${encodeURIComponent(this.song.title)}/${this.song.source}/${this.song.artistID}/${this.song.listID}`
        : `https://dreamcloud.netlify.com/#/t/${this.song.source}/${encodeURIComponent(this.song.artist)}/${this.song.trackID}`
      if(this.$UTILS.share(w, this.song)) {
        this.$store.commit('snack', { b: true, c:'primary', s:'Link copied to clipboard' })
      } else {
        this.$store.commit('snack', { b: true, c:'primary', s:'Opening share menu' })
      }
      setTimeout(() => {
        this.color = ''
      }, 2000)
    }
  }
}
</script>

<style>
</style>
