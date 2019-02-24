import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import db from './utils/firebaseInit'
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    posts: [],
    comments: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      console.log('user object', user)
    },
    setPosts(state, posts) {
      state.posts = posts
    },
    setComments(state, comments) {
      state.comments = comments
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
          console.log(posts)
          commit('setPosts', posts)
        })
    },
    updatePost({commit, dispatch}, post) {
      db.doc('posts/' + post.id).update(post)
        .then(() => alert('updated post!'))
    },
    addComment({commit, dispatch}, payload) {
      db.collection(`posts/${payload.postId}/comments`).add(payload.comment)
        .then(res => {
          dispatch('getComments', payload.postId)
        })
    },
    getComments({commit}, postId) {
      db.collection(`posts/${postId}/comments`).get()
        .then(snapShot => {
          let comments = []
          snapShot.forEach(docRef => {
            let c = docRef.data()
            c.id = docRef.id
            comments.push(c)
          })
          commit('setComments', comments)
        })
    }
  },
  getters : {
    IsAuthor: () => (id) => {
      return id == firebase.auth().currentUser.uid
    },
    AuthorCreds() {
      let user = firebase.auth().currentUser
      return {
        displayName: user.displayName,
        uId: user.uid
      }
    }
  }
})

