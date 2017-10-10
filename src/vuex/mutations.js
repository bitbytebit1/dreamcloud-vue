import * as types from './mutation-types'

export default {
  [types.SET_SONG_INDEX] (state, { index }) {
    setIndex(state, index)
  },
  [types.NO_INDEX] (state) {
    state.songIndex = -1
  },
  [types.INCREMENT_INDEX] (state) {
    state.songIndex++
  }
}

function setIndex (state, index) {
  state.songIndex = index
}
