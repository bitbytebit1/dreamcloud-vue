<template>
    <v-fab-transition>
        <v-btn
            color="blue"
            fab
            dark
            small
            fixed
            bottom
            right
            v-show="showScrollToTop"
            @click="scrollToTop"
            class="scrollToTop"
        >
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
    </v-fab-transition>
</template>
<script>
export default {
  name: 'scroll-to-top',
  data () {
    return {
      showScrollToTop: false
    }
  },
  methods: {
    scrollToTop: function () {
      window.scrollTo(0, 0)
    },
    handleScroll: function () {
      var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
      .scrollTop > 299
      this.showScrollToTop = (scrollTop > 299)
    }
  },
  created: function () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@media only screen and (max-width: 599px){
  .scrollToTop{
    bottom: 75px !important
  }
}
@media only screen and (min-width: 600px){
  .scrollToTop{
    right: 75px !important
  }  
}
</style>
