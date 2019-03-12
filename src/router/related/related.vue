<template>
  <v-flex 
    xs12 
    lg10 
    mt-3
  >
    <v-flex 
      class="title fwl text-xs-left pb-2"
    >
      Related to {{ $route.params.title }} by {{ $route.params.artist }}
    </v-flex>

    <playlist 
      :songs="aSongs" 
      rows-per-page='-1'
    /> 
  </v-flex>
</template>
<script>
// /* eslint-disable */
export default {
  name: 'Related',
  watch: {
    '$route.params.trackID': {
      handler: 'bind',
      immediate: true,
    }
  },

  data () {
    return {
      aSongs: []
    }
  },
  methods: {
    bind () {
      // this.$store.dispatch('loadIndeterm', true)
      if (this.$route.params.trackID) {
        this.$DCAPI.searchInt('', 0, [this.$route.params.source], this.$route.params.trackID, (d) => {
          // console.log(d)
          this.aSongs = d
          // this.$store.dispatch('loadIndeterm', false)
        }, true, 50)
      }
    }
  }
}
</script>

<style>
</style>
