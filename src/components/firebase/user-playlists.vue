<template>
<div>
  <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
    <v-list-tile slot="item" @click="item.active = !item.active">
      <v-list-tile-action>
        <v-icon>{{ item.action }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon>keyboard_arrow_down</v-icon>
      </v-list-tile-action>
    </v-list-tile>
    <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" @click="">
      <v-list-tile-content>
        <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon>{{ subItem.action }}</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list-group>
</div>  
</template>
<script>
/* eslint-disable */
export default {
  name: 'user-playlists',
  data () {
    return {
     items: [
        {
          active: true,
          action: 'library_music',
          title: 'Attractions',
          items: [
            { title: 'List Item' }
          ]
        }
      ],
      msg: 'Welcome to the real Trinity'
    }
  },
  methods: {
  },
  computed: {
    x: function () {

    }
  }
}
</script>

<style>

</style>
