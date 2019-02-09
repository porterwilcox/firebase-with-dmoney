import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from './utils/firebaseInit'
import router from './router'
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
    authenticate({commit, dispatch}) {
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          if (user.emailVerified) {
            commit('setUser', user)
            router.push({name: 'dashboard', params: {uid: user.uid}})
          } else {
            dispatch('validateEmail')
          }
        } else {
          router.push({name: 'sign-in'})
        }
      })
    },
    login({commit}, user) {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(user.email, user.password)
        .then(res => {
          commit('setUser', res.user)
          router.push({name: 'dashboard', params: {uid: res.user.uid}})
        })
        .catch(e => console.error(e))
    },
    register({ dispatch }, user) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          firebase.auth().currentUser.updateProfile({ displayName: user.displayName })
          dispatch('validateEmail')
        })
    },
    validateEmail({}) {
      router.push({name: 'verify-email'})
      firebase.auth().currentUser.sendEmailVerification({
        url: 'http://localhost:8080/'
      })
        .then(() => {
          console.log('verification email sent')
        })
    }
  }
})

