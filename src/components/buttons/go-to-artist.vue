<template>
  <v-list-tile 
    :to="{name: 'artist', params: {source: song[0].source, artist: song[0].artist, artistID: song[0].artistID}}" 
    ripple
  >
    <v-list-tile-title :class="$store.getters.textColor">Go to artist</v-list-tile-title>
  </v-list-tile>
</template>
<script>
export default {
  name: 'GoToArtist',
  props: {
    song: {
      type: [Array],
      default() {
        return [[{source: '', artist: '', artistID: '', }]]
      }
    }
  }
}
</script>

<style>
</style>
