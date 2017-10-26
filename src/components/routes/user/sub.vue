<template>
  <v-flex xs12 lg10>
    <v-tabs dark fixed centered v-model="active">
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
        <v-tabs-content id='latest' v-if="active == 'latest'">
          <subscriptions-all></subscriptions-all>           
        </v-tabs-content>
        <v-tabs-content id='channels' v-if="active == 'channels'">
          <subscription v-for='sub in subscriptions' :index='sub['id']' :key='sub['id']' :id='sub['id']' :name='sub['name']' :source='sub['source']' :img='sub['img']'></subscription>
        </v-tabs-content>        
      </v-tabs-items>
    </v-tabs> 
  </v-flex>
</template>
<script>
/* eslint-disable */
import { DCFB } from '@/DCAPIs/DCFB.js';
import subscription from '@/components/routes/home/sub';
import subscriptionAll from '@/components/routes/home/sub2';
export default {
  name: 'home',
  components: {
    'subscription': subscription,
    'subscriptions-all': subscriptionAll
  },
  data () {
    return {
      msg: 'Welcome to the real, Neo',
      tabs: ['tab-1', 'tab-2', 'tab-3'],
      active: null
    }
  },
  methods: {
    next () {
      this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
    }
  },
  firebase: function () {
    return {
      subscriptions: DCFB.subscriptions.orderByChild('name')
    }
  }
}
</script>
