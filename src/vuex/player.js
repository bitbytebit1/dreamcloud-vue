export default {
  state: {
    current_Playlist: [],
    current_Index: -1,
    current_Hash: ''
  },
  mutations: {
    setNPlay (state, payload) {
      state.current_Playlist = payload.songs
      state.current_Index = payload.current
      state.current_Hash = payload.path
    },
    changeIndex (state, payload) {
      state.current_Index = payload
    }
  },
  getters: {
    current_Playlist: state => state.current_Playlist,
    current_source: (state, getters) => { return getters.index > -1 ? getters.current_Playlist[getters.index].source : '' },
    current_song: (state, getters) => { return getters.current_Playlist.current_Playlist[getters.index] },
    index: state => state.current_Index,
    hash: state => state.current_Hash
  }
}
