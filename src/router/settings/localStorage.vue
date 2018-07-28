<template>
  <div class="ma-0 pa-0">
    <h3 class="text-xs-left pa-3">Local Storage</h3>
    <v-divider class="primary"></v-divider>
      <v-list subheader>
        <v-list-tile
          @click=""
          ripple
        >
          <v-list-tile-content>
            Usage
          </v-list-tile-content>
          <!-- ~~~~~~~~~~~~~~~~~~ -->
          <v-list-tile-action>
            {{usage}} of {{quota}}
          </v-list-tile-action>
        </v-list-tile>
        <v-divider></v-divider>
        <!-- ||||||||||||||||||||||-->
        <v-list-tile
          @click="clearStorage"
          ripple
        >

          <v-list-tile-content>
            Clear storage
          </v-list-tile-content>

          <v-list-tile-action class="text-xs-right">
            <v-btn icon>
              <v-icon color="primary">delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
  </div>
</template>
<script>
/* eslint-disable */
import deleteButton from '@/components/buttons/delete-button'
import { mapGetters } from 'vuex'

export default {
  name: 'localStorage',
  data () {
    return {
      percentage: 0,
      quota: 0,
      usage: 0
    }
  },
  created () {
    this.get_storage_estimate()
  },
  methods: {
    clearStorage () {
      var cacheWhitelist = ['sw-precache-v3-dreamcloud']
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key)
          }
        }))
      })
    },
    get_storage_estimate () {
      this.get_storage_estimate_wrap().then((estimate) => {
        this.usage = this.$UTILS.formatBytes(estimate.usage)
        this.quota = this.$UTILS.formatBytes(estimate.quota)
        this.percentage = (estimate.usage / estimate.quota).toFixed(2) * 10
      })
    },
    get_storage_estimate_wrap () {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        // We've got the real thing! Return its response.
        return navigator.storage.estimate()
      }

      if ('webkitTemporaryStorage' in navigator &&
          'queryUsageAndQuota' in navigator.webkitTemporaryStorage) {
        // Return a promise-based wrapper that will follow the expected interface.
        return new Promise(function (resolve, reject) {
          navigator.webkitTemporaryStorage.queryUsageAndQuota(
            function (usage, quota) { resolve({usage: usage, quota: quota}) },
            reject
          )
        })
      }
    },
  }
}
</script>

<style>
</style>
