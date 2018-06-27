<template>
	<div v-if="lyrics">
		<br>
		<a class="primary--background" :href="lyricsURL">{{ lyricsURL }}</a>
		<br>
		<div class="wordbreak preline">{{ lyrics }}</div>
	</div>
	<div v-else-if="bLoading">
		<a :href="`${lyricsServer}/search/${this.query}`">{{ `${lyricsServer}/search/${this.query}` }}</a>
		Loading lyrics...
	</div>
	<div v-else>
		<a :href="`${lyricsServer}/search/${this.query}`">{{ `${lyricsServer}/search/${this.query}` }}</a>
		<br>
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
			.replace(/Audio/g, '')
			.replace(/Official Video/g, '')
			.replace(/ HD /g, '')
			.replace(/Video/g, '')
			.replace(/Lyrics/g, '')
			.replace(/[^\w ]/g, '')
			.toLowerCase()
		}
	},
  methods: {
    getLyrics () {
			console.log('getting lyrics for', this.query)
			this.bLoading = true
			this.lyrics = ''
			// SEARCH USING CLEANED TITLE
			axios.get(`${this.lyricsServer}/search/${this.query}`).then((resp) => {
				var data = resp.data.data
				if (data.length) {
					// PARSE RESULTS, CHECK IF MATCHING TITLE
					var song = data.find((song) => {
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
						// PARSE RESULTS CHECKING ARTIST NAME
						var song = data.find((song) => {
							return this.query.indexOf(song.primary_artist.name.replace(/[^\w ]/g, '').toLowerCase()) > -1
						})
						if (song) {
							// SUCCESS, WE FOUND THE ARTIST, SCRUB ARTIST NAME FROM SEARCH STRING TO REDUCE FALSE POSITIVES
							var songName = this.query.replace(song.primary_artist.name.toLowerCase(), '')
							var f = (iPage) => {
								// GET ALL SONGS BY ARTIST
								axios.get(`${this.lyricsServer}/songsByArtist/${song.primary_artist.id}/${iPage}`).then((resp2) => {
									var data = resp2.data.data
									// FIND FOR SONG TITLE IN RESULTS
									var song2 = data.find((song) => {
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
										f(++iPage)
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
