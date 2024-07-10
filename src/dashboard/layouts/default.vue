<template>
  <div>
    <Navbar />
    <main class="container mt-5">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import Navbar from '~/components/layout/NavBar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
}
</style>
