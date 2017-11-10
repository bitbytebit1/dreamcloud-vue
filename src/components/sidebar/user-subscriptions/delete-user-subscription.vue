<template>
    <v-tooltip color="red darken-1" :content-class="toolTipClass" v-model="show" top>
      <v-btn icon slot="activator" @click.stop="subscriptionDelete">
        <v-icon color="grey lighten-1">delete</v-icon>
      </v-btn>
      <span>Click again to delete</span>
    </v-tooltip>
</template>
<script>
/* eslint-disable */
import { DCFB } from '@/DCAPIs/DCFB.js'

export default {
  name: 'delete-subscription-button',
  props: ['subscriptionID'],
  watch: {
    'show': 'resetCounter'
  },
  data() {
    return {
      show: false,
      clicks: 0
    }
  },
  computed: {
    toolTipClass: function () {
      return this.clicks === 1 ? '' : 'hidden'
    },
  },
  methods: {
    resetCounter: function () {
      if(!this.show){
        this.clicks = 0
      }
    },
    subscriptionDelete: function () {
      this.clicks++ 
      if(this.clicks == 2){
        console.log('deleteing', this.subscriptionID)
        DCFB.subscriptionDelete(this.subscriptionID)
      }
    }
  }
}
</script>

<style>
.hidden{
   display: none
}
</style>
