<template>
  <v-flex 
    xs12 
    class="ma-0 pa-0 nyafarious">

    <v-parallax 
      src="" 
      height="2300">
      <v-container grid-list-lg>
        <v-layout 
          row 
          wrap 
          justify-center>
          <v-flex 
            xs12 
            style="height:250px">
            <img 
              height="250" 
              src="@/assets/logo-blue.png" >
          </v-flex>
          <v-flex 
            xs12 
            xl7>
            <v-btn 
              :to="{name: 'explore'}" 
              block 
              large 
              color="primary white--text">get started </v-btn>
          </v-flex>
          <v-flex 
            xs12 
            xl7>
            <v-dialog
              max-width="3000"
            >
              <v-card 
                slot="activator"
                class="ma-0 mt-2 btn">
                <v-container 
                  fluid 
                  grid-list-lg>
                  <v-layout row>
                    <v-flex xs5>
                      <v-card-media
                        :src="require('@/assets/analytics.png')"
                        height="125px"
                        contain
                      />
                    </v-flex>
                    <v-flex 
                      xs7 
                      class="text-xs-left">
                      <div>
                        <div class="headline">Search</div>
                        <div>Bandcamp, Mixcloud, Soundcloud, YouTube and Vimeo</div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
              <v-card>  
                <v-card-text>
                  Whatever you wany to show up here...
                </v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn
                    color="primary"
                    flat
                    @click="dialog = false"
                  >
                    Cool!
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-card 
              class="ma-0 mt-2 btn" 
              href="https://discord.gg/RzP7dwA">
              <v-container 
                fluid 
                grid-list-lg>
                <v-layout row>
                  <v-flex xs5>
                    <v-card-media
                      :src="require('@/assets/discord.png')"
                      height="125px"
                      contain
                    />
                  </v-flex>
                  <v-flex 
                    xs7 
                    class="text-xs-left">
                    <div>
                      <div class="headline">Vibrant Community</div>
                      <div>Join our friendly community and contribute to the development</div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>

            <v-dialog
              max-width="3000"
            >
              <v-card 
                slot="activator"
                class="ma-0 mt-2 btn">
                <v-container 
                  fluid 
                  grid-list-lg>
                  <v-layout row>
                    <v-flex xs5>
                      <v-card-media
                        :src="require('@/assets/turntable.png')"
                        height="125px"
                        contain
                      />
                    </v-flex>
                    <v-flex 
                      xs7 
                      class="text-xs-left">
                      <div>
                        <div class="headline">Listen to music</div>
                        <div>Organise all your music in one place</div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
              <v-card>  
                <v-card-text>
                  Whatever you wany to show up here...
                </v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn
                    color="primary"
                    flat
                    @click="dialog = false"
                  >
                    Cool!
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-flex>
        </v-layout>
      </v-container>
    </v-parallax>

  </v-flex>
</template>
<style>
.nyafarious{
  /* background-image: url("https://www.toptal.com/designers/subtlepatterns/patterns/light_honeycomb.png"); */
  /* background-image: url("https://www.toptal.com/designers/subtlepatterns/patterns/escheresque.png"); */
  background-image: url("https://www.toptal.com/designers/subtlepatterns/patterns/footer_lodyas.png");
  background-repeat: repeat;
}
.btn:hover{
  background-color: #d3d3d3 !important;
  cursor: pointer;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.28), 0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>

<script>
</script>
