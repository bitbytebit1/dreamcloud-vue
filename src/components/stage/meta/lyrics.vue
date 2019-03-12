<template>
  <v-card>
    <v-card-title v-if="lyrics">
      <div class="wordbreak preline">
        <a 
          :href="lyricsURL" 
          class="primary--background"
        >{{ lyricsURL }}</a>
        <br>
        {{ lyrics }}
      </div>
    </v-card-title>

    <v-card-title v-else-if="bLoading">
      <!-- <a :href="`${lyricsServer}/search/${this.query}`">{{ `${lyricsServer}/search/${this.query}` }}</a><br> -->
      {{ loadingText + loadingTextAppend }}
    </v-card-title>

    <v-card-title v-else-if="iTried">
      No lyrics available
    </v-card-title>
  
    <v-card-title 
      v-else 
      class="pointer" 
      @click="(getLyrics)"
    >
      Click to load lyrics
    </v-card-title>
  </v-card>

</template>
<script>
import axios from 'axios'
// /* eslint-disable */
export default {
  name: 'Lyrics',
  props: {
    title: {
      type: String,
      default: ''
    },
    artist: {
      type: String,
      default: ''
    },
    getEm: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    title: {
      immediate: true,
      handler: 'reset'
    },
    getEm: {
      handler: 'getLyrics'
    }
  },
  data () {
    return {
      iTried: false,
      lyricsServer: 'https://dc-nodejs-backend-ogxsxzvffx.now.sh/api/v1',
      bLoading: false,
      lyrics: '',
      lyricsURL: '',
      loadingTextAppend: '',
      loadingText: 'Loading lyrics'
    }
  },
  computed: {
    query () {
      return this.title
        .replace(/Official Music Video/gi, '')
        .replace(/Official Audio/gi, '')
        .replace(/Official Video/gi, '')
        .replace(/Music Video/gi, '')
        .replace(/Audio/gi, '')
        .replace(/Video/gi, '')
        .replace(/ HD /gi, '')
        .replace(/Lyrics/gi, '')
        .replace(/[^\w ]/gi, '')
        .toLowerCase()
    }
  },
  methods: {
    reset () {
      this.bLoading = false
      this.lyrics = ''
      this.iTried = false
    },
    animateText () {
      if (this.loadingTextAppend.length === 3) {
        this.loadingTextAppend = ''
      } else {
        this.loadingTextAppend += '.'
      }
    },
    fail (intv) {
      this.iTried = true
      this.bLoading = false
      clearInterval(intv)
    },
    getLyrics () {
      if (!this.lyrics) {
        var title = this.title
        this.bLoading = true
        this.lyrics = ''
        var intv = setInterval(this.animateText, 500)
        // GET CLEANED TITLE
        axios.get(`https://api.alltomp3.org/v1/guess-track/${encodeURIComponent(title)}`).then((resp1) => {
          // SET CLEANED TITLE
          if (resp1.data.title && resp1.data.artistName) {
            title = resp1.data.title + ' ' + resp1.data.artistName
          } else {
            title = this.query
          }
          title = title.toLowerCase()

          // SEARCH WITH CLEANED TITLE
          axios.get(`${this.lyricsServer}/search/${title}`).then((resp2) => {
            resp2 = resp2.data.data
            if (resp2.length) {
              // PARSE RESULTS, CHECK IF MATCHING TITLE
              var song = resp2.find((song) => {
                return title.indexOf(song.title.toLowerCase()) > -1
              })
              // SUCCESS, GET LYRICS
              if (song) {
                // GET LYRICS FOR MATCHED SONG
                axios.get(`${this.lyricsServer}/lyrics/${song.id}`).then((resp3) => {
                  this.lyrics = resp3.data.data.lyrics
                  this.lyricsURL = resp3.data.data.url
                  clearInterval(intv)
                }).catch(() => {
                  this.fail(intv)
                })
              // DARKWING METHOD
              } else {
                // console.log('dw')
                // PARSE RESULTS CHECKING ARTIST NAME AGAINST QUERY
                var artist = resp2.find((item) => {
                  return title.indexOf(item.primary_artist.name.toLowerCase()) > -1
                })
                if (artist) {
                  // SUCCESS, WE FOUND THE ARTIST, SCRUB ARTIST NAME FROM QUERY TO REDUCE FALSE POSITIVES
                  var songName = title.toLowerCase().replace(artist.primary_artist.name.toLowerCase(), '')
                  var f = (iPage) => {
                    // GET ALL SONGS BY ARTIST
                    axios.get(`${this.lyricsServer}/songsByArtist/${artist.primary_artist.id}/${iPage}`).then((resp2) => {
                      resp2 = resp2.data.data
                      if (resp2.length) {
                        // FIND FOR SONG TITLE IN RESULTS
                        var song2 = resp2.find((item) => {
                          // console.log(songName, item.title)
                          return songName.indexOf(item.title.replace(/[^\w ]/g, '').toLowerCase()) > -1
                        })
                        // SUCCESS GET LYRICS
                        if (song2) {
                          axios.get(`${this.lyricsServer}/lyrics/${song2.id}`).then((resp3) => {
                            this.lyrics = resp3.data.data.lyrics
                            this.lyricsURL = resp3.data.data.url
                            this.bLoading = false
                            clearInterval(intv)
                          }).catch(() => {
                            // console.log('error', err)
                          })
                        } else {
                          // TRY AGAIN
                          // SANITY CHECK
                          if (this.bLoading) {
                            f(++iPage)
                          } else {
                            this.fail(intv)
                          }
                        }
                      } else {
                        this.fail(intv)
                      }
                    }).catch(() => {
                      this.fail(intv)
                    })
                  }
                  f(1)
                } else {
                  this.fail(intv)
                }
              }
            } else {
              this.fail(intv)
            }
          }).catch(() => {
            this.fail(intv)
          })
        })
      }
    }
  }
}
</script>

<style>
</style>
