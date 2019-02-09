import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from './utils/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      console.log(user)
    }
  },
  actions: {
    register({ commit, dispatch }, user) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          debugger
          commit('setUser', res.user)
          firebase.auth().currentUser.updateProfile({ displayName: user.displayName })
        })
    }
  }
})
