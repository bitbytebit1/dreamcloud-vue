<template>
  <v-menu
    v-model="b"
    :position-x="x"
    :position-y="y"
    absolute
    offset-y
  >
    <v-list >

      <add-to-playlist 
        :in-list="true" 
        :song="a"
        @clicked="b = false"
      />
      <add-to-queue 
        :song="a"
        in-list
        @clicked="b = false"
      />
      <go-to-artist 
        v-if="a.length && ($route.name != 'artist' && $route.params.artistID != a[0].artistID)" 
        :song="a"
      />
      <v-divider/>
      <new-tab
        :song="a[0]"
        @clicked="b = false"
      />
      <share-button 
        :song="a[0]"
        in-list
        @clicked="b = false"
      />
      <download-button 
        :links="a"
        in-list
        @clicked="b = false"
      />
      <offlineButton 
        :link1="a.mp32"
        :link2="a.mp3" 
        :track-id="a.trackID" 
        in-list
        @clicked="b = false"
      />

      <v-divider 
        v-if="a.length && a[0].key"
      />

      <delete-button 
        v-if="a.length && a[0].key" 
        :in-list="true" 
        :id="a[0].key" 
        @delete="$emit('delete', $event)"
      />
    </v-list>
  </v-menu>
</template>
<script>
import newTab from '@/components/buttons/open-new-tab'
import offlineButton from '@/components/buttons/offline-button'
import addToPlaylist from '@/components/buttons/add-to-playlist'
import addToQueue from '@/components/buttons/add-to-queue'
import deleteButton from '@/components/buttons/delete-button'
import shareButton from '@/components/buttons/share-button'
import downloadButton from '@/components/buttons/download-button'
import goToArtist from '@/components/buttons/go-to-artist'
export default {
  components: {
    'newTab': newTab,
    'add-to-queue': addToQueue,
    'offlineButton': offlineButton,
    'add-to-playlist': addToPlaylist,
    'delete-button': deleteButton,
    'download-button': downloadButton,
    'share-button': shareButton,
    'go-to-artist': goToArtist
  },
  data () {
    return {
      b: false, // showMenu
      a: [], // song
      x: 0, 
      y: 0,
    }
  },
  methods: {
    show (e, a) {
      this.a = a
      e.preventDefault()
      this.b = false
      this.x = e.clientX
      this.y = e.clientY
      // this.$nextTick(() => {
      this.b = true
      // })
    }
  }
}
</script>
