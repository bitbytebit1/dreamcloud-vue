<template>
	<v-flex xs12 lg12>
		<v-card>
			<v-card-title class="ma-0 pa-0">
				<v-flex xs12 >
					<!-- filter -->
					<v-text-field
						prepend-icon="filter_list"
						@focus="filterHasFocus = true"
						@blur="filterHasFocus = false"
						color="primary"
						id="flr-txt"
						label="Filter"
						single-line
						hide-details
						v-model="search"
						v-on:keyup.enter="$UTILS.closeSoftMobi()"
						ref="search"
						class="pb-2 mr-5 pr-5  "
					></v-text-field>
				</v-flex>
			</v-card-title>
			<v-data-iterator
				content-tag="v-layout"
				row
				wrap
				class=""
				:items="aPlaylist"
				:search="search"
				:rows-per-page-items="rowsPerPageItems"
				:custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter(row['title'], search)) }"
				pagination.sync="pagination"
				hide-actions
			>
				<v-flex
					slot="item"
					slot-scope="props"
					xs12
					sm6
					md4
					lg3
				>
					<!-- {{props.item['.key']}} -->
					<!-- {{props.item.name_lower}} -->
					<!-- {{props.item.songs[Object.keys(props.item.songs)[0]].poster}} -->
					<!-- Object.keys(aPlaylist[props.index].songs)[0] -->
					<v-card class="pointer dc-crd" :to="{name: 'channelPlaylist', params: {listID: props.item.listID, artistID: props.item.artistID, title: props.item.title, source: props.item.source}}" >
						<v-card-media :src="props.item.img" height="200px">
							<span class="songLeng">{{props.item.numberOfSongs}}</span>
						</v-card-media>
						<v-card-text class="text-xs-center subheading">{{ props.item.title }}</v-card-text>
					</v-card>
				</v-flex>
			</v-data-iterator>
		</v-card>
	</v-flex>
</template>
<script>
// /* eslint-disable */
// import deleteButton from '@/components/buttons/delete-button'
export default {
  name: 'playlistOverview',
  props: ['aPlaylist'],
  data () {
    return {
      filterHasFocus: false,
      search: '',
      active: true,
      rowsPerPageItems: [{ text: 'All', value: -1 }],
      pagination: {
        rowsPerPage: 'All'
      }
    }
  },
  created () {
    // this.bind()
  }
}
</script>

<style>
.songLeng{
  color: white;
  text-shadow: 0px 0px 5px black;
  background: rgba(1, 1, 1, .5);
  position: absolute;
  bottom: 0px;
  right: 0px;
}
</style>
