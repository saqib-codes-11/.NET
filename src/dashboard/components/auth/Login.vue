<template>
  <div class="login-content">
    <h1>Welcome to DC Full Stack Challenge</h1>
    <b-form class="mt-5" @submit.prevent="login">
      <b-alert v-if="loginStatus" show variant="danger">{{ loginStatus }}</b-alert>
      <b-form-group id="username">
        <label for="feedback-user">Username</label>
        <b-form-input v-model="username" required></b-form-input>
      </b-form-group>
      <b-form-group id="password">
        <label for="feedback-user">Password</label>
        <b-form-input type="password" v-model="password" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    loginStatus() {
      return this.$accessor.auth.statusText;
    },
  },
  methods: {
    login() {
      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('password', this.password);
      this.$accessor.auth.login({ formData });
    },
  },
};
</script>
