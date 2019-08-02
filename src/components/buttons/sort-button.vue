<template>
  <v-menu 
    v-model="showMenu"
    open-on-hover
  >
    <template v-slot:activator="{ on }">
      <v-btn
        dark
        icon
        v-on="on"
      >
        <v-icon>sort_by_alpha</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-tile
        v-for="(item, i) in citems"
        :key="i"
        :class="item.active? 'primary white--text' : ''"
        class="pointer"
        hover
        @click="item.cb"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ item.n }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>{{ item.active ? item.on ? 'keyboard_arrow_up' : 'keyboard_arrow_down' : '' }}</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile 
        v-if="$vuetify.breakpoint.smAndDown" 
        @click="showMenu = false"
      >
        <v-btn 
          flat 
          block 
          color="primary"
          @click="showMenu = false"
        >Close</v-btn>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>
<script>
function sort_by(field, reverse, primer){
  // https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects-by-property
  var key = primer ? 
    function(x) {return primer(x[field])} : 
    function(x) {return x[field]};

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  } 
}
export default {
  props: {
    songs: {
      type: [Array],
      default() {
        return []
      }
    }
  },
  data () {
    return {
      showMenu: false,
      items: [
        { active: false, on: true, n: 'Artist', cb: ()=>{
          this.toggleItems(0)
          this.sortByKey('artist', this.items[0].on);
        }},
        { active: false, on: true, n: 'Date', cb: ()=>{
          this.toggleItems(1)
          this.sortByDate(this.items[1].on);
        }},
        { active: false, on: true, n: 'Description', cb: ()=>{
          this.toggleItems(2)
          this.sortByKey('description', this.items[2].on);
        }},
        { active: false, on: true, n: 'Duration', cb: ()=>{
          this.toggleItems(3)
          this.sortByDuration(this.items[3].on);
        }},
        { active: false, on: true, n: 'Source', cb: ()=>{
          this.toggleItems(4)
          this.sortByKey('source', this.items[4].on);
        }},
        { active: false, on: true, n: 'Title', cb: ()=>{
          this.toggleItems(5)
          this.sortByKey('title', this.items[5].on);
        }},
        // { active: false, on: true, n: 'Default', cb: ()=>{
        //   this.toggleItems(6)
        //   // this.sortByKey('title', this.items[5].on);
        // }},
      ]
    }
  },
  computed : {
    showArtist () {
      return this.b
    },
    citems () {
      if (this.$route.name == 'artist') {
        return this.items.filter(row => row['n'] == 'Title' || row['n'] == 'Duration' || row['n'] == 'Date' || row['n'] == 'Description')
      } else {
        return this.items
      }
    }
  },
  methods: {
    hms2s(str) {
      var p = String(str).split(':'),
          s = 0, m = 1;

      while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
      }
      return s;
    },
    toggleItems (index) {
      this.items[index].on = !this.items[index].on
      this.items[index].active = true
      for (let i = 0; i < this.items.length; i++) {
        if (i != index) {
          this.items[i].on = false;
          this.items[i].active = false;
        }
      }
    },
    sortByKey (key, reverse) {
      this.$emit('sorted', this.songs.sort(sort_by(key, reverse, (a) => a.toUpperCase())))
    },
    sortByDate(reverse) {
      return this.$emit('sorted', reverse ? this.songs.sort(this.$DCAPI.sortDate).reverse() : this.songs.sort(this.$DCAPI.sortDate))
    },
    sortSongsByDuration() {
      return this.songs.sort((a,b) => {
        a = this.hms2s(a.duration || 0), b = this.hms2s(b.duration || 0);
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      })
    },
    sortByDuration(reverse) {
      return this.$emit('sorted', reverse 
        ? this.sortSongsByDuration().reverse() 
        : this.sortSongsByDuration()
      )
    }
  }
}
</script>
