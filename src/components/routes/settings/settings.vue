<template>
  <div>
    <h1>{{ msg }}</h1>
    <v-btn v-on:click="logout">Logout</v-btn>
  </div>
</template>
<script>
import {fb} from '@/DCAPIs/DCFB.js'
export default {
  name: 'settings',
  data () {
    return {
      msg: 'Welcome to the settings page'
    }
  },
  methods: {
    logout: function () {
      fb.auth().signOut().then(() => {
        this.$router.replace('login')
      })
      // console.log(DCFB)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
