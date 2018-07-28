<template>
  <!-- 
  <v-layout  row> -->
  <v-flex v-if="$store.getters.auth_state" xs10 offset-xs1 lg10 offset-lg1 class="ma-0">
    <div class="headline fwl text-xs-left pl-2 pt-2 pb-2">Settings</div>

    <account></account>
    <br>

    <ui></ui>
    <br>

    <localStorage></localStorage>
    <br>

    <hotkeys></hotkeys>
    <br>

    <theme></theme>
    <br>

  </v-flex>
  <!-- </v-layout> -->
</template>
<script>
import ui from '@/router/settings/ui'
import theme from '@/router/settings/theme'
import localStorage from '@/router/settings/localStorage'
import hotkeys from '@/router/settings/hotkeys'
import account from '@/router/settings/account'

export default {
  name: 'settings',
  components: {
    'account': account,
    'hotkeys': hotkeys,
    'theme': theme,
    'localStorage': localStorage,
    'ui': ui
  },
  data () {
    return {
      nightState: this.$store.getters.nightMode
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.layout-theme div.flex{
  cursor: pointer;
}
</style>
