<template>
  <v-menu
    v-model="b"
    :position-x="x"
    :position-y="y"
    absolute
    offset-y
    lazy
  >
    <v-list >
      <add-to-queue 
        :in-list="true" 
        :song="a"
        @clicked="b = false"
      />
      <share-button 
        :in-list="true" 
        :song="a[0]"
        @clicked="b = false"
      />
      <download-button 
        :in-list="true" 
        :links="a"
        @clicked="b = false"
      />
      <offlineButton 
        :in-list="true" 
        :link1="a.mp32" 
        :link2="a.mp3" 
        :track-id="a.trackID"
        @clicked="b = false"
      />

      <v-divider/>
      <add-to-playlist 
        :in-list="true" 
        :song="a"
        @clicked="b = false"
      />
      <delete-button 
        v-if="a.length && a[0].key" 
        :in-list="true" 
        :id="a[0].key" 
        @delete="$emit('delete', $event)"
      />
      <v-divider/>
      <go-to-artist :song="a"/>
    </v-list>
  </v-menu>
</template>
<script>
import offlineButton from '@/components/buttons/offline-button'
import addToPlaylist from '@/components/buttons/add-to-playlist'
import addToQueue from '@/components/buttons/add-to-queue'
import deleteButton from '@/components/buttons/delete-button'
import shareButton from '@/components/buttons/share-button'
import downloadButton from '@/components/buttons/download-button'
import goToArtist from '@/components/buttons/go-to-artist'
export default {
  components: {
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
      // this.b = false
      this.x = e.clientX
      this.y = e.clientY
      // this.$nextTick(() => {
      this.b = true
      // })
    }
  }
}
</script>
