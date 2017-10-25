<template>
  <div>
    <v-tabs dark v-model="active">
      <v-tabs-bar class="cyan">
        <v-tabs-item
          v-for="tab in tabs"
          :key="tab"
          :href="'#' + tab"
          ripple
        >
          Item {{ tab.slice(-1) }}
        </v-tabs-item>
        <v-tabs-slider color="yellow"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content
          v-for="tab in tabs"
          :key="tab"
          :id="tab"
        >
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>

    <div class="text-xs-center mt-3">
      <v-btn @click.native="next">next tab</v-btn>
    </div>
  </div>
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
        tabs: ['tab-1', 'tab-2', 'tab-3'],
        active: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
