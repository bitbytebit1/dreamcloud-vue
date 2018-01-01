<template>
  <v-btn :color="colour" icon @click.stop="share">
    <v-icon>share</v-icon>
  </v-btn>
</template>
<script>
/* eslint-disable */
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'share-button',
  props: ['url', 'song', 'colour'],
  components: {
    'delete-button': deleteButton
  },
  methods: {
    share () {
      this.$UTILS.share(this.url, this.song)
    }
  }
}
</script>

<style>
</style>
