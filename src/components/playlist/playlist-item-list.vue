<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
        v-on:keyup.enter="$UTILS.closeSoftMobi()"
      ></v-text-field>
    </v-card-title>
  <v-data-table
      ref="reference"
      class="elevation-24"
      :rows-per-page-items='[25, 50, 75, { text: "All", value: -1 }]'
      :headers="headers"
      :items="songs"
      :search="search"
      :pagination.sync="pagination"
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
        <v-list-tile v-for="(action, index) in actions" :key="action.title" @click="action.func(props.index)">
          <v-list-tile-title>{{ action.title}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu></td>
    </template>
  </v-data-table>
  </v-card>
</template>

<script>

export default {
  name: 'playlistItemList',
  props: ['songs'],
  data () {
    return {
      pagination: {
        sortBy: 'created',
        rowsPerPage: 50,
        descending: true
      },
      search: '',
      actions: [{'title': 'Share', func: this.share}],
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
      return this.$refs.reference.filteredItems.length ? this.$refs.reference.filteredItems : this.songs
    },
    artistID: function () {
      return '#/a/' + this.song.source + '/' + this.song.artist + '/' + this.song.artistID
    },
    img: function () {
      return this.song.poster
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
      // console.log(this.aSongsFilter)
      this.$store.commit('setNPlay', {songs: this.aSongsFilter, current: index, path: this.$route.path})
      this.$DCPlayer.setNPlay(this.aSongsFilter, index)
    },
    share: function (index) {
      console.log(this.songs[index])
      if (this.$UTILS.isMobile) {
        this.$parent.setIframeSrc('')
        this.$parent.setIframeSrc('whatsapp://send?text=' + 'http://offcloud.netlify.com/#/t/' + this.songs[index].source + '/' + encodeURIComponent(this.songs[index].title) + '/' + this.songs[index].trackID)
      } else {
        this.$UTILS.copyToClipboard('offcloud.netlify.com/#/t/' + this.songs[index].source + '/' + encodeURIComponent(this.songs[index].artist) + '/' + encodeURIComponent(this.songs[index].title) + '/' + this.songs[index].trackID)
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
