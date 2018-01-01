<template>
  <v-btn :color="colour" :disabled="dis" @click.stop="download" icon>
    <v-icon>file_download</v-icon>
  </v-btn>
</template>
<script>
/* eslint-disable */
export default {
  name: 'download-button',
  props: ['links', 'dis', 'colour'],
  methods: {
    download () {
      for (const link in this.links) {
        if (this.links[link].mp32, this.links[link].mp32.indexOf('soundcloud') > -1) {
          this.$UTILS.downloadLink('//dream.tribe.nu/r3/off/scd.php?q=' + this.links[link].mp3 + '&t=' + this.links[link].title + ' - ' + this.links[link].artist)
        } else {
          this.$DCPlayer.getAudio(this.links[link].mp32, (data) => {
            this.$UTILS.downloadLink(data)
          })
        }
      }
    }
  },
}
</script>