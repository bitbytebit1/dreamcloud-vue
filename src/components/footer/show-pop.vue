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
    @click="showPop"
  >
    <v-icon medium>{{ !show_pop ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
  </v-btn>
  <!-- </v-fab-transition> -->
</template>
<script>
import { mapState } from 'vuex';
// import { mapGetters } from 'vuex';
export default {
  name: 'ScrollToTop',
  computed: {
    ...mapState({
      show_pop: state => state.player.show_pop,
    }),
    // ...mapGetters(['current_song'])
  },
  methods : {
    showPop () {
      this.$store.commit('show_pop', !this.show_pop)
      if (this.show_pop && (this.$route.name == 'auto' || this.$route.name == 'current')) {
        this.$router.go(-1)
      }
    }
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
