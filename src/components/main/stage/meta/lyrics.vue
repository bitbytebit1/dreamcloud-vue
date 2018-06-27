<template>
	<div v-if="lyrics" >
		<!-- <a :href="`${lyricsServer}/search/${this.query}`">{{ `${lyricsServer}/search/${this.query}` }}</a><br> -->
		<a class="primary--background" :href="lyricsURL">{{ lyricsURL }}</a><br>
		<div class="wordbreak preline">{{ lyrics }}</div>
	</div>
	<div v-else-if="bLoading" class="grey--text text-darken-2">
		<!-- <a :href="`${lyricsServer}/search/${this.query}`">{{ `${lyricsServer}/search/${this.query}` }}</a><br> -->
		Loading lyrics...
	</div>
	<div v-else class="grey--text text-darken-2">
		<!-- <a :href="`${lyricsServer}/search/${this.query}`">{{ `${lyricsServer}/search/${this.query}` }}</a><br> -->
		No lyrics available
	</div>
</template>
<script>
import axios from 'axios'
// /* eslint-disable */
export default {
  name: 'lyrics',
	props: ['title', 'artist'],
	watch: {
		query: {
			immediate: true,
			handler: 'getLyrics'
		}
	},
  data () {
    return {
			lyricsServer: 'https://dc-nodejs-backend-ogxsxzvffx.now.sh/api/v1',
			bLoading: false,
			lyrics: '',
			lyricsURL: ''
		}
	},
	computed: {
		query () {
			return this.title
			.replace(/Audio/gi, '')
			.replace(/Official Audio/gi, '')
			.replace(/Video/gi, '')
			.replace(/Music Video/gi, '')
			.replace(/Official Video/gi, '')
			.replace(/Official Music Video/gi, '')
			.replace(/ HD /gi, '')
			.replace(/Lyrics/gi, '')
			.replace(/[^\w ]/gi, '')
			.toLowerCase()
		}
	},
  methods: {
    getLyrics () {
			var titleBkp  = this.title
			// console.log('getting lyrics for', this.query, this.$parent.$options._componentTag)
			this.bLoading = true
			this.lyrics = ''
			// SEARCH USING CLEANED TITLE
			axios.get(`${this.lyricsServer}/search/${this.query}`).then((resp) => {
				var resp = resp.data.data
				if (resp.length) {
					// PARSE RESULTS, CHECK IF MATCHING TITLE
					var song = resp.find((song) => {
						return this.query.indexOf(song.title.replace(/[^\w ]/g, '').toLowerCase()) > -1
					})
					if (song) {
						// GET LYRICS FOR MATCHED SONG
						axios.get(`${this.lyricsServer}/lyrics/${song.id}`).then((resp) => {
							this.lyrics = resp.data.data.lyrics
							this.lyricsURL = resp.data.data.url
							this.bLoading = false
						})
					// DARKWING WORKAROUND
					} else {
						console.log('darkwing')
						// PARSE RESULTS CHECKING ARTIST NAME AGAINST QUERY
						var artist = resp.find((item) => {
							return this.query.indexOf(item.primary_artist.name.replace(/[^\w ]/g, '').toLowerCase()) > -1
						})
						if (artist) {
							// SUCCESS, WE FOUND THE ARTIST, SCRUB ARTIST NAME FROM QUERY TO REDUCE FALSE POSITIVES
							var songName = this.query.replace(artist.primary_artist.name.toLowerCase(), '')
							var f = (iPage) => {
								// GET ALL SONGS BY ARTIST
								axios.get(`${this.lyricsServer}/songsByArtist/${song.primary_artist.id}/${iPage}`).then((resp2) => {
									var resp2 = resp2.data.data
									// FIND FOR SONG TITLE IN RESULTS
									var song2 = resp2.find((song) => {
										return songName.indexOf(song.title.replace(/[^\w ]/g, '').toLowerCase()) > -1
									})
									// IF NO LUCK, TRY AGAIN
									if (song2) {
										axios.get(`${this.lyricsServer}/lyrics/${song2.id}`).then((resp3) => {
											this.lyrics = resp3.data.data.lyrics
											this.lyricsURL = resp3.data.data.url
											this.bLoading = false
										})
									} else {
										// SANITY CHECK
										if (titleBkp === this.title) {
											f(++iPage)
										} else {
											console.log('INSANE')
										}
									}
								}).catch((err) => {
									console.log('error', err)
								})
							}
							f(1)
						} else {
							this.bLoading = false
						}
					}
				} else {

					this.bLoading = false
				}
			})
    }
  }
}
</script>

<style>
</style>
