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
        :song="a"
        in-list
        @clicked="b = false"
      />
      <add-to-queue 
        :song="a"
        in-list
        @clicked="b = false"
      />
      <v-divider/>
      <go-to-artist 
        v-if="showArtist" 
        :song="a"
      />
      <related
        :song="a[0]"
        @clicked="b = false"
      />
      <v-divider/>
      <new-tab
        :song="a[0]"
        in-list
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
        @delete="deleteList(a)"
      />
      <!-- @delete="$emit('delete', $event)" -->
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
import related from '@/components/buttons/related-button.vue'
export default {
  components: {
    'related': related,
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
  computed : {
    showArtist () {
      return this.a.length && (this.$route.name != 'artist' && this.$route.params.artistID != this.a[0].artistID)
    }
  },
  methods: {
    delete (key) {
      this.$DCFB.playlistSongDelete(this.$route.params.playlist, key)
    },
    deleteList () {
      for (const i in this.a) {
        this.delete(this.a[i].key)
      }
    },
    // magic function, gets called by ref from app. bad voodoo.
    show (e, a) {
      e.preventDefault()
      // this.b = false
      this.b = true
      this.x = e.clientX
      this.y = e.clientY
      setTimeout(() => {
        // this.$nextTick(() => {
        this.a = a
        if (this.$store.getters.closeMenuOnScroll) {
          document.addEventListener("scroll", this.scroll)
        }
        // })
      })
    },
    scroll () {
      this.b = false
      document.removeEventListener('scroll', this.scroll)
    }

  }
}
</script>
