<template>
  <v-data-table
      v-bind:headers="headers"
      :items="songs"
      hide-actions
      class="elevation-1"
      :v-model="test"
    >
    <template slot="items" slot-scope="props" class="active">
      <td @click="play(props.index)" :class="tdClass(props.item.mp32)"><img v-lazy="props.item.poster" height="35px" /></td>
      <td @click="play(props.index)" :class="tdClass(props.item.mp32)">{{ props.item.title }}</td>
      <td @click="play(props.index)" :class="tdClass(props.item.mp32)">{{ props.item.artist }}</td>
      <td @click="play(props.index)" :class="tdClass(props.item.mp32)">{{ date(props.item.created) }}</td>
      <td>
      <v-menu
        transition="slide-y-transition"
        bottom
        lazy
      >
      <v-btn icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="action in actions" :key="action.title" @click="action.func">
          <v-list-tile-title>{{ action.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu></td>
    </template>
  </v-data-table>
</template>

<script>

export default {
  name: 'playlistItemList',
  props: ['songs'],
  data () {
    return {
      actions: [{'title': 'Share', func: this.Share}],
      test: [],
      today: new Date(),
      headers: [
        {
          text: 'Pic',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Title', value: 'title', align: 'left' },
        { text: 'Artist', value: 'mp3', align: 'left' },
        { text: 'Uploaded', value: 'created', align: 'left' },
        { text: '', value: '', align: 'left', sortable: false }
      ]
    }
  },
  computed: {
    aSongsFilter: function () {
      return this.$children[0].filteredItems
    },
    artistID: function () {
      return '#/a/' + this.song.source + '/' + this.song.artist + '/' + this.song.artistID
    },
    img: function () {
      return this.song.posterLarge
    }
  },
  methods: {
    tdClass: function (link) {
      return {
        'active': this.isPlaying(link),
        'text-xs-left': true
      }
    },
    isPlaying: function (link) {
      if (this.$store.getters.index === -1) {
        return
      }
      return this.$route.path === this.$store.getters.hash && link === this.$store.getters.current_Playlist[this.$store.getters.index].mp32
    },
    date: function (date) {
      return this.$DCAPI.calcDate(this.today, date)
    },
    play: function (index) {
      this.$store.commit('setNPlay', {songs: this.aSongsFilter, current: index, path: this.$route.path})
      this.$DCPlayer.setNPlay(this.aSongsFilter, index)
    },
    Share: function () {
      if (this.$UTILS.isMobile) {
        this.$parent.setIframeSrc('')
        this.$parent.setIframeSrc('whatsapp://send?text=' + encodeURI('http://dc42.netlify.com/#/t/' + this.song.source + '/' + this.song.title + '/' + this.song.title + '/' + this.song.trackID))
      } else {
        this.$UTILS.copyToClipboard('dc42.netlify.com/#/t/' + this.song.source + '/' + encodeURIComponent(this.song.artist) + '/' + encodeURIComponent(this.song.title) + '/' + this.song.trackID)
      }
    }
  }
}
</script>

<style>
.active{
  color: Tomato;
}
</style>
