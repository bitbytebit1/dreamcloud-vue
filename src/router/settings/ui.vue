<template>
  <div class="ma-0 pa-0">
    <h3 class="text-xs-left pa-3">UI</h3>
    <v-divider class="primary"/>
    <v-list subheader>
      <v-list-tile
        ripple
        @click="listViewSmall = !listViewSmall"
      >
        <v-list-tile-content>
          List view small pictures
        </v-list-tile-content>
        <v-list-tile-action>
          <v-switch 
            ref="listViewSmall" 
            v-model="listViewSmall" 
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
        @click="showVideoOnClick = !showVideoOnClick"
      >
        <v-list-tile-content>
          Show current song on click
        </v-list-tile-content>

        <v-list-tile-action>
          <v-switch 
            v-model="showVideoOnClick" 
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
/* eslint-disable */
import deleteButton from '@/components/buttons/delete-button'
import { mapGetters } from 'vuex'

export default {
  watch: {
    'listViewSmall': {
      immediate: false,
      handler: 'hlistViewSmall'
    },
    'showVideoOnClick': {
      immediate: false,
      handler: 'hshowVideoOnClick'
    }
  },
  name: 'theme',
  components: {
    'delete-button': deleteButton
  },
  data () {
    return {
      listViewSmall: this.$store.getters.listViewSmall,
      showVideoOnClick: this.$store.getters.showVideo
    }
  },
  methods: {
    hshowVideoOnClick () {
      // console.log('Show Video On Click', this.showVideoOnClick)
      this.settingChanged('Show Video', this.showVideoOnClick)
    },
    hlistViewSmall () {
      // console.log('List Small', this.listViewSmall)
      this.settingChanged('List Small', this.listViewSmall)
    },
    settingChanged (name, value) {
      this.$DCFB.settingChange(name, value)
      this.$store.commit('changeSetting', { 'setting': name, 'value': value })
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
    // ...mapGetters({
    //   auth_state: 'auth_state'
    // })
  }
}
</script>

<style>
</style>
