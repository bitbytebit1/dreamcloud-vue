<template>
  <v-btn :color="color" icon @click.stop="share">
    <v-icon>share</v-icon>
  </v-btn>
</template>
<script>
// /* eslint-disable */
import deleteButton from '@/components/buttons/delete-button'
export default {
  name: 'share-button',
  props: ['url', 'song', 'colour'],
  data () {
    return {
      color: ''
    }
  },
  components: {
    'delete-button': deleteButton
  },
  methods: {
    share () {
      this.color = 'primary'
      this.$UTILS.share(this.url, this.song)
      setTimeout(() => {
        this.color = ''
      }, 2000)
    }
  }
}
</script>

<style>
</style>
