<template>
  <v-list-tile 
    v-if="inList" 
    :disabled="disabled" 
    :id="trackID"
    ripple 
    @click.stop="toggleOffline"
  >
    <v-list-tile-title>Save offline</v-list-tile-title>
  </v-list-tile>
  <v-btn 
    v-else 
    :disabled="disabled" 
    :loading="loading" 
    icon 
    @click.stop="toggleOffline"
  >
    <v-icon :color="btnColor">{{ btnIcon }}</v-icon>
  </v-btn>
</template>
<script>
/* eslint-disable */
export default {
  name: 'offline-button',
  props: ['link1', 'link2', 'trackID'],
  props: {
    link1: {
      type: String,
      default: ''
    },
    link2: {
      type: String,
      default: ''
    },
    trackID: [String, Number],
    inList: Boolean
  },
  watch: {
    trackID: {
      immediate: true,
      handler: 'checkOfflineStatus'
    }
  },
  data: function () {
    return {
      status: false,
      loading: false,
      disabled: false
    }
  },
  methods: {
    downloadAudio (t) {
      return new Promise((resolve, reject) => {
        var audio = document.createElement('audio')
        audio.oncanplaythrough = () => {
          resolve()
        }
        audio.oncanplay = () => {
          resolve()
        }
        audio.onerror = () => {
          resolve()
        }
        audio.style.display = 'none'
        audio.id = audio.name = t
        audio.src = t
        audio.preload = 'auto'
        document.body.appendChild(audio)
      }
      )
    },
    toggleOffline () {
      this.$emit('clicked')
      if (!this.loading) {
        this.loading = true
        this.status ? this.offlineOff() : this.offlineOn()
      }
    },
    offlineOn () {
      this.link1.indexOf('soundcloud') === -1 
      ? this.$DCPlayer.getAudio(this.link1, (e) => {
        this.downloadAudio(e).then(() => {
          this.loading = false
          this.checkOfflineStatus()
        })
      }) 
      : this.downloadAudio(this.link2).then(() => {
        this.loading = false
        this.checkOfflineStatus()
      })
    },
    offlineOff () {
      if ('caches' in window) {
        window.caches.open('song-cache').then((cache) => {
          this.$DCPlayer.getAudio(this.link1, (s) => {
            cache.delete(s)
            cache.delete(this.c_link).then(() => {
              this.checkOfflineStatus()
            })
          })
        })
      } else {
        this.disabled = true
      }
    },
    checkOfflineStatus () {
      if ('caches' in window) {
        window.caches.open('song-cache').then((cache) => {
          cache.match(this.c_link).then((e) => {
            this.status = typeof e === 'object'
            this.loading = false
          })
        })
      } else {
        this.disabled = true
      }
    }
  },
  computed: {
    btnColor () {
      return this.status ? 'green' : ''
    },
    btnIcon () {
      return this.status ? 'offline_pin' : 'offline_bolt'
    },
    isSc () {
      return this.link1.indexOf('soundcloud') > -1
    },
    c_link () {
      return this.isSc ? this.link2 : 'https://www.saveoffline.com/process/?type=audio&url=' + this.link1
    }
  }
}
</script>

<style>
</style>
