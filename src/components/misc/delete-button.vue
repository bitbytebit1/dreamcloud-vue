<template>
  <v-btn @mouseleave="clicks = 0" :color="color" icon @click.stop="emitDelete">
    <v-icon>delete</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'delete-button',
  props: ['id'],
  data () {
    return {
      clicks: 0
    }
  },
  computed: {
    color: function () {
      return this.clicks === 1 ? 'red lighten-1' : ''
    }
  },
  methods: {
    emitDelete: function () {
      this.clicks++
      if (this.clicks === 2) {
        this.$emit('delete', this.id)
      }
    }
  }
}
</script>