<template>
  <v-flex 
    v-if="$store.state.player.current_index == -1" 
    v-show="$store.state.user.bShowStage"
    xs12
    class="mt-2"
  >
    <jumbo
      :discover="false"
      :error="err"
      :subheading="this.$route.params.artist != -1 ? 'Loading song by ' + this.$route.params.artist : 'Try searching for your favourite artist'"
    />
    <v-layout 
      row 
      wrap
      justify-center
    >
      <history 
        @conmen="$emit('conmen', $event)"
      />
    </v-layout>
  </v-flex>
  <v-flex 
    v-else
    xs12
  >
    <video-stage 
      @conmen="$emit('conmen', $event)"
    />
  </v-flex>
</template>
<script>
import jumbo from '@/components/misc/jumbo'
import history from '@/router/user/history/history'
// /* eslint-disable */
export default {
  name: 'Stage',
  components: {
    'history': history,
    'jumbo': jumbo
  },
  computed : {
    err () {
      // return this.$route.params.artist ? 'Loading song by' + this.$route.params.artist : 'Nothing playing'
      return this.$route.params.artist ? '' : 'Nothing playing'
    }
  }
}
</script>