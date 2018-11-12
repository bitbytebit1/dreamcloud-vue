<template>
  <v-flex 
    v-if="$store.getters.index !== -1" 
    d-flex 
    xs12
  >
    <video-stage/>
    <audio-stage/>
  </v-flex>
  
  <jumbo
    v-else 
    :discover="false"
    error="Nothing playing"
    subheading="Try searching for your favourite song or artist"
  />
  <!-- <v-flex offset-xs1 xs10 class="mt-0 pt-4">
    <div class="display-1">{{$DCPlayer.iCurrent === -2 ? '' : 'Nothing playing'}}</div>
  </v-flex> -->
</template>
<script>
import jumbo from '@/components/misc/jumbo'
// /* eslint-disable */
export default {
  name: 'Stage',
  components: {
    'jumbo': jumbo
  }
}
</script>