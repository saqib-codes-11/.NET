<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand href="#">DC Challenge</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse v-if="isAuthenticated" id="nav-collapse" is-nav>
      <b-navbar-nav>
        <nuxt-link class="nav-link" to="/authors">Authors</nuxt-link>
        <nuxt-link class="nav-link" to="/books">Books</nuxt-link>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item @click="handleLogout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$accessor.auth.isAuthenticated;
    },
  },
  methods: {
    async handleLogout() {
      await this.$accessor.auth.logout();
    },
  },
};
</script>
