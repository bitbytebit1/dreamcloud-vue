<template>
  <v-list-tile 
    v-if="inList" 
    ripple 
    @click.stop="download"
  >
    <v-list-tile-title>Download</v-list-tile-title>
  </v-list-tile>
  <v-tooltip 
    v-else 
    top
  >
    <v-btn 
      slot="activator" 
      :color="color" 
      icon 
      @click.stop="download"
    >
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
      type: [Array, Object],
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
      this.$emit('clicked')
      this.$store.dispatch('snack', { b: true, c:'primary', s:'Downloading' })
      this.color = 'primary'
      setTimeout(() => {
        this.color = ''
      }, 2000)
      for (const link in this.links) {
        this.$emit('clicked')
        window.open(this.$DCPlayer.sBase + 'v3/stream?t=' + encodeURIComponent(this.links[link].title) + '&i=' + encodeURIComponent(this.links[link].mp32), '_blank')
        // if (this.links[link].mp32.indexOf('soundcloud') > -1) {
        // this.$UTILS.downloadLink('//dream.tribe.nu/r3/off/scd.php?q=' + this.links[link].mp3 + '&t=' + this.links[link].title + ' - ' + this.links[link].artist)
        // } else {
        // this.$DCPlayer.getAudio(this.links[link], (data) => {
        // this.$UTILS.downloadLink(data)
        // window.open(data, '_blank')
        // })
        // this.$DCPlayer.getAudio(this.links[link].mp32, (data) => {
        // var anchor = document.createElement('a');
        // anchor.setAttribute("download", true);
        // anchor.setAttribute("target", '_blank');

        // anchor.setAttribute("href", data + (this.links[link].source == 'YouTube' ? '/' + this.links[link].title : ''));
        // anchor.click();
        // this.$UTILS.downloadLink(data + (this.links[link].source == 'YouTube' ? '/' + this.links[link].title : ''))

        // })
        // }
      }
    // download () {
    //   this.$emit('clicked')
    //   this.$store.dispatch('snack', { b: true, c:'primary', s:'Downloading' })
    //   this.color = 'primary'
    //   setTimeout(() => {
    //     this.color = ''
    //   }, 2000)
    //   for (const link in this.links) {
    //     // if (this.links[link].mp32.indexOf('soundcloud') > -1) {
    //     // this.$UTILS.downloadLink('//dream.tribe.nu/r3/off/scd.php?q=' + this.links[link].mp3 + '&t=' + this.links[link].title + ' - ' + this.links[link].artist)
    //     // } else {
    //     this.$DCPlayer.getAudio(this.links[link].mp32, (data) => {
    //       this.$UTILS.downloadLink(data + (this.links[link].source == 'YouTube' ? '/' + this.links[link].title : ''))
    //     })
    //     // }
    //   }
    }
  }
}
</script>