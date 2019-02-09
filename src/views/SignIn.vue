<template>
  <div class="sign-in">
    <form v-if="!newUser" @submit.prevent="signIn()">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="user.email" required>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="user.password" required>
      <button type="submit">Register</button>
    </form>
    <form v-else @submit.prevent="signIn()">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="user.displayName" required>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="user.email" required>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="user.password" required>
      <button type="submit">Register</button>
    </form>
    <p
      @click="clearUser(); newUser = !newUser;"
    >{{newUser ? 'Already a member? Login' : 'No account yet? Register'}}</p>
  </div>
</template>
<script>
export default {
  name: "sign-in",
  data() {
    return {
      user: {
        displayName: "",
        email: "",
        password: ""
      },
      newUser: false
    };
  },
  methods: {
    signIn() {
      if (this.user.displayName) {
        this.$store.dispatch("register", this.user);
      } else {
        this.$store.dispatch("login", this.user);
      }
      this.clearUser();
    },
    clearUser() {
      this.user = {
        displayName: "",
        email: "",
        password: ""
      };
    }
  }
};
</script>
