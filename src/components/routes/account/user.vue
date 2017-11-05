<template>
  <v-flex xl12 flexbox>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="https://vuetifyjs.com/components/selects#select-view" target="_blank">vuetify</a></li>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <h2>Overview</h2>
    <v-flex xl12>
      <loading :show="loading" spinner="spinner"></loading>
      Currently using {{usage}} of {{quota}} ({{percentage}}) %
      <!-- <v-btn v-on:click="clear">Clear Storage</v-btn> -->
    </v-flex>

    <v-btn v-on:click="logout">Logout</v-btn>
  </v-flex>
</template>

<script>
  /* eslint-disable */
import { fb } from '@/DCAPIs/DCFB.js'
import loading from '@/components/misc/loading.vue'

export default {
  name: 'user',
  components:{
    'loading': loading
  },
  // mixins: [DCFB],
  data () {
    return {
      msg: 'Welcome to the Matrix Neo!',
      loading: true,
      usage: 0,
      quota: 0,
      percentage: 0
    }
  },
  created: function () {
      this.get_storage().then((estimate) => {
        this.loading = false
        this.usage = this.$UTILS.formatBytes(estimate.usage)
        this.quota = this.$UTILS.formatBytes(estimate.quota)
        this.percentage =  (estimate.usage / estimate.quota).toFixed(2);
      })
  },
  methods: {
    get_storage: function () {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        // We've got the real thing! Return its response.
        return navigator.storage.estimate();
      }

      if ('webkitTemporaryStorage' in navigator &&
          'queryUsageAndQuota' in navigator.webkitTemporaryStorage) {
        // Return a promise-based wrapper that will follow the expected interface.
        return new Promise(function(resolve, reject) {
          navigator.webkitTemporaryStorage.queryUsageAndQuota(
            function(usage, quota) {resolve({usage: usage, quota: quota})},
            reject
          );
        });
      }

      // If we can't estimate the values, return a Promise that resolves with NaN.
      return Promise.resolve({usage: NaN, quota: NaN});
    },
    logout: function () {
      fb.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    clear: function () {
      caches.keys().then(function(names) {
        console.log(names)
          for (let name of names)
              caches.delete(name)
        console.log('cleared')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hello{
  width: 100%
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>