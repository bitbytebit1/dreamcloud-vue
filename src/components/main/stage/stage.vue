<template>
	<v-flex d-flex xs12 v-if="$store.getters.index !== -1">
		<video-stage></video-stage>
		<audio-stage></audio-stage>
	</v-flex>
  
	<v-flex offset-xs1 xs10 v-else class="mt-0 pt-0">
		<loading></loading>
		<div class="display-1">{{$DCPlayer.iCurrent === -2 ? '' : 'Nothing playing'}}</div>
	</v-flex>
</template>
<script>
import loading from '@/components/misc/loading2'
// /* eslint-disable */
export default {
  name: 'stage',
  components: {
    'loading': loading
  }
}
</script>