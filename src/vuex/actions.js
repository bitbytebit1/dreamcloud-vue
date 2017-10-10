import * as types from './mutation-types'

export const updateSongIndex = ({ commit }, index) => {
  commit(types.SET_SONG_INDEX, index)
}

export const setNoIndex = ({ commit }) => {
  commit(types.NO_INDEX)
}

export const incrementSongIndex = ({ commit }) => {
  commit(types.INCREMENT_INDEX)
}
