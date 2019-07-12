import router from '../router'

export default {
  state: {
    user: '',
    drawLeft: false,
    drawRight: false,
    view_mode: 0, // 0 GRID, 1 TABLE, 2 TABLE W PICS
    auth_state: false,
    bShowStage: false,
    isMobile: false
  },
  getters: {
    isMobile: state => state.isMobile,
    // auth_state: state => state.auth_state,
    // bShowStage: state => state.bShowStage,
    // drawLeft: state => state.drawLeft,
    // drawRight: state => state.drawRight,
    getUser: state => state.user,
    isAnon: state => state.user.isAnonymous,
    uid: state => state.user.uid,
    // view_mode: state => state.view_mode,
  },
  mutations: {
    isMobile (state, payload) { state.isMobile = payload },
    drawLeft (state, payload) { state.drawLeft = payload },
    drawRight (state, payload) { state.drawRight = payload },
    drawRightTog (state) { state.drawRight = !state.drawRight },
    drawLeftTog (state) { state.drawLeft = !state.drawLeft },
    view_mode_toggle (state) { 
      if (state.view_mode < 2) {
        state.view_mode++ 
      } else {
        state.view_mode = 0
      }
    },
    bShowStage (state, payload) { state.bShowStage = payload },
    setUser (state, payload) { state.user = payload },
    authChange (state, payload) { state.auth_state = payload },
    toggleStage (state) {
      state.bShowStage = !state.bShowStage
      if (state.bShowStage) {
        router.push({name: 'stage'})
      } else {
        router.go(-1)
      }
    }
  }
}
