<template>
  <!-- <v-fab-transition transition="slide-y-reverse-transition"> -->
  <v-btn
    v-bind="$store.getters.theme"
    :class="$store.getters.textColor"
    fixed
    class="scrollToTop primary"
    outline
    icon 
    @click="scrollToTop"
  >
    <v-icon>{{ showScrollToTop ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
  </v-btn>
  <!-- </v-fab-transition> -->
</template>
<script>
export default {
  name: 'ScrollToTop',
  data () {
    return {
      showScrollToTop: false,
      lastScrollTop: ''
    }
  },
  methods: {
    scrollToTop () {
      if (this.showScrollToTop) {
        window.scrollTo(0, 0)
      } else {
        window.scrollTo(0, document.body.scrollHeight)
      }
    },
    handleScroll () {
      var d = document.documentElement
      var offset = d.scrollTop + window.innerHeight
      var height = d.offsetHeight
      // if bottom
      if (offset === height) {
        this.showScrollToTop = true
      // if top
      } else if (d.scrollTop === 0) {
        this.showScrollToTop = false
      // if scroll down
      } else if (this.lastScrollTop < d.scrollTop) {
        this.showScrollToTop = false
      // if scroll up
      } else {
        this.showScrollToTop = true
      }
      this.lastScrollTop = d.scrollTop
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@media only screen and (max-width: 599px){
  .scrollToTop{
    bottom: 35px !important
  }
}
@media only screen and (min-width: 600px){
  .scrollToTop{
    bottom: 8px !important;
    right: 60px !important;
  }  
}
</style>
