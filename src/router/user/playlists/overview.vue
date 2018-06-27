<template>
	<v-flex flexbox xs12 lg10>
		<v-container fluid grid-list-md>
			<v-flex xs12 >
				<!-- filter -->
				<v-text-field
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
				></v-text-field>
			</v-flex>
			<v-data-iterator
				v-if="$store.getters.auth_state"
				content-tag="v-layout"
				row
				wrap
				class=""
				:items="aPlaylist"
				:search="search"
				:rows-per-page-items="rowsPerPageItems"
				:custom-filter="(items, search, filter) => { search = search.toString().toLowerCase() ; return items.filter(row => filter(row['name_lower'], search)) }"
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
					<v-card class="pointer" :to="{name: 'userPlaylist', params: {user: $DCFB.UID, playlist: props.item['.key'], name: props.item.name}}" >
						<v-card-media :src="props.item.songs[Object.keys(props.item.songs)[0]].poster" height="200px">
							<span class="songLeng">{{Object.keys(props.item.songs).length}}</span>
						</v-card-media>
						<v-card-text class="text-xs-center">{{ props.item.name }}</v-card-text>

					</v-card>
				</v-flex>
			</v-data-iterator>
		</v-container>
	</v-flex>
</template>
<script>
// /* eslint-disable */
// import deleteButton from '@/components/misc/delete-button'
export default {
  name: 'playlistOverview',
  props: ['user'],
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
    this.bind()
  },
  methods: {
    bind () {
      this.$bindAsArray('aPlaylist', this.$DCFB.playlistGetAll(this.user).orderByChild('name_lower'))
    }
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
