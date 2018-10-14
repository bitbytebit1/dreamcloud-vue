<template>
  <v-list-tile 
    v-if="inList" 
    ripple 
    @click.stop="download">
    <v-list-tile-title>Download</v-list-tile-title>
    <v-list-tile-action>
      <v-btn 
        :color="color" 
        icon>
        <v-icon :color="color ==='primary' ? 'white': ''">file_download</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
  <v-tooltip 
    v-else 
    top >
    <v-btn 
      slot="activator" 
      :color="color" 
      icon 
      @click.stop="download">
      <v-icon :color="color ==='primary' ? 'white': ''">file_download</v-icon>
    </v-btn>
    <span>Download</span>
  </v-tooltip>
</template>
<script>
export default {
  name: 'DownloadButton',
  props: {
    links: {
      type: Array,
      default() {
        return []
      }
    },
    inList: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {color: ''}
  },
  methods: {
    download () {
      this.color = 'primary'
      setTimeout(() => {
        this.color = ''
      }, 2000)
      for (const link in this.links) {
        // if (this.links[link].mp32.indexOf('soundcloud') > -1) {
          // this.$UTILS.downloadLink('//dream.tribe.nu/r3/off/scd.php?q=' + this.links[link].mp3 + '&t=' + this.links[link].title + ' - ' + this.links[link].artist)
        // } else {
        this.$DCPlayer.getAudio(this.links[link].mp32, (data) => {
          this.$UTILS.downloadLink(data)
        })
        // }
      }
    }
  }
}
</script>