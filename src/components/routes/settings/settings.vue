<template>
  <v-layout row>
    <v-flex xs10 offset-xs1 lg8 offset-lg2 xs8 offset-lg2>
      <h5 class="text-xs-center">Settings</h5>
      <template v-for="setting in settings">

      <h5 :key="setting.name" class="text-xs-left">{{setting.name}}</h5>
      <v-divider :key="setting.name"></v-divider>
      <v-flex v-for="option in setting.options" xs12 class="mt-2" :key="option.name">
        <v-layout row>
          <v-flex xs3 lg2>
            {{option.name}}
          </v-flex>
          <v-flex xs1 offset-xs7 lg1 offset-lg9>
            <v-switch @change="settingChanged(option.name, option.state)" v-model="option.state"></v-switch>
          </v-flex>
        </v-layout>
      </v-flex>
      </template>
      <v-btn v-on:click="logout">Logout</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import { fb, DCFB } from '@/DCAPIs/DCFB.js'
export default {
  name: 'settings',
  data () {
    return {
      observer: false,
      settings: [
        {
          name: 'UI',
          options: [
            {
              name: 'Night Mode',
              state: true
            }
          ]
        }
      ]
    }
  },
  created: function () {
    for (var idx1 in this.settings) {
      for (var idx2 in this.settings[idx1].options) {
        DCFB.setting(this.settings[idx1].options[idx2].name).on('value', (snapshot) => {
          if (this.settings[idx1].options[idx2].state !== Boolean(snapshot.val())) {
            this.settings[idx1].options[idx2].state = Boolean(snapshot.val())
            this.$store.commit('changeSetting', { 'setting': this.settings[idx1].options[idx2].name, 'value': this.settings[idx1].options[idx2].state })
          }
        })
      }
    }
  },
  destroyed: function () {
    for (var idx1 in this.settings) {
      for (var idx2 in this.settings[idx1].options) {
        DCFB.setting(this.settings[idx1].options[idx2].name).off()
      }
    }
  },
  methods: {
    settingChanged: function (name, value) {
      DCFB.settingChange(name, value)
      this.$store.commit('changeSetting', { 'setting': name, 'value': value })
    },
    logout: function () {
      fb.auth().signOut().then(() => {
        this.$router.replace('login')
      })
      // console.log(DCFB)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
