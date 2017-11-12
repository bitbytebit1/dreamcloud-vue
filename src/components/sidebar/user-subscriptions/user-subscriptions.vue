<template>
  <div>
    <v-list-group :value="active">
      <v-list-tile ripple slot="item" @click="active = !active">
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
      
      <v-list-tile ripple @click="closeLeftOnMobile" :to="{path: '/subs/all'}">
        <v-list-tile-action>
          <v-icon>toc</v-icon>
        </v-list-tile-action>
        
        <v-list-tile-content>
          <v-list-tile-title>All</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>

      <v-list-tile 
        v-for="subItem in subscriptions"
        @click="closeLeftOnMobile"
        id="subscription"
        :class="isPlaying(subItem['source'], subItem['name'], subItem['id'])"
        :active-class="isPlaying(subItem['source'], subItem['name'], subItem['id']) || 'blue-grey lighten-1'"
        :to="{path: '/a/'  + subItem['source'] +  '/' + encodeURIComponent(subItem['name']) +  '/' + subItem['id']}"
        v-bind:key="subItem['.key']"
        ripple
      >
        <v-list-tile-action color="green">
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
    isPlaying: function (s, n, id) {
      return this.$store.getters.hash === '/a/' + s + '/' + encodeURIComponent(n) + '/' + id ? 'light-green darken-2' : ''
    },
    subscriptionDelete: function (subID) {
      DCFB.subscriptionDelete(subID)
    },
    closeLeftOnMobile: function () {
      this.$emit('closeLeft')
    }
  },
  firebase: function () {
    return {
      subscriptions: DCFB.subscriptions.orderByChild('name_lower')
    }
  }
}
</script>

<style>
.delete {
  display: none!important
}
.router-link-exact-active .delete, #subscription:hover .delete {
  display: inherit!important
}
</style>
