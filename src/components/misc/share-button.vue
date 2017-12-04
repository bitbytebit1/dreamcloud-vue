<template>
  <v-btn icon @click.stop="share">
    <v-icon>share</v-icon>
  </v-btn>
</template>
<script>
/* eslint-disable */
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'x',
  props: ['url', 'song'],
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
