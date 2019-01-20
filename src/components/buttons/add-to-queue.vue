<template>
  <v-list-tile 
    v-if="inList" 
    ripple 
    @click.stop="add"
  >
    <v-list-tile-title>Add to queue</v-list-tile-title>
  </v-list-tile>

  <v-tooltip 
    v-else
    top
  >
    <v-btn 
      slot="activator" 
      icon
      @click.stop="add"
    >
      <v-icon>
        add_to_queue
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
    },
    inList: {
      type: Boolean,
      default() {
        return false
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
