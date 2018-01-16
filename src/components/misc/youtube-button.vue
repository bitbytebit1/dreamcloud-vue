<template>
    <v-btn icon :disabled="!$store.getters.isYT" @click.stop="$store.dispatch('toggleYT')">
      <v-icon :color="color">videocam</v-icon>
    </v-btn>
</template>
<script>
export default {
  computed: {
    show: () => !this.$store.getters.ytShowVideo && this.$store.getters.ytVideo,
    showColor: () => 'red',
    color () {
      let c = (this.$store.getters.ytVideo) ? 'red' : ''
      // return { color: c }
      return c
    }
  }
}
</script>
