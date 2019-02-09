import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() { store.dispatch('authenticate') },
  render: function (h) { return h(App) }
}).$mount('#app')
