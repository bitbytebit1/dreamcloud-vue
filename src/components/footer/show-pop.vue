<template>
  <!-- <v-fab-transition transition="slide-y-reverse-transition"> -->
  <v-btn
    v-bind="$store.getters.theme"
    :class="$store.getters.textColor"
    class="scrollToTop primary"
    outline
    fab
    small
    icon 
    @click="$store.commit('show_pop', !show_pop)"
  >
    <v-icon medium>{{ !show_pop ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
  </v-btn>
  <!-- </v-fab-transition> -->
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'ScrollToTop',
  computed: {
    ...mapState({
      show_pop: state => state.player.show_pop,
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.scrollToTop{
  margin-top: 11px;
}
/* @media only screen and (max-width: 599px){
  .scrollToTop{
    position: fixed;
    bottom: 35px !important
  }
}
 @media only screen and (min-width: 600px){
  .scrollToTop{
    position: fixed;
    bottom: 8px !important;
    right: 60px !important;
  }
} */
</style>
