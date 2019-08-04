<template>
  <av-circle
    :outline-width="0"
    :progress-width="5"
    :outline-meter-space="5"
    :playtime="true"
    :audio-controls="false"
    :ref-link="cRef"
    class="mt-5"
    playtime-font="18px Monaco"
  />
</template>
<script>
export default {
  name: 'X',
  data () {
    return {
      x1: 'deleteme?'
    }
  },
  methods: {
    x2 () {

    }
  },
  mounted () {  
    this.$refs = this.$DCPlayer.eRef
    console.log('new', this.$refs.dcaudio)
  },
  computed: {
    cRef () {
      return this.$refs.dcaudio
    },
    gogo () {
      return typeof this.$refs.dcaudio == 'object' ? true : false
    }
  }
}
</script>

<style>
</style>
