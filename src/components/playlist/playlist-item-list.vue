<template>
<v-flex>
  <v-layout>
    <v-flex xs2 lg1 :class="this.$vuetify.breakpoint.name === 'xs'? '' : 'pt-2'">
      <v-btn icon @click="bSearchShow = !bSearchShow">
        <v-icon>search</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs9 lg10>
      <v-text-field
        v-if="bSearchShow"
        v-focus
        :class="bSearchShow ? '' : 'hidden'"
        label=""
        single-line
        hide-details
        v-model="search"
        
        v-on:keyup.enter="$UTILS.closeSoftMobi()"
      ></v-text-field>
    </v-flex>
  </v-layout>
  <v-card class="elevation-8">
    <!-- <v-card-title>
    </v-card-title> -->
  <v-data-table
      ref="dtable"
      :rows-per-page-items='[25, 50, 100, { text: "All", value: -1 }]'
      :headers="headers"
      :items="songs"
      :search="search"
      :pagination.sync="pagination"
    >
    <template slot="items" slot-scope="props">
      <td @click="play(props.index)" :class="tdClass(props.item.mp32)"><img v-lazy="props.item.poster" height="35px" /></td>
      <td @click="play(props.index)" :class="tdClass(props.item.mp32)">{{ props.item.title }}</td>
      <td @click="play(props.index)" :class="tdClass(props.item.mp32)">{{ props.item.artist }}</td>
      <td @click="play(props.index)" :class="tdClass(props.item.mp32)">{{ date(props.item.created) }}</td>
      <td :class="tdClass(props.item.mp32)">
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
  </v-flex>
</template>

<script>

export default {
  name: 'playlistItemList',
  props: ['songs'],
  data () {
    return {
      bSearchShow: false,
      pagination: {
        sortBy: 'created',
        rowsPerPage: 50,
        descending: true
      },
      search: '',
      actions: [{'title': 'Share', func: this.share}],
      today: new Date(),
      headers: [
        { text: '', align: 'left', sortable: false, value: 'name' },
        { text: 'Title', value: 'title', align: 'left' },
        { text: 'Artist', value: 'mp3', align: 'left' },
        { text: 'Created', value: 'created', align: 'left' },
        { text: '', value: '', align: 'left', sortable: false }
      ]
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.children[0].children[0].focus()
      }
    }
  },
  computed: {
    aSongsFilter: function () {
      var a = this.$refs.dtable.pagination.rowsPerPage
      this.$refs.dtable.pagination.rowsPerPage = -1
      var b = this.$refs.dtable.filteredItems.length ? this.$refs.dtable.filteredItems : this.songs
      this.$refs.dtable.pagination.rowsPerPage = a
      return b
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
        'teal lighten-1': this.isPlaying(link),
        'text-xs-left': true,
        'caption': true
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
.hidden{
  display: none;
}
@media only screen and (max-width: 599px){
  .menu{
    width: 45px;
  }
  /* table.table tbody td:not(:first-child),  */
  td:nth-child(2), td:nth-child(3), td:nth-child(4){
     word-break: break-all;
  }
  table td,
  table th{
    padding: 0 1px!important 
    /* normal value is 24 */
  }
  td img{
    height: 20px;
  }
}
@media only screen and (min-width: 600px){
  td img{
    height: 42px;
  }
}
</style>
