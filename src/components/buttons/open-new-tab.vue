<template>
  <v-list-tile 
    v-if="inList"
    ripple 
    @click.stop="open"
  >
    <!--  -->
    <v-list-tile-title>{{ `Open ${song.source} in a new tab` }}</v-list-tile-title>
  </v-list-tile>
  <!-- BUTTON ONLY -->
  <v-tooltip 
    v-else 
    top
  >
    <v-btn 
      slot="activator" 
      :href="url" 
      icon
      @click.prevent="open"
    >
      <v-icon>open_in_new</v-icon>
    </v-btn>
    <span>{{ `Open ${song.source} in a new tab` }}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: 'NewTab',
  props: {
    song: {
      type: Object,
      default: function () {
        return { source: '' }
      }
    },
    inList: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    url () {
      return this.song.hasOwnProperty('listID') ? 
        `https://dctest.netlify.com/#/p/${this.song.title}/${this.song.source}/${this.song.artistID}/${this.song.listID}`
        : this.song.mp32
    }
  },
  methods: {
    open () {
      this.$DCPlayer.pause()
      // http://localhost:8080/#/p/English%20Frank%20A.K.A.%20Frantic%20Frank%20Playlist/YouTube/UC7m50joF-qTmt2e9jc-7v7Q/PLe5KuCdfXCKewvJvVez_nz3zkBgZMA-2u
      // if (this.song.hasOwnProperty('listID')) {
      window.open(this.url,'_blank');
      // } else {
      // window.open(this.url,'_blank');
      // window.open(`https://dctest.netlify.com/#/t/${this.song.source}/${this.song.artist}/${this.song.trackID}`,'_blank');
      // }
    }
  }
}
</script>

<style>
</style>
