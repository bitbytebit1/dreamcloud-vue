<template>
  <div>
    <v-list-group :value="active">
      <v-list-tile slot="item" @click="active = !active">
        <v-list-tile-action>
          <v-icon>people</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Subscriptions</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>keyboard_arrow_down</v-icon>
        </v-list-tile-action>
      </v-list-tile>
        
      <v-divider></v-divider>
      
      <v-list-tile :to="{path: '/subs/latest'}">
        <v-list-tile-action>
          <v-icon>toc</v-icon>
        </v-list-tile-action>
        
        <v-list-tile-content>
          <v-list-tile-title>Latest</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile :to="{path: '/subs/channels'}">
        <v-list-tile-action>
          <v-icon>toc</v-icon>
        </v-list-tile-action>
        
        <v-list-tile-content>
          <v-list-tile-title>Channels</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>

      <v-list-tile v-for="subItem in subscriptions" @click="closeLeftOnMobile" class="subscription" active-class="blue lighten-1" :to="{path: '/a/'  + subItem['source'] +  '/' + encodeURIComponent(subItem['name']) +  '/' + subItem['id']}" v-bind:key="subItem['.key']">
        <v-list-tile-action>
          <v-avatar size='32px' slot='activator'>
            <img :src="subItem['img']"/>
          </v-avatar>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ subItem['name'] }}</v-list-tile-title>
        </v-list-tile-content>
        <delete-button @delete="subscriptionDelete" :id="subItem['id']" class="delete"></delete-button>
      </v-list-tile>
    </v-list-group>
  </div>
</template>

<script>

import { DCFB } from '@/DCAPIs/DCFB.js'
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'user-playlists',
  components: {
    'delete-button': deleteButton
  },
  data () {
    return {
      UID: DCFB.UID,
      active: true
    }
  },
  methods: {
    subscriptionDelete: function (subID) {
      DCFB.subscriptionDelete(subID)
    },
    closeLeftOnMobile: function () {
      this.$emit('closeLeft')
    }
  },
  firebase: function () {
    return {
      subscriptions: DCFB.subscriptions.orderByChild('name')
    }
  }
}
</script>

<style>
.delete {
  display: none!important
}
.router-link-exact-active .delete, .subscription:hover .delete {
  display: inherit!important
}
</style>
