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
      
      <v-list-tile :to="{path: '/subs/overview'}">
        <v-list-tile-action>
          <v-icon>toc</v-icon>
        </v-list-tile-action>
        
        <v-list-tile-content>
          <v-list-tile-title>Overview</v-list-tile-title>
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
        <delete-user-subscription :subscriptionID="subItem['id']" class="delete"></delete-user-subscription>
      </v-list-tile>
    </v-list-group>
  </div>
</template>

<script>

import { DCFB } from '@/DCAPIs/DCFB.js'
import deleteUserSubscription from '@/components/sidebar/user-subscriptions/delete-user-subscription'
export default {
  name: 'user-playlists',
  components: {
    'delete-user-subscription': deleteUserSubscription
  },
  data () {
    return {
      UID: DCFB.UID,
      active: true
    }
  },
  methods: {
    closeLeftOnMobile: function () {
      // if (this.$UTILS.isMobile) {
      this.$emit('close', 'left')
      console.log('FINAL TEST')
      // }
    },
    playlistDelete: function () {
      console.log(123)
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
  display: none;
}

.subscription:hover .delete {
  display: inherit;
}
</style>
