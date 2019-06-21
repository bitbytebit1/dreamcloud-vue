<template>
  <div class="ma-0 pa-0">
    <h3 class="text-xs-left pa-3">UI</h3>
    <v-divider class="primary"/>
    <v-list subheader>
      <v-list-tile
        ripple
        @click="showVideo = !showVideo"
      >
        <v-list-tile-content>
          Go to current tab on song click
        </v-list-tile-content>

        <v-list-tile-action>
          <v-switch 
            v-model="showVideo" 
            hide-details 
            height="20" 
            color="primary" 
            class="fl-r pa-0 ma-0"
          />
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>

      <v-list-tile
        ripple
        @click="closeMenu = !closeMenu"
      >
        <v-list-tile-content>
          Close right click menu on scroll
        </v-list-tile-content>

        <v-list-tile-action>
          <v-switch 
            v-model="closeMenu" 
            hide-details 
            height="20" 
            color="primary" 
            class="fl-r pa-0 ma-0"
          />
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>

    </v-list>
  </div>
</template>
<script>

import deleteButton from '@/components/buttons/delete-button'
import { mapGetters } from 'vuex'

export default {
  watch: {
    'showVideo': {
      immediate: false,
      handler: 'hShowVideo'
    },
    'showWatchB': {
      immediate: false,
      handler: 'hShowWatchB'
    },
    'closeMenu': {
      immediate: false,
      handler: 'hCloseMenu'
    }
  },
  name: 'Theme',
  components: {
    'delete-button': deleteButton
  },
  data () {
    return {
      showVideo: this.$store.getters.showVideo,
      closeMenu: this.$store.getters.closeMenuOnScroll,
    }
  },
  methods: {
    hCloseMenu (n) {
      this.settingChanged('Close Menu', n)
    },
    hShowVideo (n) {
      this.showVideo = n
      // console.log('Show Video On Click', this.showVideoOnClick)
      this.settingChanged('Show Video', this.showVideo)
    },
    settingChanged (name, value) {
      this.$DCFB.settingChange(name, value)
      this.$store.commit('changeSetting', { 'setting': name, 'value': value })
      // this.$UTILS.setLoc('settings', JSON.stringify(value))
    }
  },
  created () {
    // Get settings
    // this.$DCFB.settings.once('value', (snapshot) => {
    //   console.log(snapshot.val())
    //   if (snapshot.val() !== null) {
    //     this.$store.commit('settings', snapshot.val())
    //   }
    //   // this.listViewSmall = !!snapshot
    // })
  },
  computed: {
    ...mapGetters({
      auth_state: 'auth_state'
    })
  }
}
</script>

<style>
</style>
