import router from '../router'

export default {
  state: {
    user: '',
    drawLeft: true,
    drawRight: true,
    view_mode: false,
    auth_state: false,
    bShowStage: true,
    settings: {
      'Night Mode': true,
      'Video': true
    }
  },
  mutations: {
    drawRightTog (state) {
      state.drawRight = !state.drawRight
    },
    drawLeftTog (state) {
      state.drawLeft = !state.drawLeft
    },
    // view_mode (state, payload) {
    //   state.view_mode = payload
    // },
    view_mode_toggle (state) {
      state.view_mode = !state.view_mode
    },
    toggleStage (state) {
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
    setUser (state, payload) {
      state.user = payload
    },
    authChange (state, payload) {
      state.auth_state = payload
    },
    changeSetting (state, payload) {
      state.settings[payload.setting] = payload.value
    }
  },
  getters: { 
    isAnon: state => state.user.isAnonymous,
    getUser: state => state.user,
    uid: state => state.user.uid,
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
