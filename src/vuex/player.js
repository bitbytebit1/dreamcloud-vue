export default {
  state: {
    current_Playlist: [],
    current_Index: -1,
    current_Hash: '',
    show_pop: false
  },
  mutations: {
    setNPlay(state, payload) {
      state.current_Playlist = payload.songs
      state.current_Index = payload.current
      state.current_Hash = payload.path
    },
    current_Playlist(state, payload) {
      state.current_Playlist = payload
    },
    changeIndex(state, payload) {
      state.current_Index = payload
    },
    show_pop(state, payload) {
      state.show_pop = payload
    }
  },
  getters: {
    show_pop: state => state.show_pop,
    current_Playlist: state => state.current_Playlist,
    index: (state) => state.current_Index,
    hash: (state) => state.current_Hash,
    current_trackID: (state, getters) => { return getters.index > -1 ? getters.current_Playlist[getters.index].trackID : '' },
    current_source: (state, getters) => { return getters.index > -1 ? getters.current_Playlist[getters.index].source : '' },
    current_song: (state, getters) => { return getters.index > -1 ? getters.current_Playlist[getters.index] : '' },
    next_song: (state, getters) => { return getters.index == -1 ? '' : getters.index + 1 < getters.current_Playlist.length ? getters.current_Playlist[getters.index + 1] : getters.current_Playlist[0] }
  }
}