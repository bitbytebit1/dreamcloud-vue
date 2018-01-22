<template>
    <v-fab-transition>
        <v-btn
          fixed
          bottom
          right
          @click="scrollToTop"
          class="scrollToTop teal"
          outline 
          icon 
        >
          <v-icon>{{showScrollToTop ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
        </v-btn>
    </v-fab-transition>
</template>
<script>
export default {
  name: 'scroll-to-top',
  data () {
    return {
      showScrollToTop: true,
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
      let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop
      if (scrollTop === 0) {
        this.showScrollToTop = false
      } else if (this.lastScrollTop < scrollTop) {
        this.showScrollToTop = false
      } else if (document.body.scrollHeight === scrollTop) {
        alert('bottom!')
      } else {
        this.showScrollToTop = true
      }
      this.lastScrollTop = scrollTop
      // this.showScrollToTop = scrollTop < this.lastScrollTop
      // this.showScrollToTop = true
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
