<template>
  <!-- :style="{ 'background-image': background }"  -->
  <v-flex 
    xs12 
    lg10
    class="ma-0 pa-0 pb-3 bg-rp"
  >
    <v-container grid-list-xl>
      <v-layout 
        row 
        wrap 
        justify-center
      >
        <!-- LOGO -->
        <v-flex 
          xs12 
          style="height:250px"
        >
          <img 
            height="250" 
            src="@/assets/logo-blue.png"
          >
        </v-flex>
        <!-- GET STARTED BUTTON -->
        <v-flex 
          xs12 
          lg12
        >
          <!-- <v-btn 
            :to="{name: 'explore'}" 
            block 
            large 
            color="primary white--text"
          >get started </v-btn> -->

          <autocomplete
            ref="auto" 
            @search="$router.push({name: 'searchPage', params: {query: $event , 'source': 'all'}})"
          />
        </v-flex>
        <!-- ABOUT FEATURE DIALOG -->
        <v-dialog 
          v-model="dialog" 
          scrollable 
          width="500"
        >
          <v-card>
            <!-- HEADER -->
            <v-card-title primary-title>
              <div class="headline">{{ items[cardIndex].headline }}</div>
            </v-card-title>
            <v-divider/>
            <!-- DESCRIPTION -->
            <v-card-text 
              style="height: 300px;" 
              class="preline wordbreak"
            >
              {{ items[cardIndex].moreText }}
            </v-card-text>
            <v-divider/>
            <v-card-actions>
              <v-btn 
                color="primary"  
                @click.native="dialog = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- ABOUT CARDS -->
        <v-flex 
          v-for="(item, index) in items" 
          :key="index" 
          xs12 
          lg4 
          class="pointer"
        >
          <v-hover>
            <v-card 
              slot-scope="{ hover }" 
              class="ma-0 elevation-5"
              @click="item.cb" 
            >
              <v-container 
                fluid 
                grid-list-xs
                class="ma-0 pa-0"
              >
                <v-layout 
                  row 
                  wrap
                  class="ma-0 pa-0"
                >

                  <v-flex xs12>
                    <!-- IMAGE -->
                    <v-img
                      :src="item.img"
                      height="180"
                      contain
                    />
                  </v-flex>
                  <v-flex 
                    xs12 
                    class="text-xs-left"
                  >
                    <div>
                      <!-- TEXT -->
                      <div class="title font-weight-thin text-xs-center">{{ item.headline }}</div>
                    <!-- <div>{{ item.description }}</div> -->
                    </div>
                    <br>
                  <!-- READ MORE BUTTON -->
                  <!-- <v-btn 
                    class="ma-0" 
                    color="primary" 
                    dark 
                    @click="(cardIndex = index, dialog = true)"
                  >Read more</v-btn> -->
                  </v-flex>
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out grey darken-4 v-card--reveal subheading white--text"
                      style="height: 100%;"
                    >
                      {{ item.description }}
                    </div>
                  </v-expand-transition>

                </v-layout>
              </v-container>
            </v-card>
          </v-hover>
          <v-divider/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-flex>
</template>
<script>
import autocomplete from '@/components/header/autocomplete'
export default {
  name: 'About',
  components: {
    'autocomplete': autocomplete,
  },
  data () {
    return {
      cardIndex: 0,
      dialog: false,
      items: [
        {
          headline: 'Search',
          description: 'Bandcamp, Mixcloud, Soundcloud, YouTube and Vimeo',
          moreText: 'We directly access the use the offical API provided by Mixcloud, Soundcloud, YouTube and Vimeo to get your search results. Organise all your music in one place.',
          img: './img/about/analytics.png',
          cb: () => {
            this.$refs.auto.$el.querySelector('.v-select__slot').click()
            this.$refs.auto.$el.querySelector('input').focus()
          },
        },
        {
          headline: 'Subscriptions',
          description: 'Keep an eye on your subscriptions',
          moreText: ';]',
          cb: () => {
            this.$router.push({name: 'userSubOverview', params: {user : this.$store.getters.uid}})
          },
          img: './img/about/star.png'
        },
        {
          headline: 'Playlists',
          description: 'Organise all your music in one place',
          moreText: ';]',
          cb: () => {
            this.$router.push({name: 'playlistOverview', params: {user : this.$store.getters.uid}})
          },
          img: './img/about/turntable.png'
        },
        {
          headline: 'Stay up to date',
          description: 'Customizable home feeds from your favourite artists',
          moreText: '',
          cb: () => {
            this.$router.push({name: 'subsAll', params: {user : this.$store.getters.uid}})
          },
          img: './img/about/satellite.png'
        },
        {
          headline: 'One click download',
          description: 'Batch download mp4 or mp3 with one smooth click',
          moreText: ';]',
          img: './img/about/cloud.png'
        },
        {
          headline: 'Always available offline',
          description: 'No internet? No problem! Using the power of PWAs you\'ll always have access to your music.',
          moreText: `We believe in progress web apps, this website will locally cache itself. We are limited to a small portion of your local disk via the web browser, this space is only borrowed and will be used by your os if necessary.

          Songs are cached for 2 weeks
          Searches are cached for 1 hour
          Playlists and subscriptions are cached forever`,
          img: './img/about/dart.png'
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
          headline: 'Vibrant Community',
          description: `Join our discord server and contribute to the development`,
          moreText: '',
          img: './img/about/discord.png',
          cb: () => {
            window.open('https://discord.gg/RzP7dwA', '_blank')
          },
        }
      ]
    }
    
  }
  // computed: {
  //   background () {
  //     return this.$store.getters.nightMode 
  //       ? 'url("https://www.toptal.com/designers/subtlepatterns/patterns/random_grey_variations.png")' 
  //       : 'url("https://www.toptal.com/designers/subtlepatterns/patterns/escheresque.png")'
  //   }
  // }
}
</script>
<style>
</style>
