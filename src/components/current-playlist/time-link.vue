<template>
  <component v-bind:is="transformed" v-bind="$props"/>
</template>
<script>
/* eslint-disable */
export default {
  name: 'time-link',
  props: {
    time: {
      type: String,
      default: ''
    }
  },
  computed: {
    transformed() {
      return {
        template: `<span>{{time}}</span>`,
        props: this.$options.props
      }
    }
  },
  methods: {
    transformer (time) {
      console.log('time', time)
    }
  },
  created () {
    console.log('created time', this.time)
  },
  computed: {
    y () {
      
    }
  }
}
</script>

<style>
</style>
