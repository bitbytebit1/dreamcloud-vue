<template>
  <playlist 
    :songs="current_playlist"
    :show-uploaded="!0"
    :rows-per-page='250' 
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
  computed: {
    ...mapState({
      current_playlist: state => state.player.current_playlist,
    }),
  }
}
</script>

<style>
</style>
