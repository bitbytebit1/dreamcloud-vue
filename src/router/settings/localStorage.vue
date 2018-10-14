<template>
  <div class="ma-0 pa-0">
    <h3 class="text-xs-left pa-3">Local Storage</h3>
    <v-divider class="primary"/>
    <v-list subheader>
      <v-list-tile
        ripple
        @click="()=>{}"
      >
        <v-list-tile-content>
          Usage
        </v-list-tile-content>
        <!-- ~~~~~~~~~~~~~~~~~~ -->
        <v-list-tile-action>
          {{ usage }}{{ quota }}
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
      <!-- ||||||||||||||||||||||-->
      <v-list-tile
        ripple
        @click="clearStorage"
      >

        <v-list-tile-content>
          Clear storage
        </v-list-tile-content>

        <v-list-tile-action class="text-xs-right">
          <v-btn icon>
            <v-icon>delete</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
        
      <v-divider/>
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
      quota: ' of 0',
      usage: 0
    }
  },
  created () {
    this.get_storage_estimate()
  },
  methods: {
    clearStorage () {
      var cacheWhitelist = 'dreamcloud-precache-https://alphacloud.netlify.com/'
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key)
          }
        })).then(() => {
          this.quota = ''
          this.usage = 'Restart your browser to see current usage'
        })
      })
    },
    get_storage_estimate () {
      this.get_storage_estimate_wrap().then((estimate) => {
        this.usage = this.$UTILS.formatBytes(estimate.usage)
        this.quota = ' of ' + this.$UTILS.formatBytes(estimate.quota)
        // this.percentage = (estimate.usage / estimate.quota).toFixed(2) * 10
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
