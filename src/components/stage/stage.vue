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
      :title="txt"
      :subheading="$route.params.artist ? 'Just a moment' : 'Try searching for your favourite artist'"
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
    <!-- v-if="$route.name=='auto' && !$store.getters.ytUseVideo" -->
    <!-- <audio-stage
      @conmen="$emit('conmen', $event)"
    /> -->
  </v-flex>
  <!-- <v-flex offset-xs1 xs10 class="mt-0 pt-4">
    <div class="display-1">{{$DCPlayer.iCurrent === -2 ? '' : 'Nothing playing'}}</div>
  </v-flex> -->
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
    },
    txt () {
      return this.$route.params.artist ? 'Loading song by ' + this.$route.params.artist : ''
    }
  }
}
</script>