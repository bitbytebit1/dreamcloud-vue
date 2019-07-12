<template>
  <div class="ma-0 pa-0">
    <h3 class="text-xs-left pa-3">UI</h3>
    <v-divider class="primary"/>
    <v-list subheader>
      <v-list-tile
        ripple
        @click="showVideo = hSettingClick('Show Video', showVideo)"
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
            @click.stop="showVideo = hSettingClick('Show Video', showVideo)"
          />
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>

      <v-list-tile
        ripple
        @click.stop="closeMenu = hSettingClick('Close Menu', closeMenu)"
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
            @click.stop="closeMenu = hSettingClick('Close Menu', closeMenu)"
          />
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>

      <v-list-tile
        ripple
        @click.stop="showPop = hSettingClick('Show Popup', showPop)"
      >
        <v-list-tile-content>
          Show pop up player automatically
        </v-list-tile-content>

        <v-list-tile-action>
          <v-switch 
            v-model="showPop" 
            hide-details 
            height="20" 
            color="primary" 
            class="fl-r pa-0 ma-0"
            @click.stop="showPop = hSettingClick('showPopupSetting', showPop)"
          />
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>

    </v-list>
  </div>
</template>
<script>

import deleteButton from '@/components/buttons/delete-button'
import { mapState } from 'vuex'

export default {
  name: 'Theme',
  components: {
    'delete-button': deleteButton
  },
  methods: {
    hSettingClick (name, value) {
      value = !value
      this.$DCFB.settingChange(name, value)
      return value
    }
  },
  computed: {
    ...mapState({
      auth_state: state => state.user.auth_state,
    }),
    showVideo: {
      get () {
        return this.$store.getters.showVideo
      },
      set (value) {
        this.$store.commit('showVideo', value)
      }
    },
    closeMenu: {
      get () {
        return this.$store.getters.closeMenuOnScroll
      },
      set (value) {
        this.$store.commit('closeMenuOnScroll', value)
      }
    },
    showPop: {
      get () {
        return this.$store.getters.showPopupSetting
      },
      set (value) {
        this.$store.commit('showPopupSetting', value)
      }
    },

  }
}
</script>

<style>
</style>
