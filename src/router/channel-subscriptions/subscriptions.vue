<template>
	<v-flex xs12 lg12>
		<v-card>
			<v-card-title class="ma-0 pa-0">
				<!-- <v-container fluid grid-list-md> -->
				<v-flex xs12>
					<!-- filter -->
					<v-text-field
						@focus="filterHasFocus = true"
						@blur="filterHasFocus = false"
						color="primary"
						v-on:keyup.enter="$UTILS.closeSoftMobi()"
						v-model="search"
						id="flr-txt"
						label="Filter"
						ref="search"
						class="mr-4 ml-4 mb-3"
						clearable
						single-line
						hide-details
					></v-text-field>
				</v-flex>
			</v-card-title>
			<v-data-iterator
				v-if="$store.getters.auth_state"
				content-tag="v-layout"
				row
				wrap
				:items="aSubs"
				:search="search"
				:rows-per-page-items="rowsPerPageItems"
				:custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter(row['artist'], search)) }"
				pagination.sync="pagination"
				hide-actions
			>
				<v-flex
					slot="item"
					slot-scope="props"
					xs12
					sm6
					md4
					lg12
					class="artist-card"
				>
					<!-- <v-card :to="{name: 'userPlaylist', params: {user: $route.params['user'], playlist: $route.params['playlist'], name: $route.params['name'] }}" class="pointer"> -->
					<v-card  class="pointer dc-crd" :to="{name: 'artist', params: {source: props.item.source, artist: props.item.artist, artistID: props.item.artistID }}">
						<v-layout row>
							<v-flex xs4>
								<v-card-media
									:src="props.item.img"
									:key="props.item.img"
									height="200px"
								></v-card-media>
								<!-- <v-badge right  color="red">
                  <span slot="badge">{{props.item.newItemCount}}</span>
                </v-badge> -->
							</v-flex>
							<v-flex xs8>
								<div class="h200 text-xs-left pl-4 pr-4">
									<div class="headline">{{ props.item.artist }}</div>
									<div class="grey--text">Uploads {{props.item.numberOfSongs}}</div>
									<div class="">{{props.item.description}}</div>
									<!-- <div>{{props.item.numberOfSongs}}</div> -->
								</div>
							</v-flex>
						</v-layout>

					</v-card>
				</v-flex>
			</v-data-iterator>
		</v-card>
		<!-- </v-container> -->
	</v-flex>
</template>
<script>
// /* eslint-disable */
// import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'userSubOverview',
  props: ['aSubs'],
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
  }
}
</script>

<style>
.h200{
  height: 200px;
}
/* .artist-card{ */
  /* min-width: 303px; */
/* } */
</style>
