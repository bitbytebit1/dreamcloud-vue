import router from '../router'

export default {
  state: {
    drawLeft: true,
    drawRight: true,
    view_mode: false,
    auth_state: false,
    bShowStage: true,
    settings: {
      'Night Mode': false,
      'Video': true
    }
  },
  mutations: {
    drawRightTog (state) {
      state.drawRight = !state.drawRight
    },
    drawLeftTog (state, payload) {
      state.drawLeft = !state.drawLeft
    },
    // view_mode (state, payload) {
    //   state.view_mode = payload
    // },
    view_mode_toggle (state, payload) {
      state.view_mode = !state.view_mode
    },
    toggleStage (state, payload) {
      state.bShowStage = !state.bShowStage
      if (state.bShowStage) {
        router.push({name: 'stage'})
      } else {
        router.go(-1)
      }
    },
    bShowStage (state, payload) {
      state.bShowStage = payload
    },
    ytVideo (state, payload) {
      state.settings['Video'] = Boolean(payload)
    },
    authChange (state, payload) {
      state.auth_state = payload
    },
    changeSetting (state, payload) {
      state.settings[payload.setting] = payload.value
    }
  },
  getters: {
    drawRight: state => state.drawRight,
    drawLeft: state => state.drawLeft,
    view_mode: state => state.view_mode,
    bShowStage: state => state.bShowStage,
    auth_state: state => state.auth_state,
    ytVideo: state => Boolean(state.settings['Video']),
    nightMode: state => Boolean(state.settings['Night Mode']),
    theme: state => state.settings['Night Mode'] ? {'dark': true} : {'light': true}
  }
}
