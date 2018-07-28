<template>
  <div class="?">
    <div class="headline fwl text-xs-left pl-2 pt-2">American Hip Hop</div>
    <v-data-iterator
      content-tag="v-layout"
      row
      wrap
      hide-actions
      no-results-text="zzz"
      :items="items2"
      :rows-per-page-items='[24, 50, 100, { text: "All", value: -1 }]'
      :pagination.sync="pagination"
    > 
    <v-flex xs12 lg2 slot="item" slot-scope="props">
      <v-card flat :to="{name: 'artist', params: {source: props.item.source, artist: props.item.artist, artistID: props.item.artistID }}">
        <v-card-media
          :src="props.item.img"
          height="200px"
        ></v-card-media>
        <v-card-title>
          <h3 class="title fwl mb-0 text-xs-center">{{props.item.artist}}</h3>
        </v-card-title>
        <v-card-actions>
          <subscribe-button :artistID="props.item.artistID" :source="props.item.source" :artist="props.item.artist" :img="props.item.img"></subscribe-button>
        </v-card-actions>
      </v-card>
    </v-flex>
    </v-data-iterator>
  </div>
</template>
<script>
/* eslint-disable */
import deleteButton from '@/components/buttons/delete-button'
import subscribeButton from '@/components/buttons/subscribe-button'
export default {
  name: 'genres',
  components: {
    'subscribe-button': subscribeButton
  },
  data () {
    return {
      pagination: {
        rowsPerPage: -1
      },
      search: '',
      items: [
        {artist:"Acid Jazz", artistID:"UCdDX7j-8t09x1I_NynhiT-g", img:"https://yt3.ggpht.com/-l0Im1Sv6cmg/AAAAAAAAAAI/AAAAAAAAAAA/AmNp0yNn5QA/s800-c-k-no-mo-rj-c0xffffff/photo.jpg", source:"YouTube"},
        {artist: "Jazz", source: "YouTube", artistID: "UC7KZmdQxhcajZSEFLJr3gCg", img: "https://yt3.ggpht.com/-zgBeAdbDnDc/AAAAAAAAAAI/AAAAAAAAAAA/qLNni1V21QY/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"}
      ],
      items2: [
        { artist: "André 3000 ", source: "YouTube", artistID: "UCqmZ-EtD-ExXjF9Y28LbN2w", img: "https://yt3.ggpht.com/-89uYsz5Ncg0/AAAAAAAAAAI/AAAAAAAAAAA/WwFCq0s23XE/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "A Tribe Called Quest ", source: "YouTube", artistID: "UCiOPPAw9e2Fj-i2uMNpoRNQ", img: "https://yt3.ggpht.com/-rre4QQJR4fI/AAAAAAAAAAI/AAAAAAAAAAA/KiZtoLItS54/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Biggie", source: "YouTube", artistID: "UCczXQ2ehGOS2U2UnR8rY3Hg", img: "https://yt3.ggpht.com/-zwF-wkDznZA/AAAAAAAAAAI/AAAAAAAAAAA/JGKUyFA6kSM/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Chance The Rapper ", source: "YouTube", artistID: "UC5w8FMeCcC6DG2oWjGgyHKQ", img: "https://yt3.ggpht.com/-gXR4QZRwaM8/AAAAAAAAAAI/AAAAAAAAAAA/XvqeyTEf0Ec/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Childish Gambino ", source: "YouTube", artistID: "UC4hvOh5lgkeAJoVRIg40Kgg", img: "https://yt3.ggpht.com/-dDnswIdzYy0/AAAAAAAAAAI/AAAAAAAAAAA/6ckYCiLuzaE/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Eminem", source: "YouTube", artistID: "UCedvOgsKFzcK3hA5taf3KoQ", img: "https://yt3.ggpht.com/--xXeTBXLPxg/AAAAAAAAAAI/AAAAAAAAAAA/nlYuc-4khFI/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Fat Joe ", source: "YouTube", artistID: "UCvujFDDYFSt0uu_aTxuVEIg", img: "https://yt3.ggpht.com/-mOmzMxTQ94k/AAAAAAAAAAI/AAAAAAAAAAA/LkZRcgZ02QE/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Ghostface Killah ", source: "YouTube", artistID: "UC9BR9FK85Ez13EZ34Z5yZnw", img: "https://yt3.ggpht.com/-F5M39eFV5eU/AAAAAAAAAAI/AAAAAAAAAAA/_SCTFhmxwOc/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Jay-Z", source: "YouTube", artistID: "UCbJG1HvzgzaMe_15xfiUyWw", img: "https://yt3.ggpht.com/-8YpxFUUY-TM/AAAAAAAAAAI/AAAAAAAAAAA/LEOdbUCU4GI/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Kanye West ", source: "YouTube", artistID: "UCRY5dYsbIN5TylSbd7gVnZg", img: "https://yt3.ggpht.com/-Ugk0XEFMnYw/AAAAAAAAAAI/AAAAAAAAAAA/871SBFT4r_M/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "KRS-One ", source: "YouTube", artistID: "UCA2w3yf1BlliMJoaT-vFqaA", img: "https://yt3.ggpht.com/-57spDHSpFt4/AAAAAAAAAAI/AAAAAAAAAAA/Dui6NJJzXJY/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Kendrick Lamar", source: "YouTube", artistID: "UCprAFmT0C6O4X0ToEXpeFTQ", img: "https://yt3.ggpht.com/-U4IAIqF-0Ds/AAAAAAAAAAI/AAAAAAAAAAA/DBxpvCtz_Og/s800-c-k-no-mo-rj-c0xffffff/photo.jpg "},
        { artist: "Lupe Fiasco ", source: "YouTube", artistID: "UCe872mgP4deADPnXtkbS-Cg", img: "https://yt3.ggpht.com/-2uA_GG9CQcI/AAAAAAAAAAI/AAAAAAAAAAA/X1F0VBxNKrw/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },{ artist: "J. Cole ", source: "YouTube", artistID: "UC0ajkOzj8xE3Gs3LHCE243A", img: "https://yt3.ggpht.com/-zQD5wWXbLGo/AAAAAAAAAAI/AAAAAAAAAAA/f1btzqOIw44/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Meek Mill", source: "YouTube", artistID: "UC9HlWVtENbiMQzVRmnbJxtw", img: "https://yt3.ggpht.com/-JQ7o4jFezHg/AAAAAAAAAAI/AAAAAAAAAAA/r4jOdHvDj1o/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "MF Doom ", source: "YouTube", artistID: "UCooTDYkIERWBwDC1JKyoElQ", img: "https://yt3.ggpht.com/-gr_qUgstg8w/AAAAAAAAAAI/AAAAAAAAAAA/lpoKpV4apPg/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Mos Def ", source: "YouTube", artistID: "UChAY_qKqbGyqau8q1gXkzww", img: "https://yt3.ggpht.com/-YEFnc6Z03oc/AAAAAAAAAAI/AAAAAAAAAAA/r-RivCPh0Bk/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Nas ", source: "YouTube", artistID: "UCPoQYATXIYvN5WB0c4f6jfQ", img: "https://yt3.ggpht.com/-Ikwhe8HZwSU/AAAAAAAAAAI/AAAAAAAAAAA/U01pYxjJTvc/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Raekwon ", source: "YouTube", artistID: "UC5xA-S_yp5X9nRWM8d-Iheg", img: "https://yt3.ggpht.com/-r4165cAY23U/AAAAAAAAAAI/AAAAAAAAAAA/AmyTSrSHMgs/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Rakim - Topic", source: "YouTube", artistID: "UCFMS1sbij1WaZzZpnBDCs3A", img: "https://yt3.ggpht.com/-dq4gbVN1SnY/AAAAAAAAAAI/AAAAAAAAAAA/fOrEIHoG6HU/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "RZA ", source: "YouTube", artistID: "UCS9E7hCpXnbB-UFlLXgGC6g", img: "https://yt3.ggpht.com/-AJsO62potYE/AAAAAAAAAAI/AAAAAAAAAAA/uMynUQZl1Wk/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Tyler, the Creator ", source: "YouTube", artistID: "UCcLpRCcpXhhftxKu6rXGhsw", img: "https://yt3.ggpht.com/-Vehq0Eg8ybs/AAAAAAAAAAI/AAAAAAAAAAA/1w2E-AaKXe0/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Tupac Shakur ", source: "YouTube", artistID: "UC5RrGzC-JXglhFW5NhT4r6w", img: "https://yt3.ggpht.com/-TqUchB3TfFU/AAAAAAAAAAI/AAAAAAAAAAA/IQNJFO3JQuI/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" },
        { artist: "Wu-Tang Clan ", source: "YouTube", artistID: "UCdQKMtGgbbahJWE3rkPaGoA", img: "https://yt3.ggpht.com/-9OpDgAUuxXA/AAAAAAAAAAI/AAAAAAAAAAA/B72BZk-XfBo/s800-c-k-no-mo-rj-c0xffffff/photo.jpg" }
      ]
    }
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
</style>
