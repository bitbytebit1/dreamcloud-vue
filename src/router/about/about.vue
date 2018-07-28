<template>
<v-flex xs12 class="ma-0 pa-0">
  
  <v-parallax :src="require('@/assets/unsplash-white.jpg')" height="2050">
  <v-container grid-list-lg>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <img height="250" src="@/assets/logo-blue.png" />
      </v-flex>
      <v-flex xs12 xl7>
        <v-card class="ma-0 mt-2">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  :src="require('@/assets/analytics.png')"
                  height="125px"
                  contain
                ></v-card-media>
              </v-flex>
              <v-flex xs7 class="text-xs-left">
                <div>
                  <div class="headline">Search</div>
                  <div>Bandcamp, Mixcloud, Soundcloud, YouTube and Vimeo</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-divider></v-divider>

        <v-card class="ma-0 mt-2">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  :src="require('@/assets/turntable.png')"
                  height="125px"
                  contain
                ></v-card-media>
              </v-flex>
              <v-flex xs7 class="text-xs-left">
                <div>
                  <div class="headline">Listen to music</div>
                  <div>Organise all your music in one place</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-divider></v-divider>

        <v-card class="ma-0 mt-2">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  :src="require('@/assets/share.png')"
                  height="125px"
                  contain
                ></v-card-media>
              </v-flex>
              <v-flex xs7 class="text-xs-left">
                <div>
                  <div class="headline">Share with your friends</div>
                  <div>Share on mobile or desktop</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-divider></v-divider>
        
        <v-card class="ma-0 mt-2">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  :src="require('@/assets/mobile.png')"
                  height="125px"
                  contain
                ></v-card-media>
              </v-flex>
              <v-flex xs7 class="text-xs-left">
                <div>
                  <div class="headline">Access your library on any platform</div>
                  <div>Android, iOS, MacOSX, Windows and Linux</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-divider></v-divider>
        
        <v-card class="ma-0 mt-2">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  :src="require('@/assets/energy.png')"
                  height="125px"
                  contain
                ></v-card-media>
              </v-flex>
              <v-flex xs7 class="text-xs-left">
                <div>
                  <div class="headline">Save energy</div>
                  <div>Save data and battery life while on the move in audio only mode</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-divider></v-divider>
        
        <v-card class="ma-0 mt-2">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  :src="require('@/assets/pacman.png')"
                  height="125px"
                  contain
                ></v-card-media>
              </v-flex>
              <v-flex xs7 class="text-xs-left">
                <div>
                  <div class="headline">Unlimited use</div>
                  <div>100% free with no limitations</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-divider></v-divider>
        
        <v-card class="ma-0 mt-2">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  :src="require('@/assets/satellite.png')"
                  height="125px"
                  contain
                ></v-card-media>
              </v-flex>
              <v-flex xs7 class="text-xs-left">
                <div>
                  <div class="headline">Stay up to date</div>
                  <div>Customizable home feeds from your favourite artists</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-divider></v-divider>
        
        <v-card class="ma-0 mt-2">
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  :src="require('@/assets/cloud.png')"
                  height="125px"
                  contain
                ></v-card-media>
              </v-flex>
              <v-flex xs7 class="text-xs-left">
                <div>
                  <div class="headline">One click download</div>
                  <div>Batch download mp4 or mp3 with one smooth click</div>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-divider></v-divider>

      </v-flex>
    </v-layout>
  </v-container>
  </v-parallax>

</v-flex>
</template>
