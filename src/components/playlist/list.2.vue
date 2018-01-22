<template>
<v-flex xs12>
    
    <!-- table header buttons -->
  <v-card class="elevation-8">
    <v-card-title class="">
      <v-layout row wrap>
        <!-- header buttons -->
        <v-flex xs6 lg3 :class="this.$vuetify.breakpoint.name === 'xs' ? 'pt-2 text-xs-left header-buttons ma-0' : 'pt-2 header-buttons'">

          <v-btn v-if="$store.getters.auth_state" @click="bSelect = !bSelect" icon>
            <v-icon :color="bSelect ? 'teal' : ''">check_box</v-icon>
          </v-btn>

          <v-btn icon @click="$emit('toggleView')">
            <v-icon>view_module</v-icon>
          </v-btn>

          <v-btn icon @click="$refs.search.focus()">
            <v-icon :color="filterHasFocus ? 'teal' : ''">filter_list</v-icon>
          </v-btn>
        </v-flex>
        <!-- filter -->
        <v-flex xs5 offset-lg0 lg9 style="margin-top:-15px">
          <v-text-field
            @focus="filterHasFocus = true"
            @blur="filterHasFocus = false"
            color="teal"
            :class="$vuetify.breakpoint.smAndUp ? 'ma-0' : ''"
            label="Filter"
            single-line
            hide-details
            v-model="search"
            v-on:keyup.enter="$UTILS.closeSoftMobi()"
            ref="search"
          ></v-text-field>
        </v-flex>

        <!-- select buttons -->
        <v-flex lg4 v-if="bSelect" class="text-xs-left select-buttons">
          <add-to-playlist key="multi" :disabled="selected.length == 0" v-if="$store.getters.auth_state" :song="selected"></add-to-playlist>

          <delete-button :disabled="selected.length == 0" v-if="$route.params.playlist" @delete="removeList"></delete-button>

          <download-button :dis="selected.length == 0" :links="selected"></download-button>
          <v-flex d-inline-flex>{{selected.length}} of {{songs.length}}</v-flex>
        </v-flex>
      </v-layout>
    </v-card-title>

      <!-- v-data-iterator -->
      <v-data-iterator
        content-tag='v-layout'
        row
        wrap
        :headers="headers"
        :search="search"
        :items='items'
        :rows-per-page-items='rowsPerPageItems'
        :pagination.sync='pagination'
      >
        <!-- blank no data -->
        <v-flex slot="no-data">wasd</v-flex>
        <!-- item slot -->
        <v-flex 
          slot='item'
          slot-scope='props'
          xs12
          lg4
          @click="play(props.index)"
          class=""
        >
        <v-card class="ma-0 pa-0" color="" lg4>
          <v-container fluid grid-list-xs>
              <v-card-media
                :src="props.item.poster"
                :height="props.item.source === 'YouTube' ?  '86px' : '125px' "
                contain
              ></v-card-media>
              <v-card-title primary-title>
                <div>
                  <div class="subheading text-xs-left">{{ props.item.title }}</div>
                  <div class="artist text-xs-left">{{ props.item.artist }}</div>
                </div>
              </v-card-title>
          </v-container>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-card>
</v-flex>
    <!-- </v-container> -->
</template>
<script>

/* eslint-disable */
export default {
  name: 'list-2',
  props: {
    songs: {
      type: [Array]
    },
    sortBy: {
      type: [String],
      default: ''
    },
    rowsPerPage: {
      type: [Number, String],
      default: 10
    }
  },
  data(){
    return {
      filterHasFocus: false,
      bSelect: false,
      selected: [],
      search: '',
      today: new Date(),
      loading: false,
      rowsPerPageItems: [25, 50, 100],
      pagination: {
        rowsPerPage: this.rowsPerPage
      },
      items: this.songs,
      headers: [
        { text: '', align: 'left', sortable: false, value: 'name' },
        { text: 'Title', value: 'title', align: 'left' },
        { text: 'Artist', value: 'artist', align: 'left' },
        { text: 'Date', value: 'uploaded', align: 'left' },
        { text: '', value: '', align: 'left', sortable: false }
      ]
    }
  },
  created () {
    // this.items = this.songs
    // console.log(this.songs)
    // this.getRelated()
  },
  mounted () {
    // console.log(this.items, this.songs)
    // this.items = this.songs
  },
  updated (){
    // console.log(this.items, this.songs)
    // this.items = this.songs
    // this.getRelated()
    // this.items = this.current
  }
}
</script>

<style>
.artist{
  color: grey;
}
.orbit-spinner, .orbit-spinner * {
  box-sizing: border-box;
}

.orbit-spinner {
  height: 55px;
  width: 55px;
  border-radius: 50%;
  perspective: 800px;
}

.orbit-spinner .orbit {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.orbit-spinner .orbit:nth-child(1) {
  left: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
  border-bottom: 3px solid teal;
}

.orbit-spinner .orbit:nth-child(2) {
  right: 0%;
  top: 0%;
  animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
  border-right: 3px solid teal;
}

.orbit-spinner .orbit:nth-child(3) {
  right: 0%;
  bottom: 0%;
  animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
  border-top: 3px solid teal;
}

@keyframes orbit-spinner-orbit-one-animation {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-two-animation {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes orbit-spinner-orbit-three-animation {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}
</style>
