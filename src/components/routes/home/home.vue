<template>
  <v-flex xs12 lg10>
    <v-tabs dark fixed centered>
      <v-tabs-bar >
        <v-tabs-slider class="yellow"></v-tabs-slider>
        <v-tabs-item :href="'#latest'">
          Latest
        </v-tabs-item>
        <v-tabs-item :href="'#channels'">
          Channels
        </v-tabs-item>        
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content id='latest'>
          <subscriptions-all></subscriptions-all>          
        </v-tabs-content>
        <v-tabs-content id='channels'>
          <subscription v-for="sub in subscriptions" :index="sub['id']" :key="sub['id']" :id="sub['id']" :name="sub['name']" :source="sub['source']" :img="sub['img']"></subscription>
        </v-tabs-content>        
      </v-tabs-items>
    </v-tabs> 
  </v-flex>
</template>
<script>
/* eslint-disable */
import { DCFB } from '@/DCAPIs/DCFB.js'
import subscription from '@/components/routes/home/sub'
import subscriptionAll from '@/components/routes/home/sub2'
export default {
  name: 'home',
  components: {
    'subscription': subscription,
    'subscriptions-all': subscriptionAll
  },
  data () {
    return {
      msg: 'Welcome to the real, Neo'
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
