<template>
  <v-flex 
    v-if="$store.getters.index !== -1" 
    xs12
  >
    <video-stage 
      @conmen="$emit('conmen', $event)"
    />
    <!-- v-if="$route.name=='auto' && !$store.getters.ytUseVideo" -->
    <audio-stage
      @conmen="$emit('conmen', $event)"
    />
  </v-flex>

  <v-flex 
    v-else 
    xs12
  >
    <v-layout 
      row 
      wrap
      justify-center
    >
      <jumbo
        :discover="false"
        error="Nothing playing"
        subheading="Try searching for your favourite song or artist"
      />
      <history/>
    </v-layout>
  
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
  }
}
</script>