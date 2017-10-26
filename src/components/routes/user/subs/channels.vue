<template>
  <v-flex xs12 lg10>
    <!-- <loading :show="loading" spinner="waveDots"></loading> -->

    <subscription v-for="sub in subscriptions" :index="sub['id']" :key="sub['id']" :id="sub['id']" :name="sub['name']" :source="sub['source']" :img="sub['img']"></subscription>
  </v-flex>
</template>
<script>
/* eslint-disable */
import { DCFB } from '@/DCAPIs/DCFB.js'
import subscription from '@/components/routes/home/sub'
import subscriptionAll from '@/components/routes/home/sub2'
import loading from '@/components/misc/loading'
export default {
  name: 'home',
  components: {
    'subscription': subscription,
    'subscriptions-all': subscriptionAll,
    'loading': loading,
  },
  data () {
    return {
      loading: true
    }
  },
  firebase: function () {
    return {
      subscriptions: DCFB.subscriptions.orderByChild('name')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
