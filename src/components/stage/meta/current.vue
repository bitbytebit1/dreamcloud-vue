<template>
  <playlist 
    :songs="current_Playlist"
    rows-per-page='250' 
    @conmen="$emit('conmen', $event)"
  />
</template>
<script>
import deleteButton from '@/components/buttons/delete-button'
import { mapState } from 'vuex'

export default {
  // CURENT PLAYLIST
  name: 'C',
  components: {
    'delete-button': deleteButton
  },
  data () {
    return {
      x1: 'deleteme?'
    }
  },
  methods: {
    x2 () {

    }
  },
  computed: mapState([
    // map this.count to store.state.count
    'current_Playlist'
  ])
}
</script>

<style>
</style>
