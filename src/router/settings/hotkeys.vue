<template>
  <div class="ma-0 pa-0">
    <h3 class="text-xs-left pa-3">Hotkeys</h3>
    <v-divider class="primary"/>
    <v-list subheader>
      <template v-for="(item, index) in items">
        <v-list-tile
          :key="item.key"
          ripple
          @click="() => {}"
        >
          <v-list-tile-content>
            {{ item.title }}
          </v-list-tile-content>
          <v-list-tile-action>
            {{ item.key }}
          </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="index"/>
      </template>
    </v-list>
  </div>
</template>
<script>
/* eslint-disable */
import deleteButton from '@/components/buttons/delete-button'
import { mapGetters } from 'vuex'

export default {
  name: 'hotkeys',
  data () {
    return {
      items: [
        {key: 'Alt + Left', title: 'Next song'},
        {key: 'Alt + Right', title: 'Previous song  '},
        {key: 'Left', title: 'Shuttle back 10 seconds'},
        {key: 'Right', title: 'Shuttle forward 10 seconds'},
        {key: 'C', title: 'Toggle current tab'},
        {key: 'F', title: 'Toggle fullscreen'},
        {key: 'M', title: 'Toggle mute'},
        {key: 'Space', title: 'Toggle play'},
        {key: 'W', title: 'Toggle widescreen'},
        {key: 'Alt + Down', title: 'Volume down'},
        {key: 'Alt + Up', title: 'Volume up'}
      ]
    }
  }
}
</script>

<style>
</style>
