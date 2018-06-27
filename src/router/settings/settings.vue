<template>
	<!-- 
  <v-layout  row> -->
	<v-flex v-if="$store.getters.auth_state" xs10 offset-xs1 lg10 offset-lg1 class="mt-3">
		<h5 class="text-xs-center">Settings</h5>
		<template v-for="setting in settings">
			<h5 :key="setting.name" class="text-xs-left">{{setting.name}}</h5>
			<v-divider :key="setting.name + 1"></v-divider>
			<v-flex v-for="option in setting.options" xs12 class="mt-2" :key="option.name">
				<v-layout row>
					<v-flex xs3 lg2 class="text-xs-left pl-4">
						{{option.name}}
					</v-flex>
					<v-flex xs1 offset-xs7 lg1 offset-lg9>
						<v-switch color="primary" @change="settingChanged(option.name, option.state)" v-model="option.state"></v-switch>
					</v-flex>
				</v-layout>
			</v-flex>
		</template>

		<h5 class="text-xs-left">Local Storage</h5>
		<v-divider></v-divider>
		<v-flex xs12 class="mt-2">
			<v-layout row>
				<v-flex xs5 lg2 class="text-xs-left pl-4">
					Space
				</v-flex>
				<v-flex xs1 offset-xs7 lg3 offset-lg8>
					{{usage}} of {{quota}}
					<br/>({{percentage}} %)
					<!-- <v-switch @change="settingChanged(option.name, option.state)" v-model="option.state"></v-switch> -->
				</v-flex>
			</v-layout>
		</v-flex>


		<h5 class="text-xs-left">Theme</h5>
		<v-divider></v-divider>
		<v-flex xs12 class="mt-2">
			<v-layout row >
				<v-flex xs5 lg2 class="text-xs-left">
					Primary color
				</v-flex>
				<v-flex xs1 offset-xs7 lg1 offset-lg9 class="text-xs-left">
					<input type="color" :v-model="$vuetify.theme.primary" :value="$vuetify.theme.primary" v-on:input="setColor">
					<!-- <v-switch @change="settingChanged(option.name, option.state)" v-model="option.state"></v-switch> -->
				</v-flex>
			</v-layout>
		</v-flex>


		<h2>Dream with us on <a href="https://discord.gg/RzP7dwA" target="_blank">Discord</a></h2>

		<router-link class="noDeco" :to="{name: 'login'}">
      
			<v-btn >
        <v-icon color="primary">face</v-icon>
        &nbsp; Login
      </v-btn>
		</router-link>
		<v-btn v-on:click="logout">
      <v-icon color="primary">pool</v-icon>
      &nbsp; Logout
    </v-btn>

	</v-flex>
	<!-- </v-layout> -->
</template>
<script>
export default {
  name: 'settings',
  data () {
    return {
      percentage: 0,
      quota: 0,
      usage: 0,
      observer: false,
      sColor: '',
      settings: [
        {
          name: 'UI',
          options: [
            {
              name: 'Night Mode',
              state: this.$store.getters.nightMode
            }
          ]
        }
      ]
    }
  },
  created () {
    for (var idx1 = 0; idx1 < this.settings.length; idx1++) {
    // for (var idx2 = 0; idx2 < this.settings[idx1].options.length; idx2++) {
    // console.log(this.settings[idx1].options[0])
      this.$store.commit('changeSetting', { 'setting': this.settings[idx1].options[0].name, 'value': this.settings[idx1].options[0].state })
    // this.$DCFB.setting(this.settings[idx1].options[idx2].name).on('value', (snapshot) => {
    // if (this.settings[idx1].options[idx2].state !== Boolean(snapshot.val())) {
    // this.settings[idx1].options[idx2].state = Boolean(snapshot.val())
    // }
    // })
    // }
    }
    this.get_storage_estimate()
  },
  destroyed () {
    for (var idx1 in this.settings) {
      for (var idx2 in this.settings[idx1].options) {
        this.$DCFB.setting(this.settings[idx1].options[idx2].name).off()
      }
    }
  },
  methods: {
    setColor (sColor) {
      this.$vuetify.theme.primary = sColor.srcElement.value
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
    settingChanged (name, value) {
      this.$DCFB.settingChange(name, value)
      this.$store.commit('changeSetting', { 'setting': name, 'value': value })
    },
    logout () {
      this.$DCFB.fb.auth().signOut().then(() => {
        this.$router.replace('login')
      })
      // console.log(this.$DCFB)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
