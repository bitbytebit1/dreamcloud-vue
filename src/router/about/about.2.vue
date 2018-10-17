<template>
  <v-flex 
    :style="{ 'background-image': background }" 
    xs12 
    class="ma-0 pa-0 pb-3 bg-rp">
    <v-container grid-list-lg>
      <v-layout 
        row 
        wrap 
        justify-center>
        <!-- LOGO -->
        <v-flex 
          xs12 
          style="height:250px">
          <img 
            height="250" 
            src="@/assets/logo-blue.png" >
        </v-flex>
        <!-- GET STARTED BUTTON -->
        <v-flex 
          xs12 
          lg9 
          xl7>
          <v-btn 
            :to="{name: 'explore'}" 
            block 
            large 
            color="primary white--text">get started </v-btn>
        </v-flex>
        <!-- ABOUT FEATURE DIALOG -->
        <v-dialog 
          v-model="dialog" 
          scrollable 
          width="500">
          <v-card>
            <!-- HEADER -->
            <v-card-title primary-title>
              <div class="headline">{{ items[cardIndex].headline }}</div>
            </v-card-title>
            <v-divider/>
            <!-- DESCRIPTION -->
            <v-card-text 
              style="height: 300px;" 
              class="preline wordbreak">
              {{ items[cardIndex].moreText }}
            </v-card-text>
            <v-divider/>
            <v-card-actions>
              <v-btn 
                color="blue darken-1"  
                @click.native="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- ABOUT CARDS -->
        <v-flex 
          v-for="(item, index) in items" 
          :key="index" 
          xs12 
          lg9 
          xl7>
          <v-card class="ma-0">
            <v-container 
              fluid 
              grid-list-lg>
              <v-layout row>
                <v-flex xs5>
                  <!-- IMAGE -->
                  <v-img
                    :src="item.img"
                    height="180"
                    contain
                  />
                </v-flex>
                <v-flex 
                  xs7 
                  class="text-xs-left">
                  <div>
                    <!-- TEXT -->
                    <div class="headline">{{ item.headline }}</div>
                    <div>{{ item.description }}</div>
                  </div>
                  <br>
                  <!-- READ MORE BUTTON -->
                  <v-btn 
                    class="ma-0" 
                    color="primary" 
                    dark 
                    @click="(cardIndex = index, dialog = true)">Read more</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
          <v-divider/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>
<script>
export default {
  name: 'About',
  data () {
    return {
      cardIndex: 0,
      dialog: false,
      items: [
        {
          headline: 'Search',
          description: 'Bandcamp, Mixcloud, Soundcloud, YouTube and Vimeo',
          moreText: 'We directly access the use the offical API provided by Mixcloud, Soundcloud, YouTube and Vimeo to get your search results',
          img: './img/about/analytics.png'
        },
        {
          headline: 'Always available offline',
          description: 'No internet? No problem! Using the power of PWAs you\'ll always have access to your music.',
          moreText: `We believe in progress web apps, this website will locally cache itself. We are limited to a small portion of your local disk via the web browser, this space is only borrowed and will be used by your os if necessary.

          Songs are cached for 2 weeks
          Searches are cached for 1 hour
          Playlists and subscriptions will be cached forever (not implemented yet)
          `,
          img: './img/about/dart.png'
        },
        {
          headline: 'One click download',
          description: 'Batch download mp4 or mp3 with one smooth click',
          moreText: ';]',
          img: './img/about/cloud.png'
        },
        {
          headline: 'Stay up to date',
          description: 'Customizable home feeds from your favourite artists',
          moreText: '',
          img: './img/about/satellite.png'
        },
        {
          headline: 'Unlimited use',
          description: '100% free with no limitations',
          moreText: '',
          img: './img/about/pacman.png'
        },
        {
          headline: 'Save energy',
          description: 'Save data and battery life while on the move in audio only mode',
          moreText: '',
          img: './img/about/energy.png'
        },
        {
          headline: 'Access your library on any platform',
          description: 'Android, iOS, MacOSX, Windows and Linux',
          moreText: `It's very easy install Dreamcloud to your home screen on mobiles.
          We are working on a stand alone desktop app for Windows and Linux using Electron.`,
          img: './img/about/mobile.png'
        },
        {
          headline: 'Share with your friends',
          description: 'One click sharing on desktop and mobile',
          moreText: `On desktop a link is copied to your keyboard.
          On mobile the share menu is opened.`,
          img: './img/about/share.png'
        },
        {
          headline: 'Listen to music',
          description: 'Organise all your music in one place',
          moreText: `No limits to number of playlists or subscriptions.
          Make playlists`,
          img: './img/about/turntable.png'
        },
        {
          headline: 'Vibrant Community',
          description: `Join our discord server and contribute to the development`,
          moreText: '',
          img: './img/about/discord.png'
        }
      ]
    }
    
  },
  computed: {
    background () {
      return this.$store.getters.nightMode 
      ? 'url("https://www.toptal.com/designers/subtlepatterns/patterns/random_grey_variations.png")' 
      : 'url("https://www.toptal.com/designers/subtlepatterns/patterns/escheresque.png")'
    }
  }
}
</script>
<style>
.bg-rp{
  background-repeat: repeat;
}
</style>
