<template>
  <a>
    {{time}}
  </a>
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
    transformer: function (time) {
      console.log('time', time)
    }
  },
  created: function () {
    console.log('created time', this.time)
  },
  computed: {
    y: function () {
      
    }
  }
}
</script>

<style>
</style>
