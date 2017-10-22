<template>
  <v-flex xs12>
    <subscription v-for="sub in subscriptions" :index="sub['id']" :key="sub['id']"
    :id="sub['id']" :name="sub['name']" :source="sub['source']" :img="sub['img']">
    </subscription>
  </v-flex>
</template>
<script>
/* eslint-disable */
import { DCFB } from '@/DCAPIs/DCFB.js'
import subscription from '@/components/routes/home/sub'
export default {
  name: 'home',
  components: {
    'subscription': subscription
  },
  data () {
    return {
      msg: 'Welcome to the real, Neo'
    }
  },
  firebase: function () {
    return {
      subscriptions: DCFB.subscriptions
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
