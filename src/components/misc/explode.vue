<template>
	<!-- <div > -->
	<transition name="bounce" 
		v-on:enter="afterEnter"
	>
		<!-- <v-btn  > -->
		<!-- v-if="show" -->
		<v-icon id="img-play" class="" size="150px" icon >play_arrow</v-icon>
		<!-- </v-btn> -->
	</transition>
	<!-- </div> -->
</template>
<script>
/* eslint-disable */
export default {
  name: 'explode',
  data () {
    return {
      show: false,
      x1: 'deleteme?'
    }
  },
  methods: {
    afterEnter () {
      this.show = false
    }
  },
  computed: {
    x3 () {
      
    }
  }
}
</script>

<style>
#img-play{
  top: 160px;
  position: absolute;
}
.bounce-enter-to{  
  transform: scale(2);
}
</style>
