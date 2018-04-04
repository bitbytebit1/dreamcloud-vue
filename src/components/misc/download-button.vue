<template>
  <v-btn :color="color" :disabled="dis" @click.stop="download" icon>
    <v-icon :color="color ==='green' ? 'white': ''">file_download</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: 'download-button',
  props: ['links', 'dis'],
  data () {
    return {color: ''}
  },
  methods: {
    download () {
      this.color = 'green'
      setTimeout(() => {
        this.color = ''
      }, 2000)
      for (const link in this.links) {
        if (this.links[link].mp32.indexOf('soundcloud') > -1) {
          this.$UTILS.downloadLink('//dream.tribe.nu/r3/off/scd.php?q=' + this.links[link].mp3 + '&t=' + this.links[link].title + ' - ' + this.links[link].artist)
        } else {
          this.$DCPlayer.getAudio(this.links[link].mp32, (data) => {
            this.$UTILS.downloadLink(data)
          })
        }
      }
    }
  }
}
</script>