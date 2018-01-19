<template>
    <v-btn icon :disabled="!$store.getters.isYT" @click.stop="clicked">
      <v-icon :color="color">videocam</v-icon>
    </v-btn>
</template>
<script>
export default {
  computed: {
    showColor: () => 'red',
    color () {
      let c = (this.$store.getters.ytUseVideo) ? 'red' : ''
      // return { color: c }
      return c
    }
  },
  methods: {
    clicked () {
      this.$store.commit('ytToggleVideo')
      // if (!this.$store.getters.ytShowVideo) {
      //   console.log('Playing audio!')
      // }
    }
  }
}
</script>
