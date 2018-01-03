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
    current_Playlist: (state) => { return state.current_Playlist },
    index: (state) => { return state.current_Index },
    hash: (state) => { return state.current_Hash },
    current_trackID: (state, getters) => { return getters.index > -1 ? getters.current_Playlist[getters.index].trackID : '' },
    current_source: (state, getters) => { return getters.index > -1 ? getters.current_Playlist[getters.index].source : '' },
    current_song: (state, getters) => { return getters.index > -1 ? getters.current_Playlist[getters.index] : '' }
  }
}
