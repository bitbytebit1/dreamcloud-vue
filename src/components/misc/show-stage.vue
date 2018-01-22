<template>
  <v-btn
    @click="showStage"
    icon
  >
    <v-icon>{{$route.name === 'stage' ? 'fullscreen_exit' : 'fullscreen'}}</v-icon>
  </v-btn>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'show-stage',
  computed: {
    ...mapGetters({
      song: 'current_song'
    })
  },
  data () {
    return {
      bShow: false
    }
  },
  methods: {
    showStage () {
      if (!this.$store.getters.bShowStage) {
        this.$store.commit('bShowStage', true)
        this.$router.push({name: 'stage'})
      } else {
        this.$router.go(-1)
      }
      window.scrollTo(0, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
