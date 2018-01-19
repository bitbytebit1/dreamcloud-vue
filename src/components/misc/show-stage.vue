<template>
    <v-fab-transition>
        <v-btn
          fab
          small
          fixed
          bottom
          right
          @click="showStage"
          class="scrollToTop teal"
          outline 
          icon 
        >
          <v-icon>{{$store.getters.bShowStage ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}}</v-icon>
        </v-btn>
    </v-fab-transition>
</template>
<script>
export default {
  name: 'show-stage',
  data () {
    return {
      bShow: false
    }
  },
  methods: {
    showStage () {
      this.$store.commit('bShowStage', !this.$store.getters.bShowStage)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@media only screen and (max-width: 599px){
  .scrollToTop{
    bottom: 40px !important
  }
}
@media only screen and (min-width: 600px){
  .scrollToTop{
    bottom: 8px !important;
    right: 60px !important;
  }  
}
</style>
