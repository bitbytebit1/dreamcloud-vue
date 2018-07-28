<template>
  <v-btn icon :loading="loading"  @click.stop="toggleOffline">
    <v-icon :color="btnColor">{{btnIcon}}</v-icon>
  </v-btn>
</template>
<script>
/* eslint-disable */
export default {
  name: 'offline-button',
  props: ['link1', 'link2', 'trackID'],
  watch: {
    link1: {
      immediate: true,
      handler: 'checkOfflineStatus'
    }
  },
  data: function () {
    return {
      status: false,
      audioMP3: '',
      loading: false
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
    loadingDone: function () {
      alert('done!')
    },
    toggleOffline: function () {
      if (!this.loading) {
        this.loading = true
        this.status ? this.offlineOff() : this.offlineOn()
      }
    },
    offlineOn: function () {
      this.link1.indexOf('soundcloud') === -1 ? this.$DCPlayer.getAudio(this.link1, (e) => {
        this.downloadAudio(e).then(() => {
          this.checkOfflineStatus()
        })
      }) : this.downloadAudio(this.link2).then(function () {
        this.checkOfflineStatus()
      })
    },
    offlineOff: function () {
      window.caches.open('song-cache').then((cache) => {
        this.$DCPlayer.getAudio(this.link1, (s) => {
          cache.delete(s)
          cache.delete(this.c_link).then(() => {
            this.checkOfflineStatus()
          })
        })
      })
    },
    checkOfflineStatus: function () {
      window.caches.open('song-cache').then((cache) => {
        cache.match(this.c_link).then((e) => {
          this.audioMP3 = ''
          this.status = 0 !== e
          this.loading = false
        })
      })
    }
  },
  computed: {
    btnColor: function () {
      return this.status ? 'green' : ''
    },
    btnIcon: function () {
      return this.status ? 'offline_pin' : 'offline_bolt'
    },
    c_link: function () {
      return 'https://www.saveitoffline.com/process/?type=audio&url=' + this.link1
    }
  }
}
</script>

<style>
</style>
