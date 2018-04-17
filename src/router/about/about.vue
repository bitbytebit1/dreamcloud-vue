<template>
  <v-flex xs12>
    <v-container fill-height fluid>
      <v-layout fill-height row wrap>
        <v-flex xs12>
          <h1 class="display-3">What is DreamCloud?</h1>
        </v-flex>
        <v-flex xs4>
          <v-flex xs12>
            <v-icon size="100px">music_note</v-icon>
          </v-flex>
          <v-flex xs12 class="heading">
            Listen to music
          </v-flex>
        </v-flex>

        <v-flex xs4>
          <v-flex xs12>
            <v-icon size="100px">file_download</v-icon>
          </v-flex>
          <v-flex xs12 class="heading">
            One click download
          </v-flex>
        </v-flex>

        <v-flex xs4>
          <v-flex xs12>
            <v-icon size="100px">ondemand_video</v-icon>
          </v-flex>
          <v-flex xs12 class="heading">
            Watch videos
          </v-flex>
        </v-flex>


        <v-flex xs4>
          <v-flex xs12>
            <v-icon size="100px">data_usage</v-icon>
          </v-flex>
          <v-flex xs12 class="heading">
            Save mobile data
          </v-flex>
        </v-flex>

        <v-flex xs4>
          <v-flex xs12>
            <v-icon size="100px">phone_android</v-icon>
          </v-flex>
          <v-flex xs12 class="heading">
            Play videos in the background
          </v-flex>
        </v-flex>

        <v-flex xs4>
          <v-flex xs12>
            <v-icon size="100px">important_devices</v-icon>
          </v-flex>
          <v-flex xs12 class="heading">
            Cross-platform
          </v-flex>
        </v-flex>

        <v-flex xs4>
          <v-flex xs12>
            <v-icon size="100px">person_pin</v-icon>
          </v-flex>
          <v-flex xs12 class="heading">
            Follow artists
          </v-flex>
        </v-flex>

        <v-flex xs4>
          <v-flex xs12>
            <v-icon size="100px">playlist_add</v-icon>
          </v-flex>
          <v-flex xs12 class="heading">
            Create playlists
          </v-flex>
        </v-flex>

        <v-flex xs4>
          <v-flex xs12>
            <v-icon size="100px">share</v-icon>
          </v-flex>
          <v-flex xs12 class="heading">
            Share with your friends
          </v-flex>
        </v-flex>

        <v-flex xs4>
          <v-flex xs12>
            <v-icon size="100px">new_releases</v-icon>
          </v-flex>
          <v-flex xs12 class="heading">
            Stay up to date
          </v-flex>
        </v-flex>

        <v-flex xs4>
          <v-flex xs12>
            <v-icon size="100px">explore</v-icon>
          </v-flex>
          <v-flex xs12 class="heading">
            Discover new music
          </v-flex>
        </v-flex>

        <v-flex xs4>
          <v-flex xs12>
            <v-icon size="100px">attach_money</v-icon>
          </v-flex>
          <v-flex xs12 class="heading">
            100% free
          </v-flex>
        </v-flex>


      </v-layout>
    </v-container>
  </v-flex>
<!-- <div class="wasd"> -->
  <!-- <v-avatar class="blue lighten--2 mr-5" size="84">
    <img src="../../../static/img/source-icons/mixcloud.png" alt="John">
  </v-avatar>
  <v-avatar class="orange mr-5" size="84">
    <img src="../../../static/img/source-icons/soundcloud.png" alt="John">
  </v-avatar>
  <v-avatar class="red mr-5" size="84">
    <img src="../../../static/img/source-icons/youtube.png" alt="John">
  </v-avatar>
  <v-avatar class="indigo mr-5" size="84">
    <img src="../../../static/img/source-icons/vimeo.png" alt="John">
  </v-avatar> -->
<!-- </div> -->
</template>
<script>
/* eslint-disable */
import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'x',
  components: {
    'delete-button': deleteButton
  },
  data () {
    return {
      x1: 'deleteme?'
    }
  },
  created () {
    this.$emit('closeLeft')
  },
  methods: {
    x2 () {

    }
  },
  computed: {
    x3 () {
      
    }
  }
}
</script>

<style>
.wasd{
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
</style>
