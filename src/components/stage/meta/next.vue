<template>
  <v-flex 
    xs12 
    grow
  >
    <h3>
      Up next
    </h3>
    <playlist 
      :songs="next"
      rows-per-page='1' 
      @conmen="$emit('conmen', $event)"
    />
  </v-flex>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  // CURENT PLAYLIST
  name: 'C',
  computed: {
    ...mapGetters({
      next: 'next_song',
    })
  }
}
</script>

<style>
</style>
