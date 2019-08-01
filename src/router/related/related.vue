<template>
  <v-flex 
    :lg10="lg10" 
    xs12
  >
    <v-flex 
      v-if="lg10"
      class="headline fwl text-xs-left pl-2 pt-2"
    >
      Related to {{ title }} by {{ artist }}
    </v-flex>
    <playlist 
      :songs="aSongs"
      rows-per-page='-1' 
      @conmen="$emit('conmen', $event)"
    /> 
  </v-flex>
</template>
<script>
// /* eslint-disable */
export default {
  name: 'Related',
  props: {
    lg10: {
      type: Boolean,
      default: true
    },
    trackID: {
      type: [String, Number],
      default: ''
    },
    source: {
      type: String,
      default: ''
    },
    artist: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
  },
  watch: {
    'trackID': {
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
      if (this.trackID) {
        this.$DCAPI.searchInt('', 0, [this.source], this.trackID, (d) => {
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
