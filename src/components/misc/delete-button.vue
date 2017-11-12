<template>
  <v-btn class="del-btn" @mouseleave="clicks = 0" :color="color" icon @click.stop="emitDelete">
    <v-icon>{{dlIcn}}</v-icon>
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
    dlIcn () {
      return this.clicked ? 'delete_forever' : 'delete'
    },
    color () {
      return this.clicked ? 'red lighten-1' : ''
    },
    clicked () {
      return this.clicks === 1
    }
  },
  methods: {
    emitDelete () {
      this.clicks++
      if (this.clicks === 2) {
        this.$emit('delete', this.id)
      }
    }
  }
}
</script>

<style>
.del-btn{
  min-width: 36px!important
}
</style>