<template>
  <v-tooltip 
    top
  >
    <v-btn 
      slot="activator" 
      icon
      @click.stop="add"
    >
      <v-icon>
        playlist_add
      </v-icon>
    </v-btn>
    <span>{{ t }}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: 'AddToQueue',
  props: {
    song: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      c: '',
      t: 'Add to queue'
    }
  },
  methods: {
    add () {
      this.c = 'green'
      this.$store.dispatch('snack', { b: true, c:'primary', s:'Added to queue' })
      // if first song in playlist
      this.$store.getters.index === -1
        ? this.$store.commit('setNPlay', {songs: [this.song], current: 0, path: this.$route.path})
        : this.$store.commit('current_Playlist', [...this.$store.getters.current_Playlist, this.song])
    }
  }
}
</script>

<style>
</style>
