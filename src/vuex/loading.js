export default {
  state: {
    loadValue: 0,
    loadIndeterm: false,
    loadActive: false
  },
  mutations: {
    loadActive (state, payload) { state.loadActive = payload },
    loadValue (state, payload) { state.loadValue = payload },
    loadIndeterm (state, payload) { state.loadIndeterm = payload }
  },
  getters: {
    loadActive: (state) => { return state.loadActive },
    loadValue: (state) => { return state.loadValue },
    loadIndeterm: (state) => { return state.loadIndeterm }
  },
  actions: {
    loadIndeterm (context, payload) {
      // console.log(context)
      // if set loading
      if (payload) {
        let load = () => {
          context.commit('loadIndeterm', payload)
          // if first time, show the bar
          if (!context.getters.loadActive && context.getters.loadValue === 0) {
            context.commit('loadActive', true)
          }
          // every 250 add 1
          let timeout = setInterval(() => {
            // incre load val, only if loading and until 75%
            if (context.getters.loadValue < 88 && context.getters.loadIndeterm) {
              // console.log('incre loadVal', context.getters.loadValue + 1)
              context.commit('loadValue', context.getters.loadValue + 1)
            // looks like we're stuck, stop counting up.
            } else {
              // console.log('stop counting', context.getters.loadValue)
              clearInterval(timeout)
            }
          }, 12)
        }
        // console.log('LOADING')
        // if already started
        if (context.getters.loadIndeterm && payload) {
          context.commit('loadValue', 0)
          // console.log('already started, going back to 0')
          setTimeout(() => {
            load()
          }, 420)
        } else {
          load()
        }
      } else {
        if (!context.getters.loadIndeterm && !payload) {
          context.commit('loadValue', 0)
          // console.log('already stopped')
        } else {
          // console.log('STOP LOADING')
          context.commit('loadIndeterm', payload)
          // We're done!=
          // console.log('setting 100')
          context.commit('loadValue', 100)
          setTimeout(() => {
            // after 1 second hide the bar and reset counter
            // console.log('hiding')
            context.commit('loadActive', false)
            setTimeout(() => {
              // if still loading false reset to 0
              if (!context.getters.loadIndeterm) {
                // console.log('resetting counter')
                context.commit('loadValue', 0)
              }
            }, 250)

            // use this timeout to just hide the loading bar on complete instead of going back to zero
            // setTimeout(() => {
            // }, 250)
          }, 600)
        }
      }
      // context.state
      // context.getters
      // context.commit
      // SET TIMEOUT EVERY 250MS INCREMENT loadValue
    }
  }
}
