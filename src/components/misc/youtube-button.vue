<template>
      <v-btn icon :disabled="!$store.getters.isYT" @click.stop="$store.dispatch('toggleYT')">
        <v-icon :color="x3">videocam</v-icon>
      </v-btn>
</template>
<script>
export default {
  name: 'yt-button',
  computed: {
    x3 () {
      return this.$store.getters.ytVideo ? '' : 'red'
    }
  }
}
</script>
