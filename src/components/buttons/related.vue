<template>
  <v-list-tile 
    v-if="!hasList"
    ripple 
    @click.stop="open"
  >
    <v-list-tile-title>Go to related</v-list-tile-title>
  </v-list-tile>
</template>
<script>
export default {
  name: 'NewTab',
  props: {
    song: {
      type: [Object,Array],
      default: function () {
        return {trackID:null, artistID: null, artist: null}
      }
    }
  },
  computed: {
    hasList () {
      return this.song.hasOwnProperty('listID')
    }
  },
  methods: {
    open () {
      this.$router.push({name: 'related', params: {source: this.song.source, trackID: this.song.trackID, artistID: this.song.artistID, artist:this.song.artist, title: this.song.title}})
      // http://localhost:8080/#/p/English%20Frank%20A.K.A.%20Frantic%20Frank%20Playlist/YouTube/UC7m50joF-qTmt2e9jc-7v7Q/PLe5KuCdfXCKewvJvVez_nz3zkBgZMA-2u
      // if (this.hasList) {
      // window.open(`https://dctest.netlify.com/#/p/${this.song.title}/${this.song.source}/${this.song.artistID}/${this.song.listID}`,'_blank');
      // } else {
      // window.open(this.song.mp32,'_blank');
      // window.open(`https://dctest.netlify.com/#/t/${this.song.source}/${this.song.artist}/${this.song.trackID}`,'_blank');
      // }
    }
  }
}
</script>

<style>
</style>
