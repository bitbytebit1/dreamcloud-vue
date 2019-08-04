export default {
  state: {
    current_playlist: [],
    current_index: -1,
    current_hash: '',
    show_pop: false,
    show_pop_list: false
  },
  mutations: {
    setNPlay(state, payload) {
      state.current_playlist = payload.songs
      state.current_index = payload.current
      state.current_hash = payload.path
    },
    current_playlist(state, payload) {
      state.current_playlist = payload
    },
    changeIndex(state, payload) {
      state.current_index = payload
    },
    show_pop(state, payload) {
      state.show_pop = payload
    },
    show_pop_list(state, payload) {
      state.show_pop_list = payload
    }
  },
  getters: {
    // show_pop_list: state => state.show_pop_list,
    // show_pop: state => state.show_pop,
    current_index: (state) => state.current_index,
    hash: (state) => state.current_hash,
    current_playlist: state => state.current_playlist,
    current_trackID: (state) => { return state.current_index > -1 ? state.current_playlist[state.current_index].trackID : '' },
    current_source: (state) => { return state.current_index > -1 ? state.current_playlist[state.current_index].source : '' },
    current_song: (state) => { return state.current_index > -1 ? state.current_playlist[state.current_index] : '' },
    next_song: (state) => { return state.current_index < 0 ? '' : state.current_index + 1 < state.current_playlist.length ? state.current_playlist[state.current_index + 1] : state.current_playlist[0] }
  }
}