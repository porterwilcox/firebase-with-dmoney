import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from './utils/firebaseInit'
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    posts: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      console.log('user object', user)
    },
    setPosts(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    //AUTH
    authenticate({ commit, dispatch }) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          if (user.emailVerified) {
            router.push({ name: 'dashboard', params: { uid: user.uid } })
            dispatch('getPosts')
          } else {
            dispatch('validateEmail')
          }
          commit('setUser', user)
        } else {
          router.push({ name: 'sign-in' })
        }
      })
    },
    login({ commit }, user) {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(user.email, user.password)
        .then(res => {
          commit('setUser', res.user)
          router.push({ name: 'dashboard', params: { uid: res.user.uid } })
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
    validateEmail({ }) {
      router.push({ name: 'verify-email' })
      firebase.auth().currentUser.sendEmailVerification({
        url: 'http://localhost:8080/'
      })
        .then(() => {
          console.log('verification email sent')
        })
    },
    logout({ commit }) {
      firebase.auth().signOut()
        .then(() => {
          console.log('successfully logged out!')
          commit('setUser', {})
        })
        .catch(e => console.error(e))
    },
    //POSTS
    newPost({ dispatch }, post) {
      db.collection('posts').add(post)
        .then(res => {
          console.log('post successfull created!', res)
          dispatch('getPosts')
        })
    },
    getPosts({ commit }) {
      db.collection('posts').get()
        .then(snapShot => {
          let posts = []
          snapShot.forEach(docRef => {
            let post = docRef.data()
            post.id = docRef.id
            posts.push(post)
          })
          commit('setPosts', posts)
        })
    }
  }
})

