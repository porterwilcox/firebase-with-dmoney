import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: function () { 
        return import('./views/About.vue')
      }
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: function () { 
        return import('./views/SignIn.vue')
      }
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: function () { 
        return import('./views/VerifyEmail.vue')
      }
    },
    {
      path: '/dashboard/?user=:uid',
      name: 'dashboard',
      component: function () { 
        return import('./views/Dashboard.vue')
      }
    },
    {
      path: '/post/:pId',
      name: 'post',
      component: function () { 
        return import('./views/Post.vue')
      }
    }
  ]
})
