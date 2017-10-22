<template>
  <v-flex xs12>
    <subscriptions-all>
    </subscriptions-all>
  </v-flex>
</template>
<script>
/* eslint-disable */
import subscription from '@/components/routes/home/sub'
export default {
  name: 'home',
  components: {
    'subscriptions-all': subscription
  },
  data () {
    return {
      msg: 'Welcome to the real, Neo'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
