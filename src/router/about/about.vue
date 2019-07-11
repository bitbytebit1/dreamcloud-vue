<template>
  <!-- :style="{ 'background-image': background }"  -->
  <v-flex 
    xs12 
    lg11
    class="ma-0 pa-0"
  >
    <v-container grid-list-md>
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
            @search="$router.push({name: 'searchQuery', params: {query: $event , 'source': 'all'}})"
          />
        </v-flex>
        <!-- ABOUT FEATURE DIALOG -->
        <v-dialog 
          v-model="dialog"
          width="500"
        >
          <v-card >
            <!-- HEADER -->
            <v-card-title primary-title>
              <div class="headline">{{ items[cardIndex].headline }}</div>
            </v-card-title>
            <v-divider/>
            <!-- DESCRIPTION -->
            <v-card-text 
              style="height: 300px;" 
              class="preline wordbreak"
            >{{ items[cardIndex].moreText }}</v-card-text>
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
          xs6 
          sm4
          md3
          lg2
          class="pointer"
        >
          <v-card 
            class="ma-0 elevation-5"
            height="100%" 
            width="100%" 
            @click="item.hasOwnProperty('cb') ? item.cb.f(): (cardIndex = index, dialog = true)"
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
                    height="150"
                    contain
                  />
                </v-flex>
                <v-flex 
                  xs12 
                  class="text-xs-left"
                >
                  <div class="h85px">
                    <!-- TEXT -->
                    <div class="title font-weight-thin">{{ item.headline }}</div>
                    <div class="grey--text preline">{{ item.description }}</div>
                  </div>
                  <!-- READ MORE BUTTON -->
                </v-flex>
                <v-flex xs12>
                  <v-btn 
                    small
                    outline
                    block 
                    class="ma-0" 
                    color="primary" 
                    dark
                    @click.stop="(cardIndex = index, dialog = true)"
                  >Read more</v-btn>
                </v-flex>
                <v-flex 
                  v-if="item.cb" 
                  xs12
                >
                  <v-btn 
                    small
                    outline
                    block 
                    class="ma-0" 
                    color="primary" 
                    dark
                    @click.stop="item.cb.f"
                  >{{ item.cb.t }}</v-btn>
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
          moreText: 'Access the offical APIs provided by Mixcloud, Sound1cloud, YouTube and Vimeo to get your search results.',
          img: './img/about/analytics.png',
          cb: {
            f: () => {
              this.$refs.auto.$el.querySelector('.v-select__slot').click()
              this.$refs.auto.$el.querySelector('input').focus()
            },
            t: 'Search'
          },
          bShow: false
        },
        {
          headline: 'Subscriptions',
          description: 'Keep an eye on your subscriptions\n\n',
          moreText: `Soon you'll be able to save and share your own favourite custom streams, artists can use this to show case all their work with one link.`,
          img: './img/about/star.png',
          cb: {
            f: () => {
              this.$router.push({name: 'userSubOverview', params: {user : this.$store.getters.uid}})
            },
            t: 'Manage subscriptions'
          }
        },
        {
          headline: 'Playlists',
          description: 'Organise all your music in one place\n\n',
          moreText: 'Save playlists from all your favourite channels across the internet. Instantly synced across all your devices.',
          img: './img/about/turntable.png',
          cb: {
            f: () => {
              this.$router.push({name: 'playlistOverview', params: {user : this.$store.getters.uid}})
            },
            t: `View playlists`
          }
        },
        {
          headline: 'Stay up to date',
          description: 'Customizable home feeds from your favourite artists',
          moreText: 'Create your own custom stream with the latest music from your favourite artists.',
          img: './img/about/satellite.png',
          cb: {
            f: () => {
              this.$router.push({name: 'subsAll', params: {user : this.$store.getters.uid}})
            },
            t: `View subscriptions`
          }
        },
        {
          headline: 'Vibrant Community',
          description: 'Join our discord server and contribute to the development',
          moreText: `You're formally invited to come and tell me what you don't like.\n=]`,
          img: './img/about/discord.png',
          cb: {
            f: () => {
              window.open('https://discord.gg/RzP7dwA', '_blank')
            },
            t: 'Join Discord'
          }
        },
        {
          headline: 'One click download',
          description: 'Batch download mp4 or mp3 with one smooth click',
          moreText: `Ok, maybe two clicks since we disable show options on hover, riot on discord and maybe we'll bring it back.`,
          img: './img/about/cloud.png'
        },
        {
          headline: 'Always offline',
          description: `Everything cached locally for speed`,
          moreText: `We believe in progress web apps, this website will locally cache itself. We are limited to a small portion of your local disk via the web browser, this space is only borrowed and will be used by your os if necessary.

          Songs are cached for 2 weeks.
          Searches are cached for 1 hour.
          Playlists and subscriptions are cached forever.`,
          img: './img/about/dart.png'
        },
        {
          headline: 'Unlimited use',
          description: '100% free with no limitations',
          moreText: 'Dreamcloud currently costs next to nothing to run so we have no need to sell adverts.',
          img: './img/about/pacman.png'
        },
        {
          headline: 'Save energy',
          description: 'Save data and battery life in audio mode',
          moreText: `The current mobile version defaults to audio only for youtube and vimeo saving bandwidth.\nIn future we're going to offer a very light weight version with restricted features for lower end mobiles.`,
          img: './img/about/energy.png'
        },
        {
          headline: 'Realtime library',
          description: 'Android, iOS, MacOSX, Windows and Linux',
          moreText: `It's very easy install Dreamcloud to your home screen on mobiles.
          We are working on a stand alone desktop app for Windows and Linux using Electron.`,
          img: './img/about/mobile.png'
        },
        {
          headline: 'Share with friends',
          description: 'One click sharing on desktop and mobile',
          moreText: `On desktop a link is copied to your keyboard.\nOn mobile the native share menu is opened.`,
          img: './img/about/share.png'
        },
        {
          headline: 'Privacy',
          description: 'Use a proxy or vpn',
          moreText: `If this is important to you shoot us a message`,
          img: './img/about/webcam.png',
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
  @media only screen and (min-width: 900px){
    .h85px{
      min-height:85px;
    }
  }
  @media only screen and (max-width: 899px){
    .h85px{
      min-height:100px;
    }
  }
</style>
