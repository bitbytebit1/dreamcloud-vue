<template>
  <v-flex 
    :style="{ 'background-image': background }" 
    xs12 
    lg12 
    class="bg-rp"
  >
    <v-flex 
      xs12 
      lg10 
      offset-lg1 
      class="my-3"
    >
      
      <v-jumbotron 
        :gradient="`to top, ${$store.getters.nightMode ? '#424242' : '#ffffff'}, ${$vuetify.theme.primary}`" 
        dark
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <h3 class="display-3">Legends never die</h3>
              <h3 class="title">they live on <i>through</i> us</h3>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>

      <v-expansion-panel >
        <v-expansion-panel-content
          v-for="genre in genres" 
          :key="genre.index"
        >
          <div 
            slot="header" 
            class="subheading"
          >
            <!-- <v-icon @click.stop="">play_arrow</v-icon> -->
            {{ genre.name }}
          </div>
          <v-card>
            <v-container 
              grid-list-lg 
              fluid
            >
              <v-data-iterator
                :items="genre.items"
                :rows-per-page-items='[{ text: "All", value: -1 }]'
                content-tag="v-layout"
                row
                wrap
                hide-actions
              > 
                <v-flex 
                  slot="item" 
                  slot-scope="props" 
                  xs6 
                  sm4 
                  md4 
                  lg2
                >
                  <v-card 
                    :to="{name: 'artist', params: {source: props.item.source, artist: props.item.artist, artistID: props.item.artistID }}" 
                    flat
                  >
                    <v-img
                      :src="props.item.img"
                      :lazy-src="props.item.img"
                      height="200px"
                    >
                      <v-layout
                        v-if="!$vuetify.breakpoint.xs"
                        slot="placeholder"
                        fill-height
                        align-center
                        justify-center
                        ma-0
                      >
                        <v-progress-circular 
                          indeterminate 
                          color="grey lighten-5"
                        />
                      </v-layout>
                    </v-img>
                    <v-card-title>
                      <h3 class="subheading fwl mb-0 text-xs-center">{{ props.item.artist }}</h3>
                    </v-card-title>
                    <v-card-actions>
                      <subscribe-button 
                        :artistID="props.item.artistID" 
                        :source="props.item.source" 
                        :artist="props.item.artist" 
                        :img="props.item.img"
                      />
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-data-iterator>
            <!-- <v-divider></v-divider> -->
            </v-container>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-flex>
</template>
<script>
// /* eslint-disable */
import subscribeButton from '@/components/buttons/subscribe-button'
export default {
  name: 'Genres',
  components: {
    'subscribe-button': subscribeButton
  },
  computed: {
    background () {
      return this.$store.getters.nightMode 
        ? 'url("https://www.toptal.com/designers/subtlepatterns/patterns/random_grey_variations.png")' 
        : 'url("https://www.toptal.com/designers/subtlepatterns/patterns/escheresque.png")'
    }
  },
  data () {
    return {
      genres: [
        {
          name: 'American Hip Hop',
          items: [
            { artist: "André 3000 ", source: "YouTube", artistID: "UCqmZ-EtD-ExXjF9Y28LbN2w", img: "https://yt3.ggpht.com/-89uYsz5Ncg0/AAAAAAAAAAI/AAAAAAAAAAA/WwFCq0s23XE/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "A Tribe Called Quest ", source: "YouTube", artistID: "UCiOPPAw9e2Fj-i2uMNpoRNQ", img: "https://yt3.ggpht.com/-rre4QQJR4fI/AAAAAAAAAAI/AAAAAAAAAAA/KiZtoLItS54/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Biggie", source: "YouTube", artistID: "UCczXQ2ehGOS2U2UnR8rY3Hg", img: "https://yt3.ggpht.com/-zwF-wkDznZA/AAAAAAAAAAI/AAAAAAAAAAA/JGKUyFA6kSM/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Chance The Rapper ", source: "YouTube", artistID: "UC5w8FMeCcC6DG2oWjGgyHKQ", img: "https://yt3.ggpht.com/-gXR4QZRwaM8/AAAAAAAAAAI/AAAAAAAAAAA/XvqeyTEf0Ec/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Childish Gambino ", source: "YouTube", artistID: "UC4hvOh5lgkeAJoVRIg40Kgg", img: "https://yt3.ggpht.com/-dDnswIdzYy0/AAAAAAAAAAI/AAAAAAAAAAA/6ckYCiLuzaE/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Eminem", source: "YouTube", artistID: "UCedvOgsKFzcK3hA5taf3KoQ", img: "https://yt3.ggpht.com/--xXeTBXLPxg/AAAAAAAAAAI/AAAAAAAAAAA/nlYuc-4khFI/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Fat Joe ", source: "YouTube", artistID: "UCvujFDDYFSt0uu_aTxuVEIg", img: "https://yt3.ggpht.com/-mOmzMxTQ94k/AAAAAAAAAAI/AAAAAAAAAAA/LkZRcgZ02QE/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Ghostface Killah ", source: "YouTube", artistID: "UC9BR9FK85Ez13EZ34Z5yZnw", img: "https://yt3.ggpht.com/-F5M39eFV5eU/AAAAAAAAAAI/AAAAAAAAAAA/_SCTFhmxwOc/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Jay-Z", source: "YouTube", artistID: "UCbJG1HvzgzaMe_15xfiUyWw", img: "https://yt3.ggpht.com/-8YpxFUUY-TM/AAAAAAAAAAI/AAAAAAAAAAA/LEOdbUCU4GI/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "J. Cole ", source: "YouTube", artistID: "UC0ajkOzj8xE3Gs3LHCE243A", img: "https://yt3.ggpht.com/-zQD5wWXbLGo/AAAAAAAAAAI/AAAAAAAAAAA/f1btzqOIw44/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Kanye West ", source: "YouTube", artistID: "UCRY5dYsbIN5TylSbd7gVnZg", img: "https://yt3.ggpht.com/-Ugk0XEFMnYw/AAAAAAAAAAI/AAAAAAAAAAA/871SBFT4r_M/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "KRS-One ", source: "YouTube", artistID: "UCA2w3yf1BlliMJoaT-vFqaA", img: "https://yt3.ggpht.com/-57spDHSpFt4/AAAAAAAAAAI/AAAAAAAAAAA/Dui6NJJzXJY/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Kendrick Lamar", source: "YouTube", artistID: "UCprAFmT0C6O4X0ToEXpeFTQ", img: "https://yt3.ggpht.com/-U4IAIqF-0Ds/AAAAAAAAAAI/AAAAAAAAAAA/DBxpvCtz_Og/s800-c-k-no-mo-rj-c0xffffff/photo.jpg "},
            { artist: "Lupe Fiasco ", source: "YouTube", artistID: "UCe872mgP4deADPnXtkbS-Cg", img: "https://yt3.ggpht.com/-2uA_GG9CQcI/AAAAAAAAAAI/AAAAAAAAAAA/X1F0VBxNKrw/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Marshmello", source: "YouTube", artistID: "UCrxpwXq8wCTskOQq5d_KoqQ", img: "https://yt3.ggpht.com/9dcB7NxE1pSUBeDtdUYaWq_1D9Y8ddlKaFGTGYsDN-5GE2osXqoYqPQGOdpxAC3F77aEZ0VC1WtIheQi6g=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Meek Mill", source: "YouTube", artistID: "UC9HlWVtENbiMQzVRmnbJxtw", img: "https://yt3.ggpht.com/-JQ7o4jFezHg/AAAAAAAAAAI/AAAAAAAAAAA/r4jOdHvDj1o/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "MF Doom ", source: "YouTube", artistID: "UCooTDYkIERWBwDC1JKyoElQ", img: "https://yt3.ggpht.com/-gr_qUgstg8w/AAAAAAAAAAI/AAAAAAAAAAA/lpoKpV4apPg/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Mos Def ", source: "YouTube", artistID: "UChAY_qKqbGyqau8q1gXkzww", img: "https://yt3.ggpht.com/-YEFnc6Z03oc/AAAAAAAAAAI/AAAAAAAAAAA/r-RivCPh0Bk/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Nas ", source: "YouTube", artistID: "UCPoQYATXIYvN5WB0c4f6jfQ", img: "https://yt3.ggpht.com/-Ikwhe8HZwSU/AAAAAAAAAAI/AAAAAAAAAAA/U01pYxjJTvc/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Raekwon ", source: "YouTube", artistID: "UC5xA-S_yp5X9nRWM8d-Iheg", img: "https://yt3.ggpht.com/-r4165cAY23U/AAAAAAAAAAI/AAAAAAAAAAA/AmyTSrSHMgs/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Rakim", source: "YouTube", artistID: "UCFMS1sbij1WaZzZpnBDCs3A", img: "https://yt3.ggpht.com/-dq4gbVN1SnY/AAAAAAAAAAI/AAAAAAAAAAA/fOrEIHoG6HU/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "RZA ", source: "YouTube", artistID: "UCS9E7hCpXnbB-UFlLXgGC6g", img: "https://yt3.ggpht.com/-AJsO62potYE/AAAAAAAAAAI/AAAAAAAAAAA/uMynUQZl1Wk/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Tyler, the Creator ", source: "YouTube", artistID: "UCcLpRCcpXhhftxKu6rXGhsw", img: "https://yt3.ggpht.com/-Vehq0Eg8ybs/AAAAAAAAAAI/AAAAAAAAAAA/1w2E-AaKXe0/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Tupac Shakur ", source: "YouTube", artistID: "UC5RrGzC-JXglhFW5NhT4r6w", img: "https://yt3.ggpht.com/-TqUchB3TfFU/AAAAAAAAAAI/AAAAAAAAAAA/IQNJFO3JQuI/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
            { artist: "Wu-Tang Clan ", source: "YouTube", artistID: "UCdQKMtGgbbahJWE3rkPaGoA", img: "https://yt3.ggpht.com/-9OpDgAUuxXA/AAAAAAAAAAI/AAAAAAAAAAA/B72BZk-XfBo/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" }
          ]
        },
        {
          name: 'Blues',
          items: [
            { artist: "Albert Collins ", source: "YouTube", artistID: "UCbwoSB3Jgv_K_IUQCj4xzUA", img: "https://yt3.ggpht.com/FIhR9EduLOtSe4bUz7UibBq7g2jRkfbQCoJfIuKJPHtwhK0OxCGOVg82HgVGEdhFL7ldizhy_s3vAepn=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Albert King ", source: "YouTube", artistID: "UC9XFvJIqt0duVgnlvkXBeKA", img: "https://yt3.ggpht.com/GII3WrqEB6w89ZeDoV-T8-Lfar-QKzb1NSkX1ZJ3GWWsUD67BTfb96q4bUwM-atcgx0uIu1m9OmUo_PJ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "B.B. King ", source: "YouTube", artistID: "UCqKrqzF3eX7R17m_MIMte4w", img: "https://yt3.ggpht.com/zXfjmgyPiskeWOb42r6k1_0xyXK4p9XGFFVOJUPjbPEkyKe9jhBqtTozypE4rUXjS7sKrV7wL0Q8-SI0Rg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Big Bill Broonzy ", source: "YouTube", artistID: "UCP0ngc_IbrxTeSzQJ0YpGXA", img: "https://yt3.ggpht.com/GakC9u3wVhU95SVPskwiBiu-KWJFRVvX3h98bvO492rT7Vyy6O0mwLBX_DZSTKsFznpK8IebjwaxkURb5Q=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Blind Lemon Jefferson ", source: "YouTube", artistID: "UCRfO0n1ycrnalER8PlGVlKw", img: "https://yt3.ggpht.com/VKMbiUuTps9hmniZNbuY0SBgBpYC5b8wUVV6AWf8TAlkVT_8cPK7g6F2FPEa9VGj9fXqJZW2afzbs9xmYQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Bobby Bland ", source: "YouTube", artistID: "UCqEi91DIf1penU5yf67suRQ", img: "https://yt3.ggpht.com/QzapbjSUqmyV9UkhQPo_MgLS_EOKOA20sHg7pBBuCID9tgT1Vb9wGg0O-YAv3NShsZBTD9PDKPpmTW5Sqvw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Bo Diddley ", source: "YouTube", artistID: "UCTXP0wPPSDAaOS6mXeM4tgg", img: "https://yt3.ggpht.com/3fHOxYq26zHdzZ39-w6dfgvSPKiTAxGEnR9qkKoSCxfkUjK2DQNFhBIxIYNX2Vd2oBmUCAx0KX74x9FANw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Bonnie Raitt ", source: "YouTube", artistID: "UCt3dWNI94rZKmfzuwZyD5Fw", img: "https://yt3.ggpht.com/YXECJu-i2w0lyLE1FU7Z0IXAaN1V062RsxoqmQ_6nXSUbSRzYRLitipBkjBFz26QeF4U2GII1j1HbvP3Hg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Charley Patton ", source: "YouTube", artistID: "UChgqUv_teGypvyjv4BpsLEA", img: "https://yt3.ggpht.com/LqJ8fqHwgeJo1Y6GWaJuK9sfm1uAfWNc-2xQYov2TArqank74b4SWrpwhwEwci4KjdLCVIG5f2LaT0uZIg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Elmore James ", source: "YouTube", artistID: "UCcO7GQQk1W8gKWHkQDXZQtA", img: "https://yt3.ggpht.com/S__4ls2iREMDt1GxkYFBlUAbUG5fYzKl9i7KjNxPPi2sPzv9vQcKPWHtJagf11Lw2scGiiXQmn5oaCyKuo8=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Eric Clapton ", source: "YouTube", artistID: "UCXmEE051j5RhUENn7saUF3g", img: "https://yt3.ggpht.com/B0E2vSeqRxJhgtEAgNeNzlVf6Enr-Nh2tu8Gm79GRILOasUVjpATE3fueagBO-8RVUK-AbJwRjMJfAIOMg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Etta James ", source: "YouTube", artistID: "UCieyolnCbsWzyEt6wsd7lgQ", img: "https://yt3.ggpht.com/cHNrHviQpKhReMm-s0vTURU_s-mMPXSmp043hgtq9DNhpS9C-e-S_bDO6ANPvKjC8FfB_Nfk7Wch4m7AhJU=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Freddie King ", source: "YouTube", artistID: "UCj1uIBa_uRRMR9GQ6wviIMw", img: "https://yt3.ggpht.com/NXm0kmowOVZqaqGgUu52Ser0vtsQBJyn3jQEVbpnjKTsJ7PDesguHtLguPFdFF1SmiVk6f56kaFTfQ1MPfs=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Howlin' Wolf ", source: "YouTube", artistID: "UCq7KYdlYIAjlt2NbSEZD7bg", img: "https://yt3.ggpht.com/G2BGWXKPow39noOEkLgYBCDgFAPIp-mP554VSvPtZcoecbLP6RlehICo8Kp7YFoTcjXZbW5sQE4SAJObvA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Janis Joplin ", source: "YouTube", artistID: "UCpxqHC9g0px9jecJ7WbfWag", img: "https://yt3.ggpht.com/8cI80PVQifDg3O0DxBe0-0v-XnVIaIiVliZl1aFfMRFKj99opB9EO4CJ40yS1eURHAGCwaUfuQOGq-1L7a0=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Jimmy Reed ", source: "YouTube", artistID: "UCkJUdhq3rW7AElwDQ_omC3g", img: "https://yt3.ggpht.com/i1I3LzY5sssfNDenhEC2NdcOk4VSuHs6O2Xy5e7FR7OZJDUa1sRbgVSZrGS_RmWsI1zxnX73QmMNXx-ixg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "John Lee Hooker ", source: "YouTube", artistID: "UCcWk0Z6iOwjUeycdoh7mIMQ", img: "https://yt3.ggpht.com/rMBNQAlL-_buKAWLznmuPMjAkskzkIj-W4U9A8YCYD9i5vSbtIpQeU3VLemJe_9u0SkTHu5GZ_sCSiGc7Q=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Johnny Winter ", source: "YouTube", artistID: "UCdGP0Bisu7WfRtZdfuCqQdQ", img: "https://yt3.ggpht.com/GfqfNJ5V4bx9RlGHNNT6yRe6cx2AtqnNjZqDRYL9zqsyuwrbWOHs6yMbx6fvqKzoOsFtfpHr-1977_IjeQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Joe Bonamassa ", source: "YouTube", artistID: "UCMmOiXQLPGwWUXHuLsO5Wcg", img: "https://yt3.ggpht.com/dWYGbdM4c108P_YPnHT0ShQRaHXuFmG5rHvdM-u0RgmC6-s1Ij87-5wnmKm8El5loIzrEqbZYpzyVgbb=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "John Mayall", source: "YouTube", artistID: "UCwKfr_MVlpga_-acg6Q7u8w", img: "https://yt3.ggpht.com/M2jj6fLYDjLvCkC92t-_jVrrZxj6YKZ3ZQVRn5yKMvDeF-jw8nfAcl0r1aNzifI7-b3h0Ogv0N1Tbbwd=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Kaleo", source: "YouTube", artistID: "UCe5SlSvnHTsnmBBXoFYXXGg", img: "https://yt3.ggpht.com/fQJP7N0MNkPO0uDgTJYAhfhC9HP-ED4lm1HNWtJ2l9-ZoLr3LgIzIyk6d6z9AgEMhPInmPrX8FFZLx56g6U=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Keb' Mo' ", source: "YouTube", artistID: "UCjF3NlXbc67wlbU6f1stw1w", img: "https://yt3.ggpht.com/MnUccJVUtNrD72f6JnT_ae_y3PfkThPxNlfpbf_4db2EeUebzu08GiA3Bu_xWoG7MtlPk_0r6WygFAnUZg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Lead Belly ", source: "YouTube", artistID: "UC7jiqF1wzNVeZhZmJ4EKprA", img: "https://yt3.ggpht.com/d7E-DRNZjX9u5uzRfrtvzTOb4gV1wgKoT0sNehiQIH_cLi04iPEDFa9Pv36v_2tY5dB9XPKlZwzUq2w-=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Kenny Wayne Shepherd ", source: "YouTube", artistID: "UCGsOZPwTwFDKOs3O63Rp4Rg", img: "https://yt3.ggpht.com/Yy6dGewxFtRuK8n7GjvbPFTBTOZ1pFb_O_Mb6p3oyLA5UZlMv3w7uM0CSqjeNBVEDQYVPb0Dw4KMiSuSRQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Koko Taylor ", source: "YouTube", artistID: "UCSpFymFQX2WBX2gNH0LQIDg", img: "https://yt3.ggpht.com/AYHFYLbERbBxybF0jV3P-muzl4QQEX89EF52jB85ebkiepaMnZigdy2cpKq3fTSYvL74c4TNvsxUIgMnJUM=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Lightnin' Hopkins ", source: "YouTube", artistID: "UCC6-6kd-2eJJCtkHh5dCkiw", img: "https://yt3.ggpht.com/xQ5K0HIDX5u_MhxdKD0L1V5fqlekUVblNGlJh3MpkrhQUp5UVlpN0Wbqr_2xXue1ZVZfGF_RQgcDPCytkQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Little Walter ", source: "YouTube", artistID: "UCbqLmbib9h4U6y6ND1ZPSaw", img: "https://yt3.ggpht.com/SjF5tzuCYUfEQcV-LP3AZ-Ch_nJZI_eTkK-QdPWP6kGwJn-9G6uDPn7yyLxLylX1zo1T0Ib5gag7oppQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Lonnie Johnson ", source: "YouTube", artistID: "UC11_nfqWfu0m0tsob-o4t9A", img: "https://yt3.ggpht.com/mRlsm1XxtfGBK8SDGZMuzqHMUdYWoK7Bfu8T1t78gadVGLTUZF_3KT7_MxZXEMsMIADgL3Vf9CD7MmA7tPo=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Memphis Minnie ", source: "YouTube", artistID: "UC44t62PL7ni6XZKh_WvXGzg", img: "https://yt3.ggpht.com/UJFwxnB2HIIztZFsf6iStRRYvg2uwBEjX09ZZ1IRhl5LQTp4jlsj79fGiz8McJZGB1tV4dU3FJKNDVZfkjc=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Ma Rainey ", source: "YouTube", artistID: "UCh7FBIm6XgqYUQNpgdl9X3g", img: "https://yt3.ggpht.com/al3gTPhKQvf1NkmhVSLxb0wDiATVvLeeZ9euAYgrJjD3NAJmb3jCXJU-DtJBrb2oAgshOfXQxWJ8B8mIn0Y=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Mississippi Fred McDowell ", source: "YouTube", artistID: "UCbNXWMxWD39iFkSGr1auS2g", img: "https://yt3.ggpht.com/s6V3FYac23DBXF8_hfVQDmtqn7C0_Ozy88_5fohNglNIuimLG5jzt-TRzzidGO-dgGWqejVfG4upT5lE=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Mississippi John Hurt ", source: "YouTube", artistID: "UCDEcORxYIZA2yV7UjlBIuEg", img: "https://yt3.ggpht.com/zJTbzWUBNewJushmZ43X-o5CUuezHBpvfVFrgL0nmsgRc_GEuT4RaJ7KHUfRCBYyptIYxG0RncjgpKBxlw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Muddy Waters ", source: "YouTube", artistID: "UCZ5YpKcmxGptLgRRW8ujxHA", img: "https://yt3.ggpht.com/9YsnfLnBbIU3kvlv24m-AljKJf_I3s3WoN8dUgOpmbU2Rr7CmN8gqdaLDVOvH3acmdTifcjUGz916DRS=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Otis Rush ", source: "YouTube", artistID: "UC9_Ic6yumZhlfxY2sCjwKSw", img: "https://yt3.ggpht.com/MpymokACTTf9vAw2jFTGVze0HAPwmhIbixbPdnu8Zur9ECFJX83rht-nGNpeemcHqwqXzYFuJW3t771shQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Pinetop Perkins ", source: "YouTube", artistID: "UCGloG-ofMo_rYixhmlaNAfw", img: "https://yt3.ggpht.com/UxcaR6to70iQiMWU3Y8UM5WhZ2UWxNFAhtp47cdM5ulZ05m_PsoAfjKn1Fv_PkTwsNNI9J3q2o4DLGspOLU=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Ray Charles ", source: "YouTube", artistID: "UClapQBGYNOoLYmCct6e3B5Q", img: "https://yt3.ggpht.com/57gwn4rQn-482eV4ZR_W8VPan9Y39C45QQxbEd7-SEelh_aP-300NhRwKhC0tkDN_knDVFvf1wgis3Ai=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Robert Johnson ", source: "YouTube", artistID: "UCjcp3ChO5oUZyx3f0FnGVUA", img: "https://yt3.ggpht.com/mMxRRnKre0wfW1QdzYJVad4AFhvxRuXl9PcpNwNKl0ZjmAPxWgmb8QMSf6AH7ISnd2_RhStwuyM4_terPEE=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Shemekia Copeland ", source: "YouTube", artistID: "UCYc8lFXrJmnYM6j0bS3ib0g", img: "https://yt3.ggpht.com/8tapp6oUdPCXlH1UwlT0BwtyvftVzHD06aOi9K48JPNp3npUn1jScT4sUx4K4JId7c2gcm5yutpTa7FM=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Skip James ", source: "YouTube", artistID: "UCOUlyPoyLeFd9QGtRuwGuaA", img: "https://yt3.ggpht.com/0zvLKO9XGoHwA7TkKsU5dB203eu1SsZwRzRabSeBvT7fbbM3aijjxHIY-SLYvCR5tSBm7KHGmxuIY6cv5Q=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Son House ", source: "YouTube", artistID: "UCxo6H7Jta2YNrdk6a9cch6w", img: "https://yt3.ggpht.com/pdhwGY3GsWIM7sJn5vaC3MAauqxYadug4egvfi8IAtCETLtXv6Pg2xwuh6D9LWbzlk_1O9Kfk9P0Zj4e1g=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Sonny Boy Williamson I ", source: "YouTube", artistID: "UCwW-vKTr3Rv9NPuXbKYaKOg", img: "https://yt3.ggpht.com/AJ08X3QsWsPbg8zd2TRDbVxfhpJ1fqnLnml4OF-o67tGIzkmYs2KWklCMtdV-jKoHepkQ0XjmbPhLCXi=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Sonny Boy Williamson II ", source: "YouTube", artistID: "UCWEMaF6bf_6V2swH692S1EQ", img: "https://yt3.ggpht.com/6kxNoX06mY2eHicox6W2MfdqzViyoL-Tp7xwBPQsrb-3HwefyDTrewlSgRcny0fVMXHpzQ0FO71ivBqmsj8=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "T-Bone Walker ", source: "YouTube", artistID: "UCGUpBCmvcFSZUekLZjQnJFQ", img: "https://yt3.ggpht.com/E7u97V7JRwHvM8RzXrOMQWQwEiU06X5gAHNtFWjo9KFM4c-5lxnx1yEKDr8g_tFKF3tJQBZoA7HRXCf6=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Taj Mahal ", source: "YouTube", artistID: "UCylg6tzCZVAJrq5z4i1bgpg", img: "https://yt3.ggpht.com/dN7QbS_VSr087KMjknl-SDZWyd9yRPnxg9udYYBjWlkEHwANnogyeAfyNQpJ1yXe4IO78B-Fl3el91aX=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The Blues Brothers", source: "YouTube", artistID: "UC6SVhkSVEZxWOqSqvqZ6CSQ", img: "https://yt3.ggpht.com/-0BJz33qFh4N2truUsU6SCTO50AsNAx958AJ--Wb4-C_xJ3TDq6Xl3XlnRBOC2HbwQVX09CB5mA8CRwg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Stevie Ray Vaughan", source: "YouTube", artistID: "UCna_2oi1hIA0FEWM_VoVfWg", img: "https://yt3.ggpht.com/VFPf4_gMcIQZ7bXhe4B_UUZHs9l_aUmaSVFbWdU8NXv9VrLsIlFuPnTRfp8W1TNclYbL3W8ogE0vyga78w=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The Robert Cray Band ", source: "YouTube", artistID: "UCQ2tt8Xd-dCcZB8wycA3uYA", img: "https://yt3.ggpht.com/03ktDrDJxKiPN6xVr9C8ZvEJ1cgcsBmF3JMAiRcJb_HJz2ywaWDXylqpU0ZSlOVqlHu4yzB6eb10IZTc4A=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Willie Dixon ", source: "YouTube", artistID: "UCqjv56WoIUXuzrpdRUufR-A", img: "https://yt3.ggpht.com/WeeYzZ-qKl3PacLYXOGCb0noYeOr_B1JBiOzi1G8d5_bAalUSaKRg5U16Lc685a9f8rEuTOwPaZvgHMZdA=s800-mo-c-c0xffffffff-rj-k-no" }
          ]
        },
        {
          name: 'Classical',
          items: [
            { artist: "Antonín Dvořák ", source: "YouTube", artistID: "UCyfVmh0_CxWFkaGVAFF43DA", img: "https://yt3.ggpht.com/TgvWU3WYl6awMQrUmiIHmMxW_wVS8WG_g7AsSHz6ysZvlj2mDH0HOFVsAIw9Qruz-OSLaadimYGnc-Re=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Anton Bruckner ", source: "YouTube", artistID: "UC9JDEVKTAQ7Yv5yNeeQIOBg", img: "https://yt3.ggpht.com/hT8vz6X1tsii8hAulSJ69SOTb3_ovLRNB37XfwQruW8DGbqFHdju49al5bVyx8mFIPqWC4OTlh9qUjP5DA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Camille Saint-Saëns ", source: "YouTube", artistID: "UCXVWlhsX9o5krjzgrDXp5LA", img: "https://yt3.ggpht.com/rj-tn-8kOQtymLcFtavdBu2GDBq1gjvucC6fNcthVURYlWeQwfrfmv2WmWhSW9fgrswEnyWBo0k9m1mR=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Claude Debussy ", source: "YouTube", artistID: "UCDBe28OI2PycHdECfoaIWtA", img: "https://yt3.ggpht.com/5v_v4u5L6Z2zsD6-sTqJA9QE6fnh6jpPaXtgkUMOZvX5VzYnmqLbCgLVnzXOXwowuq246Bq0ybnj6GkmoEU=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Dmitri Shostakovich ", source: "YouTube", artistID: "UC3lycaAHUMxVt925AeYjMyw", img: "https://yt3.ggpht.com/Z5X_YeQgJpnLt1AeysGY-5_MWEpfz4WLggw753vtRcVygLgHZduvBvEsrjfKrLXeoxVLq05dajAmIniTj-I=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Felix Mendelssohn ", source: "YouTube", artistID: "UCQAmb6sjnCdfoKvEy3hovrg", img: "https://yt3.ggpht.com/URDvUt8f1Lgnoczzi3JWlAbtejjHHVn72Kz_XZf5eRfuJ70rdI_DHv1tM9yY8Ug1bArJZbeBa175uNhG8Lw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Franz Liszt ", source: "YouTube", artistID: "UCkBznkb-OKhnFmCCpuMvMqQ", img: "https://yt3.ggpht.com/pCVLGAbCf16HHdyz-jrx9fXvDcP_58Y61if43FDU4w0RrHTj6Q-gkwnFtOktX8yXbEqPPoX7iIVD1KfPCQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Franz Schubert ", source: "YouTube", artistID: "UC7l3IFSPxafcH_GTj1VWTeg", img: "https://yt3.ggpht.com/j1eF6mnmiAyLuBbDmr5jDjORK-jj_wfPIp-EKki-eGeySD1Zw6cXTWotT6QkxNojWFmfEanI378n7N2qUA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Frédéric Chopin ", source: "YouTube", artistID: "UCyTnUReB5s38R-ZKlb2wyVg", img: "http://bi.gazeta.pl/im/32/8e/15/z22603314V,Fryderyk-Chopin-tuz-przed-smiercia-w-1849-r--na-zd.jpg" },
            { artist: "Georg Philipp Telemann ", source: "YouTube", artistID: "UCH2VDieMiIjEXQ7N9hkWlsQ", img: "https://yt3.ggpht.com/VzmVhnqQt92ngTBxad9j4bc7YNJ46tVeKpoIuIp_1bdv5ukx0_w7RoEdlCS-goJAFuvCKOhpnE6zXTy-=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "George Frideric Handel ", source: "YouTube", artistID: "UCA5lUV4mRfZElVdl9JsxkXw", img: "https://yt3.ggpht.com/QN4Jy0R1_t-3PxcItsjSTeRMEARzGVXa22iPnKlW89Pf0sYJiy5Kr8S7bsE0KiZFgobe3Q3gtgNPy7gK=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Giacomo Puccini ", source: "YouTube", artistID: "UCP3E640nI6rYWYu7ab-U5Xg", img: "https://yt3.ggpht.com/YDS39fIw_Kl1BiNO18IlAflygMygCa_biIsaT5bF8tg1WKia65xnemxzad_Z_eA6pGdukDXr8k8ilWth5Ok=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Gioachino Rossini ", source: "YouTube", artistID: "UCzKATHRxd8LnogmMSmZrfYg", img: "https://yt3.ggpht.com/R6a8BEnwKKIs8hVPB-GQ93HNC4bdR1nJnDmdbtWlha5NAi0tN6V9KsNELmFcy9HmsbNRh2ZqtzQN15-8R04=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Giovanni Pierluigi da Palestrina ", source: "YouTube", artistID: "UCMwKgtgGiAwhFkP5nohtVkA", img: "https://yt3.ggpht.com/UNDtgI6wsihm6QEl9kgAZnnqTM3RiEyNti4dSmGavLGKlD607x7PvlxXRMbnCP-ZKwCUU_-tgsX_PYso=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Giuseppe Verdi ", source: "YouTube", artistID: "UCqgc1-xfT1EXHgivjFiy2aQ", img: "https://yt3.ggpht.com/UKNZAhOkzHktyoIen4L2ufbDyZ2XuV-nYLsiJ3QsmRpMziSpeLb08PFIUJkDU8XQHlHDVcNAC8V1fXYQig=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Gustav Mahler ", source: "YouTube", artistID: "UC4JndR9Jg60dqinZE45umxw", img: "https://yt3.ggpht.com/rQeoTuEc-AwjHk_Hoc2YWBMR0FO6SdtYoIQm-ojxFS2csc7BLUzRKRFcmE5x6TZl9EvVSZIeYn6940YuQ68=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Hector Berlioz ", source: "YouTube", artistID: "UChSnG461wXJZm0OmCUuTJ9Q", img: "https://yt3.ggpht.com/yuNGCkmKu3YrJUmL0OA9tVszW8UEmuDz7s5fjnh0sr5CgjtOaas1bRJiXPR8Z7_Xbkw1l2YRytnmppWKdw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Igor Stravinsky ", source: "YouTube", artistID: "UCELh0PB52k1uiZP91LKW9VA", img: "https://yt3.ggpht.com/HGcttvtP1WlT19U4OXyB_50sPSet_OlOIBi2Ivdw7n-BWF5hEg4HxWCcDS84psz5YXvPNdUhQ48VAvE_=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Jean Sibelius ", source: "YouTube", artistID: "UCAwzejYabpZgGWVPTvxlJ_A", img: "https://yt3.ggpht.com/2qMCXD9z7-iw6XFzVAakYTk0sAlwTYZhzqoNXDO5Ce0bEEzZ2XlbRmwCKgbkQdTzNKLcJBSw5SoUtfgukw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Johann Sebastian Bach ", source: "YouTube", artistID: "UCFtSXTlIMFFkyJbHO3V5b7A", img: "https://yt3.ggpht.com/KRS8pAKoIDomCAiqfEfNceaGorADvhvyYaLuuXMTxi8tCFfhltV_E9yTtKgktalL3ywXwCCOOC1iMK4scXo=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Johannes Brahms ", source: "YouTube", artistID: "UCJtFbUvNYtWoVPw_xraB6sg", img: "https://yt3.ggpht.com/R-iMMo1XSr7Oya7iGmBoL_qfov3mNDl_4VS5c0pHqsZxepAH16rGKF6KZosnvBwTPQwmMN5XpWEy-h_T=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Joseph Haydn ", source: "YouTube", artistID: "UCyHvFhxUFcB2zVW_4cT4fiA", img: "https://yt3.ggpht.com/zLA9nzPPRQqvm8KZS161LuJjgIYHu8CyV4xemnU2Szdp64nCQh02pBC-m9wSTlEd7hMRRfnlfnPu5aUc=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Ludwig van Beethoven ", source: "YouTube", artistID: "UCnsAooIr-Dsr8zJOCSadQcA", img: "https://yt3.ggpht.com/c85bE-_67CI5MdkSfY34J_PQ6byxfLSUakHd1JB2d8aGH8T_mL1mDMDd_XrbXywjSXrxkqm9tolDn0J2BQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Maurice Ravel ", source: "YouTube", artistID: "UCEWr3HmyDujG9n21iAUAJYQ", img: "https://yt3.ggpht.com/UcacWPw2ubmSVaKHHulDzlrFBRZHyspuirOo7zoFEh41TZfh7gQJ595PiRW3e5YIdQrQv7GJ9qy9mTI=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Richard Strauss ", source: "YouTube", artistID: "UCxa1rtpzfnbgV7JxZjqGLxA", img: "https://yt3.ggpht.com/ZBkz3SIOT_NuwhNMY3DB_fd0WuFajm0WD1-GmyAGoIqatfCN3hAsilhdY1JQcQBY6tQO6roP9M-ZlH8VCw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Richard Wagner ", source: "YouTube", artistID: "UCqRT-aGYojd-in6xTOT2-OQ", img: "https://yt3.ggpht.com/h2wn9_p8v5QH2dJg_u10ZvHIhwTMCuRS79LHT1iYOYCgu2UoYYT83sG9KX1WJl7OxNW8nnhek_ylVvKndw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Robert Schumann ", source: "YouTube", artistID: "UCTqyZnhFNMHrDYt6hANBcew", img: "https://yt3.ggpht.com/jyBaUbdBSAj4mmMoZixQfg_P1Y1T3xmg__rQycoQmdvNQHmsmRucRtl87uQOqQBaiPhyFfuZ3UKaDUD5gQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Pyotr Ilyich Tchaikovsky ", source: "YouTube", artistID: "UC6UJm5ElaATOPzXxNkuLDJg", img: "https://yt3.ggpht.com/MZGDAcA9JjiURwul4gKZGt3N9wr9Uq-h9p8jjzbmDUU9O11ZLwDAzFigDxXWkuKQeEIA69GkkEtJbOqI=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Wolfgang Amadeus Mozart ", source: "YouTube", artistID: "UCmeFxYk5BSbJGWN9OgTAIhw", img: "https://yt3.ggpht.com/GnBd9_FYHq2VCMZOB_8KSCFs7u30AvJKx4EO2mwUDQxjk7NTrImpm9TpVE_nnnLaK1DVyKINUiQsmLfj=s800-mo-c-c0xffffffff-rj-k-no" }
          ]
        },
        {
          name: 'Funky',
          items: [
            { artist: "Average White Band ", source: "YouTube", artistID: "UCN-nei8O1bNhTWh9J2wnBqw", img: "https://yt3.ggpht.com/A5zsEH3sxjk6AOWsO5JQqLMhWkmN2Qc6Zw2jFHPZMwt8BQyZMaxgGaGPIk5XLgP0T9GUo_USczy5xd5_zQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "B. T. Express ", source: "YouTube", artistID: "UCJQat5mH7Bj9MGaXW5qf0jw", img: "https://yt3.ggpht.com/TE-Ome_0H0Xq-CZMeqXVkOd45gwT1Ab95xLbJFNAQwgirm8MXbfkC3-rp8Pu9jRMLPltHJNmZSGil79L1S0=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Billy Preston ", source: "YouTube", artistID: "UCk0o3_qkXiJn8ZNiIoAOWmQ", img: "https://yt3.ggpht.com/rBuw4WM8mQMqVSid9Qvm63TM2JxG-5D-bU4r-9rloHtJK5g5cKd3Um9L_TKVB4Tj4J-I54RErj4gSwa8=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Bloodstone ", source: "YouTube", artistID: "UC-z041GhzcHWymkdGzfmZEg", img: "https://yt3.ggpht.com/Dvqk4lclGWyeVUxt7ZAEi9CnA3kyWJhHUuxBPw8w9CDnmITIRWrUfKKIeV2bfwrUgZfAS6Xf2_xNh4VtQQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Bill Withers ", source: "YouTube", artistID: "UCDjpW6k2Sfg_FTr1toLvffQ", img: "https://yt3.ggpht.com/mTs8P7VGKyoDbYPS1WOjBlP79-K0gGPVTitryDSMssUsIV7fkv__oC2u7PF88z8_WX5kynk4Ao0C6jnDXQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Brass Construction ", source: "YouTube", artistID: "UCe0E-P0V4lvzOLNZBdu5Y3Q", img: "https://yt3.ggpht.com/h9ZbRFthZeJr7qIywCh5R97-6KWllTgXsqI_gxmgZ_mphhIKA680qqZ4NpVYl35q40jAT04UvxYUeCbFLw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Brick ", source: "YouTube", artistID: "UCNKjjE249Qo3bRUxxHMqiKw", img: "https://yt3.ggpht.com/pG0JeGTlcA9QIZlwR7Y2fBNV1eKtO0t5yqjHF0L-TIxjcw5Bk4vvt2daJoX4W2MPcDIuNOwMmIzrm_x5=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Bobby Byrd ", source: "YouTube", artistID: "UCOuELTDB8DTcxHB9C4YsWuA", img: "https://yt3.ggpht.com/c-hiOU1f6sLkhZfkEwF-KXxD2RH3dS573Lw4DklKIXtYYHaJM21cqZES4G3DQHnn6wWSjZykwltKC5JQIw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Booker T. & the M.G.'s ", source: "YouTube", artistID: "UCdKp3x36Zt3B8OPGvzqIm7Q", img: "https://yt3.ggpht.com/II0fddt9nS1mWCDGSLi7nsohNZ4a6RclISLNc7ov31V3kK8YmvBvrxUGsDkjIHMpYYOd5HSYfwLxRHxd9w=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Cameo ", source: "YouTube", artistID: "UCWOWuP1wrpPtdpX72l8jl5w", img: "https://yt3.ggpht.com/HIDxUi-kGKbNbMsfqFiFICqMzW__PQx0wY2Kgi614Sef3IPJzxj1e3acrs2iLIZ3m6VKU0XOAnpjrcsbXIU=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Chaka Khan ", source: "YouTube", artistID: "UCwRmRZFN_nTAkKZYngL-x6A", img: "https://yt3.ggpht.com/MRS0u7pEL1TlTzp20ZcKVZpQPOdbB8Rsz0VAhr4zLfTFtvHa4H4x8MDdI0IBjUOtEfU6Ct8bFzzgi758IQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Charles Wright & the Watts 103rd Street Rhythm Band ", source: "YouTube", artistID: "UCvL2uCvW1RAcsYkdEeEyeZw", img: "https://yt3.ggpht.com/iYGUvySwoCOOGHY6FS-GxbkvMV77HtTuUHs_XYSayEC98N1L0vZl2WFLag_R8KzrYcvfWuFtdkohEcDk=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Chuck Brown & The Soul Searchers ", source: "YouTube", artistID: "UCFwshR1mhG4oyQ7Xp3N9FCA", img: "https://yt3.ggpht.com/eR_Gycf7c7qo7HNp72R31eWCSMebWuNvdevmdkR0894VIjWLa4xVdFYT3k1pBcnXa9NLGtRyaJq-C2P6EH8=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Con Funk Shun ", source: "YouTube", artistID: "UCtrRS6QwswmaqX2YRtzwvww", img: "https://yt3.ggpht.com/ll8s7o9_ErQhqUZES9it_TwU23yp9mu-eD--QCIYsdQ7WO8w9sGmPDcKr6NW6pEw3JvphWe6GOx7fDkghA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "CommodoresVEVO", source: "YouTube", artistID: "UCd6zd8v3DAt19QDDcq7_TsQ", img: "https://yt3.ggpht.com/a-/ACSszfFJ8BQmUn5jNUi7B72VdB1rcB0auz3-PAEAuQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Curtis Mayfield ", source: "YouTube", artistID: "UCJmw3MTR4v8eYIGm3N2zRLw", img: "https://yt3.ggpht.com/oPf3c24oqRNZyDaqJvSDTahF2aGAi7-5L-gTDLLSal2L0zkxzt0FKeYLuHqOuzxsxnLEIcrt-5exEoJl=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Dyke and the Blazers ", source: "YouTube", artistID: "UC4thWyh4CgkIUit7z8Ak6cw", img: "https://yt3.ggpht.com/4cZdr-vDgQaFpQ-SVyaNT77ltXKJTMQC95tZKOsU2DUOiPiCPFUQJZwi27Ddl45XyDld2DbN6wkMOUgEiA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Earth, Wind & Fire ", source: "YouTube", artistID: "UCdyqvgHHq9NEEfV20lO61jQ", img: "https://yt3.ggpht.com/TLyvVx0Mf1jivVZaNMwc3QPeI3mW_Z9cfHoZ1of_yjQVmxZaZbv0N1Sdi_-B0U739E8hubC1cCiwsHvMpA0=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Fela Kuti ", source: "YouTube", artistID: "UCoFUl09hePTptc4UOSISC9Q", img: "https://yt3.ggpht.com/7LDj8BmchyxzcnS0jRIYFuAM83S6U_2MoQiPVo8tRAhzUalKhfA3N2YbvH62q7U8sZL3rYCCwUqJr0EfBw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Funkadelic ", source: "YouTube", artistID: "UCKwWf4e842gO9cY0YJCfe2A", img: "https://yt3.ggpht.com/LUK5dLotjZ_vCsMsVGBJdeLoJ0olhj6ItNcZBG1xIfgKvqJPtPVzop0sLpC_tAsBV0X0OJeQG8cxaJxQoy8=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Cymande ", source: "YouTube", artistID: "UCIWFx0nG2yp5URl3z0IofXQ", img: "https://yt3.ggpht.com/SNcbDgr3T6UoJsuopfgI4yNbg4kpB5JZ_0upLlyTpsZDReLJPi_-5xZ2fXRHFu2kSSV7PZbykiy6v7tbig=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Fred Wesley ", source: "YouTube", artistID: "UCv6yOvGBJg9x6fkKZ3xhHtw", img: "https://yt3.ggpht.com/JtKINAlk1C7MJ0igR4nf40BEqDNUZt-QCZCW9Wn5T0AgaBJaYUnGlJm7FMjbkxB-YILhdsBM3ty58EWGpQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "George Clinton ", source: "YouTube", artistID: "UCtxum8RNo3iBPhthXo96GZQ", img: "https://yt3.ggpht.com/ZXAk7KtCo2MB5dTxYakKwJhoUb_q2-3glIihIibGC52HrmHG3_sl-UAhmGpeH2129fsx1otYsrdfx1-2=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Gil Scott-Heron ", source: "YouTube", artistID: "UCO78NEi7Y7J3HKFuPke0LoA", img: "https://yt3.ggpht.com/dj1e2K0yQCQrOWfQyvYn1_Z9iteahVxd9RBH6gg69e3a4NBcyatAYePZIl8rz5EZDKvUHV3ypU9CVzlD=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Isaac Hayes ", source: "YouTube", artistID: "UC8CgmVlKFWdFr3e3JH-QnVQ", img: "https://yt3.ggpht.com/Ij6ZlXuGHT_wFTGopSK0ttlmE75AJJZwKFbFfhNPWh6Jn6yMmUK080Ut8Vw3MoMaNpIb_5nmPHccHgZrZg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "James Brown ", source: "YouTube", artistID: "UCLSKiNGc_qBWJJ-m5y3jDEw", img: "https://yt3.ggpht.com/Hop092Oouu_Aj0p6k7dP1b2Rp7hGBHMQGnXB8rp0HW9g6iO7E-DhRQf9-flzh_ZTiCQo8h3-sdZNfosf9A=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Joe Tex ", source: "YouTube", artistID: "UCz3M1bRDfweNCLekCjbcCqg", img: "https://yt3.ggpht.com/YSBKTHD8MEtKW8EXWVt5KsFnC9Qj4krKzMKUUCT0wXY3AcZOjQW3S_qKYfLsgNjtFfCz_HpEO9X03ljH7A=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Kool And The Gang", source: "YouTube", artistID: "UC44z3Xy2dA0dM3ql1hgrwCw", img: "https://yt3.ggpht.com/GiF9sI7Q5ZLGidRmwSZiSLqw1OZHMXMU36a7w6fjG7vd6YwxIfvtH-tPpCi_03qtTcxCfw0QUpTFDvEmVyA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Larry Graham ", source: "YouTube", artistID: "UCNrEGX4bHCGGx9pscUDJ22w", img: "https://yt3.ggpht.com/JGhRe1Z7WvXZ3mxZVgeSF-EZTkctHyNjsFeid7Y6PYz_p3wZM-iznElaVIeGgoVEnwZT8I-egHVVbORInQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Lyn Collins ", source: "YouTube", artistID: "UCkkeH8mXzc3RA61xpCsKK_A", img: "https://yt3.ggpht.com/oCDU2skl1y0j5wt_2pKhZPKc_FEl7jDSlt5qLQpzvJdskWxVCSjLBV1OSxu176cGBY67nGZQCmON2WLmbg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Mandrill ", source: "YouTube", artistID: "UCaL1EuAfRlYUS-BnEoTLPdg", img: "https://yt3.ggpht.com/jFtGJMJJHllqAXudLpWBiLZuxamE8GndE1uwwLRGwzT3mqzXtlD9u-tHTCfe_aETFbqTzDNKCIWW7L8P=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Marvin Gaye ", source: "YouTube", artistID: "UCpMMYJB5GJAYSJr3QpxnHEg", img: "https://yt3.ggpht.com/xsuLy917UdhfP-gcS9naVWNBQgL9JDu9rP0xXOWPUL4BRrVICFOX6umU10gtKi9zBBtl_WqQLanEsKsu5po=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Rick James ", source: "YouTube", artistID: "UCBSe49693vkjj_OJ9b0ggUA", img: "https://yt3.ggpht.com/USyyxXyj_3cPleBh_WXObT7mdGoq5kHRiEFWtWSwSI6_Ym_SleA-JUr1avCG07gELH_qoLnmPMigsJRWZPM=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Rufus ", source: "YouTube", artistID: "UCV-ePMa7s-AqUtVYysArFug", img: "https://yt3.ggpht.com/Ldu4_t50k99gOl36iM4rUFg3gBy1LcNvZ6jdHwWc8h_vt5k544Q97dyVxyUzPZWyE3eku0xr9cL2sPfLUFk=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Rufus Thomas ", source: "YouTube", artistID: "UCm1Njiat5P7x7ftWuNZi1tw", img: "https://yt3.ggpht.com/0FFxqUEdqkKjOAA3vGh4__fTpC5a5NOkmkccYcQkATXrlG31fHu5fU6wWRtfSfN275hIPTq8ZicaiEW_4Q=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Parliament-Funkadelic ", source: "YouTube", artistID: "UCCHKkq9MfwAccClcx3H1cyg", img: "https://yt3.ggpht.com/Qazbmn9zOgioa2DBD_UDZwPG5NEkNhQ7eD2WmSVF-Bqun-DCs0sW5k5dW6_WG3GMhICq5NUzGAH2jc_oUQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Prince", source: "YouTube", artistID: "UCv3mNSNjuWldihk1DUdnGtw", img: "https://yt3.ggpht.com/a-/ACSszfE5hPNSlSdAWjLV8pOiOYQR03F6ACiUlOPaUQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Ohio Players ", source: "YouTube", artistID: "UCOJhJ8Oyf5FD5brohb_g1fA", img: "https://yt3.ggpht.com/I7dRH1qxFi3sri_TjJ2VqmRneUb0KDTVezwELtlRLX8IQtm85fqmA4VULgEkHUjt15jtrAN2ex85tGM5zQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Sly & the Family Stone ", source: "YouTube", artistID: "UCgwJnBJfprQYGX3OPQrTvqw", img: "https://yt3.ggpht.com/5uaebob7CYKjLosrD6kajZd3LzLF3SNVpHHN3zpSH8LzyfXKWNOj7wynvToldu7WMQvgTZBQHrMWpjLyICk=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Stevie Wonder ", source: "YouTube", artistID: "UCR83RRXHzXrEQbu_ZQmPMSg", img: "https://yt3.ggpht.com/47betGyAuqFu7YSxXPwCv1SzLLHICJxFsVKxADc-El180-KRlk7DMBun7fXeH6-NoUNR3-wUFJCnkPM6jg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The Bar-Kays ", source: "YouTube", artistID: "UCLNOvQ9MA1CYmF5joGC9ePw", img: "https://yt3.ggpht.com/nyF_CKEPZYDZMohn_QqkMIe8pQFX-Ogc1Pyjfi7Uio0ZyqpAfn8JxwNpyYM2f5wIMxeGiVGsoT4h_TdJEw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The Blackbyrds ", source: "YouTube", artistID: "UCFapEGcJM30OJsYjBMWjHmw", img: "https://yt3.ggpht.com/FYB3LCn2KPiCSBRowaeTCzy-yho9LhAl3-kTO9TVOccEXrd_WiE7rUlmzlznSAf9-bduPH8de-HVpG4G=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The Brothers Johnson ", source: "YouTube", artistID: "UCc2g6yb1eMJ_-OPE0qAYImA", img: "https://yt3.ggpht.com/avHUdapuW8gbnLw2fKqwbaY0OQLEaDrlCJfaH6kTJZsrX4vAdNrckbVPLuukVVnCUzg9qdhEtzkZKDS2=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The Gap Band ", source: "YouTube", artistID: "UCLlCPIaPLOugvMKyt0Erllw", img: "https://yt3.ggpht.com/yUwO06ZoPJAdJnhoRdVBaCEIq0qBV8CWa5uiP8Ioq7JvL2JKIvPjhAb7oecjk8pniaPL_nnCqEvdUfzzXw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The Isley Brothers ", source: "YouTube", artistID: "UC19gd7AQcPkrcFH8w8BYO7w", img: "https://yt3.ggpht.com/0WylIZo2lnS1HLejC7vLSJmmCnsypw4IXCd05o3qf1YWjBcla42wYH6BqaSlFtVGCKdiMvQ8F3sObD2w=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The J.B.'s ", source: "YouTube", artistID: "UCH0J4AgVPF-krK6K9Ykav3g", img: "https://yt3.ggpht.com/Hp18LseT2yfjBevdURk8-mfZfq2QElIXOOdSUliVuLJYl0uS1mpAHh4z17Gh73xCYRfizMmIhydsEIh3=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The Meters ", source: "YouTube", artistID: "UCwye34yhtCbWGQsrFS4oMNw", img: "https://yt3.ggpht.com/wx0MnVmvY4ZFjuO3IwG2gA1OUMO7YWSR8lmnVteiHUoPusbKZir0XIiE0rPwoTnf2OZSROQWfzg6i5sZjQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The Temptations ", source: "YouTube", artistID: "UCwWtKZD4xNVpEHndNxYu51g", img: "https://yt3.ggpht.com/uHghZbeZWRiaf9ENvCndMmD4gDaMADSq9gutjZ_JpzlouGN_NuIGN4En-wbX6CZIZrwmO7qBF1AUXBrpUAM=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Tower of Power ", source: "YouTube", artistID: "UCkSrbTm2YvkMiVopasi5yHg", img: "https://yt3.ggpht.com/9gLnulA52yWgltiXw9037MEUrj6W9Bwxj3c8c53jVODZiN6Ws0qKp0PhN62p6HXWLKNxeY08nRO7COajDg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "War ", source: "YouTube", artistID: "UCY9rJimufdb8imofVY8taNw", img: "https://yt3.ggpht.com/SQezndTYaK404TiV_YRuEeufUjVU4t9IYFKtjv2dzfE-qhblvHxbGDg2ElvEMCTBIN5gUscrimwzNJzUDI8=s800-mo-c-c0xffffffff-rj-k-no" },
          ]
        },
        {
          name: 'House',
          items: [
            { artist: "808 State", source: "YouTube", artistID: "UCIyGjRHvtCqUglkPZVEWUuA", img: "https://yt3.ggpht.com/xhtuo-erwzMjIoTIsPMDfPn3jbrWjBW3URWvHqEtA5Hg1pd8QXiUUzAdKcYi8T5tiYWROnl1yJK7oFjZug=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "AfrojackVEVO", source: "YouTube", artistID: "UChuZAo1RKL85gev3Eal9_zg", img: "https://yt3.ggpht.com/a-/ACSszfGfyoRunjqutnvqOvN-xieYm4zfymiABKWvoQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Avicii", source: "YouTube", artistID: "UCuACQmW04T3v9Mz_1_suFYw", img: "https://yt3.ggpht.com/ZKTBxH52EhTWZokBr7O5UKfxqJWYvj5v69C7rVOLMFq054YF1WiiMPLbXmwCUpJF9LNZ8AwE3s_y7wVjXg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "deadmau5", source: "YouTube", artistID: "UCL44WZGVf-BU5N0ymCXrpBg", img: "https://yt3.ggpht.com/OpJDXBXK7ADy29EtEXQBn8GfAKmGnb9AeakfyqXQT9aQkOZyVZhbI2fi9-eydvwqdkSzEKsYFpLqtK8E-w=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Diplo", source: "YouTube", artistID: "UCXAX3AtRPPdesKYSS8FKayg", img: "https://yt3.ggpht.com/xaol-air_v6baxLuW0Glr7C-yCKYVJEwF3y8Ow1MM0piNdw-gYwAUUcNe_2TPBjipK_gxzJF2ayZLCteZY0=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Flume", source: "YouTube", artistID: "UCXAhoI7XO2kafTMjocm0jCg", img: "https://yt3.ggpht.com/a-/ACSszfFgnLjXEi5s6ApvFLpmrRe4stZvRBMmtCtMSQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Frankie Knuckles", source: "YouTube", artistID: "UCGpjbS7U2isnZVGns3J9Ckg", img: "https://yt3.ggpht.com/AdcshOophS0nG2yWS-JfqppVDFAMBT10j8bypQAHYesbOGktxhsnVx2gaIUS3-cvJKLTwMz9aR-znPbt=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Kym Mazelle", source: "YouTube", artistID: "UCpLr8sXJqc-BmUjC1vMqnsA", img: "https://yt3.ggpht.com/GmnVUnVN9FJXKs90cxBgZrWN3dFB7wXmRwWCOIOfBM0_HyI2azt32OK6MX5CwOPESr3QIpcgKWqhCMSX=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Larry Heard", source: "YouTube", artistID: "UCLhLg21tnAtPKvcFODfRAXQ", img: "https://yt3.ggpht.com/A25Zk05a5MEqHU4HUUDy7maaJd6Zw8Vh2CQkvaP-7PZ9erQrrSHlG3BKKhzDSq3hmgiAWvgPijQzDEdJaQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Phuture Noize", source: "YouTube", artistID: "UCASv7c0bxfN9QF7z7lVsUZA", img: "https://yt3.ggpht.com/4WuTMQ9HtaVzONb2X21o6883M4zA_C1gSq16Co-ykuupabMvvtFwlT-XsFULYoUFYKguj5r_npCZpvuFPQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Tiësto", source: "YouTube", artistID: "UC8VSaPhuiHkjobAgNpRqLIA", img: "https://yt3.ggpht.com/nZeRTqyvHYm7vwEruQV4DCBLifuLCE6c19WhgvNX50D3RutLbn9LBts4g6P8-IAhi541e1nqy77wXuJNmg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Zedd", source: "YouTube", artistID: "UCGVGIqHPzwLhZg8KQNVaRbA", img: "https://yt3.ggpht.com/N0lFRjOCk7Y1-YNdXYdHq-aajwp1nIk8_FkQUIZp9KTDozK8oZq451LTp2EuHfPzhZz-jgxZbVEq83rfUw=s800-mo-c-c0xffffffff-rj-k-no" },
          ]
        },
        {
          name: 'Jazz',
          items: [
            { artist: "Art Blakey", source: "YouTube", artistID: "UCMki-b0zfAQiMQ0nbsrIuBQ", img: "https://yt3.ggpht.com/Y2NZDfUVhCj0WSFDFCFOJAbSHMAXIvnfy7gD6hh5IRYK-9X5JsB7ol1-_5jNV2kzRTTkYIE8cbdmS1qIO-o=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Benny Goodman", source: "YouTube", artistID: "UC23m4qWjf07Yx0SwKqQr3VQ", img: "https://yt3.ggpht.com/7Wi_xk1iZz3SNtaZNUO17Kv16nSKfD5IOep9ZULPpZYC30gn_ZCDiThmGCiMJsiPz0aGxYrSCvy3PDrRxZ0=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Bill Evans", source: "YouTube", artistID: "UCriB97bZopXsBHVYOQEIIZg", img: "https://yt3.ggpht.com/Nvjp4dfgT0irUAxgLE3iumk3-551VtDezXC8eIaeZ-BWdCaI-FsM-fDs1Dcby_CMAmbT-uqLCBZuPMFOwUg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Billie Holiday", source: "YouTube", artistID: "UCW-raws5Iq2xLADkLcEoVaA", img: "https://yt3.ggpht.com/vW3_j-paP4Q5Y3ZyLNHnFHtkrpkzdUfJetc_g1Xx98PYFW6_3xEEP67W0xNSURKYvyHPfGa1HbMBqacNRDA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Bud Powell", source: "YouTube", artistID: "UCsyeGJfR7t0QBrNUl7c36gw", img: "https://yt3.ggpht.com/ik-TnO5ioMG05z5y2M5jQoVoAaF5O0j1o8u3BYAuUKuY2ZkQrV9qqXarMQDET_VzYk0QFiTVPFeQGLg7=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Buddy Rich", source: "YouTube", artistID: "UCX4J3GV1DSyEpFvjGCoSNqQ", img: "https://yt3.ggpht.com/2QPrNB4Q6TabniFdqnQs0MXTsuc7D_CRfZ-W1SACbqNzYkDw-hH_5JTAZfT6MjRn4-m5dTg48C-lMHgQFA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Cannonball Adderley", source: "YouTube", artistID: "UCRQLvDfTNOFUgst4GpnyDvA", img: "https://yt3.ggpht.com/MeoPcIDDDlxv4_dFJ80ahjqqeNv1yDL5JDL54qi3YzcgZI3EUmOQiE_K1fetagDqzn2LwYI11EyYpqBT=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Chet Baker", source: "YouTube", artistID: "UCVNfRXuaWVILL9giCEg0rQg", img: "https://yt3.ggpht.com/wIo8j3g0xBZ5PyEkFvAa6jdEYdoNeDEhPyLnCQh-ot7q5_Ux1IPrxuNUKa49_ruB664KbwbEWCferzEjmw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Charles Mingus", source: "YouTube", artistID: "UCXSaOCck3oVxhB4W_4Ca3MQ", img: "https://yt3.ggpht.com/_TjA-mQ4QF9JYk79w0lRiiCSR8IHB6mKXjdmA3gXJLhh1pEjGadvf7LWE9QoR8IHQQ-R3rgr4KvUTM8zJg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Charlie Parker", source: "YouTube", artistID: "UCPFmyRluI7yvEdbHCrecUng", img: "https://yt3.ggpht.com/Xe5V_19qfUL8EPghLEFXv2ndAAk1h6E6Fcj9gDFNP54l0xM7f9QIiWXumKu-_pOYhcJwMd4nL6NZll3sNw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Chick Corea", source: "YouTube", artistID: "UC7Syqiz3THx07IfHPlgroRA", img: "https://yt3.ggpht.com/t3j4ekucA3mFFEo6K1Vl_JoTcSxAmxg2BsBY3IG7K_hU-BZUUrRVzu1bB_ONyJXsHKDfPDXqlfrY_piUCQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Clifford Brown", source: "YouTube", artistID: "UCQFCMVgOtWDn5Vd3Nt1SRfQ", img: "https://yt3.ggpht.com/Wx24fxNEGH4kAErQ-P7p4RYXDPgF2ByTRoVZXZtGpaBWu1ShLMvT385NOwHqykluMS3Hu5hlPmCcJTWN7w=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Coleman Hawkins", source: "YouTube", artistID: "UCaqOj5uQl-733nBtBpEEGBw", img: "https://yt3.ggpht.com/FDyYDyIrE3_hrM0THz3k-cWzxIadxJKZYoHmaWiWTroo4IEjojz6_kWkj19wZSn8rnBfOBNZGAzzPsX2QA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Count Basie", source: "YouTube", artistID: "UC2C5LKX_qE6BzyMehXA0ClA", img: "https://yt3.ggpht.com/yUnkmKhWUcSMVPbe48ottqbbUIC9SialtpgCyXnJsX5qB1Y3IzyjFNI1lXQOrLpY9e2PXwAdylrQwxCdxDE=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Dave Brubeck", source: "YouTube", artistID: "UCMBevFAp40kVlvIcOvzv5Bw", img: "https://yt3.ggpht.com/2JtDRr6LYVH5x5RSPWltl3eYaz9MSuq7vPey_yQM84cIG9X3DJq6p4TiFpsGcDPsllTCv7CqsEfr78wqXQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Dexter Gordon", source: "YouTube", artistID: "UCnH1LrQs42YLOQnpdoUYvdA", img: "https://yt3.ggpht.com/bNCX6ZTqJOBgWWDnYgTCNpuOs-gEsswZEMj16IngMNzXMsmeV_UMhbZJPc0OapOpgHlusXelANEcy_FaBg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Django Reinhardt", source: "YouTube", artistID: "UCDvzmvEF-ReWkWb8B_jL-qQ", img: "https://yt3.ggpht.com/hWvkLlF9QpHmT2mCNGB7VwTQNNzNT8SpLXG1679t139uR7EZ9A3K4Z3JwdSj7WD14uqPA5COKTR4iOl8EQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Diana Krall", source: "YouTube", artistID: "UCHOHY0V0VKiEW0Yw7DR4xQw", img: "https://yt3.ggpht.com/hP_LRT_BYWXLk0mEh6aSHW3NT9qRSN0jTB98Ogbgg-qfhjX8fgnen3Y6mo724KFlEP_87ABgZrlOaX_WaA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Dizzy Gillespie", source: "YouTube", artistID: "UCw_wrXoRl-ionafhIWtcRMA", img: "https://yt3.ggpht.com/9GrMXgKfJs-uKdXDnRtSDJSTuoagO9mXNjSm3Hpyff5hkJUmwKT0rp-YhZ5CKanN0AYfAwjYjJCq0Tgy=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Duke Ellington", source: "YouTube", artistID: "UCvwUPRgFawNNBdQg497gHJw", img: "https://yt3.ggpht.com/wPas5cmp2tJ5WKk_KTucd-8R6f8_PIWsX7hQc_49Y_SBISW0DduBIVSl6UINAzAO9HvbKxkSvDwNVysaRg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Earl Hines", source: "YouTube", artistID: "UCBeBkWYRI18waVif35oF77g", img: "https://yt3.ggpht.com/OUezxdHA7uX00kN-DQ-wrWkH_MvJjiUcdGyij34PJxwaaDTxDMChWCooND_9EEdvTR1pjFP3DJ9JHZRnQg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Ella Fitzgerald", source: "YouTube", artistID: "UCYKZTGPwv7ddoMC8Jgi2VYw", img: "https://yt3.ggpht.com/B_0itykEN3p9tuhJ7owLWrSYZGQ6cfFT24tnnC8R4IVLWv7PO8mq7ZNgKzsmCoRD99unQHYDDx1w9PvyFw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Frank Sinatra", source: "YouTube", artistID: "UC1zsfp3OD8qWQ0HfLbz2TXg", img: "https://yt3.ggpht.com/yPrWhumR2Nrh81MXbuXtZ6jNw8JFg_O3tA_hGYV7Rctp3i56B1T9tJ77ogI6uH_o1qyS_mSvuj-E7repDQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Freddie Hubbard", source: "YouTube", artistID: "UCK-G8P50pf0b1t6dd1ZiCFg", img: "https://yt3.ggpht.com/URcr4QSj3AQRv3oF2ayGVmIyZ7q96DSUvS_TyzdGPUzyZiZrUc61638wdnPuMMF0ERIn3TsVb5On99FZgg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Herbie Hancock", source: "YouTube", artistID: "UCq_O_14tCKbx9U9uUT_LEPA", img: "https://yt3.ggpht.com/RtqbbpXsYF1ItwacikVKOX0YvdT6psQiyDdisLVHslLfd_Yx2E6SUntq69jhD6OU9cL1IjnKHEwNv6KsRg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "John Coltrane", source: "YouTube", artistID: "UCH4T2kv7rr9qnuP0DOXLxMA", img: "https://yt3.ggpht.com/LFnbZKBj1XW_HxCOTJ1B92Z7HWN7obC7LVnej2Lqw25orWsQqq4cd0_Iid-gjSUY0jpTIzXO2VNMtEFhJA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Jelly Roll Morton", source: "YouTube", artistID: "UCiKpyur6AJCOyJx_ZoINNiw", img: "https://yt3.ggpht.com/6GpnB3ylAXpgdUzzPU5VZq_L34Kf5YiarVmEyA10NVY9F1VGsGRhvYne33Okhk7EEdtwVSHFWFfBmCN1wQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Keith Jarrett", source: "YouTube", artistID: "UCm3Mj3cmimqk3qMPK_UJHvw", img: "https://yt3.ggpht.com/NybbCRhQQw57IeVKKjWit0imfAD1eL1Exw-dh7UiBf4mfg0ueg4dzXkxv_w5OJuGdUijeW7Pn79HZ8qWRA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Lester Young", source: "YouTube", artistID: "UCwAovW7EG-ibqPOd7JNH2tA", img: "https://yt3.ggpht.com/tKc-iIaf_a03bX_TvMpTlu6X9xr0opO3lIsZcKf4ahdF3lJtkqzzjN3E91eReh8FYuF2K0WzzC6H65wJy0Q=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Lionel Hampton", source: "YouTube", artistID: "UCpfWWFslWSapwL_q16AboSg", img: "https://yt3.ggpht.com/JZ8hv1upiOUbpLpxo59oJ-urz1yKefVcH8H8q2TrBB2l31Q_jtx_sHqpGce1iPc66UOfQwbRBpkftFUzcQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Louis Daniel Armstrong", source: "YouTube", artistID: "UCCDaSui4C9VFMpeRlKEOHDA", img: "https://yt3.ggpht.com/2SCoP3A6bNCxI3fv1jqMKCNzrY8Kr9zJFQf8mNzktZQj0gCt8uXZ0fZzF61eNsuXUuYR5FuXeYc3JHinww=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Miles Davis", source: "YouTube", artistID: "UCIev2PktTH5mI-QlGmbUkiw", img: "https://yt3.ggpht.com/AbVZaa33IS4S6jPUUu9sBk4NKbmkmyAK77awkxr1NfInUJDCNfZPs_fWI84TabJkYV47FBVAiA9_MRnCTQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Max Roach", source: "YouTube", artistID: "UCxTSDTDzVM4MW42oD9iTPqQ", img: "https://yt3.ggpht.com/osz_eN10SkWic03ouP8NO6dCCVe7fpTMUxld-xcn6BygSOrQ2nAP08NeP2xogicH_WC62nYImzJ0P88UXw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Nat King Cole", source: "YouTube", artistID: "UCirPLQsYtHWBmalEbX1LcAA", img: "https://yt3.ggpht.com/ODYoHhYr1yle-2_80YtTua5iTshbXoLpmhjspq5elZoPtWCA6erE0mmKIMM2ly_ZJRoIOmBC1r0cz9ql=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Sarah Vaughan", source: "YouTube", artistID: "UCVIvDAZP_e1e3bKzKFaPfig", img: "https://yt3.ggpht.com/pODA1sWRTE3eivtAe5KGOjPEb3Dxg6Yb6V5tZcSYpuhFBRaUU5c1pc5BLwhjhUKchfeb5vgNo-cvp-Kdqw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Sonny Rollins", source: "YouTube", artistID: "UCqwmTSEZTKX_BmxlmDSOzGQ", img: "https://yt3.ggpht.com/WFSTJmIxQwaxy8ijQbfQISGnj-FL8ui9P8EmbuNdMeTNYNhZWQKbGKjP4p_Ikv9Vf5ar0MKtUkQ5N9vn=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Stan Getz", source: "YouTube", artistID: "UCITWDrIiWv0Y-zj8xrvoY-Q", img: "https://yt3.ggpht.com/irzETTO-mPGSb6D0vO3L3S8mZWhS7KvOGGqWVZMRAYzkCu6uplLtNKaeF8CMrZtPk3KnbmPh65xpr5E4GA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Horace Silver", source: "YouTube", artistID: "UC834B7DbQ6WZzigm4UCwuKg", img: "https://yt3.ggpht.com/lBT8UjmlooJB6nhZSk_iEM7dpcq4I-czgOOs9HNkZh4TKLTzLd7X1kIct0G9ORq6x4wOR-t6wK2yPmQS=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Ornette Coleman", source: "YouTube", artistID: "UCMD_nRrrkezVzMumc1hBuwQ", img: "https://yt3.ggpht.com/hqURBkmw1-6kMA8v5DqiLrns-g6q1ASsNHJqS3V1F_oiN5z812t59tH8gkuJtzREDPgVJidRuDlVdT9GNg0=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Sun Ra", source: "YouTube", artistID: "UChUQgC_KvNmK6Na3Zt9o-0Q", img: "https://yt3.ggpht.com/8ou2ztYi15QEE1-JG_BQBxBlEoTeHWnxxG6LCm-V--IrRx0jkOIJnzPJtcQxGNVlqnM1er-5LCIjgyEatQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Shawn Lane", source: "YouTube", artistID: "UCgEs5iiDgtwtKYI8-zEHfxA", img: "https://yt3.ggpht.com/ZUbSb_tk6TGmfbfIF1u3jK4S03rPbQcth2d6weWEzLsDSmuD3MsIxQ9DxMdqRqNHmkVcuCWTIF5XlPyrTg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The Oscar Peterson Trio", source: "YouTube", artistID: "UCL2bbNhLtFzY9u6z6xXTMVg", img: "https://yt3.ggpht.com/XILrNcoL2c4KjG67j8Uj-hqC88xuf1NWfx9oJRo9yqcrs_g3WS2okf1zN4Dvf89k45POU8WOOoUwDQgiMg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Thelonious Monk", source: "YouTube", artistID: "UCyCL_gVNVoWZTjkw-KnuIDg", img: "https://yt3.ggpht.com/Gb0GLMA2FPi_b4kxzZ5cS1PaLohvoboX3q_kDjafVI-7DbigrUFL_T3eg39Hpog2fLNHKKagW6-krumOrw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Wayne Shorter", source: "YouTube", artistID: "UC3X4afoYfFCLWw1LTfeLCqA", img: "https://yt3.ggpht.com/rrpzA0Cd_JzulSJGrU9Drs_6UFNEuM540MMu9WBgabXq0cCZBCJV8qxX0HTj8jFiOSEpe7A8qiG8xEiMag=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Wes Montgomery", source: "YouTube", artistID: "UCYs8ep9Xe3RQc3Oy4BWKNAw", img: "https://yt3.ggpht.com/gbuSwsSdjrXlutiRHMUHgVC3QAce5Xzh4APwJ8U7TIP1kWcWWgCzDjyEK7iNWWfhWdMhqoHsKoTxp82yTYk=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Wynton Marsalis", source: "YouTube", artistID: "UCzWGLXcvQlN_VMWJes9VYyw", img: "https://yt3.ggpht.com/kzd3yRTN6JaBoOeDIxHX58vMe9wWAGttK3w6wLrIC6XSX-6ZDQMyOapvmz_V6_UwPC47B0jXh6xcovlbtQ=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The J.B.'s ", source: "YouTube", artistID: "UCH0J4AgVPF-krK6K9Ykav3g", img: "https://yt3.ggpht.com/Hp18LseT2yfjBevdURk8-mfZfq2QElIXOOdSUliVuLJYl0uS1mpAHh4z17Gh73xCYRfizMmIhydsEIh3=s800-mo-c-c0xffffffff-rj-k-no" },
          ]
        },
        {
          name: 'Rock',
          items: [
            { artist: "AD/DC", source: "YouTube", artistID: "UCmPuJ2BltKsGE2966jLgCnw", img: "https://yt3.ggpht.com/a-/ACSszfHpdA9T-J0S2RMoUvL37wl2SwRFcbF8A9zYfg=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The Beatles", source: "YouTube", artistID: "UC2XdaAVUannpujzv32jcouQ", img: "https://yt3.ggpht.com/gdTyVeIdiOczsrtBrmHCxMZUEsIySP6BpQlyeSX0LIJyJ83pLAPfwjJywPO26ZBiNNHySoRlOpOvzswV=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Elvis Presely", source: "YouTube", artistID: "UChgxarBUCnPJV871-46bJ2g", img: "https://yt3.ggpht.com/1StP4iAp_r8Q4waKlCeH8z4WhsUb_SNccrif_K2RT81xG6FNmCbKAXJUDps-lc1xhMqCuxwRoDZVRmoecqU=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Guns N' Roses", source: "YouTube", artistID: "UCSLbbBoUqpin6BE34whSOvA", img: "https://yt3.ggpht.com/S4_JLRIDlrHghB8L_sP2jheceusmJzWpNB4ny5-5y-IydbnxjgIazl2R0CyW2SK2l6oVNx-Kpns3nLBb=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Led Zeppelin", source: "YouTube", artistID: "UCYtap7ujIPaxTS2iCDoMi3g", img: "https://yt3.ggpht.com/OCDhdpQrM_iPQhGfECSk0k7oUgi5yH1yfhl0_KwJSJhkNH-9n1ppL2lxJyIfO_ExH1y9lNSWRGGW4ffzmA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Linkin Park", source: "YouTube", artistID: "UCxgN32UVVztKAQd2HkXzBtw", img: "https://yt3.ggpht.com/rfiAR456-U1d3-fREicMGs4MRilSkBsMzQaR2SdYVi5UEUaOkZ7ZuXignKGoosZ-THFmezHiaiDRL1elCA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Metallica", source: "YouTube", artistID: "UCGexNm_Kw4rdQjLxmpb2EKw", img: "https://yt3.ggpht.com/OK8GWIespm2piEg-hSXMBf35O99v9X8JQVortW_sdtCzeC4dX3F004lWt2iX_jAKrc3TYDQCyfsWa2rEeA=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Nirvana", source: "YouTube", artistID: "UCrPe3hLA51968GwxHSZ1llw", img: "https://yt3.ggpht.com/6WUuIFTBnvgPsp_KduShfNWhe9DrdAwlxFupVKLjOj8eT857-MpFt1wFTRFoHw9WgFcqWOkc1kAxvTpL=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Pink Floyd", source: "YouTube", artistID: "UCO6LS_5W7vqG9mALDNzSFug", img: "https://yt3.ggpht.com/dYnVXw9DV25YWv6D0RIz4ykwbmxHiFMbZEtOTETo138XcEdBqCrTQSM9RoVQnxfVNvDZu5Ss9f-G8ysYnyI=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Queen", source: "YouTube", artistID: "UCEPMVbUzImPl4p8k4LkGevA", img: "https://yt3.ggpht.com/NApYslAVit5f9MJxsJ_GPg3TGjtND2FgKqb8eQ_pqpO-8Zx3pLdO4uU4ZX9l3acRFgSahBteHLrU-9JrCHE=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Rage Against the Machine", source: "YouTube", artistID: "UCg4nBubbzhYXjudOxPi9V7w", img: "https://yt3.ggpht.com/61S9hOjD4uf6F1u1ZSWKsHfIxTeeZWWJN3o5Najbako1w9HTWPLh3kiYK23fKf6aJZkZOGhdQIKqFdMsrw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The Rolling Stones", source: "YouTube", artistID: "UCNYhhkQqeFLUc-YEDcLpSYQ", img: "https://yt3.ggpht.com/vsjSbER8CTUBKtIN51QgLta48xfDAdeACP3Ai6CbN6EN4iD60XZUP6d0vfdIXWjoRLuHGafqikGMJqZdECc=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "Status Quo", source: "YouTube", artistID: "UC2oCil_CLZt9xh3FE73H8rg", img: "https://yt3.ggpht.com/WLfnZDxMRx3A5MAK7WjdKrAfBOVyuh5qxACP0VRTH8ZCdW-GhloDMq_OGE9-BNVyphDL-hLT_8RN9-cesw=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "System Of A Down", source: "YouTube", artistID: "UCDJftX2zx_UT_QSnBGIF96w", img: "https://yt3.ggpht.com/tDd7dCDigf3yca9JoLH1thUIWY3EcAUH9EzJS1MTcXq518-Qq_xMPthZbUuOUHAEgQn6gm76FAjhsEVf5g=s800-mo-c-c0xffffffff-rj-k-no" },
            { artist: "The Who", source: "YouTube", artistID: "UCpxn_sVrLQWNGFK1eulpYgw", img: "https://yt3.ggpht.com/L-DZ5QvIZtdWhjAfHsxaS9PqKKwpQYonGglKqJVo6jc55W0dNwSeW5bSrtNgHKzT8tYJwidgkhzUI-ygnHk=s800-mo-c-c0xffffffff-rj-k-no" }
          ]
        }
      ]
    }
  }
}
</script>

<style>
.bg-rp{
  background-repeat: repeat;
}
</style>
