<template>
  <div id="app">
    <div id="nav" class="container-fluid d-flex justify-content-center">
      <router-link to="/">Home</router-link> |
      <router-link v-if="user.uid" :to="{name: 'dashboard', params: {uid: user.uid}}">Dashboard</router-link> |
      <router-link v-if="!user.uid" :to="{name: 'sign-in'}">Sign in</router-link> 
      <button v-else class="btn btn-outline-info btn-secondary" @click="$store.dispatch('logout')">Logout</button>
    </div>
    <router-view class="container-fluid"/>
  </div>
</template>

<script>
export default {
name: 'app',
computed: {
  user() {
    return this.$store.state.user
  }
}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.h90 {
  min-height: 90vh;
}
</style>
