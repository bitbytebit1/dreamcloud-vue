<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
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
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <v-btn icon @click="addPlaylist('yodo!!!!')">
      <v-icon>open_in_new</v-icon>
    </v-btn>
    <button v-on:click="logout">Logout</button>
  </div>
</template>

<script>
  /* eslint-disable */
import {fb, DCFB} from '@/plugins/Firebase.js'

export default {
  name: 'user',
  // mixins: [DCFB],
  data () {
    return {
      msg: 'Welcome to the Matrix Neo!'
    }
  },
  methods: {
    logout: function () {
      fb.auth().signOut().then(() => {
        this.$router.replace('login')
      })
      // console.log(DCFB)
    },
    addPlaylist: function (name) {
       return DCFB.addPlaylist(name)
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